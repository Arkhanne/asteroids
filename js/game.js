function Game() {

}

Game.prototype.init = function() {
  var ctx = document.querySelector('canvas').getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 768);

  console.log('Game');
}