function Game() {
  this.gameOver = false;
}

Game.prototype.init = function() {
  var ctx = document.querySelector('canvas').getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 768);

  setInterval(this._gameOver.bind(this), 4000);
}

Game.prototype._gameOver = function() {
  this.gameOver = true;
}