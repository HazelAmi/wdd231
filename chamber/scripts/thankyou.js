// Display application details from URL parameters
        function displayApplicationDetails() {
            const urlParams = new URLSearchParams(window.location.search);
            const detailsContainer = document.getElementById('application-details-content');
            
            const fields = [
                { param: 'first-name', label: 'First Name' },
                { param: 'last-name', label: 'Last Name' },
                { param: 'title', label: 'Organizational Title' },
                { param: 'email', label: 'Email Address' },
                { param: 'phone', label: 'Mobile Phone' },
                { param: 'organization', label: 'Business/Organization' },
                { param: 'membership', label: 'Membership Level' },
                { param: 'timestamp', label: 'Application Date' }
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
