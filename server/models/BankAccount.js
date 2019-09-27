const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class BankAccount extends visibilityPlugin(Model) {
  static get tableName() {
    return 'bank_account';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = BankAccount;
