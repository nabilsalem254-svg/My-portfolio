document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.querySelector('.scroll-up');
  
  if (!scrollBtn) return;

  // Initial check
  if (window.scrollY > 600) {
    scrollBtn.classList.add('visible');
  }

  // Click handler
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Scroll handler
  let isScrolling;
  window.addEventListener('scroll', () => {
    // Clear any existing timeout
    window.clearTimeout(isScrolling);
    
    // Set a new timeout
    isScrolling = setTimeout(() => {
      if (window.scrollY > 600) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, 100); // Small delay for better performance
  });
});
