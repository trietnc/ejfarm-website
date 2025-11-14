// ===================================
// BLOG PAGE - DYNAMIC EFFECTS & INTERACTIONS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all blog features
    initScrollAnimations();
    initCategoryFilters();
    initPagination();
    initCardInteractions();
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all blog post cards
    const cards = document.querySelectorAll('.blog-post-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// ===================================
// CATEGORY FILTERS
// ===================================
function initCategoryFilters() {
    const categoryLinks = document.querySelectorAll('.category-link');
    const blogCards = document.querySelectorAll('.blog-post-card');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const category = link.getAttribute('data-category');
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Filter blog posts
            filterBlogPosts(category, blogCards);
        });
    });
}

function filterBlogPosts(category, cards) {
    cards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (!category || cardCategory === category) {
            // Show card with animation
            setTimeout(() => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 50);
        } else {
            // Hide card with animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===================================
// PAGINATION
// ===================================
function initPagination() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumbers = document.querySelectorAll('.pagination-number');
    
    let currentPage = 1;
    const totalPages = pageNumbers.length;
    
    // Page number clicks
    pageNumbers.forEach((pageBtn, index) => {
        pageBtn.addEventListener('click', () => {
            currentPage = index + 1;
            updatePagination(currentPage, totalPages, pageNumbers, prevBtn, nextBtn);
            scrollToTop();
        });
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination(currentPage, totalPages, pageNumbers, prevBtn, nextBtn);
            scrollToTop();
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination(currentPage, totalPages, pageNumbers, prevBtn, nextBtn);
            scrollToTop();
        }
    });
}

function updatePagination(currentPage, totalPages, pageNumbers, prevBtn, nextBtn) {
    // Update active page number
    pageNumbers.forEach((btn, index) => {
        if (index + 1 === currentPage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update prev/next button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function scrollToTop() {
    const blogContainer = document.querySelector('.blog-container');
    if (blogContainer) {
        window.scrollTo({
            top: blogContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// ===================================
// CARD INTERACTIONS
// ===================================
function initCardInteractions() {
    const cards = document.querySelectorAll('.blog-post-card');
    
    cards.forEach(card => {
        // Make entire card clickable
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the read more link
            if (!e.target.classList.contains('read-more')) {
                const readMoreLink = card.querySelector('.read-more');
                if (readMoreLink) {
                    // In a real implementation, this would navigate to the blog post
                    console.log('Navigate to blog post:', card.querySelector('.post-title').textContent);
                }
            }
        });
        
        // Add hover effect enhancement
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.post-image img');
            if (image) {
                image.style.transform = 'scale(1.08)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.post-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// ===================================
// HERO PARALLAX EFFECT (Optional Enhancement)
// ===================================
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.blog-hero-background');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===================================
// SEARCH FUNCTIONALITY (Future Enhancement)
// ===================================
function initSearch() {
    const searchInput = document.getElementById('blogSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.blog-post-card');
        
        cards.forEach(card => {
            const title = card.querySelector('.post-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===================================
// LOAD MORE FUNCTIONALITY (Alternative to Pagination)
// ===================================
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    let visibleCards = 6;
    const cards = document.querySelectorAll('.blog-post-card');
    
    // Initially hide cards beyond the first batch
    cards.forEach((card, index) => {
        if (index >= visibleCards) {
            card.style.display = 'none';
        }
    });
    
    loadMoreBtn.addEventListener('click', () => {
        const hiddenCards = Array.from(cards).slice(visibleCards, visibleCards + 3);
        
        hiddenCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
        
        visibleCards += 3;
        
        // Hide button if all cards are visible
        if (visibleCards >= cards.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
}
