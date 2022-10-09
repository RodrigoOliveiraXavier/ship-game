class Projectile extends Sprite {
  constructor({ position, radius, color, velocity}) {
    super({position, radius, color})
    this.velocity = velocity;
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}