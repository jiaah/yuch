module.exports = {
  rootDir: process.cwd(),
  displayName: 'client',
  modulePaths: ['<rootDir>/client/src', '<rootDir>/client/src/__tests__'],
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'scss'],
  setupFilesAfterEnv: [
    'raf/polyfill',
    '<rootDir>/client/src/__tests__/setupTests',
  ],
  moduleNameMapper: {
    '\\.(s?css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '\\.(jpg|jpeg|png|gif|svg)$':
      '<rootDir>/client/src/__tests__/__mocks__/assetTransformer.js',
  },
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!./../jest.config.js',
    '!./../index.js',
    '!./../store.js',
    '!./../src/actions/actionTypes.js',
    '!./../src/reducers/index.js',
    '!./../src/components/reserve/textMaskCustom.js',
    '!./../src/components/home/map.js',
  ],
  // setupTestFrameworkScriptFile: '<rootDir>/client/src/__tests__/setupTests',
};
