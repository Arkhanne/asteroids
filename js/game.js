function Game(render, endGame) {
  this.render = render;
  this.endGame = endGame;
  
  this._intervalID = undefined;
}

Game.prototype.init = function() {
  this.render.resetCanvas();
  this._intervalID = setInterval(this._gameOver.bind(this), 4000);
}

Game.prototype._gameOver = function() {
  clearInterval(this._intervalID);
  this._intervalID = undefined;
  endGame();
}