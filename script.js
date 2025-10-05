function $(selector) { return document.querySelector(selector); }

// Generate star twinkles and floating lantern trails
document.addEventListener("DOMContentLoaded", () => {
  spawnStars(100);
  bindActions();
});

function spawnStars(count) {
  const sky = document.getElementById("sky");
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    const size = Math.random() * 2 + 0.5;
    s.style.position = "absolute";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.background = "#fff";
    s.style.borderRadius = "50%";
    s.style.opacity = String(0.3 + Math.random() * 0.7);
    s.style.boxShadow = "0 0 8px #fff";
    s.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random()}s infinite`;
    sky.appendChild(s);
  }

  const style = document.createElement("style");
  style.textContent = `@keyframes twinkle { 0%, 100% { opacity: .2 } 50% { opacity: 1 } }`;
  document.head.appendChild(style);
}

function bindActions() {
  const wishBtn = $("#wishBtn");
  const revealBtn = $("#revealBtn");
  const surprise = $("#surprise");

  if (wishBtn) wishBtn.addEventListener("click", () => {
    fireConfetti(140);
    floatingWishes();
  });

  if (revealBtn && surprise) revealBtn.addEventListener("click", () => {
    surprise.hidden = !surprise.hidden;
    fireConfetti(220);
  });
}

function fireConfetti(pieces) {
  const root = document.getElementById("confetti");
  if (!root) return;

  for (let i = 0; i < pieces; i++) {
    const c = document.createElement("i");
    c.style.position = "absolute";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-10px";
    c.style.width = c.style.height = Math.random() * 6 + 4 + "px";
    c.style.background = randomColor();
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    c.style.opacity = ".95";
    c.style.borderRadius = Math.random() > 0.7 ? "50%" : "2px";
    const duration = 3 + Math.random() * 2;
    const delay = Math.random() * .3;
    c.style.transition = `transform ${duration}s cubic-bezier(.2,.8,.2,1), top ${duration}s linear, opacity ${duration}s ease ${delay}s`;
    root.appendChild(c);

    requestAnimationFrame(() => {
      const driftX = (Math.random() * 2 - 1) * 150;
      c.style.top = "110vh";
      c.style.transform = `translate(${driftX}px, 0) rotate(${720 + Math.random() * 360}deg)`;
      c.style.opacity = ".0";
    });

    setTimeout(() => c.remove(), (duration + 0.6) * 1000);
  }
}

function randomColor() {
  const palette = ["#ffb86c", "#ff7aa2", "#8ef6d2", "#ffd166", "#9be7ff"];
  return palette[Math.floor(Math.random() * palette.length)];
}

function floatingWishes() {
  const wishes = [
    "Bình an cho em/anh",
    "Luôn rạng rỡ",
    "Yêu thương tròn đầy",
    "Đi khắp thế gian cùng nhau",
    "Mọi điều suôn sẻ",
  ];
  for (let i = 0; i < 6; i++) {
    const tag = document.createElement("div");
    tag.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    styleWish(tag);
    document.body.appendChild(tag);
    animateWish(tag);
  }
}

function styleWish(el) {
  el.style.position = "fixed";
  el.style.left = Math.random() * 80 + 10 + "vw";
  el.style.bottom = "-10vh";
  el.style.padding = "8px 12px";
  el.style.borderRadius = "14px";
  el.style.background = "rgba(255,255,255,.08)";
  el.style.border = "1px solid rgba(255,255,255,.2)";
  el.style.backdropFilter = "blur(4px)";
  el.style.color = "#e8eefc";
  el.style.fontWeight = "600";
  el.style.boxShadow = "0 10px 24px rgba(0,0,0,.35)";
}

function animateWish(el) {
  const rise = 120 + Math.random() * 60;
  const drift = (Math.random() * 2 - 1) * 60;
  const duration = 5 + Math.random() * 2;
  el.animate([
    { transform: "translate(0, 0)", opacity: 0 },
    { transform: `translate(${drift}px, -${rise}vh)`, opacity: 1 }
  ], { duration: duration * 1000, easing: "ease-out" });
  setTimeout(() => el.remove(), duration * 1000);
}

