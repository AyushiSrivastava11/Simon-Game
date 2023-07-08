
$(document).ready(function() {
var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var start=false;
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


$(".btn").click(function()
{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
    var audio=new Audio("./sounds/"+ name + ".mp3");
    audio.play();
}
function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

    setTimeout(function()
    {
        $("#" + currentColor).removeClass("pressed");
    },100);

}

$(document).keydown(function()
{
    if(!start)
    {
        $("level-title").text("Level" + level);
        nextSequence();
        start=true;
    }
    
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        console.log("Success!");
        if(gamePattern.length == userClickedPattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("Wrong!");
        playSound("wrong");
        $("#level-title").html("Game Over, Press Any Key to Restart");
      
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver()
{
   level=0;
   start=false;
   gamePattern=[];
}












});
  