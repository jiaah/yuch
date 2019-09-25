const { Model } = require('objection');

class YuchRevenue extends Model {
  static get tableName() {
    return 'yuch_revenue';
  }
}

module.exports = YuchRevenue;
