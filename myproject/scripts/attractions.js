// Load member data and display it
async function getDestinationData() {
    try {
        const response = await fetch('data/attractions.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        displayDestinations(data.destinations);
        
        // Hide loading state
        document.getElementById('loading-state').style.display = 'none';
    } catch (error) {
        console.error('Error loading destination data:', error);
        document.getElementById('loading-state').innerHTML = '<p>Error loading attractions. Please try again later.</p>';
    }
}

function displayDestinations(destinations) {
    const cards = document.getElementById('member-cards');
    
    // Clear existing content
    cards.innerHTML = '';
    
    destinations.forEach(destination => {
        // Create card elements
        let card = document.createElement('section');
        card.classList.add('member-card');
        
        let image = document.createElement('img');
        image.setAttribute('src', destination.image);
        image.setAttribute('alt', destination.alt || destination.title);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '800');
        image.setAttribute('height', '200');
        
        let name = document.createElement('h3');
        name.textContent = destination.title;
        
        let location = document.createElement('p');
        location.classList.add('location');
        location.innerHTML = `<strong>Location:</strong> ${destination.location}`;
        
        let history = document.createElement('p');
        history.classList.add('history');
        history.innerHTML = `<strong>History:</strong> ${destination.history}`;
        
        let highlights = document.createElement('p');
        highlights.classList.add('highlights');
        highlights.innerHTML = `<strong>Highlights:</strong> ${destination.highlights}`;
        
        let tips = document.createElement('p');
        tips.classList.add('tips');
        tips.innerHTML = `<strong>Visitor Tips:</strong> ${destination.tips}`;
        
        let favoriteBtn = document.createElement('button');
        favoriteBtn.classList.add('favorite-btn');
        favoriteBtn.textContent = 'Add to Favorites';
        favoriteBtn.setAttribute('data-site', destination.title);
        
        // Append elements to card
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(history);
        card.appendChild(highlights);
        card.appendChild(tips);
        
        // Append card to container
        cards.appendChild(card);
    });
    
    // Add event listeners to favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function() {
            const siteName = this.getAttribute('data-site');
            this.classList.toggle('favorited');
            if (this.classList.contains('favorited')) {
                this.textContent = 'Remove from Favorites';
                alert(`Added ${siteName} to your favorites!`);
            } else {
                this.textContent = 'Add to Favorites';
                alert(`Removed ${siteName} from your favorites!`);
            }
        });
    });
}

getDestinationData();