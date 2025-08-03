// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    setupScrollAnimations();
    setupResponsiveImageHandling();
});

// Initialize all interactive components
function initializeComponents() {
    setupFAQAccordion();
    setupSizeSelector();
    setupSmoothScrolling();
    setupHoverEffects();
}

// FAQ Accordion functionality
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Close all FAQ answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
                ans.previousElementSibling.classList.remove('active');
            });
            
            // Open clicked answer if it was closed
            if (!isOpen) {
                answer.style.display = 'block';
                this.classList.add('active');
                
                // Smooth scroll to opened FAQ
                setTimeout(() => {
                    answer.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        });
        
        // Add keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
    });
}

// Size selector functionality
function setupSizeSelector() {
    const sizeOptions = document.querySelectorAll('.size-option');
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    sizeOptions.forEach((option, index) => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update CTA button text and links
            const isSmallSize = index === 0;
            const size = isSmallSize ? 'S' : 'L';
            const price = isSmallSize ? '13,900원' : '18,500원';
            
            ctaButtons.forEach(button => {
                button.textContent = `💛 ${size}사이즈 주문하기 (${price})`;
                button.href = `#order-${size.toLowerCase()}`;
            });
            
            // Add animation effect
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Keyboard accessibility
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        option.setAttribute('tabindex', '0');
        option.setAttribute('role', 'radio');
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for order links (they might be handled differently)
            if (href.startsWith('#order-')) {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations with Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('problem-card') || 
                    entry.target.classList.contains('usp-card') ||
                    entry.target.classList.contains('review-card') ||
                    entry.target.classList.contains('community-item')) {
                    
                    const siblings = entry.target.parentElement.children;
                    const index = Array.from(siblings).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animation targets
    const animationTargets = document.querySelectorAll(
        '.problem-card, .usp-card, .feature-item, .review-card, .community-item, .faq-item'
    );
    
    animationTargets.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Enhanced hover effects
function setupHoverEffects() {
    // Add hover sound effect (optional)
    const interactiveElements = document.querySelectorAll(
        '.problem-card, .usp-card, .review-card, .community-item, .cta-button, .community-button, .size-option'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Special effects for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 50px rgba(247, 101, 96, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
        });
    });
}

// Responsive image handling
function setupResponsiveImageHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Error handling for missing images
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn(`Image not found: ${this.src}`);
            
            // Show placeholder for missing images
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #999;
                font-size: 1rem;
                border-radius: inherit;
            `;
            placeholder.textContent = '이미지를 여기에 넣어주세요';
            
            this.parentElement.appendChild(placeholder);
        });
        
        // Initial styles for loading animation
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance monitoring
function trackPerformance() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    });
}

// Initialize performance tracking
trackPerformance();

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Recalculate any position-dependent elements
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth < 768) {
        heroTitle.style.fontSize = '2.2rem';
    } else if (heroTitle) {
        heroTitle.style.fontSize = '';
    }
}, 250));

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Close FAQ with Escape key
    if (e.key === 'Escape') {
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.style.display = 'none';
            answer.previousElementSibling.classList.remove('active');
        });
    }
    
    // Navigate size options with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('size-option')) {
            const sizeOptions = document.querySelectorAll('.size-option');
            const currentIndex = Array.from(sizeOptions).indexOf(focusedElement);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : sizeOptions.length - 1;
            } else {
                nextIndex = currentIndex < sizeOptions.length - 1 ? currentIndex + 1 : 0;
            }
            
            sizeOptions[nextIndex].focus();
            e.preventDefault();
        }
    }
});

// Analytics tracking (placeholder for integration)
function trackEvent(eventName, eventData = {}) {
    // This would integrate with your analytics service
    console.log(`Event: ${eventName}`, eventData);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.classList.contains('cta-button')) {
        trackEvent('cta_click', {
            button_text: target.textContent,
            section: 'main_cta'
        });
    }
    
    if (target.classList.contains('size-option')) {
        const sizeText = target.querySelector('strong')?.textContent || 'unknown';
        trackEvent('size_selection', {
            size: sizeText,
            section: 'product_options'
        });
    }
    
    if (target.classList.contains('community-button')) {
        trackEvent('social_click', {
            button_text: target.textContent,
            section: 'community'
        });
    }
});

// Scroll depth tracking
let maxScrollDepth = 0;
window.addEventListener('scroll', debounce(function() {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track scroll milestones
        if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
            trackEvent('scroll_depth', { depth: '25%' });
        } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
            trackEvent('scroll_depth', { depth: '50%' });
        } else if (maxScrollDepth >= 75 && maxScrollDepth < 90) {
            trackEvent('scroll_depth', { depth: '75%' });
        } else if (maxScrollDepth >= 90) {
            trackEvent('scroll_depth', { depth: '90%' });
        }
    }
}, 500));

// Mobile touch enhancements
if ('ontouchstart' in window) {
    // Add touch feedback for interactive elements
    const touchElements = document.querySelectorAll('.cta-button, .community-button, .size-option, .problem-card, .usp-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Loading state management
function showLoadingState(element) {
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    loader.innerHTML = '⏳';
    loader.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.appendChild(loader);
    
    return loader;
}

function hideLoadingState(loader) {
    if (loader && loader.parentElement) {
        loader.parentElement.removeChild(loader);
    }
}

// Form validation (if forms are added later)
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Lazy loading for images (if needed)
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
setupLazyLoading();

// Price animation effect
function animatePrice() {
    const salePrices = document.querySelectorAll('.sale-price');
    
    salePrices.forEach(price => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const finalPrice = entry.target.textContent;
                    const numericPrice = parseInt(finalPrice.replace(/[^0-9]/g, ''));
                    
                    let currentPrice = 0;
                    const increment = numericPrice / 50;
                    
                    const counter = setInterval(() => {
                        currentPrice += increment;
                        if (currentPrice >= numericPrice) {
                            currentPrice = numericPrice;
                            clearInterval(counter);
                        }
                        
                        entry.target.textContent = Math.floor(currentPrice).toLocaleString('ko-KR') + '원';
                    }, 30);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(price);
    });
}

// Initialize price animation
animatePrice();

// Add floating action button for quick order
function createFloatingOrderButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-button';
    fab.innerHTML = '🛒 주문하기';
    fab.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FFDD67, #F76560);
        color: white;
        padding: 16px 24px;
        border-radius: 50px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        cursor: pointer;
        font-weight: 700;
        font-size: 1rem;
        z-index: 1000;
        transition: all 0.3s ease;
        transform: translateY(100px);
        opacity: 0;
    `;
    
    fab.addEventListener('click', () => {
        document.querySelector('.cta-section').scrollIntoView({
            behavior: 'smooth'
        });
        trackEvent('fab_click', { source: 'floating_button' });
    });
    
    document.body.appendChild(fab);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero');
        const ctaSection = document.querySelector('.cta-section');
        
        if (heroSection && ctaSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const ctaTop = ctaSection.offsetTop;
            const scrollY = window.scrollY;
            
            if (scrollY > heroBottom && scrollY < ctaTop - window.innerHeight) {
                fab.style.transform = 'translateY(0)';
                fab.style.opacity = '1';
            } else {
                fab.style.transform = 'translateY(100px)';
                fab.style.opacity = '0';
            }
        }
    });
    
    return fab;
}

