// ===================================
// COLLECTION PAGE FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // FILTER FUNCTIONALITY
    // ===================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card-premium');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(filter);
            
            // Log filter action
            console.log(`Filter applied: ${filter}`);
        });
    });
    
    function filterProducts(category) {
        productCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                // Show card with staggered animation
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                // Hide card
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Check if any products are visible
        setTimeout(() => {
            checkEmptyState(category);
        }, 400);
    }
    
    function checkEmptyState(category) {
        const visibleCards = Array.from(productCards).filter(card => {
            return card.style.display !== 'none';
        });
        
        const gridContainer = document.getElementById('productGrid');
        const existingEmptyState = document.querySelector('.empty-state');
        
        if (visibleCards.length === 0) {
            if (!existingEmptyState) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <h3>No products found</h3>
                    <p>We're currently updating this collection. Check back soon!</p>
                `;
                gridContainer.appendChild(emptyState);
            }
        } else {
            if (existingEmptyState) {
                existingEmptyState.remove();
            }
        }
    }
    
    // ===================================
    // PRODUCT MODAL FUNCTIONALITY
    // ===================================
    
    const modal = document.getElementById('productModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalBadge = document.getElementById('modalBadge');
    
    // Product data for modal
    const productData = {
        1: {
            category: 'coffee',
            badge: 'bestseller',
            image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
            title: 'Mo Nong Single Origin',
            subtitle: 'Tasting Notes: Dark Chocolate, Blackberry, Caramel',
            price: '320,000₫',
            description: 'Our signature coffee showcases the exceptional terroir of Mo Nong Highlands. Grown at 1,200m elevation in volcanic basalt soil, this medium roast delivers complex flavors with remarkable balance. Each bag represents our commitment to quality and our partnership with local farming communities.'
        },
        2: {
            category: 'coffee',
            badge: '',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
            title: 'Community Blend',
            subtitle: 'Balanced & Approachable - Perfect for Daily Ritual',
            price: '280,000₫',
            description: 'A celebration of collective harvest and community strength. This balanced blend is approachable yet sophisticated, perfect for your daily coffee ritual. Every bag purchased directly supports our indigenous farming partners and their sustainable practices.'
        },
        3: {
            category: 'coffee',
            badge: 'new',
            image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
            title: 'Highland Reserve',
            subtitle: 'Limited Edition - Honey Processed Arabica',
            price: '380,000₫',
            description: 'A limited edition release featuring our finest honey-processed Arabica beans. This rare processing method enhances the natural sweetness and creates a unique flavor profile with notes of honey, stone fruit, and floral undertones. Only 500 bags available.'
        },
        4: {
            category: 'chocolate',
            badge: 'bestseller',
            image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800',
            title: 'Highland Cacao 70%',
            subtitle: 'Bean-to-Bar - Deep, Fruity with Coffee Blossom Notes',
            price: '180,000₫',
            description: 'Our most popular chocolate bar, crafted from cacao grown in the same volcanic soil as our coffee. The 70% cacao content provides deep, complex flavors with fruity notes and subtle hints of coffee blossom. Bean-to-bar crafted in small batches.'
        },
        5: {
            category: 'chocolate',
            badge: '',
            image: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=800',
            title: 'Volcanic Dark 85%',
            subtitle: 'Intense & Complex - For True Cacao Lovers',
            price: '200,000₫',
            description: 'For true dark chocolate enthusiasts. This 85% cacao bar showcases the intense, complex character of highland-grown cacao. Minimal sugar allows the terroir to shine through with earthy, mineral notes balanced by natural fruit acidity.'
        },
        6: {
            category: 'chocolate',
            badge: '',
            image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800',
            title: 'Creamy Highland Milk',
            subtitle: '45% Cacao - Smooth & Balanced Sweetness',
            price: '160,000₫',
            description: 'A perfectly balanced milk chocolate with 45% cacao content. Creamy and smooth with just the right amount of sweetness. Made with locally sourced dairy and our highland cacao for a uniquely Vietnamese chocolate experience.'
        },
        7: {
            category: 'gift-set',
            badge: 'new',
            image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800',
            title: 'Highland Essentials',
            subtitle: 'Coffee & Chocolate Pairing - Perfect Introduction',
            price: '480,000₫',
            description: 'The perfect introduction to EJ Farm. This curated set includes our Mo Nong Single Origin coffee and Highland Cacao 70% chocolate, beautifully packaged with tasting notes and brewing recommendations. An ideal gift for coffee and chocolate lovers.'
        },
        8: {
            category: 'gift-set',
            badge: 'bestseller',
            image: 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=800',
            title: 'Premium Tasting Collection',
            subtitle: 'Complete Experience - 3 Coffees + 3 Chocolates',
            price: '880,000₫',
            description: 'Experience the full range of Mo Nong terroir with this comprehensive tasting collection. Includes three distinct coffee origins and three chocolate percentages, complete with a detailed tasting guide. Perfect for exploring the nuances of volcanic highland agriculture.'
        },
        9: {
            category: 'gift-set',
            badge: '',
            image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800',
            title: 'Heritage Gift Box',
            subtitle: 'Premium Corporate Gift - Beautifully Packaged',
            price: '1,200,000₫',
            description: 'Our most premium offering, elegantly packaged for corporate gifting or special occasions. Includes our finest coffees, chocolates, and a photo book telling the story of our farming partners and the Mo Nong Highlands. Each box is individually numbered.'
        }
    };
    
    // Open modal when product card is clicked (but not when clicking Add to Cart button)
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking the Add to Cart button
            if (e.target.closest('.btn-add-to-cart')) {
                return;
            }
            
            const productId = this.getAttribute('data-product-id');
            openModal(productId);
        });
    });
    
    function openModal(productId) {
        const product = productData[productId];
        
        if (product) {
            // Store product ID in modal for later use
            modal.setAttribute('data-current-product-id', productId);
            
            // Populate modal with product data
            modalImage.src = product.image;
            modalImage.alt = product.title;
            modalTitle.textContent = product.title;
            modalSubtitle.textContent = product.subtitle;
            modalPrice.textContent = product.price;
            
            // Handle badge
            if (product.badge) {
                modalBadge.textContent = product.badge === 'bestseller' ? 'Bestseller' : 'New';
                modalBadge.className = `modal-badge ${product.badge}`;
            } else {
                modalBadge.textContent = '';
                modalBadge.className = 'modal-badge';
            }
            
            // Update description
            const modalDescription = document.getElementById('modalDescription');
            modalDescription.textContent = product.description;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Log modal open
            console.log(`Product modal opened: ${product.title}`);
        }
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // ===================================
    // MODAL CTA BUTTONS
    // ===================================
    
    const modalCtaButton = document.querySelector('.modal-cta');
    const modalLearnButton = document.querySelector('.modal-learn');
    
    if (modalCtaButton) {
        modalCtaButton.addEventListener('click', function() {
            // Get product ID from modal's data attribute
            const productId = modal.getAttribute('data-current-product-id');
            
            if (!productId) {
                console.error('Product ID not found in modal');
                return;
            }
            
            // Get product data
            const product = productData[productId];
            if (!product) {
                console.error('Product data not found for ID:', productId);
                return;
            }
            
            // Add to cart using EJC_Cart with correct format
            if (typeof EJC_Cart !== 'undefined') {
                // Create product object matching cart engine requirements
                const cartProduct = {
                    id: productId,
                    title: product.title,
                    subtitle: product.subtitle,
                    price: product.price,
                    image: product.image,
                    category: product.category
                };
                
                // Add to cart
                const addedItem = EJC_Cart.addItem(cartProduct, 1);
                
                if (addedItem) {
                    // Visual feedback - change button state
                    const originalText = modalCtaButton.textContent;
                    modalCtaButton.textContent = 'Added!';
                    modalCtaButton.style.background = '#10b981';
                    modalCtaButton.disabled = true;
                    modalCtaButton.style.cursor = 'default';
                    
                    console.log(`✅ Added to cart: ${product.title} (ID: ${productId})`);
                    
                    // Close modal after 1.5 seconds
                    setTimeout(() => {
                        closeModal();
                        
                        // Reset button state after modal closes
                        setTimeout(() => {
                            modalCtaButton.textContent = originalText;
                            modalCtaButton.style.background = '';
                            modalCtaButton.disabled = false;
                            modalCtaButton.style.cursor = 'pointer';
                        }, 300);
                    }, 1500);
                } else {
                    console.error('Failed to add item to cart');
                    alert('Failed to add item. Please try again.');
                }
            } else {
                console.error('EJC_Cart is not defined');
                alert('Cart system is not loaded. Please refresh the page.');
            }
        });
    }
    
    if (modalLearnButton) {
        modalLearnButton.addEventListener('click', function() {
            const productTitle = modalTitle.textContent;
            console.log(`Learn More clicked: ${productTitle}`);
            // Could navigate to a detailed product page
            alert('Detailed product page coming soon!');
        });
    }
    
    // ===================================
    // URL PARAMETER FILTERING
    // ===================================
    
    // Check if there's a filter parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam) {
        const targetButton = document.querySelector(`[data-filter="${filterParam}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
    
    // ===================================
    // SCROLL TO TOP ON FILTER CHANGE
    // ===================================
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Smooth scroll to top of product grid
            const productGridSection = document.querySelector('.product-grid-section');
            const offset = 100; // Account for sticky nav
            const elementPosition = productGridSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // ===================================
    // ANALYTICS TRACKING
    // ===================================
    
    // Track product card clicks
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productTitle = this.querySelector('.card-title').textContent;
            
            // Example: Google Analytics event
            // gtag('event', 'product_click', {
            //     'event_category': 'engagement',
            //     'event_label': productTitle,
            //     'product_id': productId
            // });
            
            console.log(`Product clicked: ${productTitle} (ID: ${productId})`);
        });
    });
    
});
