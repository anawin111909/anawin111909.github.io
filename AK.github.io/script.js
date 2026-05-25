/* mini game 

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const safeElement = document.querySelector("section"); // หรือ class ที่ครอบ text

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ---------------- STATE ----------------
let gameRunning = false;
let score = 0;
let lifeTime = 0;
let timeLeft = 10;

// ---------------- GHOST ----------------
let ghosts = [];

function spawnGhost() {
    return {
        x: Math.random() * (canvas.width - 100) + 50,
        y: Math.random() * (canvas.height - 200),
        radius: 30,
        type: Math.random() > 0.7 ? "bad" : "good",
        opacity: 0
    };
}

function isOverlappingText(x, y, radius) {
    const rect = document.querySelector("section").getBoundingClientRect();

    return (
        x + radius > rect.left &&
        x - radius < rect.right &&
        y + radius > rect.top &&
        y - radius < rect.bottom
    );
}

function spawnGhost() {
    let x, y;

    do {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
    } while (isOverlappingText(x, y, 30)); // 🔥 กันชน

    return {
        x,
        y,
        radius: 30,
        type: Math.random() > 0.7 ? "bad" : "good",
        opacity: 0
    };
}

function spawnMultipleGhosts() {
    ghosts = [];
    let count = Math.floor(Math.random() * 2) + 4; // 4-5 ตัว

    for (let i = 0; i < count; i++) {
        ghosts.push(spawnGhost());
    }
}
// ---------------- START GAME ----------------
startBtn.addEventListener("click", () => {

    if (!gameRunning) {
        // ▶ START GAME
        gameRunning = true;

        score = 0;
        lifeTime = 0; // 🔥 reset timer

        document.getElementById("score").textContent = score;
        timeLeft = 10;

        document.getElementById("time").textContent = timeLeft;
        document.body.style.cursor = "url('gun.png'), auto";

        startBtn.textContent = "End Game";

        spawnMultipleGhosts();

    } else {
        // ⛔ END GAME
        gameRunning = false;

        score = 0;
        lifeTime = 0; // 🔥 reset timer

        document.getElementById("score").textContent = score;

        document.body.style.cursor = "default";

        startBtn.textContent = "Start Game";

        ghosts = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

});

// ---------------- CLICK ยิง ----------------
canvas.addEventListener("click", (e) => {
    if (!gameRunning) return;

    checkHit(e.clientX, e.clientY);
});

// ---------------- UPDATE ----------------
function update() {
    // fade
    ghosts.forEach(ghost => {
        if (ghost.opacity < 1) {
            ghost.opacity += 0.02;
        }
    });

    // timer ลดลง
    timeLeft -= 1 / 60; // ลดตาม frame

    if (timeLeft <= 0) {
        gameOver();
    }

    document.getElementById("time").textContent = Math.ceil(timeLeft);

    // spawn ใหม่
    lifeTime++;
    if (lifeTime > 300) {
        spawnMultipleGhosts();
        lifeTime = 0;
    }
}

// ---------------- DRAW ----------------
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ghosts.forEach(ghost => {
        ctx.globalAlpha = ghost.opacity;

        ctx.beginPath();
        ctx.arc(ghost.x, ghost.y, ghost.radius, 0, Math.PI * 2);

        ctx.fillStyle = ghost.type === "good" ? "green" : "red";

        ctx.fill();
    });

    ctx.globalAlpha = 1;
}

// ---------------- HIT ----------------
function checkHit(mouseX, mouseY) {
    for (let i = 0; i < ghosts.length; i++) {
        let ghost = ghosts[i];

        let dx = mouseX - ghost.x;
        let dy = mouseY - ghost.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ghost.radius) {
            console.log("โดน!");

            if (ghost.type === "good") {
                score++;
                timeLeft += 3;

                document.getElementById("score").textContent = score;

                ghosts.splice(i, 1); // ลบตัวที่โดน

                return; // 🔥 สำคัญมาก
            } 
            
            if (ghost.type === "bad") {
                gameOver();
                return; // 🔥 สำคัญมาก
            }
        }
    }
}

// ---------------- LOOP ----------------
function gameLoop() {
    if (gameRunning) {
        update();
        draw();
    }
    requestAnimationFrame(gameLoop);
}
// ---------------- Game Over ----------------
function gameOver() {
    alert("Game Over!");

    gameRunning = false;

    document.body.style.cursor = "default";
    startBtn.textContent = "Start Game";

    ghosts = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

gameLoop();

*/

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


// ================= PROJECT1 SLIDER =================

document.querySelectorAll(".project-media").forEach(media => {

    const slider = media.querySelector(".media-slider");
    const slides = media.querySelectorAll(".slide");
    const dots = media.querySelectorAll(".slider-dot");

    if(!slider || slides.length === 0) return;

    let index = 0;

    function update(){
        slider.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));

        if(dots[index]){
            dots[index].classList.add("active");
        }
    }

    // click dot
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            update();
        });
    });

    // auto slide
    let interval = setInterval(() => {
        index = (index + 1) % slides.length;
        update();
    }, 3000);

    // pause on hover
    media.addEventListener("mouseenter", () => {
        clearInterval(interval);
    });

    media.addEventListener("mouseleave", () => {
        interval = setInterval(() => {
            index = (index + 1) % slides.length;
            update();
        }, 3000);
    });

});

