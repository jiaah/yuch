exports.seed = knex =>
  knex('bank_account')
    .del()
    .then(() =>
      // WARNING !! DO NOT DELETE the initial Bank Account setup.
      knex('bank_account').insert([
        {
          bankName: '유청',
          accountHolder: '유청(주)',
          accountNo: '054-745-0999',
        },
      ]),
    );
