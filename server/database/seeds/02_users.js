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
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(PASSWORD, salt);
      return Promise.join(
        knex('users').insert({
          company_name: COMPANY_NAME,
          username: USERNAME,
          password: hash,
          contact_no: CONTACT_NO,
          email: EMAIL,
          is_admin: IS_ADMIN,
        }),
      );
    });
