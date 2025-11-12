document.addEventListener("DOMContentLoaded", () => {
  const blogCards = document.querySelectorAll(".blog-card");
  if (blogCards.length === 0) return;
  const blogObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          blogObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );
  blogCards.forEach((card) => blogObserver.observe(card));
});
