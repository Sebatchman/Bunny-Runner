const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const scoreEl = document.querySelector('#scoreNum');
const instructions = document.querySelector('#mainInstructions');
const title = document.querySelector('#instructionsTitle');
const endScoreEl = document.querySelector('#endScore-Wrapper');
const endScoreNum = document.querySelector('#endScore');
const startBtn = document.querySelector('#start-btn');

canvas.width = 700;
canvas.height = 600;

let bunny_x = canvas.width / 5;
let bunny_y = canvas.height / 1.12;
let bunnySize = 60;

let carrotSize = 50;
let carrot_x = canvas.width + carrotSize;
let carrot_y = generateRandomNumber(canvas.height - carrotSize, (canvas.height - canvas.width / 2) + carrotSize * 2);

let cactusSizeX = 150;
let cactusSizeY = generateRandomNumber(275, 435);
let cactus_x = canvas.width + cactusSizeX;
let cactus_y = generateRandomNumber(canvas.height - (cactusSizeY - 80), canvas.height - (cactusSizeY - 120));

let cactusSizeX_2 = 150;
let cactusSizeY_2 = generateRandomNumber(255, 435);
let cactus_x_2 = canvas.width + (cactusSizeX * 4);
let cactus_y_2 = generateRandomNumber(canvas.height - (cactusSizeY - 80), canvas.height - (cactusSizeY - 120));

let cloudSizeX = 180;
let cloudSizeY = 120
let cloud_x = canvas.width - cloudSizeX;
let cloud_y = 0;

let cloudSizeX_2 = 140;
let cloudSizeY_2 = 80;
let cloud_x_2 = canvas.width - (cloudSizeX_2 * 1.85);
let cloud_y_2 = cloudSizeY / 4;

let cloudSizeX_3 = 160;
let cloudSizeY_3 = 100;
let cloud_x_3 = canvas.width - (cloudSizeX_3 * 2.7);
let cloud_y_3 = 20;

let cloudSizeX_4 = 130;
let cloudSizeY_4 = 70;
let cloud_x_4 = canvas.width - (cloudSizeX_4 * 5.2);
let cloud_y_4 = cloudSizeY / 2.8;

let poopSizeX = 60;
let poopSizeY = 60;
let poop_x = cloud_x + 60;
let poop_y = 50;

let poopSizeX_2 = 40;
let poopSizeY_2 = 40;
let poop_x_2 = cloud_x_2 + 40;
let poop_y_2 = 60;

let gravity = 0.9;
let JUMPED = false;
let HIDDEN = true;
let gameIsRunning = false;
let score = 0;
let interval_Game_Id;
let interval_Up_Id;

function gameLoop() {
    let bunny = new Image();
    bunny.src = './pixelBunny.png';
    interval_Game_Id = setInterval(() => {
        c.clearRect(0, 0, canvas.width, canvas.height);
        generateCactus$();
        generatePoop();
        c.drawImage(bunny, bunny_x, bunny_y, bunnySize, bunnySize);
        Gravity();
        generateCarrot();
        moveCarrot();
        carrotCollision();
        cactusCollisionDetection();
        moveCactus$();
        generatePoop2();
        generateClouds();
        moveClouds();
        movePoop();
        dropPoop();
        poopCollisionDetection();
        movePoop2();
        dropPoop2();
        poopCollisionDetection2();
    }, 20);
}

function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

const isHidden = () => {
    HIDDEN === true ? mainInstructions.style.display = 'none' : mainInstructions.style.display = 'grid';
    if (HIDDEN === false) {
        endScoreEl.style.display = 'none';
        startBtn.style.display = 'none';
    } if (HIDDEN === true && !gameIsRunning) {
        endScoreEl.style.display = 'flex';
        startBtn.style.display = 'flex';
    }
}

title.addEventListener('click', function() {
    if (HIDDEN === true) {
    HIDDEN = false;
    } else {
        HIDDEN = true;
    }
})

function jump() {
    JUMPED = true;
    let jumpSpeed = 25;
    playAudio('jump.wav');
    interval_Up_Id = setInterval(() => {
        if (bunny_y > 10) {
            jumpSpeed = jumpSpeed * gravity;
            bunny_y = bunny_y - jumpSpeed;
        }
    }, 20);
}

