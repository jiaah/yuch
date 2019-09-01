const { Model } = require('objection');

class BankAccount extends Model {
  static get tableName() {
    return 'bank_account';
  }
}

module.exports = BankAccount;
