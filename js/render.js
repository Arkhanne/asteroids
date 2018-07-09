function Render(ctx) {
  this.ctx = ctx;

  this._mainTitle = {font: '4em hyperspace',
                    fillStyle: '#FFFFFF',
                    textAlign: 'center',
                    textBaseline: 'middle'};
  this._subTitle = {font: '1.5em hyperspace',
                    fillStyle: '#FFFFFF',
                    textAlign: 'center',
                    textBaseline: 'middle'};
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
  this.resetCanvas();
  this.drawText('ASTEROIDS', 500, 300, this._mainTitle);
  this.drawText('PRESS SPACE TO PLAY', 500, 400, this._subTitle);
}

Render.prototype.drawGameOver = function() {
  this.resetCanvas();
  this.drawText('GAME OVER', 500, 300, this._mainTitle);
  this.drawText('THANKS FOR PLAYING ASTEROIDS', 500, 400, this._subTitle);
}