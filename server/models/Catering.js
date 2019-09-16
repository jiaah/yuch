const { Model } = require('objection');

class Catering extends Model {
  static get tableName() {
    return 'catering';
  }
}

module.exports = Catering;
