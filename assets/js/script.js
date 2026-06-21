const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const links = document.querySelectorAll(".nav a, .header__button, .hero__actions a");
const reveals = document.querySelectorAll(".reveal");
const accordionButtons = document.querySelectorAll(".accordion__button");
const form = document.querySelector(".form");
const formStatus = document.querySelector(".form__status");

function closeMenu() {
  nav.classList.remove("is-open");
  burger.classList.remove("is-active");
  burger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

burger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  burger.classList.toggle("is-active", isOpen);
  burger.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) {
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    closeMenu();
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector("b");
    const isOpen = content.classList.toggle("is-open");
    icon.textContent = isOpen ? "−" : "+";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  formStatus.textContent = "Заявка отправлена. Мы скоро свяжемся с вами.";
  setTimeout(() => {
    formStatus.textContent = "";
  }, 4000);
});