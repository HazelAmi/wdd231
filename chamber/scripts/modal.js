// Set timestamp when page loads
document.getElementById('timestamp').value = new Date().toISOString();
// Modal functionality
const modalBtns = document.querySelectorAll('.modal-btn');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-btn');

modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'flex';
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside the content
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Form validation for organizational title pattern
const titleInput = document.getElementById('title');
titleInput.addEventListener('input', () => {
    const pattern = /^[A-Za-z\s\-]{7,}$/;
    if (titleInput.value && !pattern.test(titleInput.value)) {
        titleInput.setCustomValidity('Title must be at least 7 characters and contain only letters, spaces, and hyphens');
    } else {
        titleInput.setCustomValidity('');
    }
});