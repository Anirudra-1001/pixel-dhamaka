// ========== SNAKE GAME ==========
let snakeGameRunning = false;
function startSnake() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Snake Game Logic (Simplified)
    let snake = [{x: 140, y: 140}];
    let dx = 20, dy = 0;
    let foodX, foodY;
    let score = 0;
    
    function randomFood() {
        foodX = Math.floor(Math.random() * 14) * 20;
        foodY = Math.floor(Math.random() * 14) * 20;
    }
    randomFood();
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && dy === 0) { dy = -20; dx = 0; }
        if (e.key === 'ArrowDown' && dy === 0) { dy = 20; dx = 0; }
        if (e.key === 'ArrowLeft' && dx === 0) { dx = -20; dy = 0; }
        if (e.key === 'ArrowRight' && dx === 0) { dx = 20; dy = 0; }
    });
    
    function gameLoop() {
        ctx.clearRect(0, 0, 280, 280);
        
        // Move Snake
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        
        // Eat Food
        if (head.x === foodX && head.y === foodY) {
            score++;
            document.getElementById('snakeScore').textContent = score;
            randomFood();
        } else {
            snake.pop();
        }
        
        // Draw Food
        ctx.fillStyle = 'red';
        ctx.fillRect(foodX, foodY, 18, 18);
        
        // Draw Snake
        ctx.fillStyle = '#0f0';
        snake.forEach((part, i) => {
            ctx.fillRect(part.x, part.y, 18, 18);
            if (i === 0) ctx.fillStyle = '#0ff';
        });
        
        setTimeout(gameLoop, 150);
    }
    gameLoop();
}

// ========== TIC TAC TOE ==========
let tictactoeBoard = ['', '', '', '', '', '', '', '', ''];
let tictactoeCurrentPlayer = 'X';
let tictactoeGameActive = true;

function createTicTacToeBoard() {
    const board = document.getElementById('tictactoeBoard');
    board.innerHTML = '';
    tictactoeBoard.forEach((cell, index) => {
        const cellEl = document.createElement('div');
        cellEl.className = 'tictactoe-cell';
        cellEl.textContent = cell;
        cellEl.onclick = () => makeMove(index);
        board.appendChild(cellEl);
    });
}

function makeMove(index) {
    if (tictactoeBoard[index] !== '' || !tictactoeGameActive) return;
    
    tictactoeBoard[index] = tictactoeCurrentPlayer;
    createTicTacToeBoard();
    
    if (checkWinner()) {
        document.getElementById('tictactoeStatus').textContent = `${tictactoeCurrentPlayer} Wins!`;
        tictactoeGameActive = false;
        return;
    }
    
    tictactoeCurrentPlayer = tictactoeCurrentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('tictactoeStatus').textContent = `Your Turn (${tictactoeCurrentPlayer})`;
}

function resetTictactoe() {
    tictactoeBoard = ['', '', '', '', '', '', '', '', ''];
    tictactoeCurrentPlayer = 'X';
    tictactoeGameActive = true;
    document.getElementById('tictactoeStatus').textContent = 'Your Turn (X)';
    createTictactoeBoard();
}

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return winPatterns.some(pattern => 
        tictactoeBoard[pattern[0]] && 
        tictactoeBoard[pattern[0]] === tictactoeBoard[pattern[1]] &&
        tictactoeBoard[pattern[0]] === tictactoeBoard[pattern[2]]
    );
}

createTictactoeBoard();

// ========== PONG GAME ==========
let pong = {
    ball: {x: 140, y: 100, dx: 4, dy: 4, radius: 8},
    paddle1: {x: 10, y: 80, width: 10, height: 40},
    paddle2: {x: 260, y: 80, width: 10, height: 40},
    score1: 0, score2: 0
};

