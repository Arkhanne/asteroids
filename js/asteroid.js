function Asteroid() {
  this.x = Math.floor(Math.random() * 1000);
  this.y = Math.floor(Math.random() * 700);
  this._angle = Math.floor(Math.random() * 360);
  this._moveAngle = 0;
  this.rotationAngle = 0;
  this._rotationDirection = Math.random() >= 0.5; // true: right    false: left
  this._speed = 1;
}

Asteroid.prototype.newPosition = function() {
  this._angle += this._moveAngle * Math.PI / 180;
  this.x += this._speed * Math.sin(this._angle);
  this.y -= this._speed * Math.cos(this._angle);

  if (this.x - 32 > 1024) {
    this.x = 0 - 112;
  }

  if (this.y > 768) {
    this.y = 0 - 144;
  }

  if (this.x + 112 < 0) {
    this.x = 1024 + 32
  }

  if (this.y + 144 < 0) {
    this.y = 768;
  }

  if (this._rotationDirection) {
    this._rotateRight();
  } else {
    this._rotateLeft();
  }
}

Asteroid.prototype._rotateRight = function() {
  this.rotationAngle += 0.5;
  if (this.rotationAngle > 360) {
    this.rotationAngle = 0;
  }
}

Asteroid.prototype._rotateLeft = function() {
  this.rotationAngle -= 0.5;
  if (this.rotationAngle > 360) {
      this.rotationAngle = 0;
  }
}