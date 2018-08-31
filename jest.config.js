module.exports = {
  testMatch: ['**/__test__/**'],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__test__/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 18,
      branches: 10,
      functions: 19,
      lines: 18,
    },
  },
  projects: ['./client', './server'],
};
