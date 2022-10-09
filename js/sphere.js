class Sphere extends Sprite {
  constructor({ position, radius, color, angleUpdateValue, player }) {
    super({position, radius, color})
    this.angleUpdateValue = angleUpdateValue;
    this.player = player;
    this.angle = 0;
  }

  update() {
    this.draw();
    this.angle += this.angleUpdateValue;

    if (Math.abs(this.angle) >= Math.PI*2) {
      this.angle = 0;
    }

    this.position.x = this.player.position.x + Math.cos(this.angle) * this.player.radius;
    this.position.y = this.player.position.y + Math.sin(this.angle) * this.player.radius;
  }
}