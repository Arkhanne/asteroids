function Asteroid(x, y, size) {
  this.x = x;
  this.y = y;
  this._angle = Math.floor(Math.random() * 360);
  this._moveAngle = 0;
  this.rotationAngle = 0;
  this._rotationDirection = Math.random() >= 0.5; // true: right    false: left
  this._speed = 1;
  this.points = 25;
  this.size = size;

  this._initPosition();
  this._setPoints();
}

Asteroid.prototype._initPosition = function() {
  if (this.x === null && this.y === null) {
    do {
      this.x = Math.floor(Math.random() * 1000);
      this.y = Math.floor(Math.random() * 700);
    } while(this.x > 300 && this.x < 700 && this.y > 150 && this.y < 550);
  }
}

Asteroid.prototype._setPoints = function() {
  switch(this.size) {
    case 1:
      this.points = 25;
      break;

    case 2:
      this.points = 35;
      break;

    case 3:
      this.points = 45;
      break;

    case 4:
      this.points = 50;
      break;

    default:
      this.points = 25;
      break;
  }
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