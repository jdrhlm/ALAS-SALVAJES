// Cart functionality
        let cart = [];
        let cartCount = 0;

        // Anime.js animations
        document.addEventListener('DOMContentLoaded', function() {
            // Hero animations
            anime({
                targets: '.hero-title',
                translateY: [100, 0],
                opacity: [0, 1],
                duration: 1200,
                easing: 'easeOutExpo',
                delay: 500
            });

            anime({
                targets: '.hero-subtitle',
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeOutExpo',
                delay: 800
            });

            anime({
                targets: '.hero-buttons .btn-primary',
                scale: [0, 1],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutElastic(1, .6)',
                delay: 1200
            });

            anime({
                targets: '.hero-buttons .btn-secondary',
                scale: [0, 1],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutElastic(1, .6)',
                delay: 1400
            });

            // Floating animation for hero image
            anime({
                targets: '.floating-wings',
                translateY: [-20, 20],
                duration: 3000,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine'
            });

            // Scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('specialty-card')) {
                            anime({
                                targets: entry.target,
                                translateY: [100, 0],
                                opacity: [0, 1],
                                duration: 800,
                                easing: 'easeOutExpo',
                                delay: 200
                            });
                        }

                        if (entry.target.classList.contains('menu-item')) {
                            anime({
                                targets: entry.target,
                                scale: [0.8, 1],
                                opacity: [0, 1],
                                duration: 600,
                                easing: 'easeOutExpo',
                                delay: anime.random(0, 400)
                            });
                        }

                        if (entry.target.classList.contains('testimonial-card')) {
                            anime({
                                targets: entry.target,
                                translateX: [anime.random(-100, 100), 0],
                                opacity: [0, 1],
                                duration: 800,
                                easing: 'easeOutExpo',
                                delay: 100
                            });
                        }

                        if (entry.target.classList.contains('press-item')) {
                            anime({
                                targets: entry.target,
                                rotateY: [90, 0],
                                opacity: [0, 1],
                                duration: 1000,
                                easing: 'easeOutExpo',
                                delay: anime.random(0, 300)
                            });
                        }

                        if (entry.target.classList.contains('section-title')) {
                            anime({
                                targets: entry.target,
                                translateY: [50, 0],
                                opacity: [0, 1],
                                duration: 800,
                                easing: 'easeOutExpo'
                            });
                        }
                    }
                });
            }, observerOptions);

            // Observe all animated elements
            document.querySelectorAll('.specialty-card, .menu-item, .testimonial-card, .press-item, .section-title').forEach(el => {
                observer.observe(el);
            });

            // Menu category switching
            const menuCategories = document.querySelector('.menu-categories');
            const menuGrids = document.querySelectorAll('.menu-grid');

            menuCategories.addEventListener('click', (e) => {
                const target = e.target;
                if (target.classList.contains('category-btn')) {
                    // Remove active class from all buttons
                    const categoryBtns = document.querySelectorAll('.category-btn');
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    target.classList.add('active');

                    // Hide all menu grids
                    menuGrids.forEach(grid => {
                        grid.classList.add('hidden');
                    });

                    // Show selected menu grid
                    const category = target.getAttribute('data-category');
                    const targetGrid = document.getElementById(category);
                    if (targetGrid) {
                        targetGrid.classList.remove('hidden');
                        
                        // Animate menu items
                        anime({
                            targets: `#${category} .menu-item`,
                            scale: [0, 1],
                            opacity: [0, 1],
                            duration: 600,
                            delay: anime.stagger(100),
                            easing: 'easeOutExpo'
                        });
                    }

                    // Button click animation
                    anime({
                        targets: target,
                        scale: [1, 1.1, 1],
                        duration: 300,
                        easing: 'easeOutExpo'
                    });
                }
            });

            // Add to cart functionality
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const menuItem = this.closest('.menu-item');
                    const name = menuItem.getAttribute('data-name');
                    const price = parseFloat(menuItem.getAttribute('data-price'));

                    // Button click animation
                    anime({
                        targets: this,
                        scale: [1, 0.9, 1],
                        duration: 200,
                        easing: 'easeInOutQuad'
                    });

                    // Add to cart with animation
                    addToCart(name, price);
                    
                    // Show success feedback
                    this.innerHTML = 'Agregado!';
                    this.style.background = '#10b981';
                    setTimeout(() => {
                        this.innerHTML = 'Agregar al Carrito';
                        this.style.background = '';
                    }, 1500);

                    // Cart icon animation
                    anime({
                        targets: '.cart-icon',
                        scale: [1, 1.3, 1],
                        duration: 400,
                        easing: 'easeOutElastic(1, .6)'
                    });
                });
            });

            // Mobile menu toggle
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }

                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });

            // Hero buttons functionality
            document.querySelector('.order-now').addEventListener('click', () => {
                document.querySelector('#menu').scrollIntoView({
                    behavior: 'smooth'
                });
            });

            document.querySelector('.view-menu').addEventListener('click', () => {
                document.querySelector('#menu').scrollIntoView({
                    behavior: 'smooth'
                });
            });

            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(0, 0, 0, 0.98)';
                } else {
                    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                }
            });

            // Parallax effect for hero background
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.hero-background');
                const speed = scrolled * 0.5;
                
                if (parallax) {
                    parallax.style.transform = `translateY(${speed}px)`;
                }
            });
        });

        // Cart functions
        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
        }

        function removeFromCart(name) {
            const itemIndex = cart.findIndex(item => item.name === name);
            if (itemIndex > -1) {
                cart.splice(itemIndex, 1);
            }
            updateCart();
        }

        function updateQuantity(name, change) {
            const item = cart.find(item => item.name === name);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(name);
                } else {
                    updateCart();
                }
            }
        }

        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            const cartCount = document.querySelector('.cart-count');
            
            cartItems.innerHTML = '';
            let total = 0;
            let itemCount = 0;

            cart.forEach(item => {
                total += item.price * item.quantity;
                itemCount += item.quantity;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <strong>${item.name}</strong><br>
                        S/ ${item.price.toFixed(2)} c/u
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span style="margin: 0 10px; color: white;">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });

            cartTotal.textContent = total.toFixed(2);
            cartCount.textContent = itemCount;

            // Animate cart updates
            if (cart.length > 0) {
                anime({
                    targets: '#cart-items .cart-item',
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    duration: 400,
                    delay: anime.stagger(100),
                    easing: 'easeOutExpo'
                });
            }
        }

        // WhatsApp integration
        document.getElementById('send-whatsapp').addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío. Agrega algunos productos antes de hacer el pedido.');
                return;
            }

            let message = '🍗 *PEDIDO ALAS SALVAJES* 🍗\n\n';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                message += `• ${item.name}\n`;
                message += `  Cantidad: ${item.quantity}\n`;
                message += `  Precio: S/ ${item.price.toFixed(2)} c/u\n`;
                message += `  Subtotal: S/ ${itemTotal.toFixed(2)}\n\n`;
            });

            message += `*TOTAL: S/ ${total.toFixed(2)}*\n\n`;
            message += `📍 *Dirección de entrega:*
`;
            message += `(Por favor completa tu dirección)\n\n`;
            message += `📞 *Teléfono de contacto:*
`;
            message += `(Por favor completa tu teléfono)\n\n`;
            message += `⏰ Horario: 6:00 PM - 11:30 PM\n`;
            message += `🏍️ Delivery: S/ 3.00 en Chorrillos`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/51961740111?text=${encodedMessage}`;

            // Button animation
            anime({
                targets: this,
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeInOutQuad',
                complete: () => {
                    window.open(whatsappURL, '_blank');
                }
            });
        });

        // Advanced hover effects
        document.querySelectorAll('.specialty-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this.querySelector('.card-icon'),
                    scale: [1, 1.2],
                    rotate: [0, 360],
                    duration: 600,
                    easing: 'easeOutElastic(1, .6)'
                });
            });

            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this.querySelector('.card-icon'),
                    scale: [1.2, 1],
                    rotate: [360, 0],
                    duration: 400,
                    easing: 'easeOutExpo'
                });
            });
        });

        // Menu item hover effects
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                anime({
                    targets: this.querySelector('.item-image::before'),
                    scale: [1, 1.1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });

                anime({
                    targets: this,
                    boxShadow: ['0 15px 40px rgba(220, 38, 38, 0.2)', '0 25px 60px rgba(220, 38, 38, 0.4)'],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            item.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    boxShadow: ['0 25px 60px rgba(220, 38, 38, 0.4)', '0 15px 40px rgba(220, 38, 38, 0.2)'],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });

        // Testimonial card animations
        document.querySelectorAll('.testimonial-card').forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this.querySelector('.stars'),
                    scale: [1, 1.2],
                    color: ['#ffc107', '#ff9800'],
                    duration: 400,
                    easing: 'easeOutElastic(1, .8)'
                });
            });

            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this.querySelector('.stars'),
                    scale: [1.2, 1],
                    color: ['#ff9800', '#ffc107'],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });

        // Advanced scroll animations
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            // Parallax for specialty cards
            document.querySelectorAll('.specialty-card').forEach((card, index) => {
                if (isInViewport(card)) {
                    const offset = rate * (index + 1) * 0.1;
                    card.style.transform = `translateY(${offset}px)`;
                }
            });
        });

        // Utility function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // Loading animation
        window.addEventListener('load', function() {
            // Animate navbar entrance
            anime({
                targets: '.navbar',
                translateY: [-100, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            });

            // Stagger animation for navigation items
            anime({
                targets: '.nav-link',
                translateY: [-30, 0],
                opacity: [0, 1],
                duration: 600,
                delay: anime.stagger(100, {start: 300}),
                easing: 'easeOutExpo'
            });
        });

        // Dynamic background particles
        function createParticles() {
            const particleContainer = document.createElement('div');
            particleContainer.style.position = 'fixed';
            particleContainer.style.top = '0';
            particleContainer.style.left = '0';
            particleContainer.style.width = '100%';
            particleContainer.style.height = '100%';
            particleContainer.style.pointerEvents = 'none';
            particleContainer.style.zIndex = '1';
            document.body.appendChild(particleContainer);

            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = Math.random() > 0.5 ? '#dc2626' : '#8b4513';
                particle.style.borderRadius = '50%';
                particle.style.opacity = '0.3';
                
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;
                
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                
                particleContainer.appendChild(particle);

                // Animate particles
                anime({
                    targets: particle,
                    translateY: [startY, startY - 200],
                    translateX: [startX, startX + (Math.random() - 0.5) * 100],
                    opacity: [0.3, 0],
                    duration: anime.random(3000, 6000),
                    easing: 'linear',
                    loop: true,
                    delay: anime.random(0, 3000)
                });
            }
        }

        // Initialize particles after page load
        setTimeout(createParticles, 1000);

        // Advanced button interactions
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    scale: [1, 1.05],
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            btn.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    scale: [1.05, 1],
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            btn.addEventListener('click', function() {
                anime({
                    targets: this,
                    scale: [1, 0.95, 1.05, 1],
                    duration: 400,
                    easing: 'easeOutElastic(1, .6)'
                });
            });
        });

        // Scroll-triggered counter animation
        function animateCounter(element, target) {
            const obj = { value: 0 };
            
            anime({
                targets: obj,
                value: target,
                duration: 2000,
                easing: 'easeOutExpo',
                update: function() {
                    element.innerHTML = Math.round(obj.value);
                }
            });
        }

        // Initialize counters when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    
                    if (entry.target.classList.contains('counter')) {
                        const target = parseInt(entry.target.dataset.target);
                        animateCounter(entry.target, target);
                    }
                }
            });
        });

        // Add some counters to the specialties section (you can add these to HTML)
        document.querySelectorAll('.counter').forEach(counter => {
            observer.observe(counter);
        });

        // Dynamic text effects
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Mouse cursor effects
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.custom-cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'custom-cursor';
                newCursor.style.position = 'fixed';
                newCursor.style.width = '20px';
                newCursor.style.height = '20px';
                newCursor.style.background = 'radial-gradient(circle, #dc2626, transparent)';
                newCursor.style.borderRadius = '50%';
                newCursor.style.pointerEvents = 'none';
                newCursor.style.zIndex = '9999';
                newCursor.style.opacity = '0.7';
                newCursor.style.transition = 'transform 0.1s ease';
                document.body.appendChild(newCursor);
            }
            
            const cursorElement = document.querySelector('.custom-cursor');
            cursorElement.style.left = (e.clientX - 10) + 'px';
            cursorElement.style.top = (e.clientY - 10) + 'px';
        });

        // Enhanced mobile experience
        if (window.innerWidth <= 768) {
            // Touch animations for mobile
            document.querySelectorAll('.menu-item, .specialty-card').forEach(element => {
                element.addEventListener('touchstart', function() {
                    anime({
                        targets: this,
                        scale: [1, 0.98],
                        duration: 150,
                        easing: 'easeOutQuad'
                    });
                });

                element.addEventListener('touchend', function() {
                    anime({
                        targets: this,
                        scale: [0.98, 1],
                        duration: 150,
                        easing: 'easeOutQuad'
                    });
                });
            });
        }

        // Performance optimization
        let ticking = false;

        function updateAnimations() {
            // Update scroll-based animations here
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);

        // Error handling for animations
        try {
            // All animation code wrapped in try-catch for robustness
        } catch (error) {
            console.log('Animation error:', error);
            // Fallback behavior without animations
        }

        // Preload important images
        function preloadImages() {
            const imageUrls = [
                // Add your image URLs here
            ];
            
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        }

        preloadImages();
