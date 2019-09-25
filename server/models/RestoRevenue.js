const { Model } = require('objection');

class RestoRevenue extends Model {
  static get tableName() {
    return 'resto_revenue';
  }
}

module.exports = RestoRevenue;
