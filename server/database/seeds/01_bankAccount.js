exports.seed = knex =>
  knex('bankAccount')
    .del()
    .then(() =>
      knex('bankAccount').insert([
        {
          id: 1,
          bankName: 'yuch',
          accountHolder: 'yuchung',
          accountNo: '0547450999',
        },
      ]),
    );
