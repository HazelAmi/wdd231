// Set timestamp when page loads
document.getElementById('timestamp').value = new Date().toISOString();

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



// Get all accommodation cards and view buttons
        const accommodationCards = document.querySelectorAll('.membership-card');
        const viewButtons = document.querySelectorAll('.modal-btn');
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.close-btn');
        const bookingButtons = document.querySelectorAll('.booking-btn');
        
        // Add click event to each view button
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.accommodation-card');
                const accommodationType = card.getAttribute('data-type');
                const modal = document.getElementById(`${accommodationType}-modal`);
                
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });
        
        // Add click event to accommodation cards (for better UX)
        accommodationCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Only trigger if the click wasn't on the button itself
                if (!e.target.classList.contains('view-btn')) {
                    const accommodationType = this.getAttribute('data-type');
                    const modal = document.getElementById(`${accommodationType}-modal`);
                    
                    if (modal) {
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden'; // Prevent scrolling
                    }
                }
            });
        });
        
        // Add click event to close buttons
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        });
        
        // Close modal when clicking outside the content
        window.addEventListener('click', function(e) {
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }
            });
        });
        
        // Add event to booking buttons
        bookingButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                const title = modal.querySelector('h2').textContent;
                alert(`Searching for available ${title.toLowerCase()}...\n\nIn a real application, this would redirect to a booking page.`);
            });
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    if (modal.style.display === 'block') {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto'; // Re-enable scrolling
                    }
                });
            }
        });