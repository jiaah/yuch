const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
// Compress Files
const BrotliPlugin = require('brotli-webpack-plugin');

const baseConfig = require('./webpack.base');

const config = {
  mode: 'production',
  entry: './client/index.js',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: { removeAll: true },
        },
        canPrint: true,
      }),
    ],
  },
  plugins: [new BrotliPlugin()],
};

module.exports = merge(config, baseConfig);
