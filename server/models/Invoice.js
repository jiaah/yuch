const { Model } = require('objection');

class Invoice extends Model {
  static get tableName() {
    return 'invoice';
  }

  static get relationMappings() {
    return {
      catering: {},
    };
  }
}

module.exports = Invoice;
