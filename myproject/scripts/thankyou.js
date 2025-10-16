// Display application details from URL parameters
        function displayApplicationDetails() {
            const urlParams = new URLSearchParams(window.location.search);
            const detailsContainer = document.getElementById('application-details-content');
            
            const fields = [
               { param: 'travel-date', label: 'Preferred Travel Date' },
                { param: 'trip-duration', label: 'Trip Duration (days)' },
                { param: 'travelers', label: 'Number of Travelers' },
                { param: 'interests', label: 'Primary Interests' },
                { param: 'budget', label: 'Budget Range' },
                { param: 'accommodation', label: 'Accommodation Preference' },
                
                { param: 'timestamp', label: 'Creation Date' }
            ];
            
            let detailsHTML = '';
            
            fields.forEach(field => {
                let value = urlParams.get(field.param);
                
                if (value) {
                    // Format the membership level for display
                    if (field.param === 'membership') {
                        switch(value) {
                            case 'np': value = 'NP Membership (Non-Profit)'; break;
                            case 'bronze': value = 'Bronze Membership'; break;
                            case 'silver': value = 'Silver Membership'; break;
                            case 'gold': value = 'Gold Membership'; break;
                        }
                    }
                    
                    // Format the timestamp for display
                    if (field.param === 'timestamp') {
                        const date = new Date(value);
                        value = date.toLocaleString();
                    }
                    
                    detailsHTML += `
                        <div class="detail-item">
                            <span class="detail-label">${field.label}:</span>
                            <span class="detail-value">${value}</span>
                        </div>
                    `;
                }
            });
            
            detailsContainer.innerHTML = detailsHTML;
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', displayApplicationDetails);
