document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  hero.style.opacity = "0";
  hero.style.transition = "opacity 2s ease";
  setTimeout(() => {
    hero.style.opacity = "1";
  }, 400);
}); 

const cursorDot = document.createElement("div");
cursorDot.classList.add("cursor-dot");
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement("div");
cursorOutline.classList.add("cursor-outline");
document.body.appendChild(cursorOutline);

let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.top = `${mouseY}px`;
  cursorDot.style.left = `${mouseX}px`;

  cursorOutline.style.top = `${mouseY}px`;
  cursorOutline.style.left = `${mouseX}px`;
});

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    document.body.classList.add("hovered");
  });
  el.addEventListener("mouseleave", () => {
    document.body.classList.remove("hovered");
  });
});

