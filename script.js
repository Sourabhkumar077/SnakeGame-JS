const board = document.querySelector(".board");
const modal = document.querySelector(".modal");
const startButtton = document.querySelector(".btn-start");


const blockWidth = 50;
const blockHeight = 50;

let direction = "down";
let intervalId = null;

const blocks = [];
const snake = [
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
        clearInterval(intervalId);
        alert("Game over");
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

startButtton.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(drawSnake, 400);
    
});
