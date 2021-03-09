import style from  './avatar.scss';

console.log({ style })


import zhouJ from './assets/LMY22301333226.jpg';

function createAvatar() {
  const img = new Image();
  img.src = zhouJ;
  img.classList.add(style.avatar);
  const root = document.getElementById('root');
  root.appendChild(img);
}

export default createAvatar;