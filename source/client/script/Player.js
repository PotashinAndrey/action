import Unit from './Unit.js'

export default class Player extends Unit {
  constructor(health, movementSpeed, weapon) {
    super(health, movementSpeed);
    this.weapon = weapon;
  }
}

