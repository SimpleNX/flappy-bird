
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
let birdObj = {};

//Variables for obstacles.
let topPipes = [];
let topPipeImg;
let topPipeX = areaWidth;
let topPipeY = 0;
let topPipeWidth = 64;
let topPipeHeight = 512;

let downPipes = [];
let downPipeImg;
let downPipeX = areaWidth;
let downPipeY = 0;
let downPipeWidth = 64;
let downPipeHeight = 512;


//Other game physics parameters
let velocityX = -1;
let velocityY = 0;
let gravity = 0.1;

window.onload = ()=>{
    //Setting the parameters for the canvas.
    area = document.querySelector("#playarea");
    area.width = areaWidth;
    area.height = areaHeight;
    context = area.getContext("2d");

    //everytime the page loads, the bird needs to be drawn after being load.
    bird = new Image();
    bird.src = "./images/flappybird.png";
    birdObj = {
        bird,
        x : birdX,
        y : birdY,
        height : birdHeight,
        width : birdWidth,
    };
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
    downPipeImg.src = "./images/bottompipe.png";
    
    requestAnimationFrame(updateFrames);
    setInterval(placeObstacles, 2000);
    //Adding a event listener to change the y value of bird.
    document.addEventListener("keydown", changeBirdPos);
};

function updateFrames(){
    //draw the animation repeatealy
    //clear the previous frame.
    requestAnimationFrame(updateFrames);
    context.clearRect(0, 0, areaWidth, areaHeight);


    // Adding velocityY and gravity to the y position.
    velocityY += gravity;
    birdObj.y += velocityY;
    context.drawImage(birdObj.bird, birdObj.x, birdObj.y, birdObj.width, birdObj.height);

    //Draw the pipes.
    for(let i=0; i<topPipes.length; i++){
        topPipes[i].x += velocityX;
        downPipes[i].x += velocityX; 
        //Drawing top obstacles.
        context.drawImage(topPipes[i].img, topPipes[i].x, topPipes[i].y, topPipes[i].width, topPipes[i].height);
        //Drawing down obstacles.
        context.drawImage(downPipes[i].img, downPipes[i].x, downPipes[i].y, downPipes[i].width, downPipes[i].height);
        
        
        //Collision detection.
    }

}

function placeObstacles(){

    //Parameters to draw the top pipe.
    let pipeX = topPipeX;
    let pipeY = topPipeY - areaHeight/4 - Math.random()*(areaHeight/2);
    let space = areaHeight/6;

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

function changeBirdPos(e){
    if(e.code == "Space" || e.code == "Enter"){
        velocityY = -6;
    }
    if(birdObj.y <= 0){
        velocityY = 0;
        birdObj.y = 0;
    }
}