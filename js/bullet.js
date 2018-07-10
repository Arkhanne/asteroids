function Bullet() {
  this.x = 0;
  this.y = 0;
  this._speed = 10;
  this.angle = 0;
  // this.life = 125;
  this.alive = true;
}

Bullet.prototype.newPosition = function() {
  this.x += this._speed * Math.cos(2 * Math.PI * this.angle / 360);
  this.y += this._speed * Math.sin(2 * Math.PI * this.angle / 360);
  
  if (this.x > 1024) {
    this.x = 0;
  }

  if (this.y > 768) {
    this.y = 0;
  }

  if (this.x < 0) {
    this.x = 1024;
  }

  if (this.y < 0) {
    this.y = 768;
  }
}

Bullet.prototype.initLive = function() {
  setTimeout(this._kill.bind(this), 2500);
}

Bullet.prototype._kill = function() {
  this.alive = false;
}