function Splash() {
  
}

Splash.prototype.draw = function() {
  var ctx = document.querySelector('canvas').getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 768);

  ctx.font = '4em hyperspace';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ASTEROIDS', 500, 300);

  ctx.font = '1.5em hyperspace';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PRESS SPACE TO PLAY', 500, 400);

  console.log('Splash');
}