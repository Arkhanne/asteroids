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
  this._smallText = {font: '1em hyperspace',
                    fillStyle: '#FFFFFF',
                    textAlign: 'left',
                    textBaseline: 'middle'};
  this._smallTextRight = {font: '1em hyperspace',
                    fillStyle: '#FFFFFF',
                    textAlign: 'right',
                    textBaseline: 'middle'};
  this._score = {font: '3em hyperspace',
                    fillStyle: '#999999',
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
  this.drawText('Press <H> to help', 800, 750, this._smallText);
  this.drawText('Press <F> to Hall of Fame', 50, 750, this._smallText);
  this.drawText('Press <N> to enter your name', 400, 750, this._smallText);
}

Render.prototype.drawHelp = function(visible) {
  if (visible) {
    this.drawText('<LEFT>  --> Rotate left', 700, 570, this._smallText);
    this.drawText('<RIGHT> --> Rotate right', 700, 600, this._smallText);
    this.drawText('<UP>    --> Increase speed', 700, 630, this._smallText);
    this.drawText('<SPACE> --> Shoot', 700, 660, this._smallText);
    this.drawText('<S>     --> Music ON/OFF', 700, 690, this._smallText);
  } else {
    this._ctx.fillStyle = '#000000';
    this._ctx.fillRect(650, 550, 310, 150);
  }
}

Render.prototype.drawHallOfFame = function(hallOfFame, visible) {
  if (visible) {
    hallOfFame.sort(function(a, b) {
      if (a.score > b.score) {
        return -1;
      }

      if (a.score < b.score) {
        return 1;
      }

      return 0;
    });

    for (var i = 0; i < (hallOfFame.length > 7 ? 7 : hallOfFame.length); i++) {
      this.drawText(i + 1 + '. ' + hallOfFame[i].name, 50, 550 + i * 20, this._smallText);
      this.drawText(hallOfFame[i].score, 200, 550 + i * 20, this._smallTextRight);
    }
  } else {
    this._ctx.fillStyle = '#000000';
    this._ctx.fillRect(40, 500, 200, 230);
  }
}

Render.prototype.drawGameOver = function() {
  this._resetCanvas();
  this.drawText('GAME OVER', 500, 300, this._mainTitle);
  this.drawText('THANKS FOR PLAYING ASTEROIDS', 500, 380, this._subTitle);
  this.drawText('PRESS INTRO TO RESTART', 500, 470, this._subTitle);
}

Render.prototype.drawGame = function(ship, asteroids, bullets, removeBulletIndexes, removeAsteroidIndexes, removeShip, score, lives) {
  var removeBullet = false;
  var removeAsteroid = false;

  this._resetCanvas(); // Borro el estado del canvas
  
  // Draw ship
  this._ctx.save(); // Guardo el estado actual del canvas
  this.drawShip(ship, removeShip);
  this._ctx.restore(); // Restauro el estado del canvas guardado
  
  // Draw asteroid

  for (var i = 0; i < asteroids.length; i++) {
    if (removeAsteroidIndexes.indexOf(i) > -1) {
      removeAsteroid = true;
    } else {
      removeAsteroid = false;
    }

    this._ctx.save(); // Guardo el estado actual del canvas
    this.drawAsteroid(asteroids[i], removeAsteroid);
    this._ctx.restore(); // Restauro el estado del canvas guardado
  }

  // Draw bullet
  if (bullets) {
    if (bullets.length > 0) {
      for (var i = 0; i < bullets.length; i++) {
        if (removeBulletIndexes.indexOf(i) > -1) {
          removeBullet = true;
        } else {
          removeBullet = false;
        }

        this.drawBullet(ship, bullets[i], removeBullet);
      }
    }
  }

  // Draw score
  this.drawText(score, 200, 25, this._score);

  // Draw lives
  this._removeLives(ship.MAX_LIVES);
  this._drawLives(ship.lives);
}

Render.prototype.drawNameEntry = function() {
  this.drawText('NAME:', 470, 600, this._subTitle);
}

Render.prototype.drawNameLetter = function(letter, position) {
  this.drawText(letter, 520 + position * 15, 600, this._subTitle);
}

Render.prototype.clearNameEnter = function() {
  this._ctx.fillStyle = '#000000';
  this._ctx.fillRect(400, 500, 200, 200);
}

