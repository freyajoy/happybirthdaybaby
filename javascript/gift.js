// Popup + music elements
const bgMusic = document.getElementById("bgMusic");
const letterOverlay = document.getElementById("letterOverlay");
const openLetterBtn = document.getElementById("openLetterBtn");

/* ------------------------------------------
   MUSIC: ALWAYS ON AFTER FIRST CLICK
------------------------------------------ */

// Try start on load (some browsers block it)
window.addEventListener("load", () => {
  if (bgMusic) {
    bgMusic.volume = 0.5;
    bgMusic.loop = true;
    bgMusic.play().catch(() => {
      console.log("Autoplay blocked on load, will retry on first click.");
    });
  }
});

// Guaranteed start on first interaction
document.addEventListener("click", () => {
  if (bgMusic && bgMusic.paused) {
    bgMusic.volume = 0.5;
    bgMusic.loop = true;
    bgMusic.play().catch(() => {
      console.log("Autoplay still blocked, but we tried 🙂");
    });
  }
});

/* ------------------------------------------
   OPEN BUTTON: ONLY HIDES POPUP
------------------------------------------ */
if (openLetterBtn && letterOverlay) {
  openLetterBtn.addEventListener("click", () => {
    letterOverlay.classList.add("hidden");
  });
}

// ------------------------------------------
// Coupons data (med id)
// ------------------------------------------
const coupons = [
  {
    id: 1,
    title: "Golden ticket",
    text: "You get 3 wishes from me, no questions asked. Use them wisely!",
    type: "You decide"
  },
  {
    id: 2,
    title: "You-pick date",
    text: "You choose what we do, what we eat, and where we go. No complaints from me.",
    type: "Date"
  },
  {
    id: 3,
    title: "Cuddle session",
    text: "Redeem for an uninterrupted cuddle session.",
    type: "Comfort"
  },
  {
    id: 4,
    title: "Movie night",
    text: "You pick the film, I bring the snacks.",
    type: "Date"
  },
  {
    id: 5,
    title: "Zoo date",
    text: "Let's spend a day at the zoo together!",
    type: "Date"
  },
  {
    id: 6,
    title: "A car 'ride'",
    text: "I'll take you for a drive anywhere you want to go, no questions asked.",
    type: "Fun"
  },
  {
    id: 7,
    title: "Adventure day",
    text: "Let's explore the city together.",
    type: "Adventure"
  }
];

// Load used coupons from localStorage
function loadUsedCoupons() {
  const stored = localStorage.getItem("usedCoupons");
  return stored ? JSON.parse(stored) : [];
}

// Save used coupons to localStorage
function saveUsedCoupons(list) {
  localStorage.setItem("usedCoupons", JSON.stringify(list));
}

function renderCoupons() {
  const container = document.getElementById("coupons");
  if (!container) {
    console.error("Could not find element with id 'coupons'");
    return;
  }

  const usedCoupons = loadUsedCoupons();
  container.innerHTML = "";

  coupons.forEach((coupon) => {
    const card = document.createElement("article");
    card.className = "coupon";
    card.dataset.id = coupon.id;

    const isUsed = usedCoupons.includes(coupon.id);
    if (isUsed) {
      card.classList.add("used");
    }

    card.innerHTML = `
      <div class="coupon-header">
        <div class="coupon-title">${coupon.title}</div>
        <div class="badge">${coupon.type}</div>
      </div>
      <p class="coupon-text">${coupon.text}</p>
      <div class="footer-line">
        <span>Valid once, with love from me. ♡</span>
        <button class="btn" type="button">
          <span>${isUsed ? "Used 💔" : "Mark as used"}</span>
        </button>
      </div>
    `;

    const btn = card.querySelector(".btn");
    btn.addEventListener("click", () => {
      const currentUsed = loadUsedCoupons();
      const currentlyUsed = card.classList.contains("used");

      if (currentlyUsed) {
        // Unmark
        card.classList.remove("used");
        const index = currentUsed.indexOf(coupon.id);
        if (index !== -1) currentUsed.splice(index, 1);
        btn.querySelector("span").textContent = "Mark as used";
      } else {
        // Mark as used
        card.classList.add("used");
        if (!currentUsed.includes(coupon.id)) {
          currentUsed.push(coupon.id);
        }
        btn.querySelector("span").textContent = "Used 💔";
      }

      saveUsedCoupons(currentUsed);
    });

    container.appendChild(card);
  });
}

renderCoupons();
