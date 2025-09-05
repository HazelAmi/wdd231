
cument.getElementById('hamburger').addEventListener('click', () => {
  const nav = document.getElementById('nav-menu');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});
