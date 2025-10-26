// Testimonial Slides Functionality
class TestimonialSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startAutoSlide();
    }
    
    bindEvents() {
        // Indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
        
        // Pause auto-slide on hover
        const testimonialContainer = document.querySelector('.testimonial-container');
        testimonialContainer.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        const testimonialContainer = document.querySelector('.testimonial-container');
        
        testimonialContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        testimonialContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50; // Minimum swipe distance
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Set new current slide
        this.currentSlide = index;
        
        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        // Reset auto-slide timer
        this.resetAutoSlide();
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoSlide() {
        this.stopAutoSlide(); // Clear any existing interval
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add subtle animations to decorative bottles
function animateBottles() {
    const bottles = document.querySelectorAll('.bottle');
    
    bottles.forEach((bottle, index) => {
        // Stagger the animation
        setTimeout(() => {
            bottle.style.animation = 'bottleFloat 3s ease-in-out infinite';
            bottle.style.animationDelay = `${index * 0.2}s`;
        }, index * 100);
    });
}

// Add CSS animation for bottle floating effect
function addBottleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bottleFloat {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Video Fullscreen Functionality
class VideoFullscreen {
    constructor() {
        this.videoContainer = document.querySelector('.video-container');
        this.video = document.querySelector('.video-mask video');
        this.isFullscreen = false;
        this.originalPosition = null;
        this.originalSize = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupScrollListener();
    }
    
    bindEvents() {
        // Click on video to toggle fullscreen
        if (this.videoContainer) {
            this.videoContainer.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
        
        // Escape key to exit fullscreen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isFullscreen) {
                this.exitFullscreen();
            }
        });
        
        // Double-click to toggle fullscreen
        if (this.videoContainer) {
            this.videoContainer.addEventListener('dblclick', () => {
                this.toggleFullscreen();
            });
        }
    }
    
    setupScrollListener() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScrollEffect();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    handleScrollEffect() {
        const storySection = document.querySelector('.story-section');
        if (!storySection) return;
        
        const rect = storySection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if the story section is in view
        const isInView = rect.top < windowHeight && rect.bottom > 0;
        
        if (isInView && !this.isFullscreen) {
            const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
            
            // Gradually expand the video as user scrolls
            this.updateVideoScale(scrollProgress);
        }
    }
    
    updateVideoScale(progress) {
        if (!this.videoContainer) return;
        
        const scale = 1 + (progress * 0.5); // Scale from 1 to 1.5
        const opacity = 1 - (progress * 0.3); // Fade out other elements
        
        this.videoContainer.style.transform = `scale(${scale})`;
        this.videoContainer.style.zIndex = Math.floor(progress * 100);
        
        // Fade out other content
        const storyLeft = document.querySelector('.story-left');
        const storyRight = document.querySelector('.story-right');
        
        if (storyLeft) {
            storyLeft.style.opacity = opacity;
        }
        if (storyRight) {
            storyRight.style.opacity = opacity;
        }
        
        // If scrolled enough, go fullscreen
        if (progress > 0.8) {
            this.enterFullscreen();
        }
    }
    
    toggleFullscreen() {
        if (this.isFullscreen) {
            this.exitFullscreen();
        } else {
            this.enterFullscreen();
        }
    }
    
    enterFullscreen() {
        if (this.isFullscreen) return;
        
        this.isFullscreen = true;
        this.videoContainer.classList.add('fullscreen');
        
        // Store original position and size
        this.originalPosition = {
            top: this.videoContainer.offsetTop,
            left: this.videoContainer.offsetLeft,
            width: this.videoContainer.offsetWidth,
            height: this.videoContainer.offsetHeight
        };
        
        // Hide body scroll
        document.body.style.overflow = 'hidden';
        
        // Add exit button
        this.addExitButton();
        
        // Play video if paused
        if (this.video && this.video.paused) {
            this.video.play();
        }
    }
    
    exitFullscreen() {
        if (!this.isFullscreen) return;
        
        this.isFullscreen = false;
        this.videoContainer.classList.remove('fullscreen');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Remove exit button
        this.removeExitButton();
        
        // Reset transforms
        this.videoContainer.style.transform = '';
        this.videoContainer.style.zIndex = '';
        
        // Reset other content opacity
        const storyLeft = document.querySelector('.story-left');
        const storyRight = document.querySelector('.story-right');
        
        if (storyLeft) {
            storyLeft.style.opacity = '';
        }
        if (storyRight) {
            storyRight.style.opacity = '';
        }
    }
    
    addExitButton() {
        const exitBtn = document.createElement('button');
        exitBtn.className = 'video-exit-btn';
        exitBtn.innerHTML = '✕';
        exitBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        exitBtn.addEventListener('click', () => {
            this.exitFullscreen();
        });
        
        exitBtn.addEventListener('mouseenter', () => {
            exitBtn.style.background = 'rgba(0, 0, 0, 0.9)';
            exitBtn.style.transform = 'scale(1.1)';
        });
        
        exitBtn.addEventListener('mouseleave', () => {
            exitBtn.style.background = 'rgba(0, 0, 0, 0.7)';
            exitBtn.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(exitBtn);
    }
    
    removeExitButton() {
        const exitBtn = document.querySelector('.video-exit-btn');
        if (exitBtn) {
            exitBtn.remove();
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial slider
    new TestimonialSlider();
    
    // Initialize video fullscreen functionality
    new VideoFullscreen();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Add bottle animations
    addBottleAnimation();
    animateBottles();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate any size-dependent elements if needed
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        // Force reflow to ensure proper layout
        testimonialContainer.style.transform = 'translateZ(0)';
    }
});

// Add accessibility improvements
document.addEventListener('keydown', (e) => {
    // Space bar to pause/play auto-slide
    if (e.code === 'Space') {
        e.preventDefault();
        const slider = window.testimonialSlider;
        if (slider) {
            if (slider.autoSlideInterval) {
                slider.stopAutoSlide();
            } else {
                slider.startAutoSlide();
            }
        }
    }
});

// Export for potential external use
window.TestimonialSlider = TestimonialSlider;
