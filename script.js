let movesCounter = 0;
let gameGoing = false;
var tiles = [];
let correctTiles = [];
let interval = null;
let bestTimeMS = "N/A";
let bestMoves = "N/A";
let difference = 0;
var audio = document.getElementById("music");

/*------------CREATE PUZZLE FRAME------------*/
var puzzle = document.createElement('div');
puzzle.className = 'puzzle';
document.body.appendChild(puzzle);

/*--------------POPULATE PUZZLE-------------*/
for (let i = 0; i < 15; i++) {
  var tile = document.createElement('div');
  var number = document.createElement('div');
  tile.className = 'tile';
  number.className = 'number';

  tile.style.top = (i / 4 | 0) * 100 + 'px';
  tile.style.left = (i % 4) * 100 + 'px';
  tile.style.backgroundPosition = (-(i % 4) * 100) + 'px ' + (-(i / 4 | 0) * 100) + 'px';

  number.innerHTML = i + 1;

  /*---------------BEHAVIOR-------------*/
  tile.onclick = function() {
    var tile = this;
    var selected = tiles.indexOf(tile);
    var empty = tiles.indexOf(null);

    if (selected - 1 == empty || selected + 1 == empty || selected - 4 == empty || selected + 4 == empty) {
      tiles[empty] = tile;
      tiles[selected] = null;

      tile.style.top = (empty / 4 | 0) * 100 + 'px';
      tile.style.left = (empty % 4) * 100 + 'px';
      tile.style.transition = 'top 0.69s, left 0.69s';

      if (gameGoing) {
        movesCounter += 1;
        document.getElementById("movesDisplay").innerHTML = movesCounter;
        checkTile(tile.children.item('number').innerHTML - 1, empty);
        checkCompletion();
      }
    }
  };

  tile.onmouseenter = function() {
    var tile = this;
    var number = this;
    var selected = tiles.indexOf(tile);
    var empty = tiles.indexOf(null);

    if (selected - 1 == empty || selected + 1 == empty || selected - 4 == empty || selected + 4 == empty) {
      number.style.textDecoration = 'underline';
      number.style.color = '#006600';
      tile.style.border = '2px solid red';
    }
  };

  tile.onmouseleave = function() {
    var tile = this;
    var number = this;
    tile.style.border = '2px solid black';
    number.style.textDecoration = 'none';
    number.style.color = 'white';
  };

  tiles.push(tile);
  puzzle.appendChild(tile);
  tiles[i].appendChild(number);
}
tiles[15] = null;

/*-------------SHUFFLE BUTTON-------------*/
var shuffleButton = document.createElement('button');
shuffleButton.className = 'shuffle-button';

shuffleButton.innerHTML = 'Shuffle';

shuffleButton.onclick = function() {
  for (let i = 0; i < 1000; i++) {
    var shifted = Math.random() * 15 | 0;
    var empty = tiles.indexOf(null);
    if (shifted - 1 == empty || shifted + 1 == empty || shifted - 4 == empty || shifted + 4 == empty) {
      tiles[empty] = tiles[shifted];
      tiles[shifted] = null;
      tiles[empty].style.top = (empty / 4 | 0) * 100 + 'px';
      tiles[empty].style.left = (empty % 4) * 100 + 'px';
    }
  }
  beginGame();
};

document.body.appendChild(shuffleButton);

/**-------------MUTE BUTTON*********************/
var muteButton = document.createElement('button');
muteButton.className = 'mute-button';
muteButton.innerHTML = 'Audio On/Off';

muteButton.onclick = function() {
  if (!audio.muted) {
    audio.muted = true;
  }
  else if (audio.muted) {
    audio.muted = false;
  }
}
document.body.appendChild(muteButton);

/*-------------CHANGING GAME IMAGES-------------*/
// Iterates through all tiles, changing background image to input url
function changePic(url) {
  var elements = document.getElementsByClassName("tile");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.backgroundImage = url;
  }
}

document.getElementById("mario_img").onclick = function() {
  changePic("url('./img/mario.jpg')");
};

document.getElementById("luigi_img").onclick = function() {
  changePic("url('./img/luigi.jpg')");
};

document.getElementById("princess_peach_img").onclick = function() {
  changePic("url('./img/princess_peach.jpg')");
};

document.getElementById("pounce_img").onclick = function() {
  changePic("url('./img/pounce.jpg')");
};

/*-------------CHECK IF TILE IS IN CORRECT SPOT-------------*/
function checkTile(correctIndex, currentIndex) {
  // Case where tile was in correct spot but was moved
  if (correctTiles.includes(correctIndex)) {
    let indexToRemove = correctTiles.indexOf(correctIndex);
    removed = correctTiles.splice(indexToRemove, 1);
  }
  // Case where tile needs to be checked
  else if (correctIndex == currentIndex)
    correctTiles.push(correctIndex);
}

/*-------------BEGIN GAME-------------*/
function beginGame() {
  movesCounter = 0;
  gameGoing = true;
  difference = 0;
  correctTiles = [];
  document.getElementById("movesDisplay").innerHTML = movesCounter;
  var elements = document.getElementsByClassName("tile");
  // Checks if shuffle method put any tiles in correct spot
  for (var i = 0; i < elements.length; i++) {
    checkTile(elements[i].children.item('number').innerHTML - 1, tiles.indexOf(elements[i]));
  }
  startTimer();
  audio.play();
  audio.loop = true;
}

/*-------------CHECK GAME COMPLETION-------------*/
function checkCompletion() {
  if (correctTiles.length == 15) { // Case where game has been won
    gameGoing = false;
    updateBests();
    clearInterval(interval);
    audio.pause()
  }
}

function updateBests() {
  let timerElement = document.getElementById('bestTimeDisplay');
  let movesElement = document.getElementById('bestMovesDisplay');
  if (bestTimeMS == 'N/A') { // Case where there are no existing bests
    // Update globals
    bestTimeMS = difference;
    bestMoves = movesCounter;
    // Update page
    movesElement.innerText = movesCounter;
    const { minutes, seconds } = formatTime(difference);
    timerElement.innerText = `${minutes}m ${seconds}s`;
  } else { // Case where there are existing bests
    if (difference < bestTimeMS) { // Case where new time is smaller
      // Update global
      bestTimeMS = difference;
      // Update page
      var { minutes, seconds } = formatTime(difference);
      timerElement.innerText = `${minutes}m ${seconds}s`;
    }
    if (movesCounter < bestMoves) { // Case where new moves is smaller
      // Update global
      bestMoves = movesCounter;
      // Update page
      movesElement.innerText = movesCounter;
    }
  }
}

/*-------------GAME TIMER-------------*/
function startTimer() {
  // Making sure that interval is not currently being used
  clearInterval(interval);
  interval = setInterval(displayDifference, 1000);
  let startTime = Date.now();
  const element = document.getElementById('timerDisplay');

  function displayDifference() {
    // Find difference between dates, expressed in milliseconds
    difference = Date.now() - startTime;
    // Calculate the time in units
    var { minutes, seconds } = formatTime(difference);
    // Show the formatted time units on the page
    element.innerText = `${minutes}m ${seconds}s`;
  }
}

function formatTime(duration) {
  const minutes = Math.floor(duration / 60 / 1000);
  duration -= minutes * 60 * 1000;
  const seconds = Math.floor(duration / 1000);
  duration -= seconds * 1000;
  return {
    minutes, seconds, milliseconds: duration
  };
}