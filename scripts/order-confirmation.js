/**
 * ORDER CONFIRMATION PAGE CONTROLLER
 * Displays order receipt from localStorage and handles confirmation page logic
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Order confirmation page loaded');

    // Check if cart engine is loaded
    if (typeof EJC_Cart === 'undefined') {
        console.error('Cart engine not loaded!');
        return;
    }

    // Initialize confirmation page
    initConfirmationPage();

    /**
     * Main initialization function
     */
    function initConfirmationPage() {
        // Get order data from localStorage
        const orderDataString = localStorage.getItem('EJC_LastOrder');

        // Check if order data exists
        if (!orderDataString) {
            console.warn('No order data found, redirecting to homepage...');
            window.location.href = 'index.html';
            return;
        }

        try {
            // Parse order data
            const orderData = JSON.parse(orderDataString);
            console.log('📦 Order data retrieved:', orderData);

            // Populate the confirmation page
            populateOrderInfo(orderData);
            populateOrderSummary(orderData);

            // Clear the order data from localStorage (one-time use)
            localStorage.removeItem('EJC_LastOrder');
            console.log('🗑️ Order data cleared from localStorage');

        } catch (error) {
            console.error('Error parsing order data:', error);
            window.location.href = 'index.html';
        }
    }

    /**
     * Populate customer and order information
     * @param {Object} orderData - Order data object
     */
    function populateOrderInfo(orderData) {
        // Order ID
        const orderIdEl = document.getElementById('conf-order-id');
        if (orderIdEl) {
            orderIdEl.textContent = orderData.id;
        }

        // Customer Name
        const nameEl = document.getElementById('conf-customer-name');
        if (nameEl) {
            nameEl.textContent = orderData.customerName;
        }

        // Customer Phone
        const phoneEl = document.getElementById('conf-customer-phone');
        if (phoneEl) {
            phoneEl.textContent = orderData.phone;
        }

        // Customer Email
        const emailEl = document.getElementById('conf-customer-email');
        if (emailEl) {
            emailEl.textContent = orderData.email;
        }

        // Customer Address
        const addressEl = document.getElementById('conf-customer-address');
        if (addressEl) {
            addressEl.textContent = orderData.address;
        }

        // Payment Method
        const paymentEl = document.getElementById('conf-payment-method');
        if (paymentEl) {
            const paymentMethodText = orderData.paymentMethod === 'COD' 
                ? 'Thanh toán khi giao hàng (COD)' 
                : 'Chuyển khoản ngân hàng';
            paymentEl.textContent = paymentMethodText;
        }

        console.log('✅ Order info populated');
    }

    /**
     * Populate order summary and totals
     * @param {Object} orderData - Order data object
     */
    function populateOrderSummary(orderData) {
        const summaryListEl = document.getElementById('conf-order-summary-list');
        const subtotalEl = document.getElementById('conf-subtotal');
        const shippingEl = document.getElementById('conf-shipping');
        const totalEl = document.getElementById('conf-total-price');

        // Build HTML for order items
        if (summaryListEl && orderData.items) {
            let itemsHTML = '';
            orderData.items.forEach(item => {
                itemsHTML += createReceiptItemHTML(item);
            });
            summaryListEl.innerHTML = itemsHTML;
        }

        // Display subtotal
        if (subtotalEl) {
            subtotalEl.textContent = formatVNCurrency(orderData.subtotal);
        }

        // Display shipping
        if (shippingEl) {
            shippingEl.textContent = orderData.shipping === 0 
                ? 'Miễn phí' 
                : formatVNCurrency(orderData.shipping);
        }

        // Display total
        if (totalEl) {
            totalEl.textContent = formatVNCurrency(orderData.total);
        }

        console.log('✅ Order summary populated');
    }

    /**
     * Create HTML for a single receipt item
     * @param {Object} item - Cart item object
     * @returns {string} HTML string
     */
    function createReceiptItemHTML(item) {
        // Format the item total (price * quantity)
        const itemTotal = (item.priceNumeric * item.quantity).toLocaleString('vi-VN');

        return `
            <div class="receipt-item">
                <img src="${item.image}" alt="${item.title}" class="receipt-item-image">
                <div class="receipt-item-details">
                    <h4 class="receipt-item-title">${item.quantity}x ${item.title}</h4>
                    <p class="receipt-item-subtitle">${item.subtitle || ''}</p>
                </div>
                <div class="receipt-item-price">${itemTotal}₫</div>
            </div>
        `;
    }

    /**
     * Format number as Vietnamese currency
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency string
     */
    function formatVNCurrency(amount) {
        return amount.toLocaleString('vi-VN') + '₫';
    }

    console.log('✅ Order confirmation page initialized');
});
