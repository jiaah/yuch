module.exports = {
  displayName: 'client',
  // testEnvironmentOptions: {
  //   url: 'https://til.test.com',
  // },
  setupTestFrameworkScriptFile: require.resolve(
    '../test/setup-test-framework.js',
  ),
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  moduleNameMapper: {
    // module must come first
    // '\\.module\\.css$': 'identity-obj-proxy',
    '\\.scss||css$': require.resolve('../test/style-mock.js'),
    '\\.svg$': require.resolve('../test/svg-file-mock.js'),
    // can also map files that are loaded by webpack with the file-loader
  },
};
