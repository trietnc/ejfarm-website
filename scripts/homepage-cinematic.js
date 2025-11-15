/* ===================================
   HOMEPAGE CINEMATIC JAVASCRIPT
   Digital Terroir Experience
   =================================== */

// ===================================
// IMMERSIVE MENU FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const immersiveMenu = document.getElementById('immersive-menu');
    const body = document.body;

    // Open menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            immersiveMenu.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
        });
    }

    // Close menu
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            immersiveMenu.classList.remove('active');
            body.style.overflow = ''; // Restore body scroll
        });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && immersiveMenu.classList.contains('active')) {
            immersiveMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close menu when clicking on a menu link
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            immersiveMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
});

// ===================================
// INTERSECTION OBSERVER
// Fade-in animations for scene elements
// ===================================

const observerOptions = {
    threshold: 0.3, // Trigger when 30% of element is visible
    rootMargin: '0px 0px -10% 0px' // Slight offset from bottom
};

// Create the observer
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class when element enters viewport
            entry.target.classList.add('visible');
        } else {
            // Optional: Remove visible class when element exits viewport
            // This creates a re-trigger effect if user scrolls back up
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-element class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
});

// ===================================
// HERO SCENE SPECIFIC
// Auto-trigger hero headline on page load
// ===================================

window.addEventListener('load', () => {
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
        // Delay slightly for dramatic effect
        setTimeout(() => {
            heroHeadline.classList.add('visible');
        }, 300);
    }
});

// ===================================
// SCROLL FADE OUT FOR HERO HEADLINE
// Fade out hero text as user scrolls
// ===================================

window.addEventListener('scroll', () => {
    const heroHeadline = document.querySelector('.hero-headline');
    const heroScene = document.getElementById('hero-scene-1');
    
    if (heroHeadline && heroScene) {
        const heroHeight = heroScene.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Calculate opacity based on scroll position
        // Fade out starts immediately as user scrolls
        const opacity = 1 - (scrollPosition / (heroHeight * 0.5));
        
        // Apply opacity (clamped between 0 and 1)
        heroHeadline.style.opacity = Math.max(0, Math.min(1, opacity));
    }
});

// ===================================
// VIDEO PERFORMANCE OPTIMIZATION
// Pause video when not in viewport
// ===================================

const videoObserverOptions = {
    threshold: 0.5
};

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.play();
        } else {
            video.pause();
        }
    });
}, videoObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        videoObserver.observe(heroVideo);
    }
});

// ===================================
// SMOOTH SCROLL INDICATOR
// Hide scroll indicator after user starts scrolling
// ===================================

let hasScrolled = false;

window.addEventListener('scroll', () => {
    if (!hasScrolled && window.scrollY > 100) {
        hasScrolled = true;
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
        }
    }
});

// ===================================
// SCENE 2: COMMUNITY SCENE (SPLIT-SCREEN)
// Animate image and content on scroll into view
// ===================================

const communityObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const communityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate image
            const image = entry.target.querySelector('.community-image-primary');
            const accentText = entry.target.querySelector('.community-accent-text');
            const content = entry.target.querySelector('.community-content-inner');
            
            if (image) image.classList.add('visible');
            if (accentText) accentText.classList.add('visible');
            if (content) content.classList.add('visible');
            
            communityObserver.unobserve(entry.target);
        }
    });
}, communityObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
    const communityScene = document.querySelector('.community-scene-immersive');
    if (communityScene) {
        communityObserver.observe(communityScene);
    }
});

// ===================================
// SCENE 3: PROCESS (CINEMATIC JOURNEY)
// Animate title and each process act on scroll
// ===================================

const processTitleObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const processTitleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const title = entry.target.querySelector('.process-cinematic-title');
            const subtitle = entry.target.querySelector('.process-cinematic-subtitle');
            
            if (title) title.classList.add('visible');
            if (subtitle) subtitle.classList.add('visible');
            
            processTitleObserver.unobserve(entry.target);
        }
    });
}, processTitleObserverOptions);

const processActObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -15% 0px'
};

const processActObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, processActObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observe title
    const processHeader = document.querySelector('.process-sticky-header');
    if (processHeader) {
        processTitleObserver.observe(processHeader);
    }
    
    // Observe each act
    const processActs = document.querySelectorAll('.process-act');
    processActs.forEach(act => {
        processActObserver.observe(act);
    });
});

