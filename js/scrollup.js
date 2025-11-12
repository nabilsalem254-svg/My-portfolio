document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector('.scroll-up')) return; // avoid duplicates
  const scrollBtn = document.createElement("div");
  scrollBtn.className = "scroll-up";
  scrollBtn.innerHTML = "⬆";
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) scrollBtn.classList.add("visible");
    else scrollBtn.classList.remove("visible");
  });
});
