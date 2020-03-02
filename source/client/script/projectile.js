export class Projectile {
  constructor(speed, damage, position) {
    this.speed = speed;
    this.damage = damage;
    this.position = {};
    this.startPosition = {};
    this.startPosition.x = position.x * (5.6 / Math.sqrt(position.x**2 + position.y**2));
    this.position.x = this.startPosition.x;
    this.startPosition.y = position.y * (5.6 / Math.sqrt(position.x**2 + position.y**2));
    this.position.y = this.startPosition.y;
  }
    
  move() {
    this.position.x = this.position.x + this.speed * this.startPosition.x;// / Math.abs(this.position.x);
    this.position.y = this.position.y + this.speed * this.startPosition.y;// / Math.abs(this.position.y);
  }

  get x() {
      return this.position.x;
  }

  get y() {
    return this.position.y;
  }
  
}
