// eslint-disable-next-line func-names
exports.seed = function(knex, Promise) {
  return knex('bank_account')
    .del()
    .then(() =>
      knex('bank_account').insert([
        {
          id: 1,
          bank_name: '농협',
          account_holder: '김귀자',
          account_no: '12',
        },
        {
          id: 2,
          bank_name: '농협',
          account_holder: '이상환',
          account_no: '34',
        },
      ]),
    );
};
