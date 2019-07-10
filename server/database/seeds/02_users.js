const bcrypt = require('bcryptjs');
require('dotenv').config();
const faker = require('faker');

const createFakeUser = () => ({
  id: faker.random.uuid(),
  companyName: faker.company.companyName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
  contactNo: faker.phone.phoneNumber(),
  address: faker.address.streetAddress(),
  lunchQty: faker.random.number(),
  dinnerQty: faker.random.number(),
  email: faker.internet.email(),
});

const {
  COMPANY_NAME,
  USERNAME,
  PASSWORD,
  CONTACT_NO,
  EMAIL,
  IS_ADMIN,
} = process.env;

exports.seed = (knex, Promise) =>
  knex('users')
    .del()
    .then(() => {
      // WARNING !! DO NOT DELETE the initial Admin Account setup.
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(PASSWORD, salt);
      return Promise.join(
        knex('users').insert({
          companyName: COMPANY_NAME,
          username: USERNAME,
          password: hash,
          contactNo: CONTACT_NO,
          email: EMAIL,
          isAdmin: IS_ADMIN,
        }),
      );
    })
    .then(() => {
      const fakeUsers = [];
      const desiredFakeUsers = 20;
      for (let i = 0; i < desiredFakeUsers; i++) {
        fakeUsers.push(createFakeUser());
      }
      return knex('users')
        .insert(fakeUsers)
        .returning('*');
    })
    .then(fakeUsers => {
      const fakeMealPrices = [];
      fakeUsers.forEach(user => {
        const createUserMealPrice = () => ({
          id: faker.random.uuid(),
          userId: user.id,
          mealPrice: faker.random.number(),
        });
        fakeMealPrices.push(createUserMealPrice());
      });
      return knex('meal_price').insert(fakeMealPrices);
    });
