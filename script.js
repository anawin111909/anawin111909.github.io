/* ================================================
   SCROLL NAV — section dots
   ================================================ */

const sections    = document.querySelectorAll("#hero, #role, #experience, #project");
const dots        = document.querySelectorAll(".dot");
const scrollUpBtn = document.getElementById("scrollUp");
const scrollDownBtn = document.getElementById("scrollDown");

if (dots.length > 0) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
    dots.forEach(dot => {
      dot.classList.remove("active");
      if (dot.dataset.section === current) dot.classList.add("active");
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
  scrollUpBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

if (scrollDownBtn) {
  scrollDownBtn.addEventListener("click", () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  );
}

/* ================================================
   SCROLL REVEAL
   ================================================ */

const revealElements = document.querySelectorAll(".reveal-right");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    if (el.getBoundingClientRect().top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

/* ================================================
   IMAGE / VIDEO SLIDERS
   ================================================ */

document.querySelectorAll(".project-media").forEach(media => {
  const slider = media.querySelector(".media-slider");
  const slides = media.querySelectorAll(".slide");
  const dots   = media.querySelectorAll(".slider-dot");

  if (!slider || slides.length === 0) return;

  let index = 0;

  function update() {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { index = i; update(); });
  });

  let interval = setInterval(() => {
    index = (index + 1) % slides.length;
    update();
  }, 3000);

  media.addEventListener("mouseenter", () => clearInterval(interval));
  media.addEventListener("mouseleave", () => {
    interval = setInterval(() => {
      index = (index + 1) % slides.length;
      update();
    }, 3000);
  });
});

/* ================================================
   BOOKMARK TAB SWITCHER
   Supports any number of tabs/panels via data-tab
   ================================================ */

function switchTab(id) {
  /* hide all panels */
  document.querySelectorAll('.tab-panel').forEach(function (p) {
    p.classList.remove('active');
  });

  /* deactivate all tabs */
  document.querySelectorAll('.bookmark-tab').forEach(function (t) {
    t.classList.remove('active');
    t.classList.add('inactive');
  });

  /* show selected panel */
  var panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');

  /* activate selected tab */
  var activeTab = document.getElementById('tab-' + id);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.classList.remove('inactive');
  }
}

/* ================================================
   GAMING EXPERIENCE — chip / card toggle
   ================================================ */

