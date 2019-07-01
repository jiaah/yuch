exports.seed = knex =>
  knex('bank_account')
    .del()
    .then(() =>
      knex('bank_account').insert([
        {
          bankName: '유청',
          accountHolder: '유청(주)',
          accountNo: '054-745-0999',
        },
      ]),
    );
