// ===================================
// STORY PAGE TIMELINE SCROLLYTELLING
// ===================================

// Animate timeline line as user scrolls
function animateTimelineLine() {
    const timelineLine = document.getElementById('timelineLine');
    const timelineSection = document.querySelector('.timeline-section');
    
    if (!timelineLine || !timelineSection) return;

    window.addEventListener('scroll', () => {
        const sectionTop = timelineSection.offsetTop;
        const sectionHeight = timelineSection.offsetHeight;
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Calculate how far through the timeline section we've scrolled
        const scrollStart = sectionTop - windowHeight;
        const scrollEnd = sectionTop + sectionHeight;
        const scrollProgress = (scrolled - scrollStart) / (scrollEnd - scrollStart);

        // Clamp between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

        // Update line height
        timelineLine.style.height = `${clampedProgress * 100}%`;
    });
}

// Intersection Observer for Timeline Chapters
function initTimelineChapters() {
    const chapters = document.querySelectorAll('.timeline-chapter');
    
    if (chapters.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                console.log(`Timeline chapter ${entry.target.dataset.chapter} visible`);
            }
        });
    }, observerOptions);

    chapters.forEach(chapter => observer.observe(chapter));
}

// Parallax effect for hero image
function initHeroParallax() {
    const heroImage = document.querySelector('.story-hero .hero-image');
    
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.story-hero').offsetHeight;
        
        if (scrolled < heroHeight) {
            const parallaxSpeed = 0.3;
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.15)`;
        }
    });
}

// Add subtle parallax to chapter images
function initChapterParallax() {
    const chapters = document.querySelectorAll('.timeline-chapter');
    
    if (chapters.length === 0) return;

    window.addEventListener('scroll', () => {
        chapters.forEach(chapter => {
            const chapterTop = chapter.offsetTop;
            const chapterHeight = chapter.offsetHeight;
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Check if chapter is in viewport
            if (scrolled + windowHeight > chapterTop && scrolled < chapterTop + chapterHeight) {
                const image = chapter.querySelector('.chapter-visual img');
                if (image) {
                    const speed = 0.1;
                    const offset = (scrolled - chapterTop + windowHeight) * speed;
                    image.style.transform = `translateY(${offset}px)`;
                }
            }
        });
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

// Add fade-in animation to elements as they scroll into view
function initScrollAnimations() {
    const elements = document.querySelectorAll('.timeline-intro, .story-final-cta .cta-content');
    
    if (elements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(el);
    });
}

// Progress indicator (optional - for debugging)
function trackScrollProgress() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        console.log(`Scroll progress: ${scrollPercent.toFixed(2)}%`);
    });
}

// Initialize Story Page
function initStoryPage() {
    console.log('Story page initialized');
    
    animateTimelineLine();
    initTimelineChapters();
    initHeroParallax();
    initChapterParallax();
    initSmoothScroll();
    initScrollAnimations();
    
    // Optional: Uncomment for debugging
    // trackScrollProgress();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStoryPage);
} else {
    initStoryPage();
}

// Re-calculate on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized - timeline recalculating');
        // Timeline line will auto-adjust on next scroll
    }, 250);
});

// Add special hover effect to CTA button
function initCTAButton() {
    const ctaButton = document.querySelector('.btn-cta-premium');
    
    if (!ctaButton) return;

    ctaButton.addEventListener('mouseenter', () => {
        console.log('Premium CTA button hovered');
    });
}

// Initialize CTA effects
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCTAButton);
} else {
    initCTAButton();
}