function Gravity() {
        if (bunny_y <= 538 && JUMPED === true) {
            bunny_y += 7;
    }
}

function generateCarrot() {
    const carrot = new Image();
    carrot.src = './carrot.png';
    c.drawImage(carrot, carrot_x, carrot_y, carrotSize, carrotSize);
}

function moveCarrot() {
    carrot_x -= 4;
    if (carrot_x === -carrotSize) {
        carrot_x = canvas.width + carrotSize;
        carrot_y = generateRandomNumber(canvas.height - carrotSize, (canvas.height - canvas.width / 2) + (carrotSize * 2));
    }
}  

function carrotCollision() {
   if (getDistance(bunny_x, bunny_y, carrot_x, carrot_y) < bunnySize - 10) {
        carrot_x = canvas.width + carrotSize;
        carrot_y = generateRandomNumber(canvas.height - carrotSize, (canvas.height - canvas.width / 2) + carrotSize * 2);
        score = score + 1;
        scoreEl.innerHTML = score;
        endScoreNum.innerHTML = score;
        playAudio('eat.wav');
   }
}

function generateCactus1() {
    const cactus = new Image();
    cactus.src = './cactus.png';
    c.drawImage(cactus, cactus_x, cactus_y, cactusSizeX, cactusSizeY);
}

function generateCactus2() {
    const cactus2 = new Image();
    cactus2.src = './cactus.png';
    c.drawImage(cactus2, cactus_x_2, cactus_y_2, cactusSizeX_2, cactusSizeY_2);
}

function moveCactus1() {
    cactus_x -= 6;
    if (cactus_x <= -cactusSizeX) {
    cactus_x = canvas.width + cactusSizeX;
    cactus_y = generateRandomNumber(canvas.height - (cactusSizeY - 80), canvas.height - (cactusSizeY - 120));
    cactusSizeY = generateRandomNumber(275, 435);
    }
}

function moveCactus2() {
    cactus_x_2 -= 6;
    if (cactus_x_2 <= -cactusSizeX_2) {
        cactus_x_2 = canvas.width + cactusSizeX_2;
        cactus_y_2 = generateRandomNumber(canvas.height - (cactusSizeY_2 - 80), canvas.height - (cactusSizeY_2 - 120));
        cactusSizeY_2 = generateRandomNumber(275, 435);
    }
}

function moveCactus$() {
    moveCactus1();
    moveCactus2();
}

function cactusCollisionDetection() {
    if (cactus_x + 50 >= 140 && cactus_x + 50 <= 200 && bunny_y >= cactus_y) {
        clearInterval(interval_Game_Id);
        clearInterval(interval_Up_Id);
        endScoreEl.style.display = 'flex';
        startBtn.style.display = 'flex';
        !gameIsRunning;
        playAudio('gameOver.wav');
        bunny_y = 50;
   }
   if (cactus_x_2 + 50 >= 140 && cactus_x_2 + 50 <= 200 && bunny_y >= cactus_y_2) {
        clearInterval(interval_Game_Id);
        clearInterval(interval_Up_Id);
        endScoreEl.style.display = 'flex';
        startBtn.style.display = 'flex';
        !gameIsRunning;
        playAudio('gameOver.wav');
        bunny_y = 50;
   }
}

function generateCloud1() {
    const cloud1 = new Image();
    cloud1.src = './cloud.png';
    c.drawImage(cloud1, cloud_x, cloud_y, cloudSizeX, cloudSizeY);
}

function generateCloud2() {
    const cloud2 = new Image();
    cloud2.src = './cloud.png';
    c.drawImage(cloud2, cloud_x_2, cloud_y_2, cloudSizeX_2, cloudSizeY_2);
}

function generateCloud3() {
    const cloud3 = new Image();
    cloud3.src = './cloud.png';
    c.drawImage(cloud3, cloud_x_3, cloud_y_3, cloudSizeX_3, cloudSizeY_3);
}

