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

const shootingSpeed = 4;

let projectiles = [];
let enemies = [];
let intervalID;

function spawnEnemies() {
  intervalID = setInterval(() => {
    const radius = Math.floor(Math.random() * 26) + 5;

    let posX, posY;
    if (Math.random() < .5) {
      posX = Math.random() < .5 ? 0 - radius : cnv.width + radius;
      posY = Math.random() * cnv.height;
    } else {
      posX = Math.random() * cnv.width;
      posY = Math.random() < .5 ? 0 - radius : cnv.height + radius;
    }

    const angle = Math.atan2(player.position.y - posY, player.position.x - posX);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };

    const color = 'hsl(' + Math.random() * 360 + ', 50%, 50%)';

    enemies.push(new Enemy({
      position: {
        x: posX,
        y: posY
      },
      radius: radius,
      color: color,
      velocity: velocity
    }))
  }, 1500);
}

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

  checkEnemies();
  checkProjectiles();
  player.update();
}

function checkProjectiles() {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.update();
    checkOffScreen(p, i);

    for (let eIndex = enemies.length - 1; eIndex >= 0; eIndex--) {
      const enemy = enemies[eIndex];
      const distance = Math.hypot(p.position.x - enemy.position.x, p.position.y - enemy.position.y);

      if (distance < p.radius + enemy.radius) {
        enemies.splice(eIndex, 1);
        projectiles.splice(i, 1);
      }
    }
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

function checkEnemies() {
  enemies.forEach((enemy) => {
    enemy.update();

    const distance = Math.hypot(player.position.x - enemy.position.x, player.position.y - enemy.position.y);
    if (distance < player.radius + enemy.radius) {
      alert('Game Over');
    }
  })
}

animate();
spawnEnemies();