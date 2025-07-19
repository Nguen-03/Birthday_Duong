const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tempImg = ["enemy1.jpg", "enemy2.jpg", "enemy3.jpg", "enemy4.jpg", "enemy5.jpg"];
const pic = [];
for (let temp of tempImg){
    const bruh = new Image();
    bruh.src = temp;
    pic.push(bruh);
}

const playerImg = new Image();
playerImg.src = "player.jpg";

let car = {
    x: 175,
    y: 500,
    width: 50,
    height: 100,
    speed: 4,
    type: playerImg
};

let moveLeft = false;
let moveRight = false;

document.getElementById("left").addEventListener("pointerdown", () => moveLeft = true);
document.getElementById("left").addEventListener("pointerup", () => moveLeft = false);
document.getElementById("right").addEventListener("pointerdown", () => moveRight = true);
document.getElementById("right").addEventListener("pointerup", () => moveRight = false);


function control(){
    if (moveLeft && car.x > 0) 
        car.x -= car.speed;
    if (moveRight && car.x <= canvas.width - car.width) 
        car.x += car.speed;
}


let enemies = [];
function spawnEnemies(){
    const x = Math.floor(Math.random() * 4) * 100 + 25;
    let ImgSize = Math.floor(Math.random() * pic.length);
    var enemy = {
        x: x,
        y: 0,
        width: 50,
        height: 100,
        speed: 5,
        type: pic[ImgSize]
    }
    enemies.push(enemy);
}

let count = 0;


function drawCar(car){
    ctx.drawImage(car.type, car.x, car.y, car.width, car.height);
}

function colision(enemy, car){
    if (enemy.x + enemy.width > car.x 
        && enemy.y + enemy.height > car.y
        && enemy.x < car.x + car.width 
        && enemy.y < car.y + car.height
    ) return true;
    return false;
}

let gameOver = false;

function gameOverScreen(){
    let butt = document.getElementsByClassName("butt");
    for (let i = 0; i < butt.length; ++i){
        butt[i].style.display = "none";
    }
    document.getElementById("gameOver").style.display = "flex";
}

function speedUp(count, car, enemy){
    count += 1;
    if (count % 5000 == 0){
        car.speed += 10;
        enemy.speed += 10;
    }
}

let timeSpawn = 800;

setInterval(spawnEnemies, timeSpawn);
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar(car);
    for (let enemy of enemies){
        drawCar(enemy);
        setInterval(speedUp, 1000);
        if (colision(enemy,car)){
            gameOver = true;
            gameOverScreen();
            break;
        }
        enemy.y += enemy.speed;
    }
    enemies = enemies.filter(e => e.y < canvas.height);
}


document.body.addEventListener("click", () =>{
    document.getElementById("sound").play();
})

function loop(){
    if (!gameOver){
        control();
        draw(); 
        requestAnimationFrame(loop);
    }else{
        gameOverScreen();
    }
}
loop();