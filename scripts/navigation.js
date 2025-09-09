
// document.getElementById('hamburger').addEventListener('click', () => {
//   const nav = document.getElementById('nav-menu');
//   nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
// });


document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
  });
  
  // Close menu when a link is clicked (useful in mobile view)
  const navLinks = document.querySelectorAll('.nav-links a');
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