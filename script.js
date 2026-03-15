/*  mini game */
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

let gameStarted = false
let gameOver = false

let player = {
    x:80,
    y:280,
    width:30,
    height:30,
    velocityY:0,
    jumping:false
}

let gravity = 0.8

let obstacles = []
let coins = []

let score = 0

document.addEventListener("keydown", jump)
canvas.addEventListener("click", startGame)

function startGame(){

    if(!gameStarted){
        gameStarted = true

        setInterval(spawnObstacle,2000)
        setInterval(spawnCoin,3000)
    }
}

function jump(e){

    if(e.code === "Space"){

        e.preventDefault()   // ป้องกันหน้าเว็บ scroll

        if(!gameStarted) return

        if(!player.jumping){
            player.velocityY = -16
            player.jumping = true
        }
    }
}

window.addEventListener("keydown", function(e) {
    if(e.code === "Space"){
        e.preventDefault()
    }
})

function spawnObstacle(){

    if(!gameStarted) return

    obstacles.push({
        x:1000,
        y:290,
        width:20,
        height:40
    })
}

function spawnCoin(){

    if(!gameStarted) return

    coins.push({
        x:1000,
        y:220,
        size:10
    })
}

function update(){

    ctx.clearRect(0,0,canvas.width,canvas.height)

    // START SCREEN
if(!gameStarted){

    ctx.fillStyle="white"
    ctx.textAlign="center"

    ctx.font="42px Arial"
    ctx.fillText("START GAME",canvas.width/2,canvas.height/2 - 20)

    ctx.font="22px Arial"
    ctx.fillText("High Score: " + highScore, canvas.width/2, canvas.height/2 + 20)

    ctx.font="18px Arial"
    ctx.fillText("Click screen to start",canvas.width/2,canvas.height/2 + 55)

    requestAnimationFrame(update)
    return
}

    // PLAYER PHYSICS
    player.velocityY += gravity
    player.y += player.velocityY

    if(player.y > 280){
        player.y = 280
        player.jumping = false
    }

    // DRAW PLAYER
    ctx.fillStyle="white"
    ctx.fillRect(player.x,player.y,player.width,player.height)

    // OBSTACLES
    for(let i=0;i<obstacles.length;i++){

        obstacles[i].x -= 6

        ctx.fillStyle="red"
        ctx.fillRect(obstacles[i].x,obstacles[i].y,obstacles[i].width,obstacles[i].height)

        if(
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y
        ){
        if(score > highScore){
        highScore = score
        localStorage.setItem("runnerHighScore", highScore)
        }

        alert("Game Over! Score: " + score)
        resetGame()
        }
    }


    // ResetGame
    function resetGame(){

    gameStarted = false

    score = 0

    obstacles = []
    coins = []

    player.y = 280
    player.velocityY = 0
    player.jumping = false

    }

    // COINS
    for(let i=0;i<coins.length;i++){

        coins[i].x -= 6

        ctx.fillStyle="gold"
        ctx.beginPath()
        ctx.arc(coins[i].x,coins[i].y,coins[i].size,0,Math.PI*2)
        ctx.fill()

        if(
            player.x < coins[i].x + coins[i].size &&
            player.x + player.width > coins[i].x &&
            player.y < coins[i].y + coins[i].size &&
            player.y + player.height > coins[i].y
        ){
            coins.splice(i,1)
            score++
        }
    }

    // SCORE
    ctx.fillStyle="white"
    ctx.font="20px Arial"
    ctx.textAlign="right"
    ctx.fillText("Score: " + score, canvas.width - 20, 30)
    ctx.fillText("High Score: " + highScore, canvas.width - 20, 55)

    requestAnimationFrame(update)
}

let highScore = localStorage.getItem("runnerHighScore") || 0

update()

/* Scroll Button */

const sections = document.querySelectorAll("#hero, #role, #experience, #project")
const dots = document.querySelectorAll(".dot")

window.addEventListener("scroll",()=>{

    let current=""

    sections.forEach(section=>{

        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight

        if(window.scrollY >= sectionTop - sectionHeight/3){

            current = section.getAttribute("id")

        }

    })

    dots.forEach(dot=>{

        dot.classList.remove("active")

        if(dot.dataset.section === current){

            dot.classList.add("active")

        }

    })

})

dots.forEach(dot=>{

    dot.addEventListener("click",()=>{

        const target = document.getElementById(dot.dataset.section)

        window.scrollTo({
            top:target.offsetTop,
            behavior:"smooth"
        })

    })

})

document.getElementById("scrollUp").addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});
document.getElementById("scrollDown").addEventListener("click", () => {

    window.scrollTo({
        top:document.body.scrollHeight,
        behavior:"smooth"
    });

});


/* animation */

const revealElements = document.querySelectorAll(".reveal-right");

function revealOnScroll(){

const windowHeight = window.innerHeight;

revealElements.forEach(el => {

const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){
el.classList.add("active");
}

});

}

window.addEventListener("scroll", revealOnScroll);


/* Project1  */
const slider = document.querySelector(".media-slider")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")

let index = 0

next.onclick = () =>{
    index++
    if(index > 3) index = 0
    slider.style.transform = `translateX(-${index * 100}%)`
}

prev.onclick = () =>{
    index--
    if(index < 0) index = 3
    slider.style.transform = `translateX(-${index * 100}%)`
}