// ===================================
// SCENE 4: PRODUCT SHOWCASE (IMMERSIVE)
// Animate product items as they enter viewport
// ===================================

const productShowcaseObserverOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -15% 0px'
};

const productShowcaseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, productShowcaseObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
    const productItems = document.querySelectorAll('.product-showcase-item');
    productItems.forEach(item => {
        productShowcaseObserver.observe(item);
    });
    
    // Observe header
    const productHeader = document.querySelector('.product-showcase-header');
    if (productHeader) {
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });
        
        headerObserver.observe(productHeader);
    }
});

// ===================================
// SCENE 5: TESTIMONIAL
// Fade-in animation for quote and attribution
// ===================================

const testimonialObserverOptions = {
    threshold: 0.4,
    rootMargin: '0px 0px -10% 0px'
};

const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, testimonialObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
    const testimonialQuote = document.querySelector('.testimonial-quote');
    const testimonialAttribution = document.querySelector('.testimonial-attribution');
    
    if (testimonialQuote) {
        testimonialObserver.observe(testimonialQuote);
    }
    
    if (testimonialAttribution) {
        testimonialObserver.observe(testimonialAttribution);
    }
});

// ===================================
// SCENE 6: FINALE
// Fade-in animation for headline and CTA button
// ===================================

const finaleObserverOptions = {
    threshold: 0.4,
    rootMargin: '0px 0px -10% 0px'
};

const finaleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, finaleObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
    const finaleHeadline = document.querySelector('.finale-headline');
    const finaleCta = document.querySelector('.finale-cta-button');
    
    if (finaleHeadline) {
        finaleObserver.observe(finaleHeadline);
    }
    
    if (finaleCta) {
        finaleObserver.observe(finaleCta);
    }
    
    // Also observe finale video for performance
    const finaleVideo = document.querySelector('.finale-video');
    if (finaleVideo) {
        videoObserver.observe(finaleVideo);
    }
});

// ===================================
// FOOTER LANGUAGE SWITCHER
// Sync with main language switcher
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const footerLangButtons = document.querySelectorAll('.footer-lang-btn');
    
    footerLangButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            
            // Remove active class from all footer buttons
            footerLangButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Sync with main language switcher
            const mainLangButtons = document.querySelectorAll('.lang-btn');
            mainLangButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                }
            });
            
            // Trigger language change if function exists
            if (typeof changeLanguage === 'function') {
                changeLanguage(lang);
            }
            
            // Store preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });
    
    // Set initial active state based on stored preference
    const preferredLang = localStorage.getItem('preferredLanguage') || 'en';
    const activeFooterButton = document.querySelector(`.footer-lang-btn[data-lang="${preferredLang}"]`);
    if (activeFooterButton) {
        activeFooterButton.classList.add('active');
    }
});

// ===================================
// LANGUAGE SWITCHER INTEGRATION
// (Assumes language-switcher-shared.js is loaded)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Trigger language change if function exists
            if (typeof changeLanguage === 'function') {
                changeLanguage(lang);
            }
            
            // Store preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });
    
    // Set initial active state based on stored preference
    const preferredLang = localStorage.getItem('preferredLanguage') || 'en';
    const activeButton = document.querySelector(`.lang-btn[data-lang="${preferredLang}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// Keyboard navigation support
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Trap focus within menu when open
    const immersiveMenu = document.getElementById('immersive-menu');
    const focusableElements = immersiveMenu?.querySelectorAll(
        'button, a, input, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements && focusableElements.length > 0) {
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        immersiveMenu.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || !immersiveMenu.classList.contains('active')) return;
            
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });
    }
});

// ===================================
// PERFORMANCE OPTIMIZATION
// Throttle scroll events
// ===================================

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function(...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime < delay) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastExecTime = currentTime;
                func.apply(this, args);
            }, delay);
        } else {
            lastExecTime = currentTime;
            func.apply(this, args);
        }
    };
}

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(() => {
    // All scroll-dependent functions are already implemented above
    // This is here as a pattern for future optimization if needed
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// ===================================
// DEBUG MODE (Development Only)
// Remove in production
// ===================================

const DEBUG = false; // Set to true for console logging

if (DEBUG) {
    console.log('Homepage Cinematic JS loaded');
    
    // Log when elements become visible
    const debugObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element visible:', entry.target.className);
            }
        });
    }, observerOptions);
    
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.fade-in-element').forEach(el => {
            debugObserver.observe(el);
        });
    });
}