Render.prototype._canvasRotation = function(x, y, angle) {
  this._ctx.translate(x, y); // Traslado el eje 0,0
  this._ctx.rotate(this._convertToRadians(angle)); // Roto el canvas
  this._ctx.translate(-x, -y); // Traslado el eje 0,0 a su posición original
}

Render.prototype.drawShip = function(ship, removeShip) {
  // Canvas rotation
  this._canvasRotation(ship.x + 13, ship.y + 9, ship.angle);        

  // Draw ship
  if (removeShip) {
    this._ctx.strokeStyle = '#000000';
  } else {
    this._ctx.strokeStyle = '#FFFFFF';
  }

  this._ctx.beginPath();
  this._ctx.moveTo(ship.x, ship.y);
  this._ctx.lineTo(ship.x + 26, ship.y + 9);
  this._ctx.lineTo(ship.x, ship.y + 18);
  this._ctx.moveTo(ship.x + 4, ship.y + 1);
  this._ctx.lineTo(ship.x + 4, ship.y + 17);
  this._ctx.stroke();
}

Render.prototype.drawAsteroid = function(asteroid, removeAsteroid) {
  // Canvas rotation
  this._canvasRotation(asteroid.x + 40 / asteroid.size, asteroid.y + 77 / asteroid.size, asteroid.rotationAngle); 

  // Draw asteroid
  if (removeAsteroid) {
    this._ctx.strokeStyle = '#000000';
  } else {
    this._ctx.strokeStyle = '#FFFFFF';
  }

  this._ctx.beginPath();
  this._ctx.moveTo(asteroid.x, asteroid.y);
  this._ctx.lineTo(asteroid.x + 80 / asteroid.size, asteroid.y);
  this._ctx.lineTo(asteroid.x + 112 / asteroid.size, asteroid.y + 32 / asteroid.size);
  this._ctx.lineTo(asteroid.x + 112 / asteroid.size, asteroid.y + 72 / asteroid.size);
  this._ctx.lineTo(asteroid.x + 96 / asteroid.size, asteroid.y + 88 / asteroid.size);
  this._ctx.lineTo(asteroid.x + 96 / asteroid.size, asteroid.y + 128 / asteroid.size);
  this._ctx.lineTo(asteroid.x + 80 / asteroid.size, asteroid.y + 144 / asteroid.size);
  this._ctx.lineTo(asteroid.x + 40 / asteroid.size, asteroid.y + 144 / asteroid.size);
  this._ctx.lineTo(asteroid.x + 24 / asteroid.size, asteroid.y + 128 / asteroid.size);
  this._ctx.lineTo(asteroid.x - 16 / asteroid.size, asteroid.y + 128 / asteroid.size);
  this._ctx.lineTo(asteroid.x - 32 / asteroid.size, asteroid.y + 112 / asteroid.size);
  this._ctx.lineTo(asteroid.x - 32 / asteroid.size, asteroid.y + 72 / asteroid.size);
  this._ctx.lineTo(asteroid.x, asteroid.y + 40 / asteroid.size);
  this._ctx.closePath();
  this._ctx.stroke();
}

Render.prototype.drawBullet = function(ship, bullet, removeBullet) {
  if (removeBullet) {
    this._ctx.fillStyle = '#000000';
  } else {
    this._ctx.fillStyle = '#FFFFFF';
  }
  
  this._ctx.fillRect(bullet.x, bullet.y, 3, 3);
}

Render.prototype._convertToRadians = function(degree) {
  return degree * (Math.PI / 180);
}

Render.prototype._removeLives = function(numberOfLives) {
  for (var i = 0; i < numberOfLives; i++) {
    this._drawLive(i, '#000000');
  }
}

Render.prototype._drawLives = function(numberOfLives) {
  for (var i = 0; i < numberOfLives; i++) {
    this._drawLive(i, '#BBBBBB');
  }
}

Render.prototype._drawLive = function(position, color) {
  var x = 150 + position * 25;
  var y = 70

  this._ctx.save(); // Guardo el estado actual del canvas
  
  // Canvas rotation
  this._canvasRotation(x + 13, y + 9, 270); 

  // Draw live
  this._ctx.strokeStyle = color;
  this._ctx.beginPath();
  this._ctx.moveTo(x, y);
  this._ctx.lineTo(x + 26, y + 9);
  this._ctx.lineTo(x, y + 18);
  this._ctx.moveTo(x + 4, y + 1);
  this._ctx.lineTo(x + 4, y + 17);
  this._ctx.stroke();

  this._ctx.restore(); // Restauro el estado del canvas g
}