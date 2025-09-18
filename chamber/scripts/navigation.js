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