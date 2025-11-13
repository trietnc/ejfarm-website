/**
 * EJ Farm Collection Page - Cart UI Integration
 * Connects cart-engine.js to the storefront UI
 * Handles: Cart badge updates, Add to Cart buttons, Visual feedback
 */

(function() {
    'use strict';

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const cartBadge = document.getElementById('cartBadge');
    const cartIconBtn = document.getElementById('cartIconBtn');
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    /**
     * Extract product data from product card
     * @param {HTMLElement} productCard - The product card element
     * @returns {Object} - Product data object
     */
    const extractProductData = (productCard) => {
        const id = productCard.getAttribute('data-product-id');
        const category = productCard.getAttribute('data-category');
        const title = productCard.querySelector('.card-title')?.textContent || '';
        const subtitle = productCard.querySelector('.card-subtitle')?.textContent || '';
        const price = productCard.querySelector('.card-price')?.textContent || '0₫';
        const imageElement = productCard.querySelector('.card-image.default');
        const image = imageElement ? imageElement.src : '';

        return {
            id: id,
            title: title.trim(),
            subtitle: subtitle.trim(),
            price: price.trim(),
            image: image,
            category: category
        };
    };

    /**
     * Update cart badge display
     */
    const updateCartBadge = () => {
        const count = EJC_Cart.getCount();
        
        if (cartBadge) {
            cartBadge.textContent = count;
            
            // Show/hide badge based on count
            if (count > 0) {
                cartBadge.style.display = 'flex';
                cartBadge.classList.add('badge-animate');
            } else {
                cartBadge.style.display = 'none';
            }

            // Remove animation class after animation completes
            setTimeout(() => {
                cartBadge.classList.remove('badge-animate');
            }, 300);
        }

        // Update cart icon button title
        if (cartIconBtn) {
            const stats = EJC_Cart.getStats();
            cartIconBtn.title = `Shopping cart (${count} ${count === 1 ? 'item' : 'items'}) - ${stats.totalFormatted}`;
        }
    };

    /**
     * Show success feedback when item added
     * @param {HTMLElement} button - The button that was clicked
     */
    const showAddToCartSuccess = (button) => {
        const originalHTML = button.innerHTML;
        
        // Change button to success state
        button.classList.add('btn-success');
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Added!</span>
        `;
        button.disabled = true;

        // Reset after 1.5 seconds
        setTimeout(() => {
            button.classList.remove('btn-success');
            button.innerHTML = originalHTML;
            button.disabled = false;
        }, 1500);
    };

    /**
     * Show notification toast
     * @param {string} message - Message to display
     * @param {string} type - 'success' or 'error'
     */
    const showNotification = (message, type = 'success') => {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `cart-toast cart-toast-${type}`;
        toast.textContent = message;

        // Add to body
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ============================================
    // EVENT HANDLERS
    // ============================================

    /**
     * Handle Add to Cart button click
     * @param {Event} e - Click event
     */
    const handleAddToCart = (e) => {
        e.preventDefault();
        const button = e.currentTarget;
        const productCard = button.closest('.product-card-premium');

        if (!productCard) {
            console.error('Could not find product card');
            return;
        }

        // Extract product data
        const productData = extractProductData(productCard);

        // Add to cart using cart engine
        const result = EJC_Cart.addItem(productData, 1);

        if (result) {
            // Show success feedback
            showAddToCartSuccess(button);
            showNotification(`${productData.title} added to cart!`, 'success');
            
            console.log('✅ Product added to cart:', productData.title);
        } else {
            showNotification('Failed to add item to cart', 'error');
            console.error('❌ Failed to add product to cart');
        }
    };

    /**
     * Handle cart updated event from cart engine
     * @param {CustomEvent} e - Cart updated event
     */
    const handleCartUpdated = (e) => {
        console.log('🔔 Cart updated:', e.detail);
        updateCartBadge();
    };

    // ============================================
    // INITIALIZATION
    // ============================================

    /**
     * Initialize cart UI
     */
    const init = () => {
        console.log('🎨 Initializing Collection Page Cart UI...');

        // Set initial badge count
        updateCartBadge();

        // Add event listeners to all Add to Cart buttons
        addToCartButtons.forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });

        // Cart icon is now a proper <a> link - no need to add click listener
        // It will naturally navigate to cart.html

        // Listen for cart updates from cart engine
        window.addEventListener('cartupdated', handleCartUpdated);

        console.log(`✅ Cart UI initialized - ${addToCartButtons.length} products ready`);
    };

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
