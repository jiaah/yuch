const knex = require('../database');

exports.getBankAccount = (req, res) =>
  knex('bankAccount')
    .select('*')
    .then(bankAccount => res.status(200).json(bankAccount))
    .catch(err => res.status(500).json(err));

exports.createBankAccount = (req, res) => {
  const { accountHolder, bankName, accountNo } = req.body;
  knex('bankAccount')
    .insert({ accountHolder, bankName, accountNo })
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};

exports.editBankAccount = (req, res) => {
  const bankId = req.params.id;
  const { accountHolder, bankName, accountNo } = req.body;
  knex('bankAccount')
    .where({ id: bankId })
    .first()
    .update({
      accountHolder,
      bankName,
      accountNo,
    })
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};

exports.deleteBankAccount = (req, res) => {
  const bankId = req.params.id;
  knex('bankAccount')
    .where({ id: bankId })
    .first()
    .del()
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};
