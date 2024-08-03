
//Variables for play area parameters.
let area, context;
let areaHeight = 640;
let areaWidth = 360;

//Variables for bird
let bird;
let birdHeight = 34;
let birdWidth = 24;
let birdX = areaHeight/10;
let birdY = areaHeight/2;


window.onload = ()=>{
    //Setting the parameters for the canvas.
    area = document.querySelector("#playarea");
    area.width = areaWidth;
    area.height = areaHeight;
    context = area.getContext("2d");

    //everytime the page loads, the bird needs to be drawn after being load.
    bird = new Image();
    bird.src = "./images/flappybird.png";
    bird.onload = ()=>{
        context.drawImage(bird, birdX, birdY, birdWidth, birdHeight);
    };
};