(function () {

  const ALSO = [
    { id: "dot2",  name: "Dota 2",                      sub: "MOBA · 4440h",            status: "playing",   emoji: "⚔️",  bg: "#0e0818", tag: "MOBA" },
    { id: "bmw",   name: "Black Myth: Wukong",           sub: "Action RPG · 24h",        status: "playing",   emoji: "🐉",  bg: "#110808", tag: "Action RPG" },
    { id: "sf6",   name: "Street Fighter 6",             sub: "Fighting · 31h",          status: "playing",   emoji: "🗡️",  bg: "#081108", tag: "Fighting" },
    { id: "mc",    name: "Minecraft",                    sub: "Survival · 500h",         status: "completed", emoji: "⛏️",  bg: "#0a1505", tag: "Survival" },
    { id: "fo",    name: "The Forest",                   sub: "Survival · 60h",          status: "completed", emoji: "🌲",  bg: "#051105", tag: "Survival" },
    { id: "sof",   name: "Sons of the Forest",           sub: "Survival · 60h",          status: "playing",   emoji: "🌲",  bg: "#051105", tag: "Survival" },
    { id: "re2",   name: "Resident Evil 2 Remake",       sub: "Horror · 34h",            status: "completed", emoji: "🧟",  bg: "#150808", tag: "Horror" },
    { id: "re3",   name: "Resident Evil 3 Remake",       sub: "Horror · 18h",            status: "completed", emoji: "🧟",  bg: "#150808", tag: "Horror" },
    { id: "re4",   name: "Resident Evil 4 Remake",       sub: "Horror · 51h",            status: "completed", emoji: "🧟",  bg: "#150808", tag: "Horror" },
    { id: "re6",   name: "Resident Evil 6",              sub: "Horror · 40h",            status: "completed", emoji: "🧟",  bg: "#150808", tag: "Horror" },
    { id: "re7",   name: "Resident Evil 7",              sub: "Horror · 27h",            status: "completed", emoji: "🧟",  bg: "#150808", tag: "Horror" },
    { id: "re8",   name: "Resident Evil Village",        sub: "Horror · 46h",            status: "completed", emoji: "🧟",  bg: "#150808", tag: "Horror" },
    { id: "dmc4",  name: "Devil May Cry 4",              sub: "Hack and Slash · 22h",    status: "completed", emoji: "🗺️",  bg: "#0a1205", tag: "Hack and Slash" },
    { id: "dmc5",  name: "Devil May Cry 5",              sub: "Hack and Slash · 22h",    status: "completed", emoji: "🗺️",  bg: "#0a1205", tag: "Hack and Slash" },
    { id: "gow",   name: "God of War",                   sub: "Adventure · 66h",         status: "completed", emoji: "🪓",  bg: "#170d05", tag: "Adventure" },
    { id: "doom",  name: "Doom",                         sub: "FPS · 15h",               status: "completed", emoji: "🤠",  bg: "#150e05", tag: "FPS" },
    { id: "tw3",   name: "The Witcher 3",                sub: "RPG · 150h",              status: "completed", emoji: "🔵",  bg: "#050d0d", tag: "RPG" },
    { id: "bd",    name: "Black Desert Online",          sub: "Action RPG · 100h",       status: "completed", emoji: "🥊",  bg: "#110511", tag: "Action RPG" },
    { id: "cs2",   name: "Counter-Strike 2",             sub: "FPS · 151h",              status: "playing",   emoji: "🔫",  bg: "#110f05", tag: "FPS" },
    { id: "dbx2",  name: "Dragon Ball Xenoverse 2",      sub: "Anime · 303h",            status: "playing",   emoji: "💥",  bg: "#110f05", tag: "Anime" },
    { id: "dbk",   name: "Dragon Ball Kakarot",          sub: "Anime · 107h",            status: "completed", emoji: "💥",  bg: "#110f05", tag: "Anime" },
    { id: "dbsz",  name: "Dragon Ball Sparking Zero",    sub: "Anime · 36h",             status: "playing",   emoji: "💥",  bg: "#110f05", tag: "Anime" },
    { id: "tew",   name: "The Evil Within",              sub: "Horror · 26h",            status: "completed", emoji: "👁️",  bg: "#110f05", tag: "Horror" },
    { id: "gh",    name: "Green Hell",                   sub: "Survival · 30h",          status: "completed", emoji: "🌿",  bg: "#110f05", tag: "Survival" },
    { id: "lfd",   name: "Left 4 Dead",                  sub: "FPS · 30h",               status: "completed", emoji: "🧟",  bg: "#110f05", tag: "FPS" },
    { id: "lfd2",  name: "Left 4 Dead 2",               sub: "FPS · 30h",               status: "completed", emoji: "🧟",  bg: "#110f05", tag: "FPS" },
    { id: "ol",    name: "Outlast",                      sub: "Horror · 20h",            status: "completed", emoji: "📹",  bg: "#110f05", tag: "Horror" },
    { id: "pd2",   name: "Payday 2",                     sub: "FPS · 324h",              status: "completed", emoji: "💰",  bg: "#110f05", tag: "FPS" },
    { id: "pxa",   name: "PixARK",                       sub: "Open World · 201h",       status: "completed", emoji: "🏹",  bg: "#110f05", tag: "Open World" },
    { id: "sod2",  name: "State of Decay 2",             sub: "Survival · 75h",          status: "completed", emoji: "🪓",  bg: "#110f05", tag: "Survival" },
  ];

  const row = document.getElementById("chipsRow");
  if (!row) return;

  const els = {};

  function badgeCls(s) { return s === "playing" ? "b-play" : "b-done"; }
  function badgeTxt(s) { return s === "playing" ? "Playing" : "Completed"; }

  function makeChip(g) {
    const el = document.createElement("div");
    el.className = "gp-chip";
    el.innerHTML = `<em>${g.emoji}</em><span>${g.name}</span><span class="ctag">${g.tag}</span>`;
    el.addEventListener("click", () => toggle(g));
    return el;
  }

  function makeCard(g) {
    const el = document.createElement("div");
    el.className = "gp-card-exp";
    el.innerHTML = `
      <div class="c-thumb" style="background:${g.bg}">${g.emoji}</div>
      <div class="c-body">
        <div class="c-name">${g.name}</div>
        <div class="c-sub">${g.sub}</div>
        <span class="now-badge ${badgeCls(g.status)}">${badgeTxt(g.status)}</span>
      </div>`;
    el.addEventListener("click", () => toggle(g));
    return el;
  }

  function toggle(g) {
    const current = els[g.id];
    const isCard  = current.classList.contains("gp-card-exp");
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
(function() {
  var current = 0;
  var total = 2;
 
  window.hmSlide = function(dir) {
    current = (current + dir + total) % total;
    hmUpdateUI();
  };
 
  window.hmGoTo = function(i) {
    current = i;
    hmUpdateUI();
  };
 
  function hmUpdateUI() {
    document.getElementById('hm-track').style.transform = 'translateX(-' + (current * 100) + '%)';
    document.getElementById('hm-counter').textContent = (current + 1) + ' / ' + total;
    document.getElementById('hm-tab-0').className = current === 0 ? 'slider-tab active-quick' : 'slider-tab inactive-quick';
    document.getElementById('hm-tab-1').className = current === 1 ? 'slider-tab active-std'   : 'slider-tab inactive-std';
  }
})();

/* ── QA Card Slider (Havenfall / LifeRun) ── */
(function () {
  var cur   = 0;
  var total = 2;
  var track = document.getElementById('qa-track');
  var prev  = document.getElementById('qa-prev');
  var next  = document.getElementById('qa-next');
  var dots  = document.querySelectorAll('.qa-dot');
 
  function goTo(i) {
    cur = Math.max(0, Math.min(i, total - 1));
    track.style.transform = 'translateX(-' + (cur * 100) + '%)';
 
    /* prev / next opacity */
    prev.disabled      = cur === 0;
    prev.style.opacity = cur === 0 ? '0.3' : '1';
    next.disabled      = cur === total - 1;
    next.style.opacity = cur === total - 1 ? '0.3' : '1';
 
    /* dots */
    dots.forEach(function (d, idx) {
      d.style.background = idx === cur
        ? 'rgba(99,179,237,0.9)'
        : 'rgba(99,179,237,0.25)';
    });
  }
 
  window.qaSlide = function (dir) { goTo(cur + dir); };
  window.qaGoTo  = function (i)   { goTo(i); };
 
  goTo(0);
})();