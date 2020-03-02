import Shoot from './Shoot.js';

export default class Weapon {
  constructor(cooldown = 300) {
    this.cooldown = cooldown;
    this.last = 0;
  }

  shoot(cursor, canvas) {
    const date = new Date().valueOf();
    const delay = date - this.last;

    if (this.cooldown > delay) return;
    this.last = date;
    return new Shoot(cursor, canvas);
  }
}
