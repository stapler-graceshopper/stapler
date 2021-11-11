'use strict'
//  run npm install random-words

const {db, models: {User, Product} } = require('../server/db')

const randomWords = require('random-words');

// Random Field Makers


const makeRandomName = (num = 2, joiningStr = ' ') => {
  const name = randomWords(num).join(joiningStr);
  return name
}

const makeRandomEmail = (num = 2, joiningStr = '-') => {
  const email = randomWords(num).join(joiningStr) + '@gmail.com'
  return email
}

const makeRandomAddress = (num = 1) => {
  const number = Math.floor(Math.random() * 1000)
  const street = randomWords(num)
  return `${number} ${street} street`
}

const makeUserType = () => {
  const num = 1 + Math.floor(Math.random() * 4)
  switch (num) {
    case 1:
      return 'guest'
    case 2:
      return 'customer'
    case 3:
      return 'admin'
    default:
      return 'guest'
  }
}

const makeUser = () => {
  const user = {
    username: makeRandomName(),
    password: '123',
    type: makeUserType(),
    email: makeRandomEmail(),
    address: makeRandomAddress(),
  }
  return user
}

const makeProduct = () => {
  const product = {
    name: makeRandomName(1),
    description: makeRandomName(10),
    inStock: true,
    quantity: makeRandomNumber()
  }
  return product
}

const makeRandomNumber = (num = 1000) => {
  const randomNum = Math.floor(Math.random() * num)
  return randomNum
}

// Model Generators

// generate 100 by default
const generateTestUsers = (thisMany = 100) => {
  const arrayOfTestUsers = []
  for (let i = 0; i < thisMany; i++) {
    arrayOfTestUsers.push(makeUser())
  }
  return arrayOfTestUsers;
}

// generate 100 by default
const generateTestProducts = (thisMany = 100) => {
  const arrayOfTestProducts = []
  for (let i = 0; i < thisMany; i++) {
    arrayOfTestProducts.push(makeProduct())
  }
  return arrayOfTestProducts;
}

// Upload to DB

const uploadTestUsers = async(data) => {
  if (!Array.isArray(data)) {
    console.log('uploadTestUsers requires an Array');
    return;
  }
  await Promise.all(data.map(async (user) => {
    console.log(`USER: ${user.username} \n is being created`)
    const singleUser = await User.create(user)
    return singleUser
  }))
}

const uploadTestProducts = async(data) => {
  if (!Array.isArray(data)) {
    console.log('uploadTestProducts requires an Array');
    return;
  }
  await Promise.all(data.map(async (product) => {
    console.log(`PRODUCT: ${product.name} \n is being created`)
    const singleProduct = await Product.create(product)
    return singleProduct
  }))
}

// Create associations

const createRandomCarts = async() => {
  try {
    console.log('ATTEMPTING ASSOCIATIONS')
    const allProducts = await Product.findAll();
    const allUsers = await User.findAll();
    for (let i = 0; i < allProducts.length; i++) {
      for (let j = 0; j < allUsers.length; j++) {
        // create associations randomly, at a low probability
        if (Math.random() > 0.975) {
          const user = allUsers[j]
          const prod = allProducts[i]
          await user.addProduct(prod)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

// Sync the database. Clear the database if force:true

async function syncDB() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('The Database has been Synced!')
}

// Calls lower level functions

const seedWithRandom = async () => {
  try {
    await uploadTestUsers(generateTestUsers())
    await uploadTestProducts(generateTestProducts())
    console.log(`seeded products`)
    console.log(`seeded users`)
    console.log(`seeded successfully`)
    await createRandomCarts()
  } catch (error) {
    console.log(error)
  }
}

// Main function for running everything (exported)

 async function runSeed() {
   console.log('seeding...')
   try {
     await syncDB()
     await seedWithRandom()
    } catch (err) {
      console.error(err)
      process.exitCode = -1
    } finally {
      console.log('closing db connection')
      await db.close()
      console.log('db connection closed')
    }
  }
  /*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
  */
 if (module === require.main) {
   runSeed()
  }

  // we export the seed function for testing purposes (see `./seed.spec.js`)
  module.exports = runSeed
