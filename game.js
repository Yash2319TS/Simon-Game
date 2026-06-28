
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
         newsequence();
        started = true; 
    }
});


$(".btn").click(function() {
    var userchosencolor = $(this).attr("id");
    userClickedPattern.push(userchosencolor);
    playSound(userchosencolor);
  animatePress(userchosencolor)
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
    
    if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
          newsequence();
        }, 1000);
    }
    }
      else {
        console.log("wrong");
        $("Body").addClass("game-over");
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function newsequence() { 
userClickedPattern = [];
level++;
$("#level-title").text("Level " + level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomchosencolor = buttonColours[randomnumber];
    gamePattern.push(randomchosencolor);

    $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomchosencolor);
}


function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
 
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

