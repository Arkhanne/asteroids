
var game = new Game();
var intervalID;
var restart = false;

document.addEventListener("keydown", keyDown);

function buildGameOver() {
  if (game.gameOver) {
    clearInterval(intervalID);
    var gameOver = new GameOver();
    gameOver.draw();
    restart = true;
  }
}

function buildGame () {
  game.init();
}

function bluidSplash() {
  var splash = new Splash();

  splash.draw();
  restart = false;
}

function init() {
  bluidSplash();
  intervalID = setInterval(buildGameOver, 500);
}

function keyDown(e) {
  if (e.keyCode === 32) {
    if (restart) {
      bluidSplash();
    } else {
      buildGame();
    }
  }
}

document.fonts.load('10pt "hyperspace"').then(init);
