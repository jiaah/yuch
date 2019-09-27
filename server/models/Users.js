const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;
const BankAccount = require('./BankAccount');

class Users extends visibilityPlugin(Model) {
  static get tableName() {
    return 'users';
  }

  static get hidden() {
    return ['updated_at'];
  }

  static get relationMappings() {
    return {
      bankAccount: {
        relation: Model.BelongsToOneRelation,
        modelClass: BankAccount,
        join: {
          from: 'users.bankAccountId',
          to: 'bank_account.id',
        },
      },
    };
  }
}

module.exports = Users;
