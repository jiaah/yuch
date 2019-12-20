const { Model } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

class Routes extends visibilityPlugin(Model) {
  static get tableName() {
    return 'routes';
  }

  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = Routes;
