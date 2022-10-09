class Player extends Sprite {
  constructor({ position, radius, color }) {
    super({position, radius, color})
    this.coreRadius = radius/6;

    this.s1 = new Sphere({
      position: {
        x: this.x + Math.cos(0) * this.radius,
        y: this.y + Math.sin(0) * this.radius
      },
      radius: 2,
      color: '#48FCFF',
      angleUpdateValue: .04,
      player: this
    })

    this.s2 = new Sphere({
      position: {
        x: this.x + Math.cos(0) * this.radius,
        y: this.y + Math.sin(0) * this.radius
      },
      radius: 2,
      color: '#48FCFF',
      angleUpdateValue: -.04,
      player: this
    })
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.coreRadius, 0, Math.PI*2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update() {
    this.draw();
    this.s1.update();
    this.s2.update();
  }
}