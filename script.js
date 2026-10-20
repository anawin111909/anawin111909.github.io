/* ================================================
   SCROLL NAV — section dots
   ================================================ */

const sections    = document.querySelectorAll("#hero, #role, #experience, #project-2d, #project");
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
   BOOKMARK TAB SWITCHER — Generic
   ใช้ได้กับทุก card ที่มี tab
   ================================================ */

/* ── Havenfall tabs (panel-hf2, panel-hf1, panel-lr) ── */
function switchTab(id) {
  document.querySelectorAll('#qa-tabbed .tab-panel').forEach(function (p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('#qa-tabbed .bookmark-tab').forEach(function (t) {
    t.classList.remove('active');
    t.classList.add('inactive');
  });

  var panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');

  var activeTab = document.getElementById('tab-' + id);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.classList.remove('inactive');
  }
}

/* ── CoolWaVe tabs (panel-cw1, panel-cw2 ...) ── */
function switchTabCW(id) {
  document.querySelectorAll('#Project2 .tab-panel-cw').forEach(function (p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('#Project2 .bookmark-tab').forEach(function (t) {
    t.classList.remove('active');
    t.classList.add('inactive');
  });

  var panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');

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
 
  if (!track || !prev || !next) return;
 
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

/* ================================================
   DESIGN PROTOTYPE — modal popup toggle
   ================================================ */
(function () {
  var overlay  = document.getElementById('designModalOverlay');
  var openBtn  = document.getElementById('designPrototypeBtn');
  var closeBtn = document.getElementById('designModalClose');

  if (!overlay || !openBtn || !closeBtn) return;

  function openModal() { overlay.classList.add('open'); }
  function closeModal() { overlay.classList.remove('open'); }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  /* click on the dark backdrop (not the card itself) closes it */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  /* Esc key closes it */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
})();

/* ================================================
   DESIGN SHOWCASE — slider (wireframe ⇄ in-game)
   ================================================ */
(function () {
  var cur   = 0;
  var total = 2;
  var track   = document.getElementById('designTrack');
  var prevBtn = document.getElementById('designPrev');
  var nextBtn = document.getElementById('designNext');
  var dots    = document.querySelectorAll('.design-dot');

  if (!track || !prevBtn || !nextBtn) return;

  function goTo(i) {
    cur = Math.max(0, Math.min(i, total - 1));
    track.style.transform = 'translateX(-' + (cur * 50) + '%)';

    prevBtn.disabled      = cur === 0;
    prevBtn.style.opacity = cur === 0 ? '0.3' : '1';
    nextBtn.disabled      = cur === total - 1;
    nextBtn.style.opacity = cur === total - 1 ? '0.3' : '1';

    dots.forEach(function (d, idx) {
      d.classList.toggle('active', idx === cur);
    });

    /* the icon a pinned/open tooltip points at is now hidden
       on the other slide — close it rather than leave it stuck */
    var tip = document.getElementById('sharedTooltip');
    if (tip) tip.classList.remove('show');
    document.querySelectorAll('.design-icon.pinned').forEach(function (b) {
      b.classList.remove('pinned');
    });
  }

  prevBtn.addEventListener('click', function () { goTo(cur - 1); });
  nextBtn.addEventListener('click', function () { goTo(cur + 1); });
  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { goTo(i); });
  });

  goTo(0);
})();

/* ================================================
   DESIGN SHOWCASE — icon hotspot tooltips
   One shared tooltip element, positioned in JS based on
   each icon's real on-screen location. It lives outside
   the slide viewport's overflow:hidden, and its position
   is clamped on all sides, so it never gets clipped no
   matter how close the icon is to any edge of the image.
   Hover = preview. Click = pin it open. Click elsewhere,
   or the same icon again, closes it.
   ================================================ */
(function () {
  var wrapper      = document.querySelector('.showcase-slider-wrapper');
  var tooltip      = document.getElementById('sharedTooltip');
  var tooltipTitle = document.getElementById('sharedTooltipTitle');
  var tooltipDesc  = document.getElementById('sharedTooltipDesc');
  var icons        = document.querySelectorAll('.design-icon');
  var pinnedBtn    = null;

  if (!wrapper || !tooltip || !icons.length) return;

  function showTooltipFor(btn) {
    tooltipTitle.textContent = btn.getAttribute('data-tip-title') || '';
    tooltipDesc.textContent  = btn.getAttribute('data-tip-desc') || '';

    tooltip.classList.add('show'); // make visible first so we can measure it
    var margin  = 10;
    var wrapRect = wrapper.getBoundingClientRect();
    var iconRect = btn.getBoundingClientRect();
    var tw = tooltip.offsetWidth;
    var th = tooltip.offsetHeight;

    var iconCenterX = iconRect.left + iconRect.width / 2 - wrapRect.left;
    var iconTop     = iconRect.top - wrapRect.top;
    var iconBottom  = iconRect.bottom - wrapRect.top;

    /* horizontal: center on the icon, then clamp so it never
       overflows the left/right edge of the slider wrapper */
    var left = iconCenterX - tw / 2;
    left = Math.max(margin, Math.min(left, wrapRect.width - tw - margin));

    /* vertical: prefer above the icon; flip below if there's
       not enough room above */
    var top;
    if (iconTop - th - 14 < margin) {
      top = iconBottom + 14;
    } else {
      top = iconTop - th - 14;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top  = top + 'px';
  }

  function hideTooltip() {
    tooltip.classList.remove('show');
  }

  function unpin() {
    if (!pinnedBtn) return;
    pinnedBtn.classList.remove('pinned');
    pinnedBtn = null;
  }

  icons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      showTooltipFor(btn);
    });

    btn.addEventListener('mouseleave', function () {
      if (pinnedBtn) {
        showTooltipFor(pinnedBtn);
      } else {
        hideTooltip();
      }
    });

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (pinnedBtn === btn) {
        unpin();
        hideTooltip();
      } else {
        unpin();
        pinnedBtn = btn;
        btn.classList.add('pinned');
        showTooltipFor(btn);
      }
    });
  });

  document.addEventListener('click', function () {
    unpin();
    hideTooltip();
  });
})();