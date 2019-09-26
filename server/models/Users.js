const { Model } = require('objection');
const BankAccount = require('./BankAccount');

class Users extends Model {
  static get tableName() {
    return 'users';
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
