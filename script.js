
//Variables for play area parameters.
let area, context;
let areaHeight = 640;
let areaWidth = 360;

//Variables for bird
let bird;
let birdHeight = 24;
let birdWidth = 34;
let birdX = areaHeight/10;
let birdY = areaHeight/2;
let birdObj = {
    bird,
    x : birdX,
    y : birdY,
    height : birdHeight,
    width : birdWidth,
};

//Variables for obstacles.
let topPipes = [];
let topPipeImg;
let topPipeX = areaWidth + 2;
let topPipeY = 0;
let topPipeWidth = 64;
let topPipeHeight = 512;

let downPipes = [];
let downPipeImg;
let downPipeX = areaWidth + 2;
let downPipeY = 0;
let downPipeWidth = 64;
let downPipeHeight = 512;


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
    //loading the obstacles everytime the window loads.
    //Load the image of the obstacle
    //then randomly place the obstacle.
    //for both of the obstacles.
    topPipeImg = new Image();
    topPipeImg.src = "./images/toppipe.png";

    downPipeImg = new Image();
    downPipeImg.src = "./images/downpipe.png";
    
    //Drawing obstacles;
    for(let i=0; i<topPipes.length(); i++){ 
        //Drawing top obstacles.
        context.drawImage(topPipes[i].img, topPipes[i].x, topPipes[i].y);
        //Drawing down obstacles.
        context.drawImage(downPipes[i].img, downPipes[i].x, downPipes[i].y); 
    }

    requestAnimationFrame(updateFrames);
    setInterval(placeObstacles, 2000);
    document.addEventListener("keydown", (e)=>{
        moveBird(e);
    });
};

function placeObstacles(){

    //Parameters to draw the top pipe.
    let pipeX = topPipeX;
    let pipeY = topPipeY - areaHeight/4 - Math.random()*(areaHeight/2);
    let space = areaHeight/2;

    //defining the top obstacle
    let top = {
        img : topPipeImg,
        x : pipeX,
        y : pipeY,
        height : topPipeHeight,
        width : topPipeWidth,
        pass : false,
    }
    topPipes.push(top);

    pipeY += space + areaHeight;

    let down = {
        img : downPipeImg,
        x : pipeX,
        y : pipeY,
        height : downPipeHeight, 
        width : downPipeWidth,
        pass : false,
    }
    downPipes.push(down);
}