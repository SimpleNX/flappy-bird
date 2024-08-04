let enter;
let up;
let refresh;


//Variables for play area parameters.
let area, context;
let areaHeight = 640;
let areaWidth = 360;
let gameState;
let score;

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

//The game starts if the enter key is pressed.
document.addEventListener("keydown", (event)=>{
    playGame(event.code);
});

window.onload = ()=>{//Setting the starting screen of the page onload.
    //Setting the parameters for the canvas.
    enter = document.querySelector("#Enter");
// console.log(enter);
    up = document.querySelector("#Space");
    refresh = document.querySelector("#Reset");
    area = document.querySelector("#playarea");
    score = document.querySelector("#score");
    area.width = areaWidth;
    area.height = areaHeight;
    context = area.getContext("2d");
    gameState = "Start";

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

    enter.addEventListener("click", ()=>{
        playGame("Enter");
    });

    refresh.addEventListener("click", ()=>{
        location.reload();
    });
};

function playGame(event){
    if(event === "Enter"){
        //Game starts
        gameState = "Start";
        if(gameState === "Start"){
            requestAnimationFrame(updateFrames);
            setInterval(placeObstacles, 2000);
            //Adding a event listener to change the y value of bird.
            document.addEventListener("keydown", changeBirdPos);
            up.addEventListener("click", changeBirdPos);
        }
    }
}

function updateFrames(){
    if(gameState === "Finished")
        return;
    //draw the animation repeatealy
    //clear the previous frame.
    requestAnimationFrame(updateFrames);
    context.clearRect(0, 0, areaWidth, areaHeight);


    // Adding velocityY and gravity to the y position.
    velocityY += gravity;
    birdObj.y += velocityY;
    context.drawImage(birdObj.bird, birdObj.x, birdObj.y, birdObj.width, birdObj.height);
    if(birdObj.y >= areaHeight){
        gameState = "Finished";
        return;
    }

    //Draw the pipes.
    for(let i=0; i<topPipes.length; i++){
        topPipes[i].x += velocityX;
        downPipes[i].x += velocityX; 
        //Drawing top obstacles.
        context.drawImage(topPipes[i].img, topPipes[i].x, topPipes[i].y, topPipes[i].width, topPipes[i].height);
        //Drawing down obstacles.
        context.drawImage(downPipes[i].img, downPipes[i].x, downPipes[i].y, downPipes[i].width, downPipes[i].height);

        //Collision detection.
        if(checkCollision(birdObj, topPipes[i]) || checkCollision(birdObj, downPipes[i])){
            gameState = "Finished";
            return;
        }else if(!topPipes[i].birdPass && (topPipes[i].x + topPipes[i].width <= birdObj.x)){//The else handles the state when there is no collision.
            score.textContent = +score.textContent + 0.5;
        }

        if(topPipes[i].x + topPipes[i].width < birdObj.x){
            //The bird has passed the pipe if only it passes the pipes and cross the xcoordinates.
            //These denote that the bird has passed these obstacles already.;
            topPipes[i].birdPass = true;
            downPipes[i].birdPass = true;
        }

        //Removing obstacles if they have crossed the play area to the left of it.
        if(topPipes[i].x + topPipes[i].width < 0){
            topPipes.shift();
            downPipes.shift()
        }
    }

}

function placeObstacles(){

    if(gameState === "Finished")
        return;

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
        birdPass : false,
    };
    topPipes.push(top);

    pipeY += space + areaHeight;

    let down = {
        img : downPipeImg,
        x : pipeX,
        y : pipeY,
        height : downPipeHeight, 
        width : downPipeWidth,
        birdPass : false,
    };
    downPipes.push(down);
}

function changeBirdPos(event){
    if(gameState === "Finished")
        return;
    if(event.code == "Space" || event.code == "KeyW"){
        velocityY = -6; //Random velocity in y to lift the bird.
    }
    if(birdObj.y <= 0){
        velocityY = 0;
        birdObj.y = 0;
    }
}

function checkCollision(bird, pipe){
    //Collision between bird and pipe occurs, when they merge in area, basically overlap
    //So if there is overlap of the bird and pipe there is collision.
    
    //Check if the bird has passed the pipe or not, if the bird has already passed pipe, there would be no collision.
    let collisionX = bird.x < (pipe.x + pipe.width) && (bird.x + bird.width) > pipe.x;
    let collisionY = bird.y < (pipe.y + pipe.height) && (bird.y + bird.height) > pipe.y;

    return (collisionX && collisionY && !pipe.birdPass);
}