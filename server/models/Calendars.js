const { Model } = require('objection');

class Calendars extends Model {
  static get tableName() {
    return 'calendars';
  }
}

module.exports = Calendars;
