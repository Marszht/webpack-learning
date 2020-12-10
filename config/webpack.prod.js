const commonWebpack = require('./webpack.config');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const webpackConfig = {
  // 区分打包环境
  mode: 'production',
  devtool: 'cheap-module-source-map', // production

}

module.exports = merge(webpackConfig, commonWebpack);