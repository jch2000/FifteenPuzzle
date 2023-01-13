<?php
  session_start();
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Fifteen Puzzle</title>
  <link href="style.css" rel="stylesheet" type="text/css" />
</head>
<body>
  <h1>Fifteen Puzzle</h1>
  <audio id="music">
    <source src="music.mp3" type="audio/mpeg">
  </audio>
  <div id="instructions_container">
  <h2>Instructions:</h2>
    <ul>
      <li>The objective of the game is to arrange tile numbers 1 through 15 into numerical order</li>
      <li>After shuffling the board, slide tiles around one by one by moving them in into the single empty space on the board</li>
      <li>For an extra challenge, attempt to complete the game in as little time and moves as you can</li>
    </ul>
  </div>

  <h2 id="instructions_head">Choose your background:</h2>
  <div id="img_options_container">
    <ul id="img_options">
      <div class="box">
        <li>
          <h3 style="color:red;">Mario</h3>
          <img src="./img/mario.jpg" alt="Mario" id="mario_img">
        </li>
      </div>
      <div class="box">
        <li>
          <h3 style="color:green;">Luigi</h3>
          <img src="./img/luigi.jpg" alt="Luigi" id="luigi_img">
        </li>
      </div>
      <div class="box">
        <li>
          <h3 style="color: black;">Princess Peach</h3>
          <img src="./img/princess_peach.jpg" alt="Princess Peach" id="princess_peach_img">
        </li>
      </div>
      <div class="box">
        <li>
          <h3 style="color: blue;">Pounce</h3>
          <img src="./img/pounce.jpg" alt="Pounce" id="pounce_img">
        </li>
      </div>
    </ul>
  </div>
  
  <div id="records_container">
    <table id="records">
      <tr>
          <th>Number of Moves</th>
          <th>Game Time</th>
          <th>Best Moves</th>
          <th>Best Time</th>
      </tr>
      <tr>
        <td id="movesDisplay">0</td>
        <td id="timerDisplay">0m 0s</td>
        <td id="bestMovesDisplay">N/A</td>
        <td id="bestTimeDisplay">N/A</td>
      </tr>
    </table>
  </div>

  <script src="script.js"></script>
</body>
</html>