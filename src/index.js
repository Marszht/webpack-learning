// import "@babel/polyfill"; // 会再 全局注入， 如果不希望全局注入需要  transform-runtime
// polyfill会污染 全局
// 闭包注入

// import "core-js/stable";
// import "regenerator-runtime/runtime";

// // 模块打包工具
// import Header from './header';
// import Content from './content';
// import SiderBar from './siderBar';
// import createAvatar from './createAvatar';
// import zhouJ from "./assets/LMY22301333226.jpg";
// const ZhouJ = require('./assets/LMY22301333226.jpg')
// const avatar = require('./assets/avatar.jpg')
// const pushUp = require('./assets/pushUp.jpg')

// // 会造成这个样式全局引用 所以引出 css-module

// import style from "./index.scss";
// // import "./style.css";
// console.log({ style });
// const img = new Image();
// img.src = zhouJ;
// img.classList.add(style.avatar);
// // img.classList.add("avatar");
// const root = document.getElementById("root");
// root.appendChild(img);

// // 打包图片 以及 css 的打包
// // 其中主要包括  url-loader file-loader
// // postcss-loader, sass-loader, css-modules
// // css-loader, style-loader,
// createAvatar();
// console.log("ddd");

// // 基础打包， 打包 js 文件
// // new Header();
// // new Content();
// // new SiderBar();

// // 打包 字体文件

// import "./index.scss";

// const root = document.getElementById('root');
// console.log("sdsfd")

// root.innerHTML = '<i class=" icon-weixinzhifu iconfont ">Hello webpack !!</i>';

// webpack-dev-server  // 会把打包的目录 放到内存中 从而提高 打包速度
// console.log("HELLO WD i !!!! ");

// css-loader 中已经 帮我们自己判断是否需要更新
// HMR
// import style from './index.scss';

// console.log({style});
// var btn = document.createElement('button');
// btn.innerHTML = '新建';
// document.body.appendChild(btn);

// btn.onclick = function () {
//   var div = document.createElement('div');
//   div.classList.add(style.avatar);
//   div.innerHTML = 'item';
//   document.body.appendChild(div);
// }

// import { counter } from './conter';
// import { number } from './number';

// 页面不会刷新，如果只是单纯的加上 HMR
// counter();
// number();

// // HMR 代码 在一般的框架中以及做好了 所以我们不需要写 & 判断
// if (module.hot) {
//   console.log({ module })
//   module.hot.accept('./number', () => {
//     // 把之前的 numbr 删除，然后再执行
//     const pervDom = document.getElementById('number');
//     document.body.removeChild(pervDom)
//     number();
//   });
// }

// const arr = [
//   new Promise(() => {}),
//   new Promise(() => {})
// ]
// arr.map(item => {
//   console.log({ item })
// })

import React, { PureComponent } from "react";
import { BrowserRouter, Route, Link, Router, Switch } from "react-router-dom";
import Home from "./components/home";
import List from "./components/list";
import { Button, DatePicker } from "antd";
import ReactDom from "react-dom";
import axios from "axios";
import "antd/dist/antd.css";
import "./index.scss";

// import "./style.css";

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      num: 19,
    };
  }

  componentDidMount() {
    // 允许了跨域
    // 本地代理服务器 fideler 待会尝试一下
    axios.get("/react/api/header.json").then((res) => {
      console.log({ res });
    });
  }

  // onClick = () => {

  //   const { num } = this.state;
  //   this.setState({
  //     num: num++
  //   })
  // }
  render() {
    return [
      <Button key="btn" type="primary">
        测试button
      </Button>,
      <BrowserRouter key="router">
        <li className="route">
          <Link to="/" key="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/list" key="about">
            About
          </Link>
        </li>
        <Switch key="BrowserRouter">
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
        </Switch>
      </BrowserRouter>,
    ];
  }
}

ReactDom.render(<App />, document.getElementById("root"));

/**
 * tree shaking
 */
// tree shaking 去除不需要的 引入
// 需要配合 sideEffects
// 以及 压缩 treser
// 还有字段 usedExports： true当值为true 之后再通过 terser 压缩 会把 没有使用的给删除掉
// 只支持 es module的引入 只支持静态引入
// import { add } from "./math";
// console.log(add(1, 4));

/**
 * code splitting 代码分割
 */
// 同步加载
// import _ from "lodash";

// 业务逻辑 1MB
// console.log(_.join(["a", "b", "c"]));

// main.js  2MB

// 打包文件会很大，加载时间会很长

// 用户重新访问 页面，又会重新加载2MB 内容

// 对代码共用部分进行拆分 code-spliting

//  使用 webpack插件进行拆分

// function getComponent() {
//   // 异步加载
//   return import(/* webpackChunkName:"lodash"*/ "lodash").then(
//     ({ default: _ }) => {
//       var element = document.createElement("div");
//       console.log(element);
//       element.innerHTML = _.join(["mars", "zht"], "-");
//       return element;
//     }
//   );
// }

// getComponent().then((element) => {
//   document.body.appendChild(element);
// });
// 代码分割 和 webpack 无关

// 1. 同步代码分割 // 在webpack 中 optimization
// 2.异步代码，无需做任何配置

/**
 * 懒加载 Lazy Loading
 * Chunk 是什么
 */
// 让我们加载更快
// function getComponent() {
//   // 异步加载 import 懒加载
//   //  也可以用 async await
//   return import(/* webpackChunkName:"lodash"*/ "lodash").then(
//     ({ default: _ }) => {
//       var element = document.createElement("div");
//       element.innerHTML = _.join(["mars", "zht"], "-");
//       return element;
//     }
//   );
// }

// 使用 async await 简化代码
// async function getComponent() {
//   const { default: _ } = await import(/* webpackChunkName:"lodash"*/ "lodash");
//   var element = document.createElement("div");
//   element.innerHTML = _.join(["mars", "zht"], "-");
//   return element;
// }

// document.addEventListener("click", () => {
//   getComponent().then((element) => {
//     document.body.appendChild(element);
//   });
// });

// // Chunk 项目打包完后dist 目录下有几个js 文件
// var fuck = [1,2,3]
// console.log(...fuck);

// import './style.css';
// import { add } from './math';
// add(1,2);
// console.log(this === window);

// 库代码
// console.log("work");

// PWA 渐进式网页应用
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//     .then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }
