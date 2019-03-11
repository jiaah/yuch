// eslint-disable-next-line func-names
exports.seed = function(knex, Promise) {
  return knex('bank_account')
    .del()
    .then(() =>
      knex('bank_account').insert([
        {
          id: 1,
          bank_name: 'rowValue1',
          account_holder: '33',
          account_no: 'll',
        },
        {
          id: 2,
          bank_name: 'rowValue2',
          account_holder: '44',
          account_no: 'aa',
        },
      ]),
    );
};
