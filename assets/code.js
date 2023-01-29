// generate random word...
function generateRandomWord() {
  const words = [
    "theory",
    "potato",
    "activity",
    "song",
    "guest",
    "device",
    "power",
    "year",
    "keyboard",
    "fortune",
    "monitor", "program", "application", "javascript", "gaming", "network"
  ];
  return words[Math.floor(Math.random() * words.length)];
}

// declare variables with DOM
var computerWord = generateRandomWord();
var wins = parseInt(document.getElementById("win").innerHTML);
var losses = parseInt(document.getElementById("lost").innerHTML);
var word = document.getElementById("word").innerHTML;
var guessesLeft = parseInt(document.getElementById("guesses_left").innerHTML);
var guesses = document.getElementById("guesses_letters").innerHTML;
var letters = [];
var guested_letter = [];

createNewWord(computerWord); // when page opened computer's word is encrypted

// function for encryption
function createNewWord(computerWord) {
  letters = [];
  document.getElementById("word").innerHTML = "";
  for (var i in computerWord) {
    letters.push("- ");
    document.getElementById("word").innerHTML += letters[i];
  }
}


// function for reset of guested letter's list
function resetGuestedLetter() {
  guested_letter = [];
  guesses = "";
  document.getElementById("guesses_letters").innerHTML = guesses;
}


// function for if user again enter the same guested letter
function checkSameGuestedLetter(key) {
  if (guested_letter.length == 0) {
    guested_letter.push(key);
    guesses += key + " ";
    document.getElementById("guesses_letters").innerHTML = guesses;
  } else {
    var flag = true;
    for (i of guested_letter) {
      if (i == key) {
        flag = false;
        break;
      }
    }
    if (flag) {
      guesses += key + " ";
      document.getElementById("guesses_letters").innerHTML = guesses;
      guested_letter.push(key);
    } else {
      guessesLeft++;
    }
  }
}


// function for if user found word
function ifWin() {
  var word = document.getElementById("word").innerHTML;
  if (word == computerWord) {
    document.getElementById("smg").src =
      "https://i.ytimg.com/vi/KRdGzNi-yT0/maxresdefault.jpg";
    alert(
      "You won! Game is starting again(( " + " Word is --- " + computerWord
    );
    wins++;
    guessesLeft = 12;
    document.getElementById("guesses_left").innerText = guessesLeft;
    document.getElementById("win").innerText = losses;
    computerWord = generateRandomWord();
    createNewWord(computerWord);
    resetGuestedLetter();
  }
}


// when user click any key on keyboard
window.onkeyup = function (e) {
  var key = e.key.toLowerCase();
  document.getElementById("smg").src =
    "https://cdn.pixabay.com/photo/2018/01/08/21/19/ask-3070333_960_720.jpg";
  var check = false;
  for (var i in computerWord) {
    if (key == computerWord[i]) {
      letters[i] = key;
      check = true;
    }
  }
  if (check) {
    document.getElementById("word").innerHTML = "";
    for (var i in computerWord) {
      document.getElementById("word").innerHTML += letters[i];
    }
  } else {
    checkSameGuestedLetter(key);
    guessesLeft--;
    document.getElementById("guesses_left").innerText = guessesLeft;
    if (guessesLeft <= 0) {
      alert(
        "You lost! Game is starting again(( " + " Word was --- " + computerWord
      );
      losses++;
      guessesLeft = 12;
      document.getElementById("guesses_left").innerText = guessesLeft;
      document.getElementById("lost").innerText = losses;
      computerWord = generateRandomWord();
      createNewWord(computerWord);
      resetGuestedLetter();
    }
  }
  ifWin();
};
