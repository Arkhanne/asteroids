function Render(ctx) {
  this.ctx = ctx;
}

Render.prototype.resetCanvas = function() {
  this.ctx.fillStyle = '#000000';
  this.ctx.fillRect(0, 0, 1024, 768);
}

Render.prototype.drawText = function(text, x, y, options) {
  this.ctx.font = options.font ? options.font : this.ctx.font;
  this.ctx.fillStyle = options.fillStyle ? options.fillStyle : this.ctx.fillStyle;
  this.ctx.textAlign = options.textAlign ? options.textAlign : this.ctx.textAlign;
  this.ctx.textBaseline = options.textBaseline ? options.textBaseline : this.ctx.textBaseline;

  this.ctx.fillText(text, x, y);
}

Render.prototype.drawSplash = function() {
  var options;

  this.resetCanvas();

  options = {font: '4em hyperspace',
            fillStyle: '#FFFFFF',
            textAlign: 'center',
            textBaseline: 'middle'};
  
  this.drawText('ASTEROIDS', 500, 300, options);

  options.font = '1.5em hyperspace';
  this.drawText('PRESS SPACE TO PLAY', 500, 400, options);
}