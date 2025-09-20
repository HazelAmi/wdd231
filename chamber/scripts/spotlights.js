// Function to get member data from JSON file
async function getMemberData() {
    try {
        // Fetch data from the JSON file
        const response = await fetch('members.json');
        if (!response.ok) {
            throw new Error('Failed to fetch member data');
        }
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error('Error fetching member data:', error);
        // Fallback data in case the fetch fails
        return [
            {
                "name": "Ghana National Chamber of Commerce and Industry (GNCCI)",
                "address": "3 Norley Street, NorthDzorwulu, Accra",
                "phone": "(233) 30-266-2860",
                "website": "https://ghanachamber.org",
                "image": "gncci.jpg",
                "membership": 3,
                "category": "National Body"
            },
            {
                "name": "Ghana South Africa Business Chamber (GSABC)",
                "address": "Liberation Road, Accra",
                "phone": "(233) 30-297-6417",
                "website": "https://gsabc.org/",
                "image": "gsabc.jpg",
                "membership": 3,
                "category": "Trade and investment"
            },
            {
                "name": "Association of Ghana Industries (AGI)",
                "address": "2 Morocco Road, Accra",
                "phone": "(233) 30-261-1610",
                "website": "https://agiaccra.org",
                "image": "agi.jpg",
                "membership": 3,
                "category": "industrial growth "
            },
            {
                "name": "Ghana India Trade Advisory Chamber (GITAC)",
                "address": "Kawukudi, Accra",
                "phone": "(233) 30-222-5151",
                "website": "https://gitac.org",
                "image": "gitac.jpg",
                "membership": 2,
                "category": "Cultural Exchange "
            },
            {
                "name": "Canadian Chamber of Commerce in Ghana (CCCG)",
                "address": "35 Djanie Ashie Street,East Legon,Accra.",
                "phone": "(233) 26-480-8173",
                "website": "https://www.canada-gh.org/",
                "image": "cgcc.jpg",
                "membership": 3,
                "category": "Cultural Exchange"
            },
            {
                "name": "American Chamber of Commerce Ghana (AmCham Ghana)",
                "address": "Kaasi Industrial Area, Accra",
                "phone": "(233) 30-291-2101",
                "website": "https://amchamghana.org",
                "image": "amcham.jpg",
                "membership": 2,
                "category": "Commercial Ties "
            }
        ];
    }
}
// Function to display members
function displayMembers(members, spotlightOnly = false) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    
    // Filter members if only spotlight is requested
    let membersToDisplay = members;
    if (spotlightOnly) {
        membersToDisplay = getRandomSpotlightMembers(members);
    }
    
    membersToDisplay.forEach(member => {
        const card = document.createElement('section');
        card.className = 'member-card';
        
        // Determine membership level text and class
        let membershipText, membershipClass;
        if (member.membership === 3) {
            membershipText = 'Gold Member';
            membershipClass = 'gold';
        } else if (member.membership === 2) {
            membershipText = 'Silver Member';
            membershipClass = 'silver';
        } else {
            membershipText = 'Member';
            membershipClass = 'member';
        }
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>${member.category}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <div class="membership-level ${membershipClass}">${membershipText}</div>
        `;
        
        container.appendChild(card);
    });
}

// Function to get random spotlight members (gold or silver)
function getRandomSpotlightMembers(members) {
    // Filter to only include gold (3) and silver (2) members
    const eligibleMembers = members.filter(member => 
        member.membership === 3 || member.membership === 2
    );
    
    // Shuffle array to get random order
    const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
    
    // Return 2-3 members (if there are enough)
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
}

// Initialize the page
async function initializePage() {
    const members = await getMemberData();
    displayMembers(members, true);
}

// Start the application
initializePage();