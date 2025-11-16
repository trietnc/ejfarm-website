/**
 * GIFT NOTIFICATION SYSTEM
 * Shows a beautiful toast notification when the secret gift is auto-added
 * This file should be loaded on all pages that use the cart
 */

(function() {
    'use strict';

    /**
     * Calculate bottom position to stack above existing toasts
     * @returns {number} - Bottom position in pixels
     */
    function calculateBottomPosition() {
        // Check for existing cart toasts
        const existingToasts = document.querySelectorAll('.cart-toast, .gift-toast');
        if (existingToasts.length === 0) {
            return 2; // 2rem default
        }

        // Calculate total height of existing toasts
        let totalHeight = 2; // Start at 2rem
        existingToasts.forEach(toast => {
            const rect = toast.getBoundingClientRect();
            totalHeight += (rect.height / 16) + 1; // Convert to rem and add 1rem gap
        });

        return totalHeight;
    }

    /**
     * Show gift notification toast
     * @param {string} title - Notification title
     * @param {string} message - Notification message
     */
    function showGiftNotification(title = '🎁 Chúc mừng!', message = 'Bạn vừa nhận được một món quà bí mật từ EJ Farm!') {
        // Delay showing gift notification to appear after "Add to Cart" notification
        setTimeout(() => {
            // Create toast element
            const toast = document.createElement('div');
            toast.className = 'gift-toast';
            
            // Calculate position to stack above existing toasts
            const bottomPosition = calculateBottomPosition();
            toast.style.bottom = `${bottomPosition}rem`;
            
            toast.innerHTML = `
                <div class="gift-toast-icon">🎁</div>
                <div class="gift-toast-content">
                    <div class="gift-toast-title">${title}</div>
                    <div class="gift-toast-message">${message}</div>
                </div>
            `;

            // Add to body
            document.body.appendChild(toast);

            // Trigger animation
            setTimeout(() => toast.classList.add('show'), 10);

            // Remove after 5 seconds (longer for gift notification)
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }, 5000);

            console.log('🎁 Gift notification shown');
        }, 500); // 500ms delay to appear after the cart toast
    }

    /**
     * Listen for gift-added event from cart engine
     */
    function initGiftNotification() {
        window.addEventListener('cartupdated', function(e) {
            if (e.detail.action === 'gift-added') {
                console.log('🎁 Gift-added event received, showing notification...');
                showGiftNotification(
                    'Chúc mừng! 🎉',
                    'Bạn vừa nhận được một món quà bí mật miễn phí từ EJ Farm!'
                );
            }
        });
        
        console.log('✅ Gift notification system initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGiftNotification);
    } else {
        initGiftNotification();
    }

    // Export for manual use if needed
    window.showGiftNotification = showGiftNotification;

})();
