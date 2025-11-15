// ===================================
// CART PAGE CONTROLLER
// ===================================
// This script manages the cart.html page
// It dynamically renders cart items, handles quantity updates, and manages checkout

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Cart page initializing...');

        // ===================================
        // DOM ELEMENTS
        // ===================================
        const emptyCartState = document.getElementById('emptyCartState');
        const cartItemsTable = document.getElementById('cartItemsTable');
        const cartTableBody = document.getElementById('cartTableBody');
        const cartSummary = document.getElementById('cartSummary');
        const summarySubtotal = document.getElementById('summarySubtotal');
        const summaryTotal = document.getElementById('summaryTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');

        // ===================================
        // UTILITY FUNCTIONS
        // ===================================

        /**
         * Format price with Vietnamese currency formatting
         * @param {number} amount - The amount to format
         * @returns {string} Formatted price string
         */
        function formatPrice(amount) {
            return amount.toLocaleString('vi-VN') + '₫';
        }

        /**
         * Create HTML for a single cart item row
         * @param {Object} item - Cart item object
         * @returns {string} HTML string for cart item
         */
        function createCartItemHTML(item) {
            const totalPrice = item.priceNumeric * item.quantity;
            const isGift = item.id === 'GIFT-01';
            
            // Special rendering for SECRET GIFT
            if (isGift) {
                return `
                    <div class="cart-item cart-item-gift" data-product-id="${item.id}">
                        <div class="item-product">
                            <img src="${item.image}" alt="${item.title}" loading="lazy">
                            <div class="item-details">
                                <h3>${item.title} 🎁</h3>
                                <p class="cart-item-gift-note">món quà nhỏ từ EJ Farm</p>
                            </div>
                        </div>
                        <div class="item-price">Miễn phí</div>
                        <div class="item-quantity">
                            <div class="quantity-controls">
                                <input 
                                    type="number" 
                                    class="qty-input" 
                                    value="1" 
                                    disabled
                                    aria-label="Quantity"
                                >
                            </div>
                        </div>
                        <div class="item-total">0₫</div>
                        <div class="item-remove">
                            <span class="gift-lock" title="Không thể xóa món quà">🔒</span>
                        </div>
                    </div>
                `;
            }
            
            // Normal product rendering
            return `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="item-product">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="item-details">
                            <h3><a href="product-detail.html?id=${item.id}">${item.title}</a></h3>
                            ${item.subtitle ? `<p class="item-variant">${item.subtitle}</p>` : ''}
                        </div>
                    </div>
                    <div class="item-price">${formatPrice(item.priceNumeric)}</div>
                    <div class="item-quantity">
                        <div class="quantity-controls">
                            <button class="qty-btn qty-decrease" data-product-id="${item.id}" aria-label="Decrease quantity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <input 
                                type="number" 
                                class="qty-input" 
                                value="${item.quantity}" 
                                min="1" 
                                max="99" 
                                data-product-id="${item.id}"
                                aria-label="Quantity"
                            >
                            <button class="qty-btn qty-increase" data-product-id="${item.id}" aria-label="Increase quantity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="item-total">${formatPrice(totalPrice)}</div>
                    <div class="item-remove">
                        <button class="remove-btn" data-product-id="${item.id}" aria-label="Remove item" title="Remove item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        }

        /**
         * Main render function - renders the entire cart page
         */
        function renderCartPage() {
            console.log('🎨 Rendering cart page...');
            
            // Check if cart engine is available
            if (typeof EJC_Cart === 'undefined') {
                console.error('❌ Cart engine not found! Make sure cart-engine.js is loaded first.');
                return;
            }

            // Get current cart contents and totals
            const items = EJC_Cart.getCart();
            const stats = EJC_Cart.getStats();

            console.log('📦 Cart contents:', items);
            console.log('💰 Cart stats:', stats);

            // Check if cart is empty
            if (!items || items.length === 0) {
                showEmptyCart();
                return;
            }

            // Cart has items - show the table and summary
            showFullCart();

            // Clear existing content
            cartTableBody.innerHTML = '';

            // Generate HTML for all items
            items.forEach(item => {
                cartTableBody.innerHTML += createCartItemHTML(item);
            });

            // Update summary totals
            updateCartSummary(stats);

            // Attach event listeners to all newly created elements
            attachEventListeners();

            console.log(`✅ Rendered ${items.length} cart items`);
        }

        /**
         * Show empty cart state
         */
        function showEmptyCart() {
            if (emptyCartState) emptyCartState.style.display = 'flex';
            if (cartItemsTable) cartItemsTable.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'none';
            console.log('📭 Showing empty cart state');
        }

        /**
         * Show full cart with items
         */
        function showFullCart() {
            if (emptyCartState) emptyCartState.style.display = 'none';
            if (cartItemsTable) cartItemsTable.style.display = 'block';
            if (cartSummary) cartSummary.style.display = 'block';
        }

        /**
         * Update cart summary totals
         * @param {Object} stats - Stats object from cart engine
         */
        function updateCartSummary(stats) {
            if (summarySubtotal) {
                summarySubtotal.textContent = formatPrice(stats.total);
            }
            if (summaryTotal) {
                summaryTotal.textContent = formatPrice(stats.total);
            }
            console.log('💰 Summary updated:', stats.totalFormatted);
        }

        /**
         * Update a single item's total display
         * @param {string} productId - Product ID
         */
        function updateItemTotal(productId) {
            const item = EJC_Cart.getCart().find(i => i.id === productId);
            if (item) {
                const cartItem = cartTableBody.querySelector(`.cart-item[data-product-id="${productId}"]`);
                if (cartItem) {
                    const totalElement = cartItem.querySelector('.item-total');
                    if (totalElement) {
                        totalElement.textContent = formatPrice(item.priceNumeric * item.quantity);
                    }
                }
            }
        }

        /**
         * Attach event listeners to quantity controls and remove buttons
         */
        function attachEventListeners() {
            // Delegate events to the cart table body for better performance
            if (cartTableBody) {
                // Handle quantity input changes
                cartTableBody.addEventListener('change', function(e) {
                    if (e.target.classList.contains('qty-input')) {
                        handleQuantityChange(e.target);
                    }
                });

                // Handle button clicks
                cartTableBody.addEventListener('click', function(e) {
                    const target = e.target.closest('button');
                    if (!target) return;

                    if (target.classList.contains('qty-decrease')) {
                        handleQuantityDecrease(target);
                    } else if (target.classList.contains('qty-increase')) {
                        handleQuantityIncrease(target);
                    } else if (target.classList.contains('remove-btn')) {
                        handleRemoveItem(target);
                    }
                });
            }
        }

        /**
         * Handle quantity input change
         * @param {HTMLElement} input - The input element
         */
        function handleQuantityChange(input) {
            const productId = input.dataset.productId;
            let newQuantity = parseInt(input.value);

            // Validate quantity
            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1;
                input.value = 1;
            } else if (newQuantity > 99) {
                newQuantity = 99;
                input.value = 99;
            }

            // Update cart engine
            EJC_Cart.updateQuantity(productId, newQuantity);
            
            // Immediately update UI
            updateItemTotal(productId);
            updateCartSummary(EJC_Cart.getStats());
            
            console.log(`🔄 Quantity updated: Product ${productId} → ${newQuantity}`);
        }

        /**
         * Handle quantity decrease button
         * @param {HTMLElement} button - The button element
         */
        function handleQuantityDecrease(button) {
            const productId = button.dataset.productId;
            const input = cartTableBody.querySelector(`.qty-input[data-product-id="${productId}"]`);
            
            if (input) {
                let currentQuantity = parseInt(input.value);
                if (currentQuantity > 1) {
                    currentQuantity--;
                    input.value = currentQuantity;
                    EJC_Cart.updateQuantity(productId, currentQuantity);
                    
                    // Immediately update UI
                    updateItemTotal(productId);
                    updateCartSummary(EJC_Cart.getStats());
                }
            }
        }

        /**
         * Handle quantity increase button
         * @param {HTMLElement} button - The button element
         */
        function handleQuantityIncrease(button) {
            const productId = button.dataset.productId;
            const input = cartTableBody.querySelector(`.qty-input[data-product-id="${productId}"]`);
            
            if (input) {
                let currentQuantity = parseInt(input.value);
                if (currentQuantity < 99) {
                    currentQuantity++;
                    input.value = currentQuantity;
                    EJC_Cart.updateQuantity(productId, currentQuantity);
                    
                    // Immediately update UI
                    updateItemTotal(productId);
                    updateCartSummary(EJC_Cart.getStats());
                }
            }
        }

        /**
         * Handle remove item button
         * @param {HTMLElement} button - The button element
         */
        function handleRemoveItem(button) {
            const productId = button.dataset.productId;
            const cartItem = button.closest('.cart-item');

            // Add fade-out animation
            if (cartItem) {
                cartItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(-20px)';

                // Remove after animation
                setTimeout(() => {
                    EJC_Cart.removeItem(productId);
                    console.log(`🗑️ Item removed: Product ${productId}`);
                }, 300);
            } else {
                EJC_Cart.removeItem(productId);
            }
        }

        /**
         * Handle checkout button click
         */
        function handleCheckout() {
            const items = EJC_Cart.getCart();

            if (!items || items.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            console.log('🛒 Proceeding to checkout...');
            // Navigate to checkout page
            window.location.href = 'checkout.html';
        }

        // ===================================
        // EVENT LISTENERS
        // ===================================

        // Listen for cart updates from cart engine
        window.addEventListener('cartupdated', function(e) {
            console.log('🔔 Cart updated event received, re-rendering...', e.detail);
            renderCartPage();
        });

        // Checkout button
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', handleCheckout);
        }

        // ===================================
        // INITIALIZE
        // ===================================

        // Initial render
        renderCartPage();

        console.log('✅ Cart page initialized successfully');
    });

})();
