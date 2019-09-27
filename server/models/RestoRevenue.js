const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class RestoRevenue extends visibilityPlugin(Model) {
  static get tableName() {
    return 'resto_revenue';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = RestoRevenue;
