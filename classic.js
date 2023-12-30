var rounds; // Initialize rounds to 0. This variables 'rounds' will later be used to display custom outputs when the user reaches 5, 10, 15, 20, etc. guesses such as 'Give up', 'Keep trying', etc.

var playerGuesses = [];

var pMoney = 0;

// https://www.w3schools.com/jsref/jsref_length_array.asp
var guessCount = playerGuesses.length;

var maxRounds;

document.getElementById("chooseAPrize").style.display = "none";

/*
This function takes in two parameters, the range's maximum value and the range's minimum value.

The Math.random() generates a random decimal number between 0 (inclusive) and 1 (exclusive). https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_random

It is then multiplied by the difference between the Max and Min + 1 range

We had the min value in order to get within the desired range.

It is very important to have Math.Floor() because we want the integer data type, not a float or double. Using Math.Floor(), we are able to get the number without the decimal.
*/
function randomNumGenerator(rangeMin, rangeMax) {
  const randomNum = Math.floor(Math.random() * (rangeMax - rangeMin + 1) + rangeMin);
  return randomNum;
}

function soundEffectsOnOROff() {
  if (document.getElementById("audio-toggle").value == 0) {
    document.getElementById("audio-toggle").value = 1;
    document.getElementById("audio-toggle").innerHTML = "Sound Effects: OFF";
  }

  else {
    document.getElementById("audio-toggle").value = 0;
    document.getElementById("audio-toggle").innerHTML = "Sounds Effects: ON";
  }
}

function soundAffect(instance) {

  /* 
  The 2 deminsional array sounds holds the different paths to get an audio sound affect.

  The first is the game opener, followed by a wrong guess sound affect, followed by a correct guess affect, and lastly a sound affect for when/if the user successfully buys a prize.
  */

  var sounds = [
    ["Multimedia/Audio/Sound Affects/Game opener1.wav", "Multimedia/Audio/Sound Affects/Game opener2.mp3", "Multimedia/Audio/Sound Affects/Game countdown.mp3"],

    ["Multimedia/Audio/Sound Affects/Wrong Guess.wav", "Multimedia/Audio/Sound Affects/Wrong Guess 2.wav", "Multimedia/Audio/Sound Affects/Wrong Guess 3.wav"],

    ["Multimedia/Audio/Sound Affects/Win 1.wav", "Multimedia/Audio/Sound Affects/Win 2.wav", "Multimedia/Audio/Sound Affects/Win 3.wav"],

    ["Multimedia/Audio/Sound Affects/Prize 1.wav", "Multimedia/Audio/Sound Affects/Prize 2.wav", "Multimedia/Audio/Sound Affects/Prize 3.wav"]
  ]

  // Generates a random number between 0 and 2
  // This will be used to be the random index for the second index when getting a value from the array.
  var audioRandNum;
  audioRandNum = randomNumGenerator(0, 2);

  /* If the value of the 'instance' parameter is "Game Opener", then a sound file is selected from the first row (sub-array) of the 'sounds' 2D array

  A random number is generated to provide an integer value that will be used to be a random index value that corresponds to an element in the first sub-array.

  This function will return the randomly selected sound file for the "Game Opener" instance.
  */

  while (document.getElementById("audio-toggle").value == 0) {
    if (instance === "Game Opener") {
      return sounds[0][audioRandNum];
    }

    else if (instance === "Lose") {
      return sounds[1][audioRandNum];
    }

    else if (instance === "Win") {
      return sounds[2][audioRandNum];
    }

    else {
      return sounds[3][audioRandNum];
    }
  }

  return; // Nothing is returned & therefore, nothing is played.

}

/*
This function will be used to set up the game.

The parameter difficulty will be taken in based on what the user selects as the difficulty they desire.

No return type.

A random number is generated based on a specific range corresponding to difficulty choosen & basic outputs are displayed.

*/

