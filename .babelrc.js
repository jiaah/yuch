const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    'react',
    [
      'env',
      {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7'],
          node: 'current',
        },
        loose: true,
        modules: isTest ? 'commonjs' : false,
        debug: isTest ? false : true,
      },
    ],
  ],
  retainLines: true,
  plugins: [
    [
      'transform-runtime',
      {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime',
      },
    ],
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
    isTest ? 'dynamic-import-node' : null,
  ].filter(Boolean),
  env: {
    development: {
      plugins: ['react-hot-loader/babel'],
    },
  },
};
