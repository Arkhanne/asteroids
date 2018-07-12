function Ship() {
  this._MAX_LIVES = 3;
  this._MAX_SPEED = 5;
  this.x = 509;
  this.y = 375;
  this.angle = 0;
  this._moveAngle = 0;
  this.lives = this._MAX_LIVES;
  this.speed = 0;
}

Ship.prototype.rotateRight = function() {
  this._incrementAngle();

  if (this.speed === 0) {
    this._moveAngle = this.angle;
  }
}

Ship.prototype.rotateLeft = function() {
  this._decrementAngle();

  if (this.speed === 0) {
    this._moveAngle = this.angle;
  }
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

Ship.prototype.increaseSpeed = function() {
  if (this.angle === this._moveAngle) {
    if (this.speed < this._MAX_SPEED) {
      this.speed += 1;
    }  
  } else {
    this._moveAngle = this.angle;
  }
}

Ship.prototype.newPosition = function() {
  if (this.speed > 0) {
    this.x += this.speed * Math.cos(this._moveAngle * 2 * Math.PI / 360);
    this.y += this.speed * Math.sin(this._moveAngle * 2 * Math.PI / 360);
  
    if (this.x > 1024) {
      this.x = 0 - 26;
    }
  
    if (this.y > 768) {
      this.y = 0 - 18;
    }
  
    if (this.x + 26 < 0) {
      this.x = 1024 + 26
    }
  
    if (this.y + 18 < 0) {
      this.y = 768;
    }
  }
}