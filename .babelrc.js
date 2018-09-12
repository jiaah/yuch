const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
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
    'react',
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
    'transform-class-properties',
    'transform-object-rest-spread',
    'syntax-dynamic-import',
    isTest ? 'dynamic-import-node' : null,
  ].filter(Boolean),
  env: {
    development: {
      plugins: ['react-hot-loader/babel'],
    },
  },
};
