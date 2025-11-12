document.addEventListener("DOMContentLoaded", () => {
  const clientCards = document.querySelectorAll(".client-card");
  if (clientCards.length === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show", "glow-once");
          setTimeout(() => entry.target.classList.remove("glow-once"), 1500);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );
  clientCards.forEach((card) => observer.observe(card));
});
