// require('dotenv').config();

module.exports = function config() {
  return {
    files: [
      'knexfile.js',
      'server/app.js',
      'server/controllers/*',
      'server/database/*',
      'server/lib/*',
      'server/models/*',
      'server/routes/*',
      'server/services/*',
    ],
    tests: [
      'server/__tests__/**/*.spec.js', // adjust if required
    ],
    loose: true,
    debug: true,
    testFramework: 'jest',
    env: {
      type: 'node',
    },
  };
};
