// 把开发和打包环境上的 相同配置放在一起
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { web } = require('webpack');

const webpackCommonConfig = {
  // entry: ['@babel/polyfill', './src/index.js'],
  entry: {
    // lodash: './scr/lodash',
    main: './src/index.js',
  },
  module: { // 遇到文件的时候该怎么处理
    rules: [
      // 打包图片
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       // placerholder 占位符 [ext] [hash]
      //       name: '[name].[ext]',
      //       outputPath: 'image',
      //       // context: 'project',
      //       // publicPath: (url, resourcePath, context) => { 
      //       //   // 可以针对不同的文件assest 打包不一样的地方
      //       //   console.log(url);
      //       //   console.log(resourcePath);
      //       //   console.log(context);
      //       //   return 'assests';
      //       //   // `resourcePath` is original absolute path to asset
      //       //   // `context` is directory where stored asset (`rootContext`) or `context` option

      //       //   // To get relative path you can use
      //       //   // const relativePath = path.relative(context, resourcePath);
      //       // }
      //     }
      //   },
      // },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        // include
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: true,
              presets: [ // 针对业务代码 写在.babelrc
                // ['@babel/preset-env',
                //   {
                //     // 减少打包代码， 只是把我需要的加入进去， polyfill
                //     useBuiltIns: 'usage',
                //     // corejs: {
                //     //   version: 3,
                //     //   proposals: true
                //     // },
                //   }
                // ]
              ]
              // plugins: [
              //   [ // 针对 第三方库
              //     "@babel/plugin-transform-runtime", {
              //       "corejs": 2, //  @babel/runtime-corejs2 按装额外的包
              //       "helpers": false,
              //       "regenrtator": true,
              //       "useESModules": false
              //     }
              //   ]
              // ]
            }
          },
          // {
          //   // shimming 垫片
          //   loader: 'imports-loader?wrapper=window',
          // }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          // 把图片变成 base64 图片， 一般用于 小的icon ,
          // 因为 base64 导致很大
          loader: 'url-loader',
          options: {
            // placerholder 占位符 [ext] [hash]
            name: '[name].[ext].[hash]',
            outputPath: 'image',
            limit: 2048
          }
        },
      },
      // 打包字体
      {
        test: /\.(eot|ttf|woff|svg|woff2)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'font',
          }
        },
      },
    ]
  },
  plugins: [
    // 打包前 请理目录
    new CleanWebpackPlugin(
      {
        verbose: true,
      }
    ),
    // 当遇到 $ 时 会主动，引入 jquery 垫片
    // 这个对于一些版本比较老的第三方库 比较有用，
    // 然后老的第三方模块没有 模块化的 引入
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   // moment: 'moment',
    // }),
    new HtmlWebpackPlugin({
      // 将 index.html 作为模板
      template: './src/index.html'
    }),
  ],
  output: {
    // publicPath: '/', // cdn 地址放到对应
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].chunk.js', // 间接引入的模块
    filename: '[name].js' // 多个entry 
  },
}

module.exports = webpackCommonConfig;