/**
 * EJ Farm - Shared Cart Badge Updater
 * Updates cart badge across all pages
 * Listens to cart engine events and updates UI
 */

(function() {
    'use strict';

    /**
     * Update cart badge display
     */
    const updateCartBadge = () => {
        const cartBadge = document.getElementById('cartBadge');
        const cartIconBtn = document.getElementById('cartIconBtn');

        if (!cartBadge) return;

        const count = EJC_Cart.getCount();
        
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

        // Update cart icon button title
        if (cartIconBtn) {
            const stats = EJC_Cart.getStats();
            cartIconBtn.title = `Shopping cart (${count} ${count === 1 ? 'item' : 'items'}) - ${stats.totalFormatted}`;
        }
    };

    /**
     * Handle cart updated event
     */
    const handleCartUpdated = (e) => {
        updateCartBadge();
    };

    /**
     * Initialize badge updater
     */
    const init = () => {
        // Set initial badge count
        updateCartBadge();

        // Listen for cart updates
        window.addEventListener('cartupdated', handleCartUpdated);
    };

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
