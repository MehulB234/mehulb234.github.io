document.addEventListener('DOMContentLoaded', () => {
  const water = document.getElementById('water');
  const BUBBLE_COUNT = 20;

  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';

    const size = Math.round(Math.random() * 26 + 8);
    b.style.width = size + 'px';
    b.style.height = size + 'px';

    b.style.left = (Math.random() * 76 + 10) + '%';

    const bottomStart = Math.round(Math.random() * 22 + 6);
    b.style.setProperty('--b-start', bottomStart + '%');
    b.style.bottom = bottomStart + '%';

    const floatDur = (Math.random() * 6 + 4).toFixed(2) + 's'; // 4 - 10s
    const driftDur = (Math.random() * 4 + 3).toFixed(2) + 's'; // 3 - 7s

    const negDelay = '-' + (Math.random() * parseFloat(floatDur)).toFixed(2) + 's';

    b.style.animation = `floatUp ${floatDur} linear ${negDelay} infinite, drift ${driftDur} ease-in-out ${negDelay} infinite`;

    if (size < 12) b.classList.add('tiny');
    else if (size < 18) b.classList.add('small');

    water.appendChild(b);
  }
});
