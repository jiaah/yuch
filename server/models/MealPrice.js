const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class MealPrice extends visibilityPlugin(Model) {
  static get tableName() {
    return 'meal_price';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = MealPrice;
