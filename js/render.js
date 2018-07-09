function Render(ctx) {
  this._ctx = ctx;
  this._mainTitle = {font: '4em hyperspace',
                    fillStyle: '#FFFFFF',
                    textAlign: 'center',
                    textBaseline: 'middle'};
  this._subTitle = {font: '1.5em hyperspace',
                    fillStyle: '#FFFFFF',
                    textAlign: 'center',
                    textBaseline: 'middle'};
}

Render.prototype._resetCanvas = function() {
  this._ctx.fillStyle = '#000000';
  this._ctx.fillRect(0, 0, 1024, 768);
}

Render.prototype.drawText = function(text, x, y, options) {
  this._ctx.font = options.font ? options.font : this._ctx.font;
  this._ctx.fillStyle = options.fillStyle ? options.fillStyle : this._ctx.fillStyle;
  this._ctx.textAlign = options.textAlign ? options.textAlign : this._ctx.textAlign;
  this._ctx.textBaseline = options.textBaseline ? options.textBaseline : this._ctx.textBaseline;

  this._ctx.fillText(text, x, y);
}

Render.prototype.drawSplash = function() {
  this._resetCanvas();
  this.drawText('ASTEROIDS', 500, 300, this._mainTitle);
  this.drawText('PRESS SPACE TO PLAY', 500, 400, this._subTitle);
}

Render.prototype.drawGameOver = function() {
  this._resetCanvas();
  this.drawText('GAME OVER', 500, 300, this._mainTitle);
  this.drawText('THANKS FOR PLAYING ASTEROIDS', 500, 400, this._subTitle);
}

Render.prototype.drawGame = function(ship) {
  this._resetCanvas();
  this.drawShip(ship);
}

Render.prototype.drawShip = function(ship) {
  // Canvas rotation
  this._resetCanvas();
  this._ctx.save();                
  this._ctx.translate(ship.x + 13, ship.y + 9);
  this._ctx.rotate(this._convertToRadians(ship.angle));
  this._ctx.translate(-(ship.x + 13), -(ship.y + 9));
  this._ctx.strokeStyle = '#FFFFFF';

  // Draw ship
  this._ctx.beginPath();
  this._ctx.moveTo(ship.x, ship.y);
  this._ctx.lineTo(ship.x + 26, ship.y + 9);
  this._ctx.lineTo(ship.x, ship.y + 18);
  this._ctx.moveTo(ship.x + 4, ship.y + 1);
  this._ctx.lineTo(ship.x + 4, ship.y + 17);
  this._ctx.stroke();

  // Restore canvas
  this._ctx.restore();
}

Render.prototype.drawAsteroid = function(asteroid) {
  // Draw asteroid
  this._ctx.strokeStyle = '#FFFFFF';
  this._ctx.beginPath();
  //this._ctx.rect(asteroid.x, asteroid.y, 100, 100);
  var x = 2;
  this._ctx.moveTo(asteroid.x, asteroid.y);
  this._ctx.lineTo(asteroid.x + 80, asteroid.y);
  this._ctx.lineTo(asteroid.x + 112, asteroid.y + 32);
  this._ctx.lineTo(asteroid.x + 112, asteroid.y + 72);
  this._ctx.lineTo(asteroid.x + 96, asteroid.y + 88);
  this._ctx.lineTo(asteroid.x + 96, asteroid.y + 128);
  this._ctx.lineTo(asteroid.x + 80, asteroid.y + 144);
  this._ctx.lineTo(asteroid.x + 40, asteroid.y + 144);
  this._ctx.lineTo(asteroid.x + 24, asteroid.y + 128);
  this._ctx.lineTo(asteroid.x - 16, asteroid.y + 128);
  this._ctx.lineTo(asteroid.x - 32, asteroid.y + 112);
  this._ctx.lineTo(asteroid.x - 32, asteroid.y + 72);
  this._ctx.lineTo(asteroid.x, asteroid.y + 40);
  this._ctx.closePath();
  this._ctx.stroke();
}

Render.prototype._convertToRadians = function(degree) {
  return degree * (Math.PI / 180);
}