## package.json

- --watch 监听 webpack 打包 文件 会自动监测 但是不会开启本地服务
- serveer: node server.js
- webpack-dev-server 会监听 配置文件 以及 自动刷新 浏览器

.babelrc 是有执行顺序的

## Library 库打包

- 安装 webpack,
- webpackconfig 配置文件

```js
output: {
  libraryTarget: 'umd', // 允许使用 不同的以入方式 es6 common.js
  library: 'library', // script 标签上引用
}
externals: ['lodash'], // 防止两次打包相同的依赖
```

别人使用方法， commonJs ES6 Module ，

去 npm 官网注册一个名称然后 npm publish

## Tyscript 的打包配置

之后总结的时候可以加上， 试一下。

> 规范 js 语法， 规范代码，方便对代码进行提示，有效提升可维护性。可以考虑之后的代码使用 tyscript

```js
// 关键配置代码
module: {
  rules: [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: [/node_modules/],
    },
  ];
}
```
```json
yarn add -D tyscript ts-loader

// package.json

```
```json
// 基础配置
创建 tsconfig.json 文件
{
  "compileOptions": {
    "outDir": "./dist",
    "module": "es6",  // module 的引入方法
    "targrt": "es5", // 打包生成文件为 es5
    "allows": "js" // 允许使用 js 文件的引入
  }
}
```

引入第三方库， lodash, 能识别 一些错误, 一些参数上的错误  
安装第三方@types/lodash
