const bcrypt = require('bcryptjs');
const adminInfo = require('../../../secrets/admin_info');

const { COMPANY_NAME, USERNAME, PASSWORD, CONTACT_NO, IS_ADMIN } = adminInfo;

exports.seed = (knex, Promise) =>
  knex('users')
    .del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(adminInfo.PASSWORD, salt);
      return Promise.join(
        knex('users').insert({
          company_name: adminInfo.COMPANY_NAME,
          username: adminInfo.USERNAME,
          password: hash,
          contact_no: adminInfo.CONTACT_NO,
          is_admin: adminInfo.IS_ADMIN,
        }),
      );
    });
