// eslint-disable-next-line func-names
exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          company_name: 'yuchung',
          username: 'yuch',
          contact_no: '01033060057',
          password: 'temp',
          is_admin: true,
        },
      ]),
    );
};
