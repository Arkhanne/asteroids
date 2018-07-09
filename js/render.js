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