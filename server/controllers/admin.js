const knex = require('../database');

exports.getBankAccount = (req, res) =>
  knex('bankAccount')
    .select('*')
    .then(bankAccount => res.status(200).json(bankAccount))
    .catch(err => res.status(500).json(err));
