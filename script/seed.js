'use strict'

const {db, models: {User} } = require('../server/db')
const Product = require('../server/db/models/Product')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

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
       return 'admin'
     case 3:
       return 'engineer'
     case 4:
       return 'loggedIn'
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
    quantity: generateNumber()
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

 const generateNumber = (num = 1000) => {
  const randomNum = Math.floor(Math.random() * num)
  return randomNum
 }
 // for when we have both models finished, to create random shoping carts

 // DO NOT COMMENT IN UNTIL MANY TO MANY IS ESTABLISHED


 // const createRandomCarts = async() => {
 //   try {
 //     console.log('ATTEMPTING ASSOCIATIONS')
 //     // import models for this to work
 //     const allProducts = await Product.findAll();
 //     const allUsers = await User.findAll();
 //     for (let i = 0; i < allProducts.length; i++) {
 //       for (let j = 0; j < allUsers.length; j++) {
 //         // create associations randomly, at a low probability
 //         if (Math.random() > 0.975) {
 //           await allUsers[j].addProduct(allProducts[i])
 //         }
 //       }
 //     }
 //   } catch (error) {
 //     console.log(error)
 //   }
 // }



 const seedWithRandom = async () => {
   try {
    //  await db.sync({force: true})
     await uploadTestUsers(generateTestUsers())
     await uploadTestProducts(generateTestProducts())
//      // TO DO
//      // await uploadTestProducts()
//      // await createRandomCarts()
   } catch (error) {
     console.log(error)
   }
 }

 await seedWithRandom()

 const users =  await User.findAll()
 const products = await Product.findAll()

  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users,
    products: {
      paper: products[0],
      stapler: products[1]
    }

  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
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
module.exports = seed
