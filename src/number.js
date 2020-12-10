function number () {
  var div = document.createElement('div');
  div.setAttribute('id', 'number')
  div.innerHTML = 3060;
  div.onclick = function () {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  }
  document.body.appendChild(div);
}
module.exports = {
  number
}