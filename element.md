## Reference to Board and Bird and Obstacles
Use variables to reference the board and the bird that is going to be shown on the board. Load the obstacle images, and set the starting point for the pipe, and height and width.

## To draw the obstacles and bird positions
Use canvas element on the html and get reference to it.

## Rendering on load
Whenever the page is load, set the state of the game to default state.
Show the background, draw the bird on the default coordinates.

## The main game loop ()
Everytime, draw Animation and clear the previous frame.

## Collision Detection
Everytime the obstacles are made, right after it should be checked if there has been collision between bird and it.
Also touching the bottom counts as collision.
Any collision results in the game to end.
Set gameState = finisied when either of these occur.
