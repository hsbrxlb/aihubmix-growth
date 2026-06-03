const revealItems = document.querySelectorAll(".reveal");
const navLinks = Array.from(document.querySelectorAll(".topbar nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const activeObserver = new IntersectionObserver(
  (entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!active) return;

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${active.target.id}`;
      link.toggleAttribute("aria-current", isActive);
    });
  },
  {
    rootMargin: "-18% 0px -62% 0px",
    threshold: [0.18, 0.36, 0.54],
  }
);

sections.forEach((section) => activeObserver.observe(section));
