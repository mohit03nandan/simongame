var gameStart = false;

var store = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

$(document).keypress(function() {
  if (!gameStart) {
    $("#titleoflevel").text("Level " + level);
    anotherSequence();
    gameStart = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  const value = userClickedPattern.length-1
  findAnswer(value);
});

function findAnswer(currentLevel) {
    if (store[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === store.length){
        setTimeout(function () {
          anotherSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#titleoflevel").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

function anotherSequence() {
  userClickedPattern = [];
  level++;
  $("#titleoflevel").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  store.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  store = [];
  gameStart = false;
}
