class Enemy extends Projectile {
  constructor({ position, radius, color, velocity }) {
    super({position, radius, color, velocity});
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}