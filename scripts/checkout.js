/**
 * CHECKOUT PAGE CONTROLLER v2.0
 * Handles checkout page functionality, order summary rendering,
 * shipping calculations, and payment method toggling.
 * 
 * UPDATED: Fixed AJAX submission and totals calculation with enhanced debugging
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Checkout page loaded - v2.0 with AJAX fix');

    // Check if cart engine is loaded
    if (typeof EJC_Cart === 'undefined') {
        console.error('Cart engine not loaded!');
        return;
    }

    // Initialize checkout page
    initCheckout();

    /**
     * Main initialization function
     */
    function initCheckout() {
        // Render order summary and calculate totals
        renderOrderSummary();
        calculateTotals();
        updateHiddenInputs();

        // Setup payment method toggle
        setupPaymentToggle();

        // Setup form submission handler
        setupFormSubmission();
    }

    /**
     * Render the order summary from cart items
     */
    function renderOrderSummary() {
        const items = EJC_Cart.getCart();
        const summaryListEl = document.getElementById('order-summary-list');

        // Check if cart is empty
        if (!items || items.length === 0) {
            console.log('Cart is empty, redirecting to cart page...');
            window.location.href = 'cart.html';
            return;
        }
        
        // Check if cart has real products (not just the gift)
        if (!EJC_Cart.hasRealProducts()) {
            console.log('Cart has only gift items, redirecting to cart page...');
            alert('Vui lòng thêm sản phẩm vào giỏ hàng để nhận quà!');
            window.location.href = 'cart.html';
            return;
        }

        // Build HTML for order items
        let itemsHTML = '';
        items.forEach(item => {
            itemsHTML += createOrderItemHTML(item);
        });

        // Inject into DOM
        summaryListEl.innerHTML = itemsHTML;
        console.log(`✅ Rendered ${items.length} items in order summary`);
    }

    /**
     * Create HTML for a single order item
     * @param {Object} item - Cart item object
     * @returns {string} HTML string
     */
    function createOrderItemHTML(item) {
        // Check if this is the secret gift
        const isGift = item.id === 'GIFT-01';
        
        if (isGift) {
            return `
                <div class="order-item order-item-gift">
                    <img src="images/4-enhanced.png" alt="${item.title}" class="order-item-image">
                    <div class="order-item-details">
                        <h4 class="order-item-title">${item.quantity}x ${item.title} 🎁</h4>
                        <p class="order-item-subtitle gift-note">Món quà nhỏ từ EJ Farm</p>
                    </div>
                    <div class="order-item-price gift-price">Miễn phí</div>
                </div>
            `;
        }
        
        // Format the item total (price * quantity)
        const itemTotal = (item.priceNumeric * item.quantity).toLocaleString('vi-VN');

        return `
            <div class="order-item">
                <img src="${item.image}" alt="${item.title}" class="order-item-image">
                <div class="order-item-details">
                    <h4 class="order-item-title">${item.quantity}x ${item.title}</h4>
                    <p class="order-item-subtitle">${item.subtitle || ''}</p>
                </div>
                <div class="order-item-price">${itemTotal}₫</div>
            </div>
        `;
    }

    /**
     * Calculate and display shipping costs and totals
     */
    function calculateTotals() {
        console.log('💵 Calculating totals...');
        
        // Check if EJC_Cart is available
        if (typeof EJC_Cart === 'undefined') {
            console.error('❌ CRITICAL: EJC_Cart is not defined! Is cart-engine.js loaded?');
            alert('Lỗi: Hệ thống giỏ hàng chưa sẵn sàng. Vui lòng tải lại trang.');
            return;
        }
        
        if (typeof EJC_Cart.getStats !== 'function') {
            console.error('❌ CRITICAL: EJC_Cart.getStats() is not a function!');
            alert('Lỗi: Hệ thống giỏ hàng không hoạt động đúng. Vui lòng tải lại trang.');
            return;
        }
        
        const stats = EJC_Cart.getStats();
        console.log('📊 Cart stats:', stats);
        
        // FIXED: Cart returns 'total', not 'subtotal'
        const subtotal = stats.total || 0;
        console.log('   Subtotal:', subtotal, '₫');

        // Shipping logic: Free shipping for orders >= 500,000₫
        const shippingCost = (subtotal >= 500000) ? 0 : 30000;
        console.log('   Shipping:', shippingCost, '₫', (shippingCost === 0 ? '(FREE!)' : ''));

        // Calculate total
        const totalCost = subtotal + shippingCost;
        console.log('   TOTAL:', totalCost, '₫');

        // Update DOM elements
        const subtotalEl = document.getElementById('summary-subtotal');
        const shippingEl = document.getElementById('summary-shipping');
        const totalEl = document.getElementById('summary-total');

        if (subtotalEl) {
            subtotalEl.textContent = formatVNCurrency(subtotal);
            console.log('✅ Updated #summary-subtotal');
        } else {
            console.error('❌ Element #summary-subtotal NOT FOUND!');
        }

        if (shippingEl) {
            shippingEl.textContent = shippingCost === 0 ? 'Miễn phí' : formatVNCurrency(shippingCost);
            console.log('✅ Updated #summary-shipping');
        } else {
            console.error('❌ Element #summary-shipping NOT FOUND!');
        }

        if (totalEl) {
            totalEl.textContent = formatVNCurrency(totalCost);
            console.log('✅ Updated #summary-total');
        } else {
            console.error('❌ Element #summary-total NOT FOUND!');
        }

        // Store for later use
        window.checkoutTotals = {
            subtotal: subtotal,
            shipping: shippingCost,
            total: totalCost
        };

        console.log('💰 ✅ Totals calculated successfully:', {
            subtotal: formatVNCurrency(subtotal),
            shipping: formatVNCurrency(shippingCost),
            total: formatVNCurrency(totalCost)
        });
    }

    /**
     * Format number as Vietnamese currency
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency string
     */
    function formatVNCurrency(amount) {
        return amount.toLocaleString('vi-VN') + '₫';
    }

    /**
     * Update hidden form inputs with order details
     */
    function updateHiddenInputs() {
        const items = EJC_Cart.getCart();
        const totals = window.checkoutTotals;

        if (!items || !totals) return;

        // Create order summary text
        let orderSummary = items.map(item => {
            return `${item.quantity}x ${item.title} (${item.subtitle || ''}) - ${formatVNCurrency(item.subtotal)}`;
        }).join('; ');

        // Update hidden inputs
        const summaryInput = document.getElementById('hidden-order-summary');
        const totalInput = document.getElementById('hidden-final-total');

        if (summaryInput) {
            summaryInput.value = orderSummary;
        }

        if (totalInput) {
            totalInput.value = `Tạm tính: ${formatVNCurrency(totals.subtotal)} | Phí ship: ${formatVNCurrency(totals.shipping)} | Tổng: ${formatVNCurrency(totals.total)}`;
        }

        console.log('📋 Hidden inputs updated');
    }

    /**
     * Setup payment method toggle functionality
     */
    function setupPaymentToggle() {
        const codRadio = document.getElementById('payment_cod');
        const bankRadio = document.getElementById('payment_bank');
        const bankInfoDiv = document.getElementById('bank-info');

        if (!codRadio || !bankRadio || !bankInfoDiv) {
            console.warn('Payment toggle elements not found');
            return;
        }

        // COD selected - hide bank info
        codRadio.addEventListener('click', function() {
            bankInfoDiv.style.display = 'none';
            console.log('💵 COD payment selected');
        });

        // Bank transfer selected - show bank info
        bankRadio.addEventListener('click', function() {
            bankInfoDiv.style.display = 'block';
            console.log('🏦 Bank transfer payment selected');
        });

        console.log('✅ Payment toggle setup complete');
    }

    /**
     * Setup form submission handler with AJAX
     */
    function setupFormSubmission() {
        const form = document.getElementById('checkoutForm');

        if (!form) {
            console.warn('Checkout form not found');
            return;
        }

        console.log('🔧 Setting up form submission handler...');

        form.addEventListener('submit', function(e) {
            // CRITICAL: PREVENT default form submission to Formspree
            e.preventDefault();
            e.stopPropagation();
            
            console.log('� Form submit intercepted! Processing order...');
            
            // Get the submit button
            const submitBtn = form.querySelector('.btn-complete-order');
            
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                    </svg>
                    Đang xử lý...
                `;
            }

            // Get form data
            const formData = new FormData(form);
            
            // Generate random order ID
            const orderID = 'EJF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            console.log('📋 Generated Order ID:', orderID);
            
            // Get cart items and totals
            const cartItems = EJC_Cart.getCart();
            const totals = window.checkoutTotals;
            
            if (!totals) {
                console.error('❌ Totals not calculated!');
                alert('Lỗi: Không tính được tổng tiền. Vui lòng tải lại trang.');
                return;
            }
            
            console.log('💰 Order totals:', totals);
            
            // Create final order object
            const finalOrder = {
                id: orderID,
                customerName: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                address: formData.get('address'),
                paymentMethod: formData.get('payment-method'),
                items: cartItems,
                subtotal: totals.subtotal,
                shipping: totals.shipping,
                total: totals.total,
                orderDate: new Date().toISOString()
            };
            
            // Save order to localStorage for confirmation page
            localStorage.setItem('EJC_LastOrder', JSON.stringify(finalOrder));
            console.log('💾 Order saved to localStorage');
            
            // Send to Formspree in background
            console.log('📤 Sending to Formspree...');
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                console.log('✅ Formspree response received:', response.status);
                
                // Clear the cart
                EJC_Cart.clearCart();
                console.log('🗑️ Cart cleared');
                
                // Small delay to ensure localStorage is saved
                setTimeout(function() {
                    console.log('🔀 Redirecting to confirmation page...');
                    window.location.href = 'order-confirmation.html';
                }, 300);
            })
            .catch(error => {
                console.error('❌ Order submission failed:', error);
                
                // Even if Formspree fails, still redirect (we have the order saved)
                console.log('⚠️ Formspree failed, but redirecting anyway (order saved locally)');
                
                // Clear the cart
                EJC_Cart.clearCart();
                
                // Redirect to confirmation page
                setTimeout(function() {
                    window.location.href = 'order-confirmation.html';
                }, 300);
            });
            
            // Return false to be extra sure form doesn't submit
            return false;
        });

        console.log('✅ Form submission handler setup complete');
    }
});

// Add spinner animation for loading state
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
