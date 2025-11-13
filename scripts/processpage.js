// ===================================
// PROCESS PAGE SCROLLYTELLING
// ===================================

// Intersection Observer for Journey Steps
function initScrollytelling() {
    const steps = document.querySelectorAll('.journey-step');
    const visualImages = document.querySelectorAll('.visual-image');
    
    if (steps.length === 0 || visualImages.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = entry.target;
                const stepNumber = step.getAttribute('data-step');
                
                // Remove active class from all steps
                steps.forEach(s => s.classList.remove('active'));
                
                // Add active class to current step
                step.classList.add('active');
                
                // Update visual image
                visualImages.forEach(img => {
                    img.classList.remove('active');
                    if (img.getAttribute('data-visual') === stepNumber) {
                        img.classList.add('active');
                    }
                });
                
                console.log(`Journey step ${stepNumber} activated`);
            }
        });
    }, observerOptions);

    steps.forEach(step => observer.observe(step));
}

// Intersection Observer for Chocolate Cards
function initChocolateCards() {
    const cards = document.querySelectorAll('.chocolate-card');
    
    if (cards.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Stagger animation
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

// Parallax effect for hero image
function initHeroParallax() {
    const heroImage = document.querySelector('.hero-image');
    
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.process-hero').offsetHeight;
        
        if (scrolled < heroHeight) {
            const parallaxSpeed = 0.5;
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Progress tracking (optional - for debugging)
function trackScrollProgress() {
    const steps = document.querySelectorAll('.journey-step');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        steps.forEach((step, index) => {
            const stepTop = step.offsetTop;
            const stepBottom = stepTop + step.offsetHeight;
            const stepMiddle = stepTop + (step.offsetHeight / 2);
            
            // Check if step middle is in viewport center
            if (scrollTop + (windowHeight / 2) >= stepMiddle - 200 && 
                scrollTop + (windowHeight / 2) <= stepMiddle + 200) {
                step.classList.add('active');
            }
        });
    });
}

// Initialize on page load
function initProcessPage() {
    console.log('Process page initialized');
    
    initScrollytelling();
    initChocolateCards();
    initHeroParallax();
    initSmoothScroll();
    
    // Set first step as active on load
    const firstStep = document.querySelector('.journey-step[data-step="1"]');
    const firstVisual = document.querySelector('.visual-image[data-visual="1"]');
    
    if (firstStep && firstVisual) {
        setTimeout(() => {
            firstStep.classList.add('active');
            firstVisual.classList.add('active');
        }, 500);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProcessPage);
} else {
    initProcessPage();
}

// Re-calculate on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized - recalculating');
        // Re-initialize if needed
    }, 250);
});
