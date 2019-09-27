const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class SpecialMeal extends visibilityPlugin(Model) {
  static get tableName() {
    return 'special_meal';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = SpecialMeal;
