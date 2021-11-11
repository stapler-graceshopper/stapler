'use strict'

const {db, models: {User, Product} } = require('../server/db')
// const { Users} = require('../server/db/models')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

// IMPORT USER MODEL HERE
const randomWords = require('random-words');

// username, password, type, email, image, address
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
// generate 100 test users by default
const generateTestUsers = (thisMany = 100) => {
  const arrayOfTestUsers = []
  for (let i = 0; i < thisMany; i++) {
    arrayOfTestUsers.push(makeUser())
  }
  return arrayOfTestUsers;
}

const generateTestProducts = (thisMany = 100) => {
  const arrayOfTestProducts = []
  for (let i = 0; i < thisMany; i++) {
    arrayOfTestProducts.push(makeProduct())
  }
  return arrayOfTestProducts;
}

const uploadTestUsers = async(data) => {
  if (!Array.isArray(data)) {
    console.log('uploadTestUsers requires an Array');
    return;
  }
  await Promise.all(data.map(async (user) => {
    console.log(`USER: ${user.username} \n is being created`)
    // import user model or this won't work
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
    // import user model or this won't work
    const singleProduct = await Product.create(product)
    return singleProduct
  }))
}

const makeRandomNumber = (num = 1000) => {
  const randomNum = Math.floor(Math.random() * num)
  return randomNum
}
// for when we have both models finished, to create random shoping carts

// DO NOT COMMENT IN UNTIL MANY TO MANY IS ESTABLISHED

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

async function syncDB() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('The Database has been Synced!')
}

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
