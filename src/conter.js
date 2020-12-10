function counter () {
  console.log("work");
  var div = document.createElement('div');
  div.setAttribute('class', 'counter')
  div.innerHTML = 1;
  div.onclick = function () {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  }
  document.body.appendChild(div);
}
module.exports = {
  counter
}