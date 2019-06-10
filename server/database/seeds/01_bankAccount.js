// eslint-disable-next-line func-names
exports.seed = function(knex, Promise) {
  return knex('bankAccount')
    .del()
    .then(() =>
      knex('bankAccount').insert([
        {
          id: 1,
          bankName: '농협',
          accountHolder: '김귀자',
          accountNo: '12',
        },
        {
          id: 2,
          bankName: '농협',
          accountHolder: '이상환',
          accountNo: '34',
        },
      ]),
    );
};
