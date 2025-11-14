// ===================================
// THEME TOGGLE FUNCTIONALITY
// ===================================

// Initialize theme from localStorage or default to dark mode
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
}

// Toggle theme function
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        console.log('Theme switched to: Light Mode ☀️');
    } else {
        localStorage.setItem('theme', 'dark');
        console.log('Theme switched to: Dark Mode 🌙');
    }
}

// Set up theme toggle button
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize theme on page load
initializeTheme();

// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLL WITH OFFSET
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animatedElements = document.querySelectorAll(`
    .process-step,
    .product-card,
    .testimonial-card,
    .origin-content,
    .social-proof-item
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================

const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===================================
// STAGGERED ANIMATION FOR PROCESS STEPS
// ===================================

const processSteps = document.querySelectorAll('.process-step');

processSteps.forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.15}s`;
});

// ===================================
// PRODUCT CARD INTERACTION
// ===================================

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// CTA TRACKING (Optional Analytics Hook)
// ===================================

const ctaButtons = document.querySelectorAll('.btn-primary, .btn-cta-large, .product-cta');

ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Add your analytics tracking here
        const buttonText = this.textContent.trim();
        console.log(`CTA Clicked: ${buttonText}`);
        
        // Example: Google Analytics event
        // gtag('event', 'cta_click', {
        //     'event_category': 'engagement',
        //     'event_label': buttonText
        // });
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================

const images = document.querySelectorAll('img[src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// SCROLL PROGRESS INDICATOR (Optional)
// ===================================

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    // You can use this to show a progress bar if needed
    // document.getElementById('scroll-progress').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Focus trap for mobile menu
const focusableElements = navMenu.querySelectorAll('a, button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

if (hamburger) {
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(updateScrollProgress, 10);
window.addEventListener('scroll', debouncedScroll);

// ===================================
// CONTACT MODAL FUNCTIONALITY
// ===================================

const floatingContactBtn = document.getElementById('floating-contact-btn');
const contactModal = document.getElementById('contact-modal');
const contactModalClose = document.querySelector('.contact-modal-close');
const contactModalOverlay = document.querySelector('.contact-modal-overlay');

if (floatingContactBtn && contactModal) {
    // Open contact modal
    floatingContactBtn.addEventListener('click', () => {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Contact modal opened');
    });

    // Close contact modal
    const closeContactModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Contact modal closed');
    };

    if (contactModalClose) {
        contactModalClose.addEventListener('click', closeContactModal);
    }

    if (contactModalOverlay) {
        contactModalOverlay.addEventListener('click', closeContactModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });
}

// ===================================
// IMMERSIVE HOMEPAGE MENU
// ===================================

const immersiveMenuBtn = document.getElementById('immersive-menu-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const fullscreenMenuClose = document.getElementById('fullscreen-menu-close');

if (immersiveMenuBtn && fullscreenMenu) {
    // Open fullscreen menu
    immersiveMenuBtn.addEventListener('click', () => {
        fullscreenMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Fullscreen menu opened');
    });

    // Close fullscreen menu
    const closeFullscreenMenu = () => {
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Fullscreen menu closed');
    };

    if (fullscreenMenuClose) {
        fullscreenMenuClose.addEventListener('click', closeFullscreenMenu);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenMenu.classList.contains('active')) {
            closeFullscreenMenu();
        }
    });

    // Close menu when clicking on a link
    const fullscreenMenuLinks = fullscreenMenu.querySelectorAll('.fullscreen-menu-link, .fullscreen-contact-link');
    fullscreenMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Delay closing slightly for better UX
            setTimeout(closeFullscreenMenu, 300);
        });
    });
}

// ===================================
// CONSOLE BRANDING (Optional)
// ===================================

console.log(
    '%cEJ Farm',
    'font-size: 24px; font-weight: bold; color: #8B4513; font-family: serif;'
);
console.log(
    '%cFrom the volcanic highlands of Vietnam 🌋☕',
    'font-size: 14px; color: #6D4C41;'
);
