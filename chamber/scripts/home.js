 // Function to display random spotlights
        function displaySpotlights() {
            const spotlightContainer = document.getElementById('spotlight-container');
            spotlightContainer.innerHTML = '';
            
            // Filter gold and silver members
            const qualifiedMembers = members.filter(member => member.membership >= 2);
            
            // Shuffle array to get random order
            const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
            
            // Select 2-3 members to display
            const selectedMembers = shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2);
            
            selectedMembers.forEach(member => {
                const card = document.createElement('div');
                card.classList.add('spotlight-card');
                
                card.innerHTML = `
                    <div class="spotlight-logo">${member.category === 'Hospitality' ? '🏨' : member.category === 'Finance' ? '🏦' : member.category === 'Retail' ? '🏪' : '📱'}</div>
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p class="membership-level">${member.membership === 3 ? 'Gold Member' : 'Silver Member'}</p>
                `;
                
                spotlightContainer.appendChild(card);
            });
        }

        // Function to fetch weather data from OpenWeatherMap API
        async function fetchWeatherData() {
            // This would be replaced with actual API call
            // For demonstration, we'll use mock data
            const weatherData = {
                current: {
                    temp: 28,
                    description: "Sunny",
                    icon: "☀️",
                    humidity: 75,
                    wind: 12
                },
                forecast: [
                    { day: "Tomorrow", temp: 27, icon: "🌤️" },
                    { day: "Day 2", temp: 26, icon: "⛅" },
                    { day: "Day 3", temp: 25, icon: "🌦️" }
                ]
            };
            
            updateWeatherUI(weatherData);
        }

        // Function to update weather UI with data
        function updateWeatherUI(weatherData) {
            document.querySelector('.temperature').textContent = `${weatherData.current.temp}°C`;
            document.querySelector('.weather-desc').textContent = weatherData.current.description;
            document.querySelector('.weather-icon').textContent = weatherData.current.icon;
            document.querySelector('.weather-humidity').textContent = `Humidity: ${weatherData.current.humidity}%`;
            document.querySelector('.weather-wind').textContent = `Wind: ${weatherData.current.wind} km/h`;
            
            const forecastCards = document.querySelectorAll('.forecast-card');
            forecastCards.forEach((card, index) => {
                if (weatherData.forecast[index]) {
                    card.querySelector('.forecast-day').textContent = weatherData.forecast[index].day;
                    card.querySelector('.forecast-icon').textContent = weatherData.forecast[index].icon;
                    card.querySelector('.forecast-temp').textContent = `${weatherData.forecast[index].temp}°C`;
                }
            });
        }

        // Slideshow functionality
        function initSlideshow() {
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.slide-dot');
            const prevBtn = document.querySelector('.slide-prev');
            const nextBtn = document.querySelector('.slide-next');
            let currentSlide = 0;
            let slideInterval;

            // Function to show a specific slide
            function showSlide(n) {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                currentSlide = (n + slides.length) % slides.length;
                
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }

            // Function to show next slide
            function nextSlide() {
                showSlide(currentSlide + 1);
            }

            // Start autoplay
            function startSlideshow() {
                slideInterval = setInterval(nextSlide, 5000);
            }

            // Stop autoplay
            function stopSlideshow() {
                clearInterval(slideInterval);
            }

            // Event listeners for controls
            prevBtn.addEventListener('click', () => {
                stopSlideshow();
                showSlide(currentSlide - 1);
                startSlideshow();
            });

            nextBtn.addEventListener('click', () => {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            });

            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    stopSlideshow();
                    showSlide(parseInt(dot.getAttribute('data-slide')));
                    startSlideshow();
                });
            });

            // Pause slideshow when user hovers over it
            document.querySelector('.slideshow').addEventListener('mouseenter', stopSlideshow);
            document.querySelector('.slideshow').addEventListener('mouseleave', startSlideshow);

            // Start the slideshow
            startSlideshow();
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', () => {
            displaySpotlights();
            fetchWeatherData();
            initSlideshow();
        });