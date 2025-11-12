document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  window.addEventListener("scroll", () => {
    const sc = window.scrollY;
    hero.style.backgroundPosition = `center calc(50% + ${sc * 0.08}px)`;
  });
});
