var restart = false;

function endGame() {
  var render = new Render(document.querySelector('canvas').getContext('2d'));
  render.drawGameOver();
  restart = true;
}

function buildGame () {
  var render = new Render(document.querySelector('canvas').getContext('2d'));
  var game = new Game(render, endGame);
  game.init();
}

function buildSplash() {
  var render = new Render(document.querySelector('canvas').getContext('2d'));
  render.drawSplash();
  restart = false;
}

function keyDown(e) {
  if (e.keyCode === 32) {
    if (restart) {
      buildSplash();
    } else {
      buildGame();
    }
  }
}

function init() {
  buildSplash();
}

document.addEventListener("keydown", keyDown);
document.fonts.load('10pt "hyperspace"').then(init);
