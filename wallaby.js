module.exports = function config() {
  return {
    files: ['server/app.js'],
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
