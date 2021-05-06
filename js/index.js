//Variables
let inputDir = {x: 0,y: 0};
const food_sound = new Audio('music/food.mp3');
const game_over_sound = new Audio('music/gameover.mp3');
const move_sound = new Audio('music/move.mp3');
const basic_sound = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13,y: 15}
]
food = {x: 6,y: 7};

//GameFunctionalities
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake){
    //Self-Bump
    for(let index = 1; index < snakeArr.length; index++)
    {
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
    //Wall-Bump
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}
function gameEngine()
{
    //Updating Snake & Food
    if(isCollide(snakeArr)){
        game_over_sound.play();
        basic_sound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13 , y:15}];
        basic_sound.play();
        score = 0;
    }
    //After Eating, Producing New Food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        food_sound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y}) //Adding to body i.e array
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()) ,y: Math.round(a + (b-a)*Math.random())  }
    }
    //Movement
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Rendering Snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');     
        }
        board.appendChild(snakeElement);
    });
    //Food_Functionality
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//Main

window.requestAnimationFrame(main); 
window.addEventListener('keydown',e =>{
    inputDir = {x: 0,y: 1}; //Starting the snake
    basic_sound.play();
    move_sound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});