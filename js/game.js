function Game(render) {
  this._INIT_STATE = 0;
  this._GAME_STATE = 1
  this._END_STATE = 2;

  this._render = render;
  this._nowPlaying = false;
  this._nowGameOver = false;
  this._canShoot = false;
  this._keys = {arrowRight: false,
                arrowLeft: false};
  this._gameInterval;
  this._removeBulletIndexes = [];
  this._removeAsteroidIndexes = [];
  this._removeShip = false;

  this._ship = new Ship();
  this._asteroids = [];
  this._bullets = [];
}

Game.prototype.init = function() {
  this._assignControlsToKeys();
  this._drawSplash();
}

Game.prototype._beginGame = function() {
  this._removeShip = false;
  this._canShoot = false;
  this._asteroids.push(new Asteroid);
  this._drawGame();
  this._changeState(this._GAME_STATE);
  this._update();
}

Game.prototype._drawGame = function() {
  this._render.drawGame(this._ship, this._asteroids, this._bullets, this._removeBulletIndexes, this._removeAsteroidIndexes, this._removeShip);
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
    // Ship
    if (this._keys.arrowRight) {
      this._ship.rotateRight();
    }
  
    if (this._keys.arrowLeft) {
      this._ship.rotateLeft();
    }
  
    // Asteroids
    if (this._asteroids) {
      if (this._asteroids.length > 0) {
        this._asteroids[0].newPosition();
      }
    }

    // Bullets
    if (this._bullets) {
      if (this._bullets.length > 0) {
        for (var i = 0; i < this._bullets.length; i++) {
          if (this._bullets[i].alive) {
            this._bullets[i].newPosition();
          } else {
            this._removeBulletIndexes.push(i);
          }
        }
      }
    }

    // Bullet collisions
    for (var bulletIndex = 0; bulletIndex < this._bullets.length; bulletIndex++) {
      var bullet = this._bullets[bulletIndex];
      
      for (var asteroidIndex = 0; asteroidIndex < this._asteroids.length; asteroidIndex++) {
        var asteroid = this._asteroids[asteroidIndex];
        
        if ((bullet.x > asteroid.x - 32) && (bullet.x < asteroid.x + 112) && (bullet.y > asteroid.y) && (bullet.y < asteroid.y + 144)) {
          if (this._removeBulletIndexes.indexOf(bulletIndex) === -1) {
            this._removeBulletIndexes.push(bulletIndex);
          }

          if (this._removeAsteroidIndexes.indexOf(asteroidIndex) === -1) {
            this._removeAsteroidIndexes.push(asteroidIndex);
          }
        }
      }
    }

    // Asteroid collisions
    for (var asteroidIndex = 0; asteroidIndex < this._asteroids.length; asteroidIndex++) {
      var asteroid = this._asteroids[asteroidIndex];
      
      if ((this._ship.x > asteroid.x - 32) && (this._ship.x < asteroid.x + 112) && (this._ship.y > asteroid.y) && (this._ship.y < asteroid.y + 144)) {
        this._removeShip = true;

        if (this._removeAsteroidIndexes.indexOf(asteroidIndex) === -1) {
          this._removeAsteroidIndexes.push(asteroidIndex);
        }
      }
    }

    // Render
    this._drawGame();

    // Remove bullets
    for (var i = 0; i < this._removeBulletIndexes.length; i++) {
      this._bullets.splice(this._removeBulletIndexes[i], 1);
    }
    this._removeBulletIndexes = [];

    // Remove asteroids
    for (var i = 0; i < this._removeAsteroidIndexes.length; i++) {
      this._asteroids.splice(this._removeAsteroidIndexes[i], 1);
    }
    this._removeAsteroidIndexes = [];

    if (this._removeShip) {
      this._gameOver();
    }

    this._gameInterval = window.requestAnimationFrame(this._update.bind(this));
  }
}

Game.prototype._shoot = function() {
  var length;

  length = this._bullets.push(this._ship.shoot());
  this._bullets[length - 1].initLive();
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
      case 32: //space
        if (!this._canShoot) {
         this. _canShoot = true;
        } else {
          if (this._nowPlaying) {
            this._shoot();
          }
        }
        break;

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