function pongLoop() {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear
    ctx.clearRect(0, 0, 280, 200);
    
    // Move Ball
    pong.ball.x += pong.ball.dx;
    pong.ball.y += pong.ball.dy;
    
    // Ball Collision
    if (pong.ball.y < 0 || pong.ball.y > 190) pong.ball.dy = -pong.ball.dy;
    if (pong.ball.x < 20 && pong.ball.x > 10 && 
        pong.ball.y > pong.paddle1.y && pong.ball.y < pong.paddle1.y + 40) {
        pong.ball.dx = Math.abs(pong.ball.dx);
    }
    if (pong.ball.x > 260 && pong.ball.x < 270 && 
        pong.ball.y > pong.paddle2.y && pong.ball.y < pong.paddle2.y + 40) {
        pong.ball.dx = -Math.abs(pong.ball.dx);
    }
    
    // Score
    if (pong.ball.x < 0) { pong.score2++; pong.ball.x = 140; pong.ball.y = 100; }
    if (pong.ball.x > 280) { pong.score1++; pong.ball.x = 140; pong.ball.y = 100; }
    document.getElementById('pongScore').textContent = `${pong.score1} - ${pong.score2}`;
    
    // Draw
    ctx.fillStyle = '#0f0';
    ctx.fillRect(pong.paddle1.x, pong.paddle1.y, pong.paddle1.width, pong.paddle1.height);
    ctx.fillRect(pong.paddle2.x, pong.paddle2.y, pong.paddle2.width, pong.paddle2.height);
    ctx.beginPath();
    ctx.arc(pong.ball.x, pong.ball.y, pong.ball.radius, 0, Math.PI * 2);
    ctx.fill();
    
    setTimeout(pongLoop, 30);
}
pongLoop();

// Controls for Pong
document.addEventListener('keydown', (e) => {
    if (e.key === 'w' && pong.paddle1.y > 0) pong.paddle1.y -= 20;
    if (e.key === 's' && pong.paddle1.y < 160) pong.paddle1.y += 20;
    if (e.key === 'ArrowUp' && pong.paddle2.y > 0) pong.paddle2.y -= 20;
    if (e.key === 'ArrowDown' && pong.paddle2.y < 160) pong.paddle2.y += 20;
});

// ========== FLAPPY BIRD ==========
let flappyBird = {
    bird: {x: 50, y: 150, vy: 0, gravity: 0.5, jump: -10},
    pipes: [],
    score: 0,
    gameRunning: false
};

function startFlappy() {
    flappyBird.gameRunning = true;
    flappyBird.bird.y = 150;
    flappyBird.score = 0;
    flappyBird.pipes = [];
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') flappyBird.bird.vy = flappyBird.bird.jump;
});
document.getElementById('flappyCanvas').onclick = () => flappyBird.bird.vy = flappyBird.bird.jump;

function flappyLoop() {
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    
    if (!flappyBird.gameRunning) {
        ctx.fillStyle = '#0f0';
        ctx.font = '24px Orbitron';
        ctx.fillText('Click to Play!', 60, 150);
        requestAnimationFrame(flappyLoop);
        return;
    }
    
    ctx.clearRect(0, 0, 280, 280);
    
    // Bird Physics
    flappyBird.bird.vy += flappyBird.bird.gravity;
    flappyBird.bird.y += flappyBird.bird.vy;
    
    // Pipes
    if (Math.random() < 0.02) {
        flappyBird.pipes.push({
            x: 280,
            top: Math.random() * 100 + 20,
            bottom: 280 - (Math.random() * 100 + 120),
            passed: false
        });
    }
    
    flappyBird.pipes.forEach((pipe, i) => {
        pipe.x -= 3;
        ctx.fillStyle = '#0f0';
        ctx.fillRect(pipe.x, 0, 50, pipe.top);
        ctx.fillRect(pipe.x, 280 - pipe.bottom, 50, pipe.bottom);
        
        // Score
        if (!pipe.passed && pipe.x + 50 < 50) {
            flappyBird.score++;
            pipe.passed = true;
            document.getElementById('flappyScore').textContent = `Score: ${flappyBird.score}`;
        }
        
        // Collision
        if (pipe.x < 80 && pipe.x > -50) {
            if (flappyBird.bird.y < pipe.top || flappyBird.bird.y > 280 - pipe.bottom) {
                flappyBird.gameRunning = false;
            }
        }
    });
    
    // Draw Bird
    ctx.fillStyle = '#ff0';
    ctx.beginPath();
    ctx.arc(50, flappyBird.bird.y, 15, 0, Math.PI * 2);
    ctx.fill();
    
    requestAnimationFrame(flappyLoop);
}
flappyLoop();
