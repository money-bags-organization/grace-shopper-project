'use strict';

const {
  db,
  models: { User, OrderProducts, Orders, Products },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      email: 'cody@gmail.com',
      password: '123',
      isAdmin: false,
    }),
    User.create({
      username: 'malcolm',
      email: 'thebestcoder@gmail.com',
      password: '123',
      isAdmin: true,
    }),
    User.create({
      username: 'murphy',
      email: 'murphy@gmail.com',
      password: '123',
      isAdmin: true,
    }),
  ]);


  //Malcolm Edit??
  const products = await Promise.all([
    Products.create({ name: 'Gameboy', price: '100', quantity: '1', imageUrl: '/images/gameboy.jpeg' }),
    Products.create({ name: 'VCR', price: '180', quantity: '1', imageUrl: '/images/vcr.jpeg' }),
    Products.create({ name: 'Nintendo 64', price: '150', quantity: '1', imageUrl: '/images/n64.jpg' }),
    Products.create({ name: 'Atari', price: '200', quantity: '1', imageUrl: '/images/atari.jpeg' }),
    Products.create({ name: 'Laser Disk', price: '80', quantity: '1', imageUrl: '/images/laserdisc.jpeg' }),
    Products.create({ name: 'Sega', price: '120', quantity: '1', imageUrl: '/images/sega.jpg' }),
    Products.create({ name: 'Jukebox', price: '220', quantity: '1', imageUrl: '/images/jukebox.jpg' }),
    Products.create({ name: 'Record Player', price: '65', quantity: '1', imageUrl: '/images/recordplayer.jpeg' }),
    Products.create({ name: 'Stretch Armstrong', price: '50', quantity: '1', imageUrl: '/images/stretch.jpg' }),
    Products.create({ name: 'Pac-Man Arcade Game', price: '1800', quantity: '1', imageUrl: '/images/pac-man.jpg' })
  ]);
  const rick = await User.create({
    username:'rick',
    email: 'rick@gmail.com',
    password: '123',
    isAdmin: false
  })

 const order1 = await Orders.create({
    userId: rick.id,fulfilled:false
   })
   const order2 = await Orders.create({
    userId: rick.id,fulfilled:false
   })


  // const playstation = await Products.create({ name: 'playstation', price: '100', quantity: '1', userId:rick.id, fulfilled: false })
  const playstation = await Products.create({ name: 'playstation', price: '100', quantity: '1'})

  // const rickyorder = await OrderProducts.create({

  // })

    const OrderProducts1 = await OrderProducts.create({orderId: order1.id, productId: playstation.id})
    const OrderProducts2 = await OrderProducts.create({orderId: order2.id, productId: playstation.id})

    //**End Malcolm Edit */

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
