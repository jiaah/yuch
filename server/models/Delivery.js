const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class Delivery extends visibilityPlugin(Model) {
  static get tableName() {
    return 'delivery';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = Delivery;
