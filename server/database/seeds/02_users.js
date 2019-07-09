const bcrypt = require('bcryptjs');
require('dotenv').config();
const faker = require('faker');

const createFakeUser = () => ({
  companyName: faker.company.companyName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
  contactNo: faker.phone.phoneFormats(),
  lunchQty: faker.random.number(),
  dinnerQty: faker.random.number(),
  mealPrice: faker.random.number(),
  reservedPrice: { date: '', price: '' },
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
      return knex('users').insert(fakeUsers);
    });
