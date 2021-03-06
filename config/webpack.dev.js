const commonWebpack = require("./webpack.config");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const webpackConfig = {
  // 区分打包环境

  mode: "development",
  // 可以追踪到  源代码文件的位置， 如果 为 none 会定位 是打包文件代码
  // sourceMap 是一个 映射，能够把打包 后的代码 映射到 源代码文件位置

  // none, source-map , inline-source-map,
  // cheap 如果代码量比较少的情况， 加了cheap 只会告诉你哪一行有问题， 不到列
  // 只会 去处理 业务代码里面的错误
  // 打包性能会变快
  // cheap-module-source-map 也会 检测 第三方依赖 plugin 等代码的错误
  // eval 是性能最快 的打包环境  建议 eval-cheap-module-source-map 开发的代码 比较快的
  // devtool: 'none',  // d
  // devtool: 'source-map',  // 会生成 .map 文件
  // devtool: 'inline-source-map',  // 不会生成 .map 文件 会合并到 打包文件
  // devtool: 'cheap-inline-source-map',  // z只有行， 没有列
  devtool: "cheap-eval-module-source-map ", //  mode: 'development',
  // devtool: 'cheap-module-source-map', // production
  // devtool: 'eval', // 这里不会打包 生成dist 文件
  // sub: './src/index.js'
  // 热更新
  devServer: {
    contentBase: "./dist", // 启动在哪个文件夹下
    open: true, //  自动 开启浏览器 开启 服务器 如果以文件地址打开会有跨域问题， 或者发ajax 请求
    openPage: "list",
    port: 3000, // 默认 8080
    overlay: {
      // 出现编译错误或者警告时，在浏览器全屏覆盖
      warnings: true,
      errors: true,
    },
    headers: {
      fuckingawsome: "hah",
    },
    // http2: true,
    // https: true,
    // 对于跨域可以使用这个字段，让后端服务跑在localHost 上
    proxy: {
      "/react/api": {
        target: "http://www.dell-lee.com", // 代理到这个服务器
        pathRewirte: {
          "header.json": "demo.json",
        },
      },
    }, // 接口代理，跨域 问题
    // HMR 只会刷新 你更改的内容
    // hot: true, // 自动刷新 开启 HMR
    // hotOnly: true, // 不自动 刷新 当 hmr 失效的时候 做特别处理， 无需页面刷新作为构建失败的回退
    // 这个就没有 HMR 的优势了， 但对于某些情况可能适用
    // liveReload: true, // 当检测到文件更改时， 重新刷新浏览器,但是必须把hot 设置为false,
    historyApiFallback: true, // 单页spa 中会有默认的 路径, 如果设置为false 则当所有响应都不会为index.html 内容
    index: "a.html", // 配合historyApiFallback 使用
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|less)$/i,
        //  会从use 数组最后一个开始解析
        use: [
          // 把解析出来的 css 插入DOM 结构
          "style-loader",
          // 解析 import css url... Translates CSS into CommonJS
          // 如果有自定义配置，需要 像下面 postcss-loader 使用一样
          {
            loader: "css-loader",
            options: {
              // 就是在文件 css 文件中引入的 可能不会执行
              // sass-loader postcss-loader
              // modules: true, // 开启模块化打包
              importLoaders: 2, // 表示 在 css中import 的css会使用 scss 和 postcss-loader
              //   // 使用 模块 用 css-module
            },
          },
          // 自动加前缀
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")()],
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // 就是在文件 css 文件中引入的 可能不会执行
              // sass-loader postcss-loader
              // 开启模块化打包 也就是把 css 文件 导出为一个对象，或者单独导出一个值
              // modules: true,
              importLoaders: 2, // 表示 在 css中import 的css会使用 scss 和 postcss-loader
              //   // 使用 模块 用 css-module
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")()],
            },
          },
        ],
      },
    ],
  },
  // plugin
  // 回在运行在某刻的时候做一些事情
  // 会在打包结束后自动生成一个 html 文件，
  // 并把打包生成的js 文件自动引入到 html 文件中;
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR
  ],
  // tree shakiing 开发不需要 这断代码
  optimization: {
    // runtimeChunk: "single",
    usedExports: true, // tree shaking
    splitChunks: {
      chunks: "all", // async 只对异步代码有效 all 对 同步或者异步
      //   // 以下是默认的
      minSize: 0, // 如果引入的包 大于某个字节才会做代码分割 B字节/KB千字节 kb千位 / b位
      //   // minRemainingSize: 0,
      maxSize: 0, // 一般很少会配置 默认为 0 就是不对大小进行二次分割
      minChunks: 1, //  当一个模块被用了多少次才会去打包
      maxAsyncRequests: 30, // 同时加载的模块数 超过30 个不再做代码分割
      maxInitialRequests: 30, // 入口文件最大并行请求数量30 网站首页
      automaticNameDelimiter: "_", // 文件中间的分割符号, 作为文件名的链接
      //   enforceSizeThreshold: 50000,
      name: true, // 让cacheGroup 中的名字有效
      // 同步代码有效 cacheGroup
      // 如果匹配到了多个 缓存组则会按照优先级来
      cacheGroups: {
        // 缓存组
        // commons: {
        //   test: /[\\/]node_modules[\\/]/,
        //   // node_modules/react-dom/
        //   // node_modules/react/
        //   // node_modules/react-redux/
        //   name: "commons",
        //   chunks: "all",
        //   minChunks: 1,
        // },
        // vendors: false,
        // default: false,
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 适用于 [\\/] windows、 unix
          priority: -10, // 优先级 跟default 的区别
          filename: "venders.js",
        },
        lodash: {
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          priority: -10,
          filename: "lodash.js",
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          priority: -10,
          filename: "antd.js",
        },
        // defaultVendors: {
        //   // 这个 vender 组， 可能还有其他的文件这个组里面
        //   // 如果设置为false 则不会去打包
        //   test: /[\\/]node_modules[\\/]/, // 适用于 [\\/] windows、 unix
        //   priority: -10, // 优先级 跟default 的区别
        //   filename: "venders.js",
        //   // publicPath
        //   reuseExistingChunk: true, // 复用之前被打包过的模块
        // },
        // commpents: {
        //   minChunks: 1,
        //   test: /[\\/]src[\\/]components[\\/]/,
        //   priority: -10,
        //   reuseExistingChunk: true, // 复用之前被打包过的模块
        //   filename: "commpents.[contenthash].js",
        // },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 复用之前被打包过的模块
          filename: "common.js",
        },
        // },
      },
    },
  },
};

// module.exports = smp.wrap(webpackConfig);
module.exports = merge(webpackConfig, commonWebpack);
