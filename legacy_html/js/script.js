/**
 * D.E. Technics Website JavaScript
 * Main script file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    if (mobileMenuToggle && mobileMenu && closeMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        closeMenu.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileMenu) {
                        mobileMenu.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Function to show next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to show previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Start automatic sliding
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop automatic sliding
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        stopSlideInterval();
        nextSlide();
        startSlideInterval();
    });

    prevBtn.addEventListener('click', () => {
        stopSlideInterval();
        prevSlide();
        startSlideInterval();
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideInterval();
            showSlide(index);
            startSlideInterval();
        });
    });

    // Initialize slider
    showSlide(0);
    startSlideInterval();

    // Pause slider when hovering over it
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('mouseenter', stopSlideInterval);
    heroSection.addEventListener('mouseleave', startSlideInterval);

    // Form Validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if not exists
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                    
                    // Add error message if not exists
                    let errorMessage = emailField.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'Please enter a valid email address';
                        emailField.parentNode.insertBefore(errorMessage, emailField.nextSibling);
                    }
                }
            }
            
            if (!isValid) {
                e.preventDefault();
            } else {
                // For demo purposes, prevent form submission and show success message
                if (form.classList.contains('contact-form') || form.classList.contains('newsletter-form')) {
                    e.preventDefault();
                    
                    // Clear form fields
                    form.querySelectorAll('input, textarea').forEach(field => {
                        field.value = '';
                    });
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    
                    if (form.classList.contains('contact-form')) {
                        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                    } else {
                        successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                    }
                    
                    form.appendChild(successMessage);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }
            }
        });
    });

    // Product filter functionality (if exists)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.querySelector('.product-category').textContent;
                    if (filterValue === 'all' || category.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Back to top button
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.id = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add CSS for back to top button
    const style = document.createElement('style');
    style.textContent = `
        #back-to-top {
            position: fixed;
            bottom: 30px;
            right: 100px;
            width: 40px;
            height: 40px;
            background-color: #c8a415;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        #back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        #back-to-top:hover {
            background-color: #b69313;
            transform: translateY(-3px);
        }
        
        .error {
            border-color: #dc3545 !important;
        }
        
        .error-message {
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
        }
        
        .success-message {
            background-color: #d4edda;
            color: #155724;
            padding: 10px 15px;
            border-radius: 4px;
            margin-top: 15px;
        }
    `;
    document.head.appendChild(style);

    // Function to update quote buttons on product pages
    function updateQuoteButtons() {
        // Get all quote buttons
        const quoteButtons = document.querySelectorAll('.product-actions .btn-primary');
        
        quoteButtons.forEach(button => {
            // Get the product title
            const productTitle = document.querySelector('.product-title')?.textContent;
            if (productTitle) {
                // Update the button to link to quote form with product parameter
                button.href = `quote-form.html?product=${encodeURIComponent(productTitle)}`;
            }
        });
    }

    // Call the function when the DOM is loaded
    updateQuoteButtons();
});

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Toggle active class on the clicked item
                item.classList.toggle('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
        
        // Open the first FAQ item by default
        faqItems[0].classList.add('active');
    }
});

// Policy Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const policyNavItems = document.querySelectorAll('.policy-nav-item');
    const policySections = document.querySelectorAll('.policy-section');
    
    if (policyNavItems.length > 0 && policySections.length > 0) {
        // Handle click on policy navigation items
        policyNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all items
                policyNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Get the target section ID
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Scroll to the target section
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Handle scroll to highlight active section
        window.addEventListener('scroll', function() {
            let currentSection = '';
            
            policySections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 200)) {
                    currentSection = '#' + section.getAttribute('id');
                }
            });
            
            policyNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === currentSection) {
                    item.classList.add('active');
                }
            });
        });
        
        // Check if URL has hash and scroll to that section
        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Activate the corresponding nav item
                    policyNavItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === window.location.hash) {
                            item.classList.add('active');
                        }
                    });
                }, 300);
            }
        }
    }
});

// Product Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image
                const imageUrl = this.getAttribute('data-image');
                mainImage.src = imageUrl;
                
                // Update active thumbnail
                thumbnails.forEach(thumb => {
                    thumb.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
});

// Product Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
});

// Rating Selection Functionality
document.addEventListener('DOMContentLoaded', function() {
    const ratingStars = document.querySelectorAll('.rating-select i');
    
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                
                // Update stars
                ratingStars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                
                // Update stars on hover
                ratingStars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
        
        // Reset stars when mouse leaves the rating container
        const ratingContainer = document.querySelector('.rating-select');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', function() {
                // Find selected rating
                const selectedRating = Array.from(ratingStars).findIndex(star => star.classList.contains('active'));
                
                // Update stars based on selected rating
                ratingStars.forEach((s, index) => {
                    if (index <= selectedRating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        }
    }
});

// WhatsApp Share Button Functionality
document.addEventListener("DOMContentLoaded", () => {
    const whatsappBtn = document.querySelector(".btn-whatsapp")
  
    if (whatsappBtn) {
      // Get the product title
      const productTitle = document.querySelector(".product-title")?.textContent || "Product"
      // Get the current page URL
      const pageUrl = window.location.href
      // Create the share message with proper formatting
      const shareMessage = `Hello! I visited your website and am interested in this product: ${productTitle} ${pageUrl}`
      // Update the WhatsApp button href with proper encoding
      const encodedMessage = encodeURIComponent(shareMessage).replace(/%20/g, '%20')
      whatsappBtn.href = `https://wa.me/923330184756?text=${encodedMessage}`
      
      // Add click event listener to ensure proper handling
      whatsappBtn.addEventListener('click', function(e) {
        // Allow the default action (opening WhatsApp) to proceed
        return true
      })
    }
})
