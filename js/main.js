function init() {
  var render = new Render(document.querySelector('canvas').getContext('2d'));
  var game = new Game(render);
  game.init();
}

document.fonts.load('10pt "hyperspace"').then(init);
