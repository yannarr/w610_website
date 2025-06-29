/*~~~~~~~~~~~~~~~ TOGGLE BUTTON ~~~~~~~~~~~~~~~*/

const navMenu = document.getElementById("nav-menu");
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  // Toggle translate class
  navMenu.classList.toggle("-translate-x-full");

  // Toggle menu icon
  const isOpen = !navMenu.classList.contains("-translate-x-full");
  hamburger.querySelector("i").className = isOpen
    ? "ri-close-line"
    : "ri-menu-4-line";
});

// Close menu on click outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.add("-translate-x-full");
    hamburger.querySelector("i").className = "ri-menu-4-line";
  }
});

// Close menu on resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 640) {
    // Tailwind's sm breakpoint
    navMenu.classList.add("-translate-x-full");
    hamburger.querySelector("i").className = "ri-menu-4-line";
  }
});

// Close menu when a section link is clicked
const navLinks = document.querySelectorAll("#nav-menu a"); // Assuming links have <a> tags
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.add("-translate-x-full");
    hamburger.querySelector("i").className = "ri-menu-4-line";
  });
});

/*~~~~~~~~~~~~~~~ SHOW SCROLL UP ~~~~~~~~~~~~~~~*/
const scrollUp = () => {
  const scrollUpBtn = document.getElementById("scroll-up");

  if (window.scrollY >= 250) {
    scrollUpBtn.classList.remove("-bottom-1/2");
    scrollUpBtn.classList.add("bottom-4");
  } else {
    scrollUpBtn.classList.remove("bottom-4");
    scrollUpBtn.classList.add("-bottom-1/2");
  }
};

window.addEventListener("scroll", scrollUp);

/*~~~~~~~~~~~~~~~ CHANGE BACKGROUND HEADER ~~~~~~~~~~~~~~~*/
const scrollHeader = () => {
  const header = document.getElementById("navbar");

  if (window.scrollY >= 50) {
    header.classList.add("border-b border-brown-500");
  } else {
    header.classList.remove("border-b border-brown-500");
  }
};

window.addEventListener("scroll", scrollHeader);

/*~~~~~~~~~~~~~~~ SWIPER ~~~~~~~~~~~~~~~*/
const swiper = new Swiper(".swiper", {
  // Optional parameters
  speed: 400,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  grabcursor: true,
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

/*~~~~~~~~~~~~~~~ SCROLL SECTIONS ACTIVE LINK ~~~~~~~~~~~~~~~*/

const activelink = () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.href.includes(current)) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", activelink);
/*~~~~~~~~~~~~~~~ SCROLL REVEAL ANIMATION ~~~~~~~~~~~~~~~*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 300,
  reset: true,
});

// sr.reveal(
//   `.about__top, .popular__top, .review__swiper, .footer__icon, .footer__content, .copy__right`,
//   { interval: 100 }
// );

// sr.reveal(`.service__card`, { interval: 100 });

// sr.reveal(`.about__leaf`, { delay: 1000, origin: "right" });

// sr.reveal(`.about__item__1-content, .about__item__2-content `, {
//   origin: "right",
// });
// sr.reveal(`.about__item__2-img, .about__item__1-img`, { origin: "left" });
// sr.reveal(`.about__item__3-img, .about__item__4-img`, { origin: "left" });
// sr.reveal(`.about__item__4-content, .about__item__3-content`, {
//   origin: "right",
document.querySelectorAll('.ingredient').forEach(ingredient => {
  ingredient.addEventListener('mouseenter', () => {
    ingredient.style.transform = 'translateY(-10px)';
    ingredient.style.transition = 'transform 0.3s ease';
  });
  
  ingredient.addEventListener('mouseleave', () => {
    ingredient.style.transform = 'translateY(0)';
  });
});
// });

// sr.reveal(`.review__leaf`, { delay: 1000, origin: "left" });
