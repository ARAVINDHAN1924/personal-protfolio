const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

// Close the mobile navigation after a section link is selected.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Reveal sections gently as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// The contact form opens a pre-filled email draft; it does not send messages itself.
const contactForm = document.querySelector("#contactForm");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const visitorName = document.querySelector("#visitorName").value.trim();
  const visitorEmail = document.querySelector("#visitorEmail").value.trim();
  const visitorMessage = document.querySelector("#visitorMessage").value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${visitorName}`);
  const body = encodeURIComponent(
    `Name: ${visitorName}\nEmail: ${visitorEmail}\n\nMessage:\n${visitorMessage}`
  );

  document.querySelector("#formNote").textContent =
    "Your email app should open with your message prepared. Please review it and press Send there.";
  window.location.href = `mailto:atlasarwin@gmail.com?subject=${subject}&body=${body}`;
});

// Keep the footer year current.
document.querySelector("#year").textContent = new Date().getFullYear();
