const board = document.querySelector(".board");
const modal = document.querySelector(".modal");
const startButton = document.querySelector(".btn-start");

const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");




const blockWidth = 50;
const blockHeight = 50;

let direction = "down";
let intervalId = null;

const blocks = [];
let snake = [
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 },
];

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);


let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row} - ${col}`] = block;
    }
}

function drawSnake() {
    // clear old snake
    snake.forEach(segement => {
        const block = blocks[`${segement.x} - ${segement.y}`];
        if (block) block.classList.remove("fill");
    });

    // calculate new head
    let head = null;
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    // ✅ check game over
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {

        modal.style.display = "flex";
        startGameModal.style.display = "none";
        clearInterval(intervalId);

        return;
    }

    // check food collision
    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x} - ${food.y}`].classList.remove("food");
        // ✅ update global food
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        blocks[`${food.x} - ${food.y}`].classList.add("food");
        // don’t pop tail → snake grows
    } else {
        snake.pop();
    }

    // add new head
    snake.unshift(head);

    // draw food
    blocks[`${food.x} - ${food.y}`].classList.add("food");

    // draw snake
    snake.forEach(segement => {
        const block = blocks[`${segement.x} - ${segement.y}`];
        if (block) block.classList.add("fill");
    });
}

// intervalId = setInterval(drawSnake, 400);

restartButton.addEventListener("click", restartGame);

function restartGame() {
    blocks[`${food.x} - ${food.y}`].classList.remove("food");
    snake.forEach(segement => {
        const block = blocks[`${segement.x} - ${segement.y}`];
        if (block) block.classList.remove("fill");
    });

    modal.style.display = "none";
    gameOverModal.style.display = "none";
    snake = [
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 4, y: 5 }
    ];
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
    blocks[`${food.x} - ${food.y}`].classList.add("food");
    intervalId = setInterval(drawSnake, 300);
    gameOverModal.style.display = "flex";
}

addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {
        direction = "up";
    }
    else if (event.key === "ArrowDown") {
        direction = "down"
    }
    else if (event.key === "ArrowLeft") {
        direction = "left"
    }
    else if (event.key === "ArrowRight") {
        direction = "right"
    }
});

startButton.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(drawSnake, 300);

});
