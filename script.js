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

const sections = document.querySelectorAll("#hero, #role, #experience, #project");
const dots = document.querySelectorAll(".dot");
const scrollUpBtn = document.getElementById("scrollUp");
const scrollDownBtn = document.getElementById("scrollDown");

if (dots.length > 0) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
    dots.forEach(dot => {
      dot.classList.remove("active");
      if (dot.dataset.section === current) {
        dot.classList.add("active");
      }
    });
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const target = document.getElementById(dot.dataset.section);
      if (target) window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    });
  });
}

if (scrollUpBtn) {
  scrollUpBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
}


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

// ======== GAMES I'VE PLAYED ========
(function () {

  const ALSO = [
    { id: 'elden',  name: 'Elden Ring',       sub: 'Action RPG · 120h', status: 'completed', emoji: '⚔️',  bg: '#0e0818', tag: 'Action RPG' },
    { id: 'ds3',    name: 'Dark Souls III',   sub: 'Action RPG · 80h',  status: 'completed', emoji: '🐉',  bg: '#110808', tag: 'Action RPG' },
    { id: 'mhw',    name: 'Monster Hunter',   sub: 'Action RPG · 200h', status: 'completed', emoji: '🗡️',  bg: '#081108', tag: 'Action RPG' },
    { id: 'mc',     name: 'Minecraft',        sub: 'Survival · 400h',   status: 'completed', emoji: '⛏️',  bg: '#0a1505', tag: 'Survival'   },
    { id: 'forest', name: 'The Forest',       sub: 'Survival · 60h',    status: 'completed', emoji: '🌲',  bg: '#051105', tag: 'Survival'   },
    { id: 're4',    name: 'Resident Evil 4',  sub: 'Horror · 30h',      status: 'completed', emoji: '🧟',  bg: '#150808', tag: 'Horror'     },
    { id: 'botw',   name: 'Zelda: BotW',      sub: 'Adventure · 110h',  status: 'completed', emoji: '🗺️',  bg: '#0a1205', tag: 'Adventure'  },
    { id: 'gow',    name: 'God of War',       sub: 'Adventure · 50h',   status: 'completed', emoji: '🪓',  bg: '#170d05', tag: 'Adventure'  },
    { id: 'rdr2',   name: 'RDR2',             sub: 'Adventure · 130h',  status: 'completed', emoji: '🤠',  bg: '#150e05', tag: 'Adventure'  },
    { id: 'portal', name: 'Portal 2',         sub: 'Puzzle · 15h',      status: 'completed', emoji: '🔵',  bg: '#050d0d', tag: 'Puzzle'     },
    { id: 'sf6',    name: 'Street Fighter 6', sub: 'Fighting · 60h',    status: 'playing',   emoji: '🥊',  bg: '#110511', tag: 'Fighting'   },
    { id: 'tekken', name: 'Tekken 8',         sub: 'Fighting · 40h',    status: 'playing',   emoji: '👊',  bg: '#110f05', tag: 'Fighting'   },
  ];

  const row = document.getElementById('chipsRow');
  if (!row) return;

  const els = {};

  function badgeCls(s) { return s === 'playing' ? 'b-play' : 'b-done'; }
  function badgeTxt(s) { return s === 'playing' ? 'Playing' : 'Completed'; }

  function makeChip(g) {
    const el = document.createElement('div');
    el.className = 'gp-chip';
    el.innerHTML = `<em>${g.emoji}</em><span>${g.name}</span><span class="ctag">${g.tag}</span>`;
    el.addEventListener('click', () => toggle(g));
    return el;
  }

  function makeCard(g) {
    const el = document.createElement('div');
    el.className = 'gp-card-exp';
    el.innerHTML = `
      <div class="c-thumb" style="background:${g.bg}">${g.emoji}</div>
      <div class="c-body">
        <div class="c-name">${g.name}</div>
        <div class="c-sub">${g.sub}</div>
        <span class="now-badge ${badgeCls(g.status)}">${badgeTxt(g.status)}</span>
      </div>`;
    el.addEventListener('click', () => toggle(g));
    return el;
  }

  function toggle(g) {
    const current = els[g.id];
    const isCard  = current.classList.contains('gp-card-exp');
    const next    = isCard ? makeChip(g) : makeCard(g);
    row.replaceChild(next, current);
    els[g.id] = next;
  }

  ALSO.forEach(g => {
    const chip = makeChip(g);
    els[g.id]  = chip;
    row.appendChild(chip);
  });

})();
