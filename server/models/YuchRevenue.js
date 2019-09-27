const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class YuchRevenue extends visibilityPlugin(Model) {
  static get tableName() {
    return 'yuch_revenue';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = YuchRevenue;
