const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class Restaurant extends visibilityPlugin(Model) {
  static get tableName() {
    return 'restaurant';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = Restaurant;
