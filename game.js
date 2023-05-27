var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("click keypress",function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click",function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSounds(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) 
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        console.log("Wrong");
        playSounds("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function playSounds(name) 
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function nextSequence()
{
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randNum =Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSounds(randomChosenColour);
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


