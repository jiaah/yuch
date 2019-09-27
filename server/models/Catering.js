const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class Catering extends visibilityPlugin(Model) {
  static get tableName() {
    return 'catering';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = Catering;
