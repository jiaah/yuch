module.exports = {
  testMatch: ['**/__test__/**'],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__test__/**',
    '!**/node_modules/**',
  ],
  projects: ['./client', './server'],
};
