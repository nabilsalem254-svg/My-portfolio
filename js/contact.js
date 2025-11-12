document.addEventListener("DOMContentLoaded", () => {
  const contactSection = document.querySelector(".contact-section");
  const contactInputs = document.querySelectorAll("#contact-form .form-control");
  const contactCards = document.querySelectorAll(".contact-info");
  const sendBtn = document.querySelector(".btn");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (contactSection) {
    window.addEventListener("scroll", () => {
      const sectionPos = contactSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.2;
      if (sectionPos < screenPos) {
        contactSection.classList.add("show");
        contactInputs.forEach((input, index) => {
          setTimeout(() => input.classList.add("fade-in"), index * 150);
        });
        contactCards.forEach((card, index) => {
          setTimeout(() => card.classList.add("fade-up"), index * 200);
        });
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      sendBtn.classList.add("clicked");
      setTimeout(() => sendBtn.classList.remove("clicked"), 300);
    });
    sendBtn.addEventListener("mouseover", () => {
      sendBtn.style.boxShadow = "0 0 15px rgba(255,0,80,0.6)";
    });
    sendBtn.addEventListener("mouseleave", () => {
      sendBtn.style.boxShadow = "none";
    });
  }

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.innerHTML = "⏳ Sending...";
      status.style.color = "#00bcd4";
      const data = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { Accept: "application/json" },
        });
        if (response.ok) {
          status.innerHTML = "✅ Message sent successfully!";
          status.style.color = "#00ff99";
          form.reset();
        } else {
          throw new Error("Server error");
        }
      } catch (err) {
        status.innerHTML = "❌ Failed. Please try again later.";
        status.style.color = "#ff4444";
      }
    });
  }
});
