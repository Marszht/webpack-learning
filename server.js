//  在node  中 使用 webpack  
// 这里就是代替 webpack-dev-server 但是不会 自动刷新 浏览器 需要手动刷新
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config.js');

const complier = webpack(config); // 检测到webpack 文件 如果改变 会重新打包

const app = express();

app.use(webpackDevMiddleware(complier, {
  publicPath: config.output.publicPath,
}));

app.listen(3003, () => {
  console.log('server is running at port 3000')
})