function difficulty(difficulty) {

  document.getElementById("chooseAPrize").style.display = "none";

  document.getElementById("game-toggle").disabled = true;

  var difficulty = difficulty;

  if (document.getElementById("game-toggle").checked) {

    document.getElementById("backToTop").style.width = "13%";

    setTimeout(function() { document.getElementById("difficultyDropdown").style.display = "none"; }, 2000);

    if (difficulty === 0) { // If the difficulty has not been selected and is still on the 'Choose' display, then a alert will pop up.
      alert("⚠️🚨 Please select a difficulty level. ⚠️🚨");

      document.getElementById("game-toggle").checked = false;

      location.reload();

      setTimeout(function() { document.getElementById("difficultyDropdown").style.display = "block"; }, 2000);
      document.getElementById("backToTop").style.width = "25%";
    }

    if (difficulty === 1) { // Difficulty = 1 means easy
      setTimeout(function() { document.getElementById("difficultyPic").innerHTML = "<img src = 'Multimedia/Images/Classic/Difficulties/Easy Game Difficulty.png' id = 'easyPic'>"; }, 5000); // Using the setTimeout() method, this is displayed after 5 seconds.
      setTimeout(function() { document.getElementById("difficultyGuessingRange").innerHTML = "Guess a number between 1 - 10!"; }, 5500);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").style.display = "block"; }, 6000);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").placeholder = "Enter your guess..."; }, 6000);
      setTimeout(function() { document.getElementById("guessTheNumButton").style.display = "block"; }, 6100);
      // Random num
      randomNum = randomNumGenerator(1, 10);
    }

    else if (difficulty === 2) {
      setTimeout(function() { document.getElementById("difficultyPic").innerHTML = "<img src = 'Multimedia/Images/Classic/Difficulties/Average Game Difficulty.png' id = 'averagePic'>"; }, 5000);
      setTimeout(function() { document.getElementById("difficultyGuessingRange").innerHTML = "Guess a number between 1 - 25!"; }, 5500);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").style.display = "block"; }, 6000);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").placeholder = "Enter your guess..."; }, 6000);
      setTimeout(function() { document.getElementById("guessTheNumButton").style.display = "block"; }, 6100);
      randomNum = randomNumGenerator(1, 25);
    }

    else if (difficulty === 3) {
      setTimeout(function() { document.getElementById("difficultyPic").innerHTML = "<img src = 'Multimedia/Images/Classic/Difficulties/Medium Game Difficulty.png' id = 'mediumPic'>"; }, 5000);
      setTimeout(function() { document.getElementById("difficultyGuessingRange").innerHTML = "Guess a number between 1 - 50!"; }, 5500);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").style.display = "block"; }, 6000);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").placeholder = "Enter your guess..."; }, 6000);
      setTimeout(function() { document.getElementById("guessTheNumButton").style.display = "block"; }, 6100);
      randomNum = randomNumGenerator(1, 50);
    }

    else if (difficulty === 4) {
      setTimeout(function() { document.getElementById("difficultyPic").innerHTML = "<img src = 'Multimedia/Images/Classic/Difficulties/Hard Game Difficulty.jpg' id = 'hardPic'>"; }, 5000);
      setTimeout(function() { document.getElementById("difficultyGuessingRange").innerHTML = "Guess a number between 1 - 100!"; }, 5500);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").style.display = "block"; }, 6000);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").placeholder = "Enter your guess..."; }, 6000);
      setTimeout(function() { document.getElementById("guessTheNumButton").style.display = "block"; }, 6100);
      randomNum = randomNumGenerator(1, 100);
    }

    else if (difficulty === 5) {
      setTimeout(function() { document.getElementById("difficultyPic").innerHTML = "<img src = 'Multimedia/Images/Classic/Difficulties/Impossible Game Difficulty.jfif' id = 'impossiblePic'>"; }, 5000);
      setTimeout(function() { document.getElementById("difficultyGuessingRange").innerHTML = "Guess a number between 1 - 1000!"; }, 5500);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").style.display = "block"; }, 6000);
      setTimeout(function() { document.getElementById("guessedNumberInputBox").placeholder = "Enter your guess..."; }, 6000);
      setTimeout(function() { document.getElementById("guessTheNumButton").style.display = "block"; }, 6100);
      randomNum = randomNumGenerator(1, 1000);
    }

  }

  maxRounds = NaN;

  while (isNaN(maxRounds)) {
    maxRounds = parseInt(prompt("What is the maximum number of rounds you would like to play? "));

    if (isNaN(maxRounds)) {
      continue;
    }

    else {
      if (difficulty === 1 && maxRounds >= 6) {
        alert("For the easy game mode, your max rounds must be set to a number between 1-5.")

        maxRounds = NaN;
      }

      else if (difficulty === 2 && maxRounds >= 11) {
        alert("For the average game mode, your max rounds must be set to a number between 1-10.")

        maxRounds = NaN;
      }

      else if (difficulty === 3 && maxRounds >= 21) {
        alert("For the medium game mode, your max rounds must be set to a number between 1-20.")

        maxRounds = NaN;
      }

      else if (difficulty === 4 && maxRounds >= 36) {
        alert("For the hard game mode, your max rounds must be set to a number between 1-35.")

        maxRounds = NaN;
      }

      else if (difficulty === 5 && maxRounds >= 51) {
        alert("For the average game mode, your max rounds must be set to a number between 1-50.")

        maxRounds = NaN;
      }


    }



  }

  alert("Let's play! 🥳🎉");

  document.getElementById("soundsAffects").src = soundAffect("Game Opener");
  document.getElementById("soundsAffects").play();

}

