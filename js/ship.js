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
