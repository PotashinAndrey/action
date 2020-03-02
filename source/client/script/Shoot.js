import { Projectile } from './projectile.js';
export default class Shoot {
  constructor(cursor, canvas) {
    const w = canvas.width / 2;
    const h = canvas.height / 2;

    const scale = { x: 10, y: 10 };

    const cur = {
      x: (cursor.x - w) / scale.x,
      y: (cursor.y - h) / -scale.y
    };

    this.proj = new Projectile(0.4, 100, cur);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.proj.x, this.proj.y);
    ctx.fillRect(this.proj.x, this.proj.y, 1, 1);
    ctx.stroke();
    ctx.closePath();
  }

  move() {
    this.proj.move();
  }

  distanceCheck() {
    if (Math.abs(this.proj.x) > 200 || Math.abs(this.proj.y) > 200) {
      return true;
    }

    return false;
  }

  static draw(ctx, shots) {
    for (let i = 0; i < shots.length; i++) {
      shots[i].draw(ctx);
      shots[i].move();
      if (shots[i].distanceCheck()) {
        shots.splice(i, 1);
      }
    };
  }

}
