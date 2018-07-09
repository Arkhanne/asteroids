function Game(render) {
  this.render = render;

  this._INIT_STATE = 0;
  this._GAME_STATE = 1
  this._END_STATE = 2;

  this._intervalID = undefined;
  this._nowPlaying = false;
  this._nowGameOver = false;
}

Game.prototype.init = function() {
  this._assignControlsToKeys();
  this._drawSplash();
}

Game.prototype._beginGame = function() {
  this.render.resetCanvas();
  this._changeState(this._GAME_STATE);
}

Game.prototype._gameOver = function() {
  this._intervalID = undefined;
  this.render.drawGameOver();
  this._changeState(this._END_STATE);
}

Game.prototype._changeState = function(newState) {
  switch (newState) {
    case this._INIT_STATE:
      this._nowPlaying = false;
      this._nowGameOver = false;
      break;

    case this._GAME_STATE:
      this._nowPlaying = true;
      this._nowGameOver = false;
      break;

    case this._END_STATE:
      this._nowPlaying = false;
      this._nowGameOver = true;
      break;
  }
} 

Game.prototype._drawSplash = function() {
  this.render.drawSplash();
  this._changeState(this._INIT_STATE);
}

Game.prototype._assignControlsToKeys = function () {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 27: //ESC
        if (this._nowPlaying) {
          this._gameOver();
        }
        break;

      case 32: //SPACE
        if (!this._nowPlaying && !this._nowGameOver) {
          this._beginGame();
        } else if (this._nowGameOver) {
          this._drawSplash();
        }
        break;
    }
  }.bind(this);
}