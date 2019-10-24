const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class Employees extends visibilityPlugin(Model) {
  static get tableName() {
    return 'employees';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = Employees;
