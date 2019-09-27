const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class Invoice extends visibilityPlugin(Model) {
  static get tableName() {
    return 'invoice';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }

  static get relationMappings() {
    return {
      catering: {},
    };
  }
}

module.exports = Invoice;
