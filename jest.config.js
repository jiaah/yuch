module.exports = {
  testMatch: ['**/__tests__/**'],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  projects: ['./client', './server'],
};
