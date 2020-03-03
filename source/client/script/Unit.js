export default class Unit {
  constructor(health = 100, movementSpeed = 0.1, position = {x: 10, y:10}) {
    this.health = health;
    this.movementSpeed = movementSpeed;
    this.position = position;
  }
}