/*
This function uses the playerGuess and randomNum variables to compare them.

It will show that the user guessed correctly or incorrectly, with respective outputs.

No return type.

pMoney variable is assinged to appropriate value based on the number of guesses it took for the user to guess the random number.
*/

function playGame() {
  var playerGuess = parseInt(document.getElementById("guessedNumberInputBox").value);
  guessCount = playerGuesses.length;


  if (guessCount === (maxRounds)) {
    alert("Unfournately, you have reached the maximun number of rounds to guess the correct number. Your guess is therefore invalidated & will not have an impact on the score of the game or prizes. 😖😖");
    alert("Hit reset to play again!");

    document.getElementById("guessTheNumButton").disabled = true;

    document.getElementById("resultSpecification").style.color = white;
    document.getElementById("result").style.color = white;

    document.getElementById("resultSpecification").style.display = "none";
    document.getElementById("result").style.display = "none";
  }

  if (playerGuesses.includes(playerGuess)) { // https://www.w3schools.com/jsref/jsref_includes_array.asp
    alert("🔥 You've already made this guess previously. Pick another number. 🔥 ")
  }

  else {
    playerGuesses.push(playerGuess); //The '.push()' method is used to add an element into a list. This is comparable to python's '.append()' method.

    if (isNaN(playerGuess)) {
      document.getElementById("result").innerHTML = "Please enter only a numerical value.";
      playerGuesses.pop();
    }

    else if (playerGuess != randomNum) {
      document.getElementById("result").innerHTML = "Incorrect!";

      //https://www.w3schools.com/JSREF/prop_script_src.asp
      document.getElementById("soundsAffects").src = soundAffect("Lose");
      document.getElementById("soundsAffects").play();

      if (playerGuess > randomNum) {
        document.getElementById("resultSpecification").innerHTML = "Your guess was too high! 👇 Choose a smaller number... 👇";
      }

      else if (playerGuess < randomNum) {
        document.getElementById("resultSpecification").innerHTML = "Your guess was too low! 👆 Choose a larger number... 👆";
      }
    }

    else if (playerGuess === randomNum) {
      document.getElementById("result").innerHTML = "Correct ‼‼";
      document.getElementById("resultSpecification").innerHTML = "✅ You guessed the correct number. ✅";

      //https://stackoverflow.com/questions/6961526/what-is-the-correct-value-for-the-disabled-attribute#:~:text=disabled%22%20/%3E%0A%3Cinput%20type%3D%22text%22-,disabled%3D%22true%22,-/%3E
      // The button the make a guess is no longer functionable
      document.getElementById("guessTheNumButton").disabled = true;

      document.getElementById("soundsAffects").src = soundAffect("Win");
      document.getElementById("soundsAffects").play();

      setTimeout(function() { document.getElementById("difficulty").style.display = "none"; }, 1500);
      setTimeout(function() { document.getElementById("startGame-text").style.display = "none"; }, 2250);
      setTimeout(function() { document.getElementById("game-toggle").style.display = "none"; }, 2750);
      setTimeout(function() { document.getElementById("difficultyPic").style.display = "none"; }, 3250);
      setTimeout(function() { document.getElementById("difficultyGuessingRange").style.display = "none"; }, 4000);
      setTimeout(function() { document.getElementById("guessTheNumButton").style.display = "none"; }, 4750);

      const guessCount = playerGuesses.length;

      if (guessCount === 1) {
        pMoney = 100;
      }

      else if (guessCount >= 2 && guessCount <= 5) {
        pMoney = 75;
      }

      else if (guessCount >= 6 && guessCount <= 10) {
        pMoney = 50;
      }

      else if (guessCount > 11 && guessCount <= 15) {
        pMoney = 25;
      }

      else {
        pMoney = 0;
      }


      setTimeout(function() { document.getElementById("chooseAPrize").style.display = "block"; }, 2500);
    }
  }
}

/*
The game specific webpage reloads to reset the game when the reset button is hit
*/
function resetGame() {
  location.reload();
}

