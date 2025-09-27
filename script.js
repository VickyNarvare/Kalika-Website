const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  sidebarOpen = document.querySelector(".sidebarOpen"),
  siderbarClose = document.querySelector(".siderbarClose");

//   js code to toggle sidebar
sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
});
body.addEventListener("click", (e) => {
  let clickedElm = e.target;
  if (
    !clickedElm.classList.contains("sidebarOpen") &&
    !clickedElm.classList.contains("menu")
  ) {
    nav.classList.remove("active");
  }
});

// Hide loading screen after the page has loaded
window.addEventListener("load", function () {
  const loadingScreen = document.querySelector(".loading-screen");
  loadingScreen.style.display = "none";
});
// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        // Start counting animation
        const countTarget = parseInt(
          entry.target.querySelector("h3").getAttribute("data-target")
        );
        const countElement = entry.target.querySelector("h3");
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = countTarget / (duration / 16); // 60fps

        const updateCount = () => {
          count += increment;
          if (count < countTarget) {
            countElement.textContent = Math.ceil(count) + "+";
            requestAnimationFrame(updateCount);
          } else {
            countElement.textContent = countTarget + "+";
          }
        };
        updateCount();
      }
    });
  },
  { threshold: 0.5 }
);

// Observe all stat items
document.querySelectorAll(".stat-item").forEach((item) => {
  statsObserver.observe(item);
});

// Update Stats section HTML
document.querySelectorAll(".stat-item h3").forEach((stat) => {
  const value = stat.textContent.replace("+", "");
  stat.setAttribute("data-target", value);
  stat.textContent = "0+";
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add touch feedback
const buttons = document.querySelectorAll(
  "button, .property-card, .feature-card, .testimonial-card"
);
buttons.forEach((button) => {
  button.addEventListener("touchstart", function () {
    this.style.transform = "scale(0.95)";
  });
  button.addEventListener("touchend", function () {
    this.style.transform = "scale(1)";
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const hero = document.querySelector(".hero");
  const scrolled = window.pageYOffset;
  hero.style.backgroundPositionY = scrolled * 0.5 + "px";
});

// Testimonial Carousel
function initTestimonialCarousel() {
  const track = document.querySelector(".testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 32; // Including gap

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
    updateDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    goToSlide(currentIndex);
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-play with decreased interval (changed from 5000ms to 3000ms)
  let autoplayInterval = setInterval(nextSlide, 3000); // Changed to 3 seconds

  // Pause on hover
  track.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
  track.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(nextSlide, 3000); // Also update here
  });

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
    }
  });
}

// Initialize carousel after page load
window.addEventListener("load", initTestimonialCarousel);

// Contact Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  }

  // Add floating label behavior
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );
  formInputs.forEach((input) => {
    // Check initial value
    if (input.value) {
      input.classList.add("has-value");
    }

    // Handle input changes
    input.addEventListener("input", function () {
      if (this.value) {
        this.classList.add("has-value");
      } else {
        this.classList.remove("has-value");
      }
    });
  });
});

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector(".submit-btn");
  const formData = new FormData(form);

  // Add loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Show success message
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent =
      "Thank you! Your message has been sent successfully.";
    form.appendChild(successMessage);

    // Reset form
    form.reset();
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }, 2000);
}

// Phone number validation
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", function (e) {
    let x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2]
      ? x[1]
      : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  });
}


//!Gallery
document.addEventListener("DOMContentLoaded", function () {
  var gallery = document.getElementById("gallery");

  var images = [
    "./gallery/IMG-20250215-WA0048.jpg",
    "./gallery/IMG-20250215-WA0049.jpg",
    "./gallery/IMG-20250215-WA0050.jpg",
    "./gallery/IMG-20250215-WA0051.jpg",
    "./gallery/IMG-20250215-WA0052.jpg",
    "./gallery/IMG-20250215-WA0053.jpg",
    "./gallery/IMG-20250215-WA0054.jpg",
    "./gallery/IMG-20250215-WA0055.jpg",
    "./gallery/IMG-20250215-WA0056.jpg",
    "./gallery/IMG-20250215-WA0057.jpg",
    "./gallery/IMG-20250215-WA0058.jpg",
    "./gallery/IMG-20250215-WA0059.jpg",
    "./gallery/IMG-20250215-WA0060.jpg",
    "./gallery/IMG-20250215-WA0061.jpg",
    "./gallery/IMG-20250215-WA0062.jpg",
    "./gallery/IMG-20250215-WA0063.jpg",
    "./gallery/WhatsApp Image 2025-02-14 at 19.59.53_6b645e30.jpg",
    "./gallery/WhatsApp Image 2025-02-14 at 20.00.08_0d22b093.jpg",
    "./gallery/WhatsApp Image 2025-02-14 at 20.01.38_e489f658.jpg",
    // Add more image URLs as needed
  ];

  images.forEach(function (imageSrc) {
    var galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    var img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Gallery Image";
    // img.loading = "lazy";

    galleryItem.appendChild(img);
    gallery.appendChild(galleryItem);
  });
});

// -----Country Code Selection
$("#mobile_code").intlTelInput({
  initialCountry: "in",
  separateDialCode: true,
  // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});