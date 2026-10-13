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


// App demos: play only while on screen, and not at all for people who prefer less motion.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const demoVideos = document.querySelectorAll(".demo-video");

if (reduceMotion || !("IntersectionObserver" in window)) {
  demoVideos.forEach((video) => {
    video.controls = true;
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting && !target.dataset.paused) {
          target.preload = "auto";
          target.play().catch(() => {});
        } else {
          target.pause();
        }
      });
    },
    { threshold: 0.4 }
  );
  demoVideos.forEach((video) => {
    observer.observe(video);
    // Click to pause or resume.
    video.addEventListener("click", () => {
      if (video.paused) {
        delete video.dataset.paused;
        video.play().catch(() => {});
      } else {
        video.dataset.paused = "true";
        video.pause();
      }
    });
  });
}

// Screenshot viewer for the galleries.
const lightbox = document.getElementById("lightbox");
const lightboxMedia = lightbox.querySelector(".lightbox-media");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
let lightboxItems = [];
let lightboxIndex = 0;

function showLightboxItem() {
  const item = lightboxItems[lightboxIndex];
  lightboxMedia.replaceChildren();
  if (item.dataset.video) {
    const video = document.createElement("video");
    video.src = item.dataset.video;
    video.poster = item.dataset.full;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = true;
    video.autoplay = !reduceMotion;
    lightboxMedia.append(video);
  } else {
    const img = document.createElement("img");
    img.src = item.dataset.full;
    img.alt = item.querySelector("img").alt;
    lightboxMedia.append(img);
  }
  lightboxCaption.textContent = item.dataset.caption || "";
}

function stepLightbox(by) {
  lightboxIndex = (lightboxIndex + by + lightboxItems.length) % lightboxItems.length;
  showLightboxItem();
}

document.querySelectorAll(".gallery").forEach((gallery) => {
  const items = [...gallery.querySelectorAll(".gallery-item")];
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      lightboxItems = items;
      lightboxIndex = index;
      showLightboxItem();
      lightbox.showModal();
    });
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => stepLightbox(-1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => stepLightbox(1));
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") stepLightbox(-1);
  if (event.key === "ArrowRight") stepLightbox(1);
});
// A click on the dark background (not the picture or the buttons) closes it.
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target === lightboxMedia.parentElement) lightbox.close();
});
// Stop a playing video when the viewer closes.
lightbox.addEventListener("close", () => lightboxMedia.replaceChildren());
