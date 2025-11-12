document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-box, .blog-card, .client-card");
  cards.forEach((card) => {
    card.style.transition = "all 0.4s ease";
    card.addEventListener("mouseenter", () => card.classList.add("hover-glow"));
    card.addEventListener("mouseleave", () => card.classList.remove("hover-glow"));
  });
});
