function Game(render) {
  this._INIT_STATE = 0;
  this._GAME_STATE = 1
  this._END_STATE = 2;

  this._render = render;
  this._nowPlaying = false;
  this._nowGameOver = false;
  this._keys = {arrowRight: false,
                arrowLeft: false};
  this._gameInterval;

  this._ship = new Ship();
  this._asteroids = [new Asteroid];
}

Game.prototype.init = function() {
  this._assignControlsToKeys();
  this._drawSplash();
}

Game.prototype._beginGame = function() {
  this._render.drawGame(this._ship);
  this._changeState(this._GAME_STATE);
  this._update();
}

Game.prototype._gameOver = function() {
  this._changeState(this._END_STATE);
  clearInterval(this._gameInterval);
  this._gameInterval = undefined;
  this._render.drawGameOver();
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
  this._render.drawSplash();
  this._changeState(this._INIT_STATE);
}

Game.prototype._update = function() {
  if (this._nowPlaying) {
    if (this._keys.arrowRight) {
      this._ship.rotateRight();
    }
  
    if (this._keys.arrowLeft) {
      this._ship.rotateLeft();
    }
  
    this._render.drawShip(this._ship);
    this._render.drawAsteroid(this._asteroids[0]);
    this._gameInterval = window.requestAnimationFrame(this._update.bind(this));
  }
}

Game.prototype._assignControlsToKeys = function () {
  window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 27: //esc
        if (this._nowPlaying) {
          this._gameOver();
        }
        break;

      case 32: //space
        if (!this._nowPlaying && !this._nowGameOver) {
          this._beginGame();
        } else if (this._nowGameOver) {
          this._drawSplash();
        }
        break;

      case 38: //arrow up
        break;

      case 40: //arror down
        break;

      case 37: //arror left
        this._keys.arrowLeft = true;
        break;

      case 39: //arrow right
        this._keys.arrowRight = true;
        break; 
    }
  }.bind(this));

  window.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
      case 38: //arrow up
        break;

      case 40: //arror down
        break;

      case 37: //arror left
        this._keys.arrowLeft = false;
        break;

      case 39: //arrow right
        this._keys.arrowRight = false;
        break; 
    }
  }.bind(this));
}