document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  
  hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked (useful in mobile view)
  const navLinks = document.querySelectorAll('#primary-nav a');
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          if (window.innerWidth < 768) {
              navMenu.classList.remove('active');
          }
          
          // Remove active class from all links
          navLinks.forEach(l => l.classList.remove('active'));
          
          // Add active class to clicked link
          this.classList.add('active');
      });
  });
});

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Mobile menu toggle
document.getElementById('hamburger-btn').addEventListener('click', () => {
    document.getElementById('primary-nav').classList.toggle('show');
});


// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    let slideInterval;

// Function to show a specific slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

// Function to show next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

// Start autoplay
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

// Stop autoplay
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

// Event listeners for controls
    prevBtn.addEventListener('click', () => {
        stopSlideshow();
        showSlide(currentSlide - 1);
        startSlideshow();
    });

    nextBtn.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            showSlide(parseInt(dot.getAttribute('data-slide')));
            startSlideshow();
        });
    });

// Pause slideshow when user hovers over it
    document.querySelector('.slideshow').addEventListener('mouseenter', stopSlideshow);
    document.querySelector('.slideshow').addEventListener('mouseleave', startSlideshow);

// Start the slideshow
    startSlideshow();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
   
    initSlideshow();
});