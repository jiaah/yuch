const bcrypt = require('bcryptjs');
require('dotenv').config();

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
    });
