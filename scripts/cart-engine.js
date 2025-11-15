/**
 * EJ Farm Cart Engine
 * A standalone shopping cart management system using localStorage
 * No DOM manipulation - pure logic only
 * 
 * Usage:
 * - EJC_Cart.addItem(product)
 * - EJC_Cart.removeItem(productId)
 * - EJC_Cart.updateQuantity(productId, quantity)
 * - EJC_Cart.getCart()
 * - EJC_Cart.getTotal()
 * - EJC_Cart.clearCart()
 * 
 * Events:
 * - Listen for 'cartupdated' event on window object
 *   window.addEventListener('cartupdated', (e) => { console.log(e.detail); })
 */

// ============================================
// SECRET GIFT DEFINITION
// ============================================
const SECRET_GIFT = {
    id: 'GIFT-01',
    title: 'Quà Tặng Bí Mật',
    subtitle: 'món quà nhỏ từ EJ Farm',
    price: '0₫',
    priceNumeric: 0,
    image: 'images/gift-product.png',
    category: 'gift'
};

const EJC_Cart = (() => {
    'use strict';

    // ============================================
    // PRIVATE CONSTANTS
    // ============================================
    const STORAGE_KEY = 'EJC_Cart';
    const CART_EVENT = 'cartupdated';

    // ============================================
    // PRIVATE HELPER FUNCTIONS
    // ============================================

    /**
     * Parse Vietnamese price string to number
     * @param {string} priceString - Price string (e.g., "320,000₫" or "1,200,000₫")
     * @returns {number} - Numeric price value (e.g., 320000)
     */
    const parsePrice = (priceString) => {
        if (typeof priceString === 'number') return priceString;
        if (!priceString) return 0;

        // Remove currency symbol, spaces, and convert commas to nothing
        const cleaned = priceString
            .toString()
            .replace(/₫/g, '')
            .replace(/\s/g, '')
            .replace(/,/g, '')
            .trim();

        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? 0 : parsed;
    };

    /**
     * Format number to Vietnamese price string
     * @param {number} price - Numeric price
     * @returns {string} - Formatted price (e.g., "320,000₫")
     */
    const formatPrice = (price) => {
        if (typeof price !== 'number' || isNaN(price)) return '0₫';
        return price.toLocaleString('vi-VN') + '₫';
    };

    /**
     * Load cart data from localStorage
     * @returns {Array} - Array of cart items
     */
    const loadCart = () => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('EJC_Cart: Error loading cart from localStorage', error);
            return [];
        }
    };

    /**
     * Save cart data to localStorage
     * @param {Array} cart - Array of cart items
     */
    const saveCart = (cart) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error('EJC_Cart: Error saving cart to localStorage', error);
        }
    };

    /**
     * Dispatch custom event to notify listeners
     * @param {string} action - Action type (add, remove, update, clear)
     * @param {Object} data - Event data
     */
    const dispatchCartEvent = (action, data = {}) => {
        const event = new CustomEvent(CART_EVENT, {
            detail: {
                action: action,
                cart: loadCart(),
                itemCount: getItemCount(),
                total: getTotal(),
                timestamp: new Date().toISOString(),
                ...data
            }
        });
        window.dispatchEvent(event);
    };

    /**
     * Validate product object
     * @param {Object} product - Product object to validate
     * @returns {boolean} - True if valid
     */
    const isValidProduct = (product) => {
        if (!product || typeof product !== 'object') return false;
        if (!product.id) return false;
        if (!product.title) return false;
        if (!product.price) return false;
        return true;
    };

    /**
     * Get total item count in cart
     * @returns {number} - Total quantity of all items
     */
    const getItemCount = () => {
        const cart = loadCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // ============================================
    // PUBLIC API
    // ============================================

    /**
     * Add item to cart
     * @param {Object} product - Product object
     * @param {string|number} product.id - Unique product ID
     * @param {string} product.title - Product title
     * @param {string|number} product.price - Product price (can be string like "320,000₫")
     * @param {string} [product.subtitle] - Product subtitle/description
     * @param {string} [product.image] - Product image URL
     * @param {string} [product.category] - Product category
     * @param {number} [quantity=1] - Quantity to add
     * @returns {Object} - Updated cart item or null if error
     */
    const addItem = (product, quantity = 1) => {
        if (!isValidProduct(product)) {
            console.error('EJC_Cart: Invalid product object', product);
            return null;
        }

        const cart = loadCart();
        const existingIndex = cart.findIndex(item => item.id === product.id);

        // Parse price to number
        const numericPrice = parsePrice(product.price);

        if (existingIndex !== -1) {
            // Item exists, update quantity
            cart[existingIndex].quantity += quantity;
            cart[existingIndex].subtotal = cart[existingIndex].quantity * cart[existingIndex].priceNumeric;
        } else {
            // New item, add to cart
            const newItem = {
                id: product.id,
                title: product.title,
                subtitle: product.subtitle || '',
                price: product.price, // Keep original format for display
                priceNumeric: numericPrice, // Store numeric value for calculations
                image: product.image || '',
                category: product.category || '',
                quantity: quantity,
                subtotal: numericPrice * quantity,
                addedAt: new Date().toISOString()
            };
            cart.push(newItem);
        }

        saveCart(cart);
        dispatchCartEvent('add', { 
            productId: product.id, 
            productTitle: product.title,
            quantity: quantity 
        });

        // AUTO-ADD SECRET GIFT LOGIC
        // Check if this is the first product and not the gift itself
        const updatedCart = loadCart();
        if (product.id !== SECRET_GIFT.id && updatedCart.length === 1) {
            // This is the first product - auto-add the secret gift
            const giftItem = {
                id: SECRET_GIFT.id,
                title: SECRET_GIFT.title,
                subtitle: SECRET_GIFT.subtitle,
                price: SECRET_GIFT.price,
                priceNumeric: SECRET_GIFT.priceNumeric,
                image: SECRET_GIFT.image,
                category: SECRET_GIFT.category,
                quantity: 1,
                subtotal: 0,
                addedAt: new Date().toISOString(),
                isGift: true
            };
            updatedCart.push(giftItem);
            saveCart(updatedCart);
            console.log('🎁 Secret gift automatically added!');
            dispatchCartEvent('gift-added', { giftId: SECRET_GIFT.id });
        }

        return cart.find(item => item.id === product.id);
    };

    /**
     * Remove item from cart
     * @param {string|number} productId - Product ID to remove
     * @returns {boolean} - True if removed, false if not found
     */
    const removeItem = (productId) => {
        const cart = loadCart();
        const initialLength = cart.length;
        const filtered = cart.filter(item => item.id !== productId);

        if (filtered.length === initialLength) {
            console.warn('EJC_Cart: Product not found in cart', productId);
            return false;
        }

        saveCart(filtered);
        dispatchCartEvent('remove', { productId: productId });
        return true;
    };

    /**
     * Update item quantity
     * @param {string|number} productId - Product ID
     * @param {number} quantity - New quantity (0 to remove)
     * @returns {Object|null} - Updated cart item or null
     */
    const updateQuantity = (productId, quantity) => {
        if (typeof quantity !== 'number' || quantity < 0) {
            console.error('EJC_Cart: Invalid quantity', quantity);
            return null;
        }

        // If quantity is 0, remove the item
        if (quantity === 0) {
            removeItem(productId);
            return null;
        }

        const cart = loadCart();
        const item = cart.find(item => item.id === productId);

        if (!item) {
            console.warn('EJC_Cart: Product not found in cart', productId);
            return null;
        }

        item.quantity = quantity;
        item.subtotal = item.priceNumeric * quantity;

        saveCart(cart);
        dispatchCartEvent('update', { 
            productId: productId,
            quantity: quantity 
        });

        return item;
    };

    /**
     * Get entire cart
     * @returns {Array} - Array of cart items
     */
    const getCart = () => {
        return loadCart();
    };

    /**
     * Get cart item by ID
     * @param {string|number} productId - Product ID
     * @returns {Object|null} - Cart item or null if not found
     */
    const getItem = (productId) => {
        const cart = loadCart();
        return cart.find(item => item.id === productId) || null;
    };

    /**
     * Get total cart value
     * @returns {number} - Total price of all items
     */
    const getTotal = () => {
        const cart = loadCart();
        return cart.reduce((total, item) => total + item.subtotal, 0);
    };

    /**
     * Get formatted total as string
     * @returns {string} - Formatted total (e.g., "1,200,000₫")
     */
    const getTotalFormatted = () => {
        return formatPrice(getTotal());
    };

    /**
     * Get total item count
     * @returns {number} - Total quantity of all items
     */
    const getCount = () => {
        return getItemCount();
    };

    /**
     * Clear entire cart
     * @returns {boolean} - True if cleared
     */
    const clearCart = () => {
        saveCart([]);
        dispatchCartEvent('clear');
        return true;
    };

    /**
     * Check if product is in cart
     * @param {string|number} productId - Product ID
     * @returns {boolean} - True if in cart
     */
    const hasItem = (productId) => {
        const cart = loadCart();
        return cart.some(item => item.id === productId);
    };

    /**
     * Get cart summary statistics
     * @returns {Object} - Cart statistics
     */
    const getStats = () => {
        const cart = loadCart();
        return {
            itemCount: getItemCount(),
            uniqueItems: cart.length,
            total: getTotal(),
            totalFormatted: getTotalFormatted(),
            isEmpty: cart.length === 0
        };
    };

    // ============================================
    // UTILITY EXPORTS
    // ============================================

    /**
     * Export utility functions for external use
     */
    const utils = {
        parsePrice: parsePrice,
        formatPrice: formatPrice
    };

    // ============================================
    // PUBLIC INTERFACE
    // ============================================
    return {
        // Core operations
        addItem,
        removeItem,
        updateQuantity,
        clearCart,

        // Getters
        getCart,
        getItem,
        getTotal,
        getTotalFormatted,
        getCount,
        getStats,
        hasItem,

        // Utilities
        utils,

        // Constants (read-only access)
        STORAGE_KEY,
        CART_EVENT
    };
})();

// Make available globally
if (typeof window !== 'undefined') {
    window.EJC_Cart = EJC_Cart;
}

// Log initialization
console.log('✅ EJC_Cart: Cart Engine initialized');
console.log(`📦 Current cart:`, EJC_Cart.getStats());
