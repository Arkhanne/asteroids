function Ship() {
  this.MAX_LIVES = 1;
  this.x = 509;
  this.y = 375;
  this.angle = 0;
  this.lives = this.MAX_LIVES;
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
  var x = this.x + 13 + (13 * Math.cos(this.angle * 2 * Math.PI / 360));
  var y = this.y + 9 + (13 * Math.sin(this.angle * 2 * Math.PI / 360));
  
  return new Bullet(x, y, this.angle);
}