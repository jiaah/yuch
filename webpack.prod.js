const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const TerserPlugin = require('terser-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'production',
  entry: './client/index.js',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          discardComments: { removeAll: true },
        },
        canPrint: true,
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/,
        terserOptions: {
          ecma: 6,
          compress: true,
          output: {
            comments: false,
            beautify: false,
          },
        },
      }),
    ],
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [new BrotliPlugin()],
};

module.exports = merge(baseConfig, config);
