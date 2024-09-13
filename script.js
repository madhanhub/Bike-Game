const bike = document.getElementById('bike');
const can = document.getElementById('can');
const human = document.getElementById('human');
const ScoreDisplay = document.getElementById('Score');

let score = 0;
let bikePosition = 125;
let gameInterval;
let gameSpeed = 5;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && bikePosition > 0) {
        bikePosition -= 20;
    } else if (event.key === 'ArrowRight' && bikePosition < 250) {
        bikePosition += 20;
    }
    bike.style.left = `${bikePosition}px`;
});

function startGame() {
    resetObject(can, 'can');
    resetObject(human, 'human');

    gameInterval = setInterval(() => {
        moveObject(can, 'can');
        moveObject(human, 'human');
        checkCollision();
    }, 20);
}

function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));
    if (objectTop >= 600) {
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

function resetObject(object, type) {
    object.style.top = '-50px';
    object.style.left = `${Math.floor(Math.random() * 230)}px`; // Random position within the game area
}

function checkCollision() {
    let bikeRect = bike.getBoundingClientRect();
    let canRect = can.getBoundingClientRect();
    let humanRect = human.getBoundingClientRect();

    // Collision detection logic
    if (!(bikeRect.right < canRect.left || bikeRect.left > canRect.right || 
          bikeRect.bottom < canRect.top || bikeRect.top > canRect.bottom)) {
        score++;
        ScoreDisplay.textContent = score;
        resetObject(can, 'can');
    }

    if (!(bikeRect.right < humanRect.left || bikeRect.left > humanRect.right || 
          bikeRect.bottom < humanRect.top || bikeRect.top > humanRect.bottom)) {
        clearInterval(gameInterval);
        alert(`Game Over! Your score is ${score}`);
        window.location.reload();
    }
}

startGame();
