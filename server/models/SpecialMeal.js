const { Model } = require('objection');

class SpecialMeal extends Model {
  static get tableName() {
    return 'special_meal';
  }
}

module.exports = SpecialMeal;
