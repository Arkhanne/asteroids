function Ship() {
  this.x = 509;
  this.y = 375;
  this.angle = 0;
}

Ship.prototype.rotateRight = function() {
  this._incrementAngle();
}

Ship.prototype.rotateLeft = function() {
  this._decrementAngle();
}

Ship.prototype._incrementAngle = function() {
  this.angle += 3;
  if (this.angle > 360) {
    this.angle = 0;
  }
}

Ship.prototype._decrementAngle = function() {
  this.angle -= 3;
  if (this.angle > 360) {
      this.angle = 0;
  }
}

Ship.prototype.shoot = function() {
  var bullet = new Bullet();

  // bullet.x = this.x + 26 * Math.cos(2 * Math.PI * this.angle / 360);
  // bullet.y = this.y + 9 * Math.sin(2 * Math.PI * this.angle / 360);

  bullet.x = this.x;
  bullet.y = this.y;

  bullet.angle = this.angle;

  return bullet;
}