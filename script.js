const board = document.querySelector(".board");

const blockWidth = 50;
const blockheight = 50;

let direction = "down";

const blocks = [];
const snake = [
    {
        x: 1,
        y: 3,
    }, {
        x: 1,
        y: 4
    }, {
        x: 1,
        y: 5
    },
];

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockheight);

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row} - ${col}`] = block;
    }
}

function drawSnake() {
    snake.forEach((segement) => {
        blocks[`${segement.x} - ${segement.y}`].classList.add("fill");
    });
}

setInterval(() => {

    let head = null;

    if (direction == "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction == "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction == "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction == "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    snake.forEach((segement) => {
        blocks[`${segement.x} - ${segement.y}`].classList.remove("fill");
    });

    snake.unshift(head);
    snake.pop();

    drawSnake();

}, 400);

addEventListener("keydown", (event) => {
    // console.log(event.key);
    if (event.key == "ArrowUp") {
        direction = "up";
    }else if(event.key == "ArrowDown"){
        direction = "down";
    }else if(event.key == "ArrowLeft"){
        direction = "left";
    }else if(event.key == "ArrowRight"){
        direction = "right";
    }

});
