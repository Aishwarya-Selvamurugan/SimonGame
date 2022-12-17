setTimeout(function(){
    $("#hide").css({display : "block"});
    $(".loader").css({display : "none"});
    $("#load").css({display : "none"});
},5000);



var colors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClick = [];
var started = false;
var level = 0;


$(document).keypress(function()
{
    if(!started)
    {
        $("h1").text("Level  "+level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClick.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    check(userClick.length-1);
})


function nextSequence(){
    userClick = [];
    level++;
    $("h1").text("Level  "+level);
    var r =  Math.floor(Math.random()*4);
    var random = colors[r];
    gamePattern.push(random);
    $("."+random).animate({opacity:0.5});
    $("."+random).animate({opacity:1});
    
}

function check(currentLevel)
{
    if(gamePattern[currentLevel] === userClick[currentLevel])
    {
        if(userClick.length === gamePattern.length){
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press any key to continue");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        startover();
    }
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}



function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function startover()
{
    level = 0;
    gamePattern = [];
    started = false;
}