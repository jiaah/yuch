module.exports = {
  displayName: 'client',
  modulePaths: ['<rootDir>/src', '<rootDir>/src/__tests__'],
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'scss'],
  setupFiles: ['raf/polyfill', '<rootDir>/src/__tests__/setupTests'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$':
      '<rootDir>/src/__tests__/__mocks__/fileMock.js',
    '\\.(s?css|less)$': 'identity-obj-proxy',
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
};
