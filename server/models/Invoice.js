const { Model } = require('objection');

class Invoice extends Model {
  static get tableName() {
    return 'invoice';
  }
}

module.exports = Invoice;
