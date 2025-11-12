document.addEventListener("DOMContentLoaded", () => {
  const footerElements = document.querySelectorAll(".fade-up");
  if (footerElements.length === 0) return;
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          footerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  footerElements.forEach((el) => footerObserver.observe(el));
});
