module.exports = {
  displayName: 'client',
  // testEnvironmentOptions: {
  //   url: 'https://til.test.com',
  // },
  // setupTestFrameworkScriptFile: require.resolve(
  //   './src/tests/__mocks__/setup-test-framework.js',
  // ),
  modulePaths: ['<rootDir>/client/src', '<rootDir>/client/src/__test__'],
  // moduleNameMapper: {
  //   // module must come first
  //   // '\\.module\\.css$': 'identity-obj-proxy',
  //   '\\.scss||css$': require.resolve('./src/tests/__mocks__/style-mock.js'),
  //   '\\.svg$': require.resolve('./src/tests/__mocks__/svg-file-mock.js'),
  //   // can also map files that are loaded by webpack with the file-loader
  // },
};
