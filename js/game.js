function Game(render) {
  this._INIT_STATE = 0;
  this._GAME_STATE = 1
  this._END_STATE = 2;
  this._TIME_TO_SHOOT = 200;
  this._EXTRA_LIVE_BORDER = 10000;

  this._render = render;
  this._nowPlaying = false;
  this._nowGameOver = false;
  this._canShoot = false;
  this._firstShoot = true;
  this._keys = {arrowRight: false,
                arrowLeft: false};
  this._gameInterval;
  this._removeBulletIndexes = [];
  this._removeAsteroidIndexes = [];
  this._removeShip = false;
  this._score = 0;
  this._scoreToDraw = 0;
  this._level = 1;
  this._mute = false;
  this._state = this._INIT_STATE;
  this._helpVisible = false;
  this._playerName = "---"
  this._hallOfFame = JSON.parse(localStorage.getItem('highScore') || '[]');
  this._hallVisible = false;
  this._nameLetters = -1;

  this._ship = new Ship();
  this._asteroids = [];
  this._bullets = [];

  this.audioIntro = new Audio('./audio/Splash.mp3');
  this.audioGameOver = new Audio('./audio/GameOver.mp3');
  this.audioBangSmall = new Audio('./audio/bangSmall.wav');
  this.audioBangLarge = new Audio('./audio/bangLarge.wav');
  this.audioBackground = new Audio('./audio/Kumiku.mp3');
  this.audioExtraLive = new Audio('./audio/extraShip.wav');
}

Game.prototype.init = function() {
  this._assignControlsToKeys();
  this._drawSplash();
  document.getElementsByTagName('body')[0].style.cursor = 'none';
}

Game.prototype._beginGame = function() {
  this._canShoot = true;
  this._firstShoot = true;
  this._removeBulletIndexes = [];
  this._removeAsteroidIndexes = [];
  this._removeShip = false;
  this._score = 0;
  this._scoreToDraw = 0;
  this._ship = new Ship();
  this._asteroids = [];
  this._bullets = [];
  this._level = 1;
  this._helpVisible = false;
  this._hallVisible = false;
  this._nameLetters = -1;

  this._addAsteroid();
  this._drawGame();
  this._changeState(this._GAME_STATE);

  this.audioIntro.pause();
  this.audioBackground.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  this.audioBackground.play();

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
    this._score += 5
    this._scoreToDraw -= 5;
  }

  if (this._score > 0 && this._score % this._EXTRA_LIVE_BORDER === 0) {
    this._increaseScore(5);
    this._ship.lives++;
    this._score += 5;
    this._scoreToDraw -=5;
    this._noExtraLive = true;
    this.audioExtraLive.play();
  }

  this._render.drawGame(this._ship, this._asteroids, this._bullets, this._removeBulletIndexes, this._removeAsteroidIndexes, this._removeShip, this._score);
}

Game.prototype._gameOver = function() {
  this.audioBackground.pause();
  this.audioGameOver.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  this.audioGameOver.play();  
  this._changeState(this._END_STATE);
  this._saveHallOfFame(this._playerName, this._score);
  clearInterval(this._gameInterval);
  this._gameInterval = undefined;
  this._render.drawGameOver();
}

Game.prototype._changeState = function(newState) {
  this._state = newState;

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
  this.audioGameOver.pause();
  this.audioIntro.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  this.audioIntro.play();
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

    this._ship.newPosition();
  
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
            this.audioBangSmall.play();

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
        this.audioBangLarge.play();

        if (this._removeAsteroidIndexes.indexOf(asteroidIndex) === -1) {
          asteroid.points = 0; 
          this._removeAsteroidIndexes.push(asteroidIndex);
        }
      }
    }

    // Lives control
    if (this._removeShip) {
      this._ship.lives--;
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

    if (this._asteroids.length === 0) {
      if (this._removeShip) {
        this._addAsteroid();
      } else {
        this._level++;
        for (var i = 0; i< this._level; i++) {
          this._addAsteroid();
        }  
      }
    }

    if (this._ship.lives > 0) {
      this._removeShip = false;
    }

    if (this._removeShip) {
      this._gameOver();
    }

    this._gameInterval = window.requestAnimationFrame(this._update.bind(this));
  }
}

Game.prototype._shoot = function() {
  var length;

  if (this._canShoot && !this._firstShoot) {
    length = this._bullets.push(this._ship.shoot());
    this._bullets[length - 1].initLive();
    this._canShoot = false;

    setTimeout(this._setCanShoot.bind(this), this._TIME_TO_SHOOT);
  } else if(this._firstShoot) {
    this._canShoot = true;
    this._firstShoot = false;
  }
}

Game.prototype._setCanShoot = function () {
  this._canShoot = true;
}

Game.prototype._muteControl = function() {
  if (this._mute) {
    switch(this._state) {
      case this._INIT_STATE:
        this.audioIntro.play();
        break;

      case this._GAME_STATE:
        this.audioBackground.play();
        break;

      case this._END_STATE:
        this.audioGameOver.play();
        break;
    }
    this._mute = false;
  } else {
    this.audioIntro.pause();
    this.audioGameOver.pause();
    this.audioBackground.pause();
    this._mute = true;
  }
}

Game.prototype._increaseScore = function(points) {
  this._scoreToDraw += points;
}

Game.prototype._saveHallOfFame = function(name, score) {
  this._hallOfFame.push({name: name, score: score});
  localStorage.setItem('highScore', JSON.stringify(this._hallOfFame));
 }

Game.prototype._getHallOfFame = function () {
  var highScore = JSON.parse(localStorage.getItem('highScore'));
}

Game.prototype._assignControlsToKeys = function () {
  window.addEventListener('keydown', function (e) {
    if (this._nameLetters === -1) {
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
  
        case 70: //F
          if (this._state === this._INIT_STATE) {
            this._hallVisible = !this._hallVisible;
            this._render.drawHallOfFame(this._hallOfFame, this._hallVisible);  
          }
          break;
  
        case 72: //H
          if (this._state === this._INIT_STATE) {
            this._helpVisible = !this._helpVisible;
            this._render.drawHelp(this._helpVisible);
          }
          break;
  
        case 78: //N
          if (this._state === this._INIT_STATE) {
            this._nameLetters = 0;
            this._playerName = '';
            this._render.drawNameEntry();
          } 
          break;
  
        case 83: //S
          this._muteControl();
          break;
      }  
    } else {
      if (this._nameLetters < 3) {
        var char = String.fromCharCode(e.keyCode);
        this._render.drawNameLetter(char, this._nameLetters);
        this._playerName += char;
        this._nameLetters++
      } else {
        this._nameLetters = -1;
      }

      if (this._nameLetters === 3) {
        this._nameLetters = -1;
        this._render.clearNameEnter();
      }
    }
  }.bind(this));

  window.addEventListener('keyup', function (e) {
    if (this._nameLetters === -1) {
      switch (e.keyCode) {
        case 32: //space
            if (this._nowPlaying) {
              this._shoot();
            }
          break;
  
        case 38: //arrow up
          this._ship.increaseSpeed();
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
    }
  }.bind(this));
}