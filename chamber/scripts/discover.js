// Function to fetch data from discover.json
async function fetchDiscoverData() {
    try {
        const response = await fetch('data/discover.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.discoverItems;
    } catch (error) {
        console.error('Error fetching discover data:', error);
        throw error;
    }
}

// Function to display discover cards
function displayDiscoverCards(discoverItems) {
    const gridContainer = document.getElementById('discover-grid');
    const loadingState = document.getElementById('loading-state');
    
    // Hide loading state
    loadingState.style.display = 'none';
    
    // Clear any existing content
    gridContainer.innerHTML = '';
    
    // Use forEach to process each item (array method requirement)
    discoverItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('discover-card', `card-${index + 1}`);
        
        // Use template literals for string construction
        card.innerHTML = `
            <figure>
                <img src="${item.image}" 
                        alt="${item.name}" 
                        class="card-image" 
                        width="300" 
                        height="200"
                        loading="lazy">
            </figure>
            <div class="card-content">
                <h2 class="card-title">${item.name}</h2>
                <address class="card-address">${item.address}</address>
                <p class="card-description">${item.description}</p>
                
            </div>
         `;//<a href="#" class="learn-more-btn">Learn More</a>
        
        gridContainer.appendChild(card);
    });
}

// Function to handle errors
function displayError(message) {
    const loadingState = document.getElementById('loading-state');
    const gridContainer = document.getElementById('discover-grid');
    
    loadingState.style.display = 'none';
    gridContainer.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Try Again</button>
        </div>
    `;
}

// Function to handle visitor message using localStorage
function displayVisitorMessage() {
    const messageContainer = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = Date.now();
    
    if (!lastVisit) {
        // First visit
        messageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDifference = currentTime - lastVisitTime;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            messageContainer.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysDifference === 1 ? "day" : "days";
            messageContainer.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
        }
    }
    
    // Store current visit time in localStorage
    localStorage.setItem('lastVisit', currentTime.toString());
}

// Initialize page
async function initializePage() {
    try {
        // Display visitor message
        displayVisitorMessage();
        
        // Fetch and display discover items
        const discoverItems = await fetchDiscoverData();
        displayDiscoverCards(discoverItems);
        
    } catch (error) {
        displayError('Unable to load attractions. Please check your connection and try again.');
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);