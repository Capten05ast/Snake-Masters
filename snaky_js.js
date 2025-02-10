
// VARIABLES INITIALIZATION
let inputDir = {x: 0, y:0};

let foodSound = new Audio("food.mp3")
let gameOverSound = new Audio("gameover.mp3")
let moveSound = new Audio("move.mp3");
let musicSound = new Audio("music.mp3");

let speed = 5;
let lastPaintTime = 0;

// snakeArr is an array
let snakeArr = [
    {x:13, y:15}
]
// food is not an array but it an object
let food = {
    x:5, 
    y:6
};
let score = 0;

let scoreBox = document.querySelector("#scoreBox");
let hiscore = localStorage.getItem("hiscore");
let hiscoreval = 0;





// GAME FUNCTIONS :-
// RECURSSION :
// now its loop (recursive method)
// and as we saw that in console values are getting printed a very high speed
// due to which FPS is very high. And screen will be rendered at very high speed
// so now we will write the logic to reduce the FPS.

// IF LOOP :
// lastpainttime means last time the screen got painted
// it means we dont want screen to get painted in less than 0.5s

function main(ctime){
    window.requestAnimationFrame(main);
    if (( ctime - lastPaintTime) / 1000 < 1/speed ){
        return;
    }
    lastPaintTime = ctime;
    console.log(ctime);
    gameEngine();
}





// COLLISSION :-
function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            score = 0;
            scoreBox.innerHTML = "Score : " + score;
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 30 || snake[0].x <= 0 || snake[0].y >= 30 || snake[0].y <= 0) {
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
        return true;
    }
    return false;  // Explicitly return false if no collision happens
}





// GAME ENGINE FUNCTION :-
// This is the function for running the game

function gameEngine() {
    // part-1: Updating the snake array (snakes body parts)
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over. Press any key to play again!");

        snakeArr = [{x : 13, y : 15 }];
        // musicSound.play();
        score = 0;
    }

    // if you have eaten the food, increment the score and fegenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();

        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore: " + hiscoreval;
        }

        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })

        let a = 1;
        let b = 28;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())}
    }

    // Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        // this is callled destructuring ...
        // this is used to create a new object instead of referring to next one
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part-2: Display, (Render the snake and food)
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach ((e, index) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })

    // Display the food 
    // food is not an array 
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}





// GAME LOGIC :-
// This will fire main but not again and again, only at the starting
// Main logic starts here

// musicSound.play();
hiscore = localStorage.getItem("hiscore");
hiscoreval = 0;

if(hiscore === null) {
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse (hiscore);
    hiscoreBox.innerHTML = "Hiscore: " + hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {

      inputDir = {x:0, y:1} // start the game 
      moveSound.play();
      switch (e.key) {
        case "ArrowUp" :
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown" :
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft" :
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight" :
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
      }
})





// CLEARING HIGH SCORE :-
const clear = document.querySelector("#clear");
clear.addEventListener("click", function() {
    localStorage.clear();
    hiscoreBox.innerHTML = "Hiscore: " + 0;
})





// INFORMATION ABOUT THE CODE :-

// window.requestAnimationFrame(main) :-
// we havent used set interval (setTimeout) but requestAnimationFrame() here;
// It gives highest FPS, whereas set interval just repeats things again and again
// To see how its working open console and see at what speed its printing

