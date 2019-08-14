const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    [
      'env',
      {
        useBuiltIns: 'usage',
        targets: {
          browsers: ['>0.2%', 'not dead', 'ie >= 9'],
          node: 'current',
          uglify: true,
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
    'transform-runtime',
    'transform-class-properties',
    'transform-object-rest-spread',
    'syntax-dynamic-import',
    // 'dynamic-import-node',
    [
      'import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      '@material-ui/core',
    ],
    [
      'import',
      {
        libraryName: '@material-ui/core/styles',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      '@material-ui/core/styles',
    ],
    [
      'import',
      {
        libraryName: '@material-ui/core/colors',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      '@material-ui/core/colors',
    ],
    [
      'import',
      {
        libraryName: '@material-ui/core/icons',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      '@material-ui/core/icons',
    ],
  ],
  env: {
    development: {
      plugins: ['react-hot-loader/babel'],
    },
    test: {
      plugins: ['dynamic-import-node'],
    },
  },
};
