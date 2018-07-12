function Game(render) {
  this._INIT_STATE = 0;
  this._GAME_STATE = 1
  this._END_STATE = 2;

  this._render = render;
  this._nowPlaying = false;
  this._nowGameOver = false;
  this._canShoot = false;
  this._timeToShoot = 0;
  this._keys = {arrowRight: false,
                arrowLeft: false};
  this._gameInterval;
  this._removeBulletIndexes = [];
  this._removeAsteroidIndexes = [];
  this._removeShip = false;
  this._score = 0;
  this._scoreToDraw = 0;

  this._ship = new Ship();
  this._asteroids = [];
  this._bullets = [];
}

Game.prototype.init = function() {
  this._assignControlsToKeys();
  this._drawSplash();
}

Game.prototype._beginGame = function() {
  this._canShoot = false;
  this._removeBulletIndexes = [];
  this._removeAsteroidIndexes = [];
  this._removeShip = false;
  this._score = 0;
  this._scoreToDraw = 0;
  this._ship = new Ship();
  this._asteroids = [];
  this._bullets = [];

  this._addAsteroid();
  this._drawGame();
  this._changeState(this._GAME_STATE);
  this._update();
}

Game.prototype._addAsteroid = function(parentAsteroid) {
  if (parentAsteroid) {
    this._asteroids.push(new Asteroid(parentAsteroid.x, parentAsteroid.y, parentAsteroid.size + 1));
  } else {
    this._asteroids.push(new Asteroid(null, null, 1));
  }
}

Game.prototype._drawGame = function() {
  if (this._scoreToDraw > 0) {
    this._score+=5
    this._scoreToDraw-=5;
  }

  this._render.drawGame(this._ship, this._asteroids, this._bullets, this._removeBulletIndexes, this._removeAsteroidIndexes, this._removeShip, this._score);
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
        this._asteroids.forEach(function(asteroid) {
          asteroid.newPosition();
        })
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
    var asteroidsNumber = this._asteroids.length;
    for (var bulletIndex = 0; bulletIndex < this._bullets.length; bulletIndex++) {
      var bullet = this._bullets[bulletIndex];
      
      for (var asteroidIndex = 0; asteroidIndex < asteroidsNumber; asteroidIndex++) {
        var asteroid = this._asteroids[asteroidIndex];
        
        if ((bullet.x > asteroid.x - 32 / asteroid.size) && (bullet.x < asteroid.x + 112 / asteroid.size) && (bullet.y > asteroid.y) && (bullet.y < asteroid.y + 144 / asteroid.size)
            || (bullet.x + 3 > asteroid.x - 32 / asteroid.size) && (bullet.x + 3 < asteroid.x + 112 / asteroid.size) && (bullet.y + 3 > asteroid.y) && (bullet.y + 3 < asteroid.y + 144 / asteroid.size)) {
          if (this._removeBulletIndexes.indexOf(bulletIndex) === -1) {
            this._removeBulletIndexes.push(bulletIndex);
          }

          if (this._removeAsteroidIndexes.indexOf(asteroidIndex) === -1) {
            this._removeAsteroidIndexes.push(asteroidIndex);

            if (this._asteroids[asteroidIndex].size < 5) {
              this._addAsteroid(this._asteroids[asteroidIndex]);
              this._addAsteroid(this._asteroids[asteroidIndex]);
              this._addAsteroid(this._asteroids[asteroidIndex]);
            }
          }
        }
      }
    }

    // Asteroid collisions
    for (var asteroidIndex = 0; asteroidIndex < this._asteroids.length; asteroidIndex++) {
      var asteroid = this._asteroids[asteroidIndex];
      
      if ((this._ship.x > asteroid.x - 32 / asteroid.size) && (this._ship.x < asteroid.x + 112 / asteroid.size) && (this._ship.y > asteroid.y) && (this._ship.y < asteroid.y + 144 / asteroid.size)
          || (this._ship.x + 26 > asteroid.x - 32 / asteroid.size) && (this._ship.x + 26 < asteroid.x + 112 / asteroid.size) && (this._ship.y + 18 > asteroid.y) && (this._ship.y + 18 < asteroid.y + 144 / asteroid.size)) {
        this._removeShip = true;

        if (this._removeAsteroidIndexes.indexOf(asteroidIndex) === -1) {
          asteroid.points = 0; 
          this._removeAsteroidIndexes.push(asteroidIndex);
        }
      }
    }

    // Lives control
    if (this._removeShip) {
      this._ship.lives--;

      if (this._ship.lives > 0) {
        this._removeShip = false;
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
      if (this._asteroids[this._removeAsteroidIndexes[i]]) {
        this._increaseScore(this._asteroids[this._removeAsteroidIndexes[i]].points);
        this._asteroids.splice(this._removeAsteroidIndexes[i], 1);
      }
    }
    this._removeAsteroidIndexes = [];

    if (this._removeShip) {
      this._gameOver();
    }

    if (this._asteroids.length === 0) {
      this._addAsteroid();
    }

    this._gameInterval = window.requestAnimationFrame(this._update.bind(this));
  }
}

Game.prototype._shoot = function() {
  var length;

  if (this._canShoot) {
    length = this._bullets.push(this._ship.shoot());
    this._bullets[length - 1].initLive();

    this._canShoot = false
    this._timeToShoot = this._TIME_TO_SHOOT;
  } else {
    this._timeToShoot--;
    this._canShoot = this._timeToShoot === 0;
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

  Game.prototype._increaseScore = function(points) {
    this._scoreToDraw += points;
  }

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