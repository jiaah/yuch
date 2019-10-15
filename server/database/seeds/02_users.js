const bcrypt = require('bcryptjs');
require('dotenv').config();
// const faker = require('faker');

// const createFakeUser = () => ({
//   id: faker.random.uuid(),
//   companyName: faker.company.companyName(),
//   username: faker.internet.userName(),
//   password: faker.internet.password(),
//   contactNo: faker.phone.phoneNumber(),
//   address: faker.address.streetAddress(),
//   lunchQty: faker.random.number(),
//   dinnerQty: faker.random.number(),
//   lateNightSnackQty: faker.random.number(),
//   email: faker.internet.email(),
//   businessNo: faker.finance.account(),
//   businessType: 'catering',
//   startDate: faker.date.past(),
// });

// const createUserMealPrice = user => ({
//   id: faker.random.uuid(),
//   userId: user.id,
//   mealPrice: faker.random.number(),
// });

const {
  COMPANY_NAME,
  USERNAME,
  PASSWORD,
  CONTACT_NO,
  EMAIL,
  IS_ADMIN,
} = process.env;

exports.seed = async knex => {
  await knex('users').del();
  await knex('meal_price').del();
  await knex('restaurant').del();
  await knex('special_meal').del();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(PASSWORD, salt);

  await knex('users').insert({
    companyName: COMPANY_NAME,
    username: USERNAME,
    password: hash,
    contactNo: CONTACT_NO,
    email: EMAIL,
    isAdmin: IS_ADMIN,
    startDate: '20190901',
  });

  // const fakeUsers = [];
  // const fakeMealPrices = [];
  // const desiredFakeUsers = 6;

  // for (let i = 0; i < desiredFakeUsers; i++) {
  //   const tempUser = createFakeUser();
  //   fakeUsers.push(tempUser);
  //   fakeMealPrices.push(createUserMealPrice(tempUser));
  // }

  // await knex('users').insert(fakeUsers);
  // await knex('meal_price').insert(fakeMealPrices);
};
