// Load member data and display it
async function getMemberData() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    const cards = document.querySelector('.cards');
    
    // Clear existing content
    cards.innerHTML = '';
    
    members.forEach(member => {
        // Create card elements
        let card = document.createElement('section');
        card.classList.add('member-card');
        
        let logo = document.createElement('img');
        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '100');
        logo.setAttribute('height', '100');
        
        let name = document.createElement('h3');
        name.textContent = member.name;
        
        let address = document.createElement('p');
        address.textContent = member.address;
        
        let phone = document.createElement('p');
        phone.textContent = member.phone;
        
        let website = document.createElement('a');
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        website.textContent = 'Visit Website    ';
        
        let membership = document.createElement('p');
        membership.classList.add('membership-level');
        
        // Set membership level text and color
        switch(member.membership) {
            case 1:
                membership.textContent = 'Member';
                membership.style.backgroundColor = '#6CB4EE';
                break;
            case 2:
                membership.textContent = 'Silver Member';
                membership.style.backgroundColor = '#C0C0C0';
                break;
            case 3:
                membership.textContent = 'Gold Member';
                membership.style.backgroundColor = '#FBBC05';
                break;
        }
        
        // Append elements to card
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);
        
        // Append card to container
        cards.appendChild(card);
    });
}

// Toggle between grid and list views
document.getElementById('grid-view').addEventListener('click', () => {
    document.getElementById('grid-view').classList.add('active');
    document.getElementById('list-view').classList.remove('active');
    document.getElementById('member-cards').classList.remove('list');
});

document.getElementById('list-view').addEventListener('click', () => {
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
    document.getElementById('member-cards').classList.add('list');
});

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

getMemberData();