function generateCloud4() {
    const cloud4 = new Image();
    cloud4.src = './cloud.png';
    c.drawImage(cloud4, cloud_x_4, cloud_y_4, cloudSizeX_4, cloudSizeY_4);
}

function moveCloud4() {
    cloud_x_4 -= 2.2;
    if (cloud_x_4 <= -cloudSizeX_4) {
        cloud_x_4 = canvas.width + cloudSizeX_4;
        cloud_y_4 = cloudSizeY / 2.8;
    }
}

function moveCloud3() {
    cloud_x_3 -= 2;
    if (cloud_x_3 <= -cloudSizeX_3) {
        cloud_x_3 = canvas.width + cloudSizeX_3;
        cloud_y_3 = 20;
    }
}

function moveCloud2() {
    cloud_x_2 -= 2.2;
    if (cloud_x_2 <= -cloudSizeX_2) {
        cloud_x_2 = canvas.width + cloudSizeX_2;
        cloud_y_2 = cloudSizeY / 4;
    }
}

function moveCloud1() {
    cloud_x -= 2;
    if (cloud_x <= -cloudSizeX) {
        cloud_x = canvas.width + cloudSizeX;
        cloud_y = 0;
    }
}

function generatePoop() {
    const poop = new Image();
    poop.src = './poop.png';
    c.drawImage(poop, poop_x, poop_y, poopSizeX, poopSizeY);
}

function movePoop() {
    poop_x -= 2;
    if (poop_x <= -cloudSizeX) {
        poop_x = canvas.width + cloudSizeX;
        poop_y = 50;
    }
}

const dropPoop = () => {
    poop_x <= generateRandomNumber(canvas.width / 2 - poopSizeX, canvas.width / 2 - (poopSizeX * 1.5))
    ? poop_y += 3 : poop_y += 0;
}

function poopCollisionDetection() {
    if (getDistance(bunny_x, bunny_y, poop_x, poop_y) < bunnySize - 20) {
        clearInterval(interval_Game_Id);
        clearInterval(interval_Up_Id);
        endScoreEl.style.display = 'flex';
        startBtn.style.display = 'flex';
        !gameIsRunning;
        playAudio('gameOver.wav');
        bunny_y = 50;
   }
}

function generatePoop2() {
    const poop2 = new Image();
    poop2.src = './poop.png';
    c.drawImage(poop2, poop_x_2, poop_y_2, poopSizeX_2, poopSizeY_2);
}

function movePoop2() {
    poop_x_2 -= 2.2;
    if (poop_x_2 <= -cloudSizeX_2) {
        poop_x_2 = canvas.width + cloudSizeX_2;
        poop_y_2 = 60;
    }
}

const dropPoop2 = () => {
    poop_x_2 <= generateRandomNumber(canvas.width / 2 - poopSizeX_2, canvas.width / 2 - (poopSizeX_2 * 1.5))
    ? poop_y_2 += 3 : poop_y_2 += 0;
}

function poopCollisionDetection2() {
    if (getDistance(bunny_x, bunny_y, poop_x_2, poop_y_2) < bunnySize - 30) {
        clearInterval(interval_Game_Id);
        clearInterval(interval_Up_Id);
        endScoreEl.style.display = 'flex';
        startBtn.style.display = 'flex';
        !gameIsRunning;
        playAudio('gameOver.wav');
        bunny_y = 50;
   }
}

function generateClouds() {
    generateCloud4();
    generateCloud2();
    generateCloud1();
    generateCloud3();
}

function moveClouds() {
    moveCloud4();
    moveCloud3();
    moveCloud2();
    moveCloud1();
}

function generateCactus$() {
    generateCactus1();
    generateCactus2();
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) +
    Math.pow(yDistance, 2));
}

setInterval(isHidden, 100);

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 32 && gameIsRunning === true) {
       jump();
    }
})

startBtn.addEventListener('click', function() {
    gameIsRunning = true;
    if (gameIsRunning === true) {
        gameLoop();
    }
    endScoreEl.style.display = 'none';
    startBtn.style.display = 'none';
    score = 0;
    scoreEl.innerHTML = score;
    endScoreNum.innerHTML = score;
    playAudio('gameStart.wav');
})





