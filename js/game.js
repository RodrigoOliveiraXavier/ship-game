const $ = (tag) => document.querySelector(tag);

const cnv = $('canvas')
const ctx = cnv.getContext('2d');

cnv.width = innerWidth;
cnv.height = innerHeight;

let prevTime = 0;

const player = new Player({
  position: {
    x: cnv.width/2,
    y: cnv.height/2
  },
  radius: 30,
  color: '#48FCFF'
})

function animate() {
  window.requestAnimationFrame(animate);
  
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0,0,cnv.width, cnv.height);
  
  player.update();
  
  //Calcula FPS
  let delta = (performance.now() - prevTime) / 1000;
  let fps = 1 / delta;
  
  prevTime = performance.now();
  // console.log(`FPS: ${fps}`)
}

animate();