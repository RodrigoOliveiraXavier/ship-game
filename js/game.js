const $ = (tag) => document.querySelector(tag);

const cnv = $('canvas')
const ctx = cnv.getContext('2d');

cnv.width = innerWidth;
cnv.height = innerHeight;

let prevTime = 0;

const player = new Player({
  position: {
    x: cnv.width / 2,
    y: cnv.height / 2
  },
  radius: 30,
  color: '#48FCFF'
});

let projectiles = [];
const shootingSpeed = 4;

cnv.addEventListener('click', (e) => {
  e.preventDefault();

  const angle = Math.atan2(e.clientY - player.position.y, e.clientX - player.position.x);
  const velocity = {
    x: Math.cos(angle) * shootingSpeed,
    y: Math.sin(angle) * shootingSpeed
  };

  projectiles.push(new Projectile({
    position: {
      x: player.position.x,
      y: player.position.y
    },
    radius: 3,
    color: '#48FCFF',
    velocity
  }));
});

function animate() {
  window.requestAnimationFrame(animate, cnv);
  update();

  //Calcula FPS
  let delta = (performance.now() - prevTime) / 1000;
  let fps = 1 / delta;

  prevTime = performance.now();
  // console.log(`FPS: ${fps}`)
}

function update() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  checkProjectiles();
  player.update();
}

function checkProjectiles() {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.update();

    checkOffScreen(p, i);
  }
}

function checkOffScreen(projectile, index) {
  if (projectile.position.x + projectile.radius < 0 ||
    projectile.position.x - projectile.radius > cnv.width ||
    projectile.position.y + projectile.radius < 0 ||
    projectile.position.y - projectile.radius > cnv.height) {

    projectiles.splice(index, 1);
  }
}

animate();