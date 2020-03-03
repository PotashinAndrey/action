import Unit from './Unit.js'

export default class Enemy extends Unit {
  constructor(health, movementSpeed, position, weapon, behavior) {
    super(health, movementSpeed, position);
    this.weapon = weapon;
    this.behavior = behavior;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y,);
    ctx.fillRect(this.position.x - 3, this.position.y - 3, 6, 6);
    ctx.stroke();
    ctx.closePath();
  }

  static draw(ctx, enemies) {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].draw(ctx);
      // enemies[i].move();
      // if (enemies[i].distanceCheck()) {
      //   enemies.splice(i, 1);
      // }
    };
  }
}