/*
Assigns certain prizes to integer values for cost.

Will determine if the user has enough money and if they can buy it.

Output will be displayed accordingly
*/
function prizes() {
  var snickers = 25; // 5 bucks for snicker bar
  var skittles = 50;
  var stuffedAnimal = 75;
  var waterGun = 100;

  var userChoice = document.getElementById("prize").value;

  if (userChoice === "snickers") { // If the user inputs 'Snickers', then...
    if (pMoney >= snickers) { // The player most have at more or equal to the money of the prize.
      pMoney -= snickers; // Subtract the prize of the snickers bar from the player money variable.
      alert("You have successfully purchased a delicous Snickers bar. You now have $" + pMoney + " left. Anyways, enjoy that Snickers bar! 😇"); // Alert user about their successful purchase.

      document.getElementById("yourAward").innerHTML = "You have won a snickers bar!";

      document.getElementById("yourAwardPic").innerHTML = "<img src='Multimedia/Images/Awards/Prizes/Snickers.gif' style = 'width: 375px'/>";

      setTimeout(function() { location.replace(href = "win.html"); }, 10000);
    }

    else {
      alert("Unfortunately, you do not have enough money for a Snickers bar. You need $" + (snickers - pMoney) + " more. 😕");
    }
  }

  else if (userChoice === "skittles") {
    if (pMoney >= skittles) {
      pMoney -= skittles;
      alert("Congrats. You are now the proud owner of a big, full bag of Skittles. You now have $" + pMoney + " left.");

      document.getElementById("yourAward").innerHTML = "You have won a bag of Skittles!";

      document.getElementById("yourAwardPic").innerHTML = "<img src='Multimedia/Images/Awards/Prizes/Skittles.gif' style = 'width: 375px'/>";

      setTimeout(function() { location.replace(href = "win.html"); }, 10000);
    }

    else {
      alert("Oh, no! You don't have enough money to purchase this prize. Keep playing and workin hard to get to get this goal. You only need $" + (skittles - pMoney) + " more.");
    }
  }

  else if (userChoice === "stuffedAnimal") {
    if (pMoney >= stuffedAnimal) {
      pMoney -= stuffedAnimal;
      alert("Teddy bear is all yours boss. You have $" + pMoney + " left.");

      document.getElementById("yourAward").innerHTML = "Take care of the teddy bear!";

      document.getElementById("yourAwardPic").innerHTML = "<img src='Multimedia/Images/Awards/Prizes/Teddy Bear.gif' style = 'width: 375px'/>";

      setTimeout(function() { location.replace(href = "win.html"); }, 10000);
    }

    else {
      alert("You are $" + (stuffedAnimal - pMoney) + "away from obtaining your dream prize");
    }

  }

  else if (userChoice === "waterGun") {
    if (pMoney >= waterGun) {
      pMoney -= waterGun;
      alert("It's about to be a party! 🤠");

      document.getElementById("yourAward").innerHTML = "Let's hit the pool!";

      document.getElementById("yourAwardPic").innerHTML = "<img src='Multimedia/Images/Awards/Prizes/Water Gun.gif' style = 'width: 375px'/>";

      setTimeout(function() { location.replace(href = "win.html"); }, 10000);
    }

    else {
      alert("You do not have enough money to get a water gun. You are in need of $" + (waterGun - pMoney) + ".");
    }
  }
}

/* 
JavaScript CSS edits for webpage dark mode feature
*/
function toggleDarkMode() {
  var everything = document.getElementById("everything");
  var pickAGame = document.getElementById("pickAGame");

  if (everything.style.backgroundColor === "black") {
    everything.style.color = "black";
    everything.style.backgroundColor = "white";
    pickAGame.style.backgroundColor = "#F0F0F0";

  }

  else {
    everything.style.color = "white";
    everything.style.backgroundColor = "black";
    pickAGame.style.backgroundColor = "darkgrey";
  }
}

/*
Allows the user to play music of choice

Takes in the parameter 'music', which is a integer number that corresponds with a song from the webpage dropdown menu
*/
function music(music) {
  options = [
    "Multimedia/Audio/Home/Ciara - Set.mp3",
    "Multimedia/Audio/Home/Fifth_Harmony_-_Worth_It_(Official_Video)_ft._Kid_Ink.mp3",
    "Multimedia/Audio/Home/Metro Boomin - Superhero (Heroes & Villains) [Official Clean] (copy).mp3",
    "Multimedia/Audio/Home/(CLEAN) Goosebumps (Feat. Kendrick Lamar) - Travis Scott.mp3",
    "Multimedia/Audio/Home/Lil Nas X - Old Town Road (Clean).mp3"]


  if (music === 1) {
    document.getElementById("musicPlay").src = options[0];
    document.getElementById("musicPlay").play();
  }

  else if (music === 2) {
    document.getElementById("musicPlay").src = options[1];
    document.getElementById("musicPlay").play();
  }

  else if (music === 3) {
    document.getElementById("musicPlay").src = options[2];
    document.getElementById("musicPlay").play();
  }

  else if (music === 4) {
    document.getElementById("musicPlay").src = options[3];
    document.getElementById("musicPlay").play();
  }

  else if (music === 5) {
    document.getElementById("musicPlay").src = options[4];
    document.getElementById("musicPlay").play();
  }
  setTimeout(function() { document.getElementById("music-Selection").style.display = "none" }, 1500);
}