const { raw } = require('objection');
const BankAccount = require('../models/BankAccount');

const getOneById = async id =>
  BankAccount.query()
    .select('bankName', 'accountNo', 'accountHolder')
    .where({ id })
    .first();

module.exports = { getOneById };
