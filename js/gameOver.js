function GameOver(render) {
  this.render = render;
}

GameOver.prototype.draw = function() {
  var options;

  this.render.resetCanvas();

  options = {font: '4em hyperspace',
            fillStyle: '#FFFFFF',
            textAlign: 'center',
            textBaseline: 'middle'};

  this.render.drawText('GAME OVER', 500, 300, options);

  options.font = '1.5em hyperspace';
  this.render.drawText('THANKS FOR PLAYING ASTEROIDS', 500, 400, options);
}