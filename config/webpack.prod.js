const commonWebpack = require('./webpack.config');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');


const webpackConfig = {
  // 区分打包环境
  mode: 'production',
  devtool: 'cheap-module-source-map', // production
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader:  MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/dist/style/', // 间接引入的文件
            }
          },
          {
            loader: 'css-loader',
            options: {
              // 就是在文件 css 文件中引入的 可能不会执行 
              // sass-loader postcss-loader
              modules: true, // 开启模块化打包
              importLoaders: 2,  // 表示 在 css中import 的css会使用 scss 和 postcss-loader
              //   // 使用 模块 用 css-module
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')(),
              ]
            }
          },
        ]
      },
      {
        test: /\.(sass|scss)$/i,
        //  会从use 数组最后一个开始解析
        use: [
          // 把解析出来的 css 插入DOM 结构
          // 一般用于线上服环境，因为开发环境有syle-loader
          {
            loader:  MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/dist/style/'
            }
          },

         
          // 解析 import css url... Translates CSS into CommonJS
          // 如果有自定义配置，需要 像下面 postcss-loader 使用一样
          {
            loader: 'css-loader',
            options: {
              // 就是在文件 css 文件中引入的 可能不会执行 
              // sass-loader postcss-loader
              modules: true, // 开启模块化打包
              importLoaders: 2,  // 表示 在 css中import 的css会使用 scss 和 postcss-loader
              //   // 使用 模块 用 css-module
            }
          },
          // 自动加前缀
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')(),
              ]
            }
          },
          // Compiles Sass to CSS
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    // 一般用于 生产环境去打包分割css 文件
    // 生产上一般用 style-loader 会吧 css 文件 引入到 index.html 文件上
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[name].css'
    }),
    // new WorkboxPlugin.GenerateSW({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: './src/index.js'
    // })
  ],
  optimization: {
    usedExports: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|sass)$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },

  }
}

module.exports = merge(webpackConfig, commonWebpack);