(() => {
  "use strict";

  const nav = document.querySelector(".site-nav");
  const navToggle = document.querySelector(".navbar-toggler");
  const navMenu = document.querySelector("#primaryNav");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setMenuOpen = (isOpen) => {
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navMenu.classList.toggle("show", isOpen);
  };

  navToggle.addEventListener("click", () => {
    setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  const setNavState = () => nav.classList.toggle("nav-scrolled", window.scrollY > 12);
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const counters = document.querySelectorAll(".counter");
  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const duration = reducedMotion ? 0 : 1400;
    if (!Number.isFinite(target) || target < 0) {
      counter.textContent = "0";
      return;
    }
    if (duration === 0) {
      counter.textContent = target.toLocaleString("en-IN");
      return;
    }
    const startTime = performance.now();
    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      counter.textContent = Math.floor(target * eased).toLocaleString("en-IN");
      if (progress < 1) window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const willExpand = button.getAttribute("aria-expanded") !== "true";
      const answer = button.closest(".faq-item").querySelector(".faq-answer");
      button.setAttribute("aria-expanded", String(willExpand));
      answer.hidden = !willExpand;
    });
  });

  document.querySelectorAll(".course-enquire").forEach((button) => {
    button.addEventListener("click", () => {
      const courseSelect = document.querySelector("#course");
      courseSelect.value = button.dataset.course;
      document.querySelector("#contact").scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });
      window.setTimeout(() => courseSelect.focus({ preventScroll: true }), reducedMotion ? 0 : 550);
    });
  });

  const form = document.querySelector("#enquiryForm");
  const formStatus = document.querySelector("#formStatus");
  const whatsappNumber = "910000000000";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "";
    formStatus.classList.remove("success");

    const phone = form.elements.phone;
    const digits = phone.value.replace(/\D/g, "");
    const phoneIsValid = digits.length >= 7 && digits.length <= 15 && phone.checkValidity();
    phone.setCustomValidity(phoneIsValid ? "" : "Enter a valid phone number.");

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      formStatus.textContent = "Please check the highlighted fields and try again.";
      form.querySelector(":invalid")?.focus();
      return;
    }

    const fields = new FormData(form);
    const lines = [
      "Hello! I would like to enquire about admission at Eduvance Academy.",
      "",
      `Student name: ${fields.get("studentName").trim()}`,
      `Parent/guardian name: ${fields.get("guardianName").trim() || "Not provided"}`,
      `Phone number: ${fields.get("phone").trim()}`,
      `Course of interest: ${fields.get("course")}`,
      `Preferred contact time: ${fields.get("contactTime") || "No preference"}`,
      `Message: ${fields.get("message").trim() || "None"}`
    ];
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (whatsappWindow) {
      formStatus.textContent = "WhatsApp opened with your draft. Review and send it there; your admission is not confirmed.";
      formStatus.classList.add("success");
    } else {
      formStatus.textContent = "Your browser blocked the WhatsApp window. Please allow pop-ups and submit again.";
    }
  });

  form.elements.phone.addEventListener("input", (event) => {
    event.currentTarget.setCustomValidity("");
  });

  const currentYear = document.querySelector("#currentYear");
  currentYear.textContent = String(new Date().getFullYear());

  const sectionLinks = [...document.querySelectorAll('.site-nav .nav-link[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          if (isCurrent) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
          link.classList.toggle("active", isCurrent);
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
  }
})();
