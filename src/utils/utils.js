import _ from "lodash";
export const add = (a, b) => {
  return _.join([a, b]);
};

export const minus = (a, b) => {
  return a - b;
};

// 业务逻辑 1MB
// console.log(_.join(["a", "b", "c"]));

export function number() {
  var div = document.createElement("div");
  div.setAttribute("id", "number");
  div.innerHTML = 3060;
  div.onclick = function () {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  };
  document.body.appendChild(div);
}

import style from "../avatar.scss";

console.log({ style });

export function createAvatar() {
  const img = new Image();
  img.src = "zhouJ";
  img.classList.add(style.avatar);
  const root = document.getElementById("root");
  root.appendChild(img);
}
