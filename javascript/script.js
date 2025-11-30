// Elements
const giftBtn = document.getElementById("giftBtn");
const kissBtn = document.getElementById("kissBtn");
const kissBubble = document.getElementById("kissBubble");
const themeToggle = document.getElementById("themeToggle");
const typingSubtitle = document.getElementById("typingSubtitle");
const kissSound = document.getElementById("kissSound");
const startMusic = document.getElementById("startMusic");

/* ------------------------------------------
   DARK / LIGHT MODE
------------------------------------------ */
(function initTheme() {
  const saved = localStorage.getItem("giftTheme");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "🌙";
  } else {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  }
})();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "🌙" : "☀️";
  localStorage.setItem("giftTheme", isDark ? "dark" : "light");
});

/* ------------------------------------------
   TYPING ANIMATION
------------------------------------------ */
(function initTyping() {
  const text = typingSubtitle.dataset.text || "";
  typingSubtitle.textContent = "";
  let i = 0;
  const speed = 55;

  function type() {
    if (i <= text.length) {
      typingSubtitle.textContent = text.slice(0, i);
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 700);
})();

/* ------------------------------------------
   START PAGE MUSIC
------------------------------------------ */
function playStartMusic() {
  if (!startMusic) return;
  startMusic.volume = 0.4;
  startMusic.play().catch(() => {});
}

// Browser requires interaction → first click = music ON
document.addEventListener("click", () => {
  if (startMusic && startMusic.paused) {
    playStartMusic();
  }
});

/* ------------------------------------------
   SPARKLE EFFECT FOR GIFT BUTTON
------------------------------------------ */
function createSparkles(x, y) {
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    sparkle.style.left = x + (Math.random() * 40 - 20) + "px";
    sparkle.style.top = y + (Math.random() * 40 - 20) + "px";

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  }
}

/* ------------------------------------------
   GIFT BUTTON → redirect to gift.html
------------------------------------------ */
giftBtn.addEventListener("click", (e) => {
  // sparkles at click pos
  createSparkles(e.clientX, e.clientY);

  // fade out transition
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "gift.html";
  }, 800);
});

/* ------------------------------------------
   KISS BUTTON: sound + bubble
------------------------------------------ */
kissBtn.addEventListener("click", () => {
  kissBubble.classList.remove("hidden");

  // play kiss sound
  if (kissSound) {
    kissSound.currentTime = 0;
    kissSound.play().catch(() => {});
  }

  // hide bubble after 1.5s
  setTimeout(() => {
    kissBubble.classList.add("hidden");
  }, 1500);
});
