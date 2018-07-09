function Splash(render) {
  this.render = render;
}

Splash.prototype.draw = function() {
  var options;

  this.render.resetCanvas();

  options = {font: '4em hyperspace',
            fillStyle: '#FFFFFF',
            textAlign: 'center',
            textBaseline: 'middle'};
  
  this.render.drawText('ASTEROIDS', 500, 300, options);

  options.font = '1.5em hyperspace';
  this.render.drawText('PRESS SPACE TO PLAY', 500, 400, options);
}