document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const easterBtn = document.getElementById("easterBtn");
const easterMessage = document.getElementById("easterMessage");

function launchConfetti() {
  const colors = ["#e0703a", "#c25c2c", "#f4f6fb", "#a8b2c7"];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

easterBtn.addEventListener("click", () => {
  easterBtn.disabled = true;
  easterBtn.textContent = "Wait, let me think...";
  easterMessage.textContent = "";

  setTimeout(() => {
    easterMessage.textContent = "Curiosity noted. Running risk assessment...";
  }, 400);

  setTimeout(() => {
    easterMessage.textContent = "Risk assessment complete: 0% risk, 100% fun.";
  }, 1800);

  setTimeout(() => {
    easterMessage.textContent =
      "Fun fact: I once built a Chrome extension just so nobody had to click buttons manually again.";
    easterBtn.textContent = "Click again?";
    easterBtn.disabled = false;
    launchConfetti();
  }, 3200);
});
