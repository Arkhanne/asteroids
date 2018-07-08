
document.addEventListener("keydown", buildGame);

function buildGame (e) {
  if (e.keyCode === 32) {
    var game = new Game();

    game.init();
  }
}

function bluidSplash() {
  var splash = new Splash();

  splash.draw();
}

document.fonts.load('10pt "hyperspace"').then(bluidSplash);