module.exports = {
  displayName: 'client',
  modulePaths: ['<rootDir>/src', '<rootDir>/src/__tests__'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.js'],
  setupFiles: ['raf/polyfill', '<rootDir>/src/__tests__/setupTests'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