// Initialize floating action button
createFloatingOrderButton();

// Add to cart functionality (placeholder for e-commerce integration)
function addToCart(productData) {
    // This would integrate with your e-commerce platform
    console.log('Adding to cart:', productData);
    
    // Show success message
    showNotification('장바구니에 추가되었습니다! 🛒', 'success');
    
    trackEvent('add_to_cart', {
        product_id: productData.id || 'smile-cooler-bag',
        product_name: productData.name || 'Smile We Love 보냉백',
        size: productData.size || 'S',
        price: productData.price || 13900
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F76560' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 700;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Update CTA buttons with add to cart functionality
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const activeSize = document.querySelector('.size-option.active');
        const sizeText = activeSize?.querySelector('strong')?.textContent || 'S사이즈';
        const priceText = activeSize?.querySelector('.size-price')?.textContent || '13,900원';
        
        const productData = {
            id: `smile-cooler-${sizeText.toLowerCase()}`,
            name: 'Smile We Love 보냉백',
            size: sizeText,
            price: parseInt(priceText.replace(/[^0-9]/g, ''))
        };
        
        // Show loading state
        const loader = showLoadingState(this);
        
        // Simulate API call
        setTimeout(() => {
            hideLoadingState(loader);
            addToCart(productData);
        }, 1000);
    });
});

// Add wishlist functionality
function toggleWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('위시리스트에서 제거되었습니다', 'info');
    } else {
        wishlist.push(productId);
        showNotification('위시리스트에 추가되었습니다! 💝', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    trackEvent('wishlist_toggle', {
        product_id: productId,
        action: index > -1 ? 'remove' : 'add'
    });
    
    return index === -1; // Returns true if added, false if removed
}

// Testimonial rotation (if multiple testimonials exist)
function setupTestimonialRotation() {
    const reviewCards = document.querySelectorAll('.review-card');
    
    if (reviewCards.length > 3) {
        let currentIndex = 0;
        const visibleCards = 3;
        
        // Hide extra cards initially
        reviewCards.forEach((card, index) => {
            if (index >= visibleCards) {
                card.style.display = 'none';
            }
        });
        
        // Rotate testimonials every 5 seconds
        setInterval(() => {
            reviewCards[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % reviewCards.length;
            
            const nextIndex = (currentIndex + visibleCards - 1) % reviewCards.length;
            reviewCards[nextIndex].style.display = 'block';
        }, 5000);
    }
}

// Initialize testimonial rotation
setupTestimonialRotation();

// Add image zoom effect on hover
function setupImageZoom() {
    const images = document.querySelectorAll('.hero-image img, .problem-image img, .solution-image img, .review-image img, .event-image img, .cta-image img, .faq-image img, .community-image img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize image zoom
setupImageZoom();

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #FFDD67, #F76560);
        z-index: 10000;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add easter egg for multiple clicks on logo
function setupEasterEgg() {
    const logo = document.querySelector('.brand-logo');
    let clickCount = 0;
    let clickTimer;
    
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 2000);
            
            if (clickCount >= 5) {
                showNotification('위글위글 숨겨진 기능 발견! 🎉', 'success');
                
                // Add confetti effect
                for (let i = 0; i < 50; i++) {
                    createConfetti();
                }
                
                clickCount = 0;
            }
        });
    }
}

// Create confetti effect
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${Math.random() > 0.5 ? '#FFDD67' : '#F76560'};
        top: -10px;
        left: ${Math.random() * 100}%;
        z-index: 10000;
        pointer-events: none;
        animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        if (confetti.parentElement) {
            confetti.parentElement.removeChild(confetti);
        }
    }, 5000);
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Initialize easter egg
setupEasterEgg();

// Initialize all components when DOM is ready
console.log('위글위글 스마일 보냉백 페이지가 로드되었습니다! 🌈✨');

// Export functions for external use (if needed)
window.WiggleWiggle = {
    trackEvent,
    showNotification,
    addToCart,
    toggleWishlist,
    validateForm,
    showLoadingState,
    hideLoadingState
};