const { Model } = require('objection');

class Restaurant extends Model {
  static get tableName() {
    return 'restaurant';
  }
}

module.exports = Restaurant;
