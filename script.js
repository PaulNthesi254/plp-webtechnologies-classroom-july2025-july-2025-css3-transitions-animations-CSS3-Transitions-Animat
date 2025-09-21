
        // PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES

        // Global scope variables
        let cardCount = 0;
        let isLoading = false;
        const animationTypes = ['shake', 'bounce', 'rotate', 'flip'];

        // Function demonstrating parameters and return values
        function createCardData(title, description, icon, id) {
            // Local scope variables
            const cardId = id || generateUniqueId();
            const timestamp = getCurrentTimestamp();
            
            // Return an object with processed data
            return {
                id: cardId,
                title: capitalizeText(title),
                description: description,
                icon: icon,
                created: timestamp,
                animationCount: 0
            };
        }

        // Function demonstrating scope - uses global cardCount
        function generateUniqueId() {
            cardCount++; // Modifies global variable
            return `card-${cardCount}`;
        }

        // Pure function - no side effects, same input = same output
        function capitalizeText(text) {
            if (!text) return '';
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        }

        // Function with local scope demonstration
        function getCurrentTimestamp() {
            const now = new Date();
            const localTime = now.toLocaleTimeString(); // Local variable
            return localTime;
        }

        // Function that takes callback as parameter (higher-order function)
        function processCards(cards, processingFunction) {
            const results = [];
            for (let card of cards) {
                results.push(processingFunction(card));
            }
            return results;
        }

        // PART 3: FUNCTIONS THAT TRIGGER CSS ANIMATIONS

        // Function to create and append cards with fade-in animation
        function createCard(cardData) {
            const cardElement = document.createElement('div');
            cardElement.className = 'card fade-in';
            cardElement.id = cardData.id;
            
            cardElement.innerHTML = `
                <div class="card-icon">${cardData.icon}</div>
                <h3>${cardData.title}</h3>
                <p>${cardData.description}</p>
                <small style="color: #999;">Created: ${cardData.created}</small>
            `;

            // Add click event to trigger flip animation
            cardElement.addEventListener('click', () => triggerCardAnimation(cardData.id, 'flipped'));
            
            return cardElement;
        }

        // Function to trigger specific CSS animations via class manipulation
        function triggerCardAnimation(cardId, animationClass) {
            const card = document.getElementById(cardId);
            if (!card) return false;

            // Remove existing animation classes
            animationTypes.forEach(type => card.classList.remove(type));
            card.classList.remove('flipped');

            // Add new animation class
            card.classList.add(animationClass);

            // Remove class after animation completes
            setTimeout(() => {
                card.classList.remove(animationClass);
            }, 600);

            return true;
        }

        // Function that animates all cards with random animations
        function animateAllCards() {
            const cards = document.querySelectorAll('.card');
            let delay = 0;

            cards.forEach((card, index) => {
                setTimeout(() => {
                    const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];
                    triggerCardAnimation(card.id, randomAnimation);
                }, delay);
                delay += 100; // Stagger animations
            });

            // Return information about what happened
            return {
                cardsAnimated: cards.length,
                totalDelay: delay
            };
        }

        // Function to shuffle cards with CSS transforms
        function shuffleCards() {
            const gallery = document.getElementById('cardGallery');
            const cards = Array.from(gallery.children);
            
            // Add fade-out effect
            cards.forEach(card => card.classList.add('fade-out'));

            setTimeout(() => {
                // Shuffle array using Fisher-Yates algorithm
                for (let i = cards.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [cards[i], cards[j]] = [cards[j], cards[i]];
                }

                // Clear gallery and re-append shuffled cards
                gallery.innerHTML = '';
                cards.forEach((card, index) => {
                    card.classList.remove('fade-out');
                    card.classList.add('fade-in');
                    setTimeout(() => {
                        gallery.appendChild(card);
                    }, index * 100);
                });
            }, 300);
        }

        // Modal control functions with CSS animation integration
        function showModal() {
            const modal = document.getElementById('modal');
            modal.style.display = 'flex';
            
            // Trigger animation by adding class
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);

            return true;
        }

        function closeModal() {
            const modal = document.getElementById('modal');
            
            // Remove animation class first
            modal.classList.remove('show');
            
            // Hide after transition completes
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);

            return false;
        }

        // Loading state toggle with CSS animation
        function toggleLoading() {
            const loadingElement = document.getElementById('loading');
            isLoading = !isLoading; // Toggle global state
            
            if (isLoading) {
                loadingElement.style.display = 'flex';
                // Simulate some work
                setTimeout(() => {
                    toggleLoading(); // Recursive call to turn off loading
                }, 2000);
            } else {
                loadingElement.style.display = 'none';
            }

            return isLoading;
        }

        // Function to create animated background particles
        function createBackgroundParticles(count) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'bg-particle';
                    particle.style.left = Math.random() * 100 + 'vw';
                    particle.style.animationDelay = Math.random() * 15 + 's';
                    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                    document.body.appendChild(particle);

                    // Remove particle after animation
                    setTimeout(() => {
                        document.body.removeChild(particle);
                    }, 25000);
                }, Math.random() * 5000);
            }
        }

        // Add ripple effect to buttons
        function addRippleEffect() {
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    this.classList.add('ripple');
                    setTimeout(() => {
                        this.classList.remove('ripple');
                    }, 600);
                });
            });
        }

        // INITIALIZATION FUNCTION
        function initializeGallery() {
            // Sample card data using our functions
            const cardDataArray = [
                createCardData("CSS Transitions", "Smooth state changes between properties", "🎨"),
                createCardData("Keyframe Animations", "Complex, timeline-based animations", "⏱️"),
                createCardData("JavaScript Functions", "Reusable logic with parameters and returns", "⚡"),
                createCardData("Event Handling", "Interactive user experiences", "🖱️"),
                createCardData("DOM Manipulation", "Dynamic content and styling", "🔧"),
                createCardData("Animation Integration", "CSS and JS working together", "🎭")
            ];

            // Process cards and add to gallery
            const gallery = document.getElementById('cardGallery');
            
            cardDataArray.forEach((cardData, index) => {
                const cardElement = createCard(cardData);
                
                // Stagger the appearance of cards
                setTimeout(() => {
                    gallery.appendChild(cardElement);
                }, index * 200);
            });

            // Initialize other features
            addRippleEffect();
            createBackgroundParticles(15);
            
            // Return initialization status
            return {
                cardsCreated: cardDataArray.length,
                status: 'Gallery initialized successfully'
            };
        }

        // Initialize when page loads
        window.addEventListener('load', () => {
            const initResult = initializeGallery();
            console.log('Gallery initialization:', initResult);
        });

        // Demonstrate scope: This function can access global variables but also creates local ones
        function demonstrateScope() {
            // Access global variable
            console.log('Global cardCount:', cardCount);
            
            // Create local variable
            let localCounter = 0;
            
            // Function inside function (closure) - has access to both local and global scope
            function incrementCounters() {
                localCounter++; // Local scope
                cardCount++;    // Global scope
                return {
                    local: localCounter,
                    global: cardCount
                };
            }
            
            return incrementCounters();
        }

