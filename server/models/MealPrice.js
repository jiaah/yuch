const { Model } = require('objection');

class MealPrice extends Model {
  static get tableName() {
    return 'meal_price';
  }
}

module.exports = MealPrice;
