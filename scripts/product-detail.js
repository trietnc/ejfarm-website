/**
 * EJ Farm - Product Detail Page Renderer
 * Dynamically populates the product detail page with data from productDatabase
 */

(function() {
    'use strict';

    // ============================================
    // STATE
    // ============================================
    let currentProduct = null;
    let currentQuantity = 1;

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const elements = {
        mainImage: document.getElementById('pdp-main-image'),
        thumbnails: document.getElementById('pdp-thumbnails'),
        badge: document.getElementById('pdp-badge'),
        title: document.getElementById('pdp-title'),
        subtitle: document.getElementById('pdp-subtitle'),
        price: document.getElementById('pdp-price'),
        description: document.getElementById('pdp-description'),
        detailsList: document.getElementById('pdp-details-list'),
        crossSellScroll: document.getElementById('pdp-cross-sell-scroll'),
        qtyInput: document.getElementById('pdp-qty-input'),
        qtyDecrease: document.getElementById('pdp-qty-decrease'),
        qtyIncrease: document.getElementById('pdp-qty-increase'),
        addToCartBtn: document.getElementById('pdp-add-to-cart-btn'),
        cartBadge: document.getElementById('cartBadge')
    };

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    /**
     * Get product ID from URL
     * @returns {string|null} - Product ID or null
     */
    const getProductIdFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    };

    /**
     * Find product in database
     * @param {string} id - Product ID
     * @returns {Object|null} - Product object or null
     */
    const findProduct = (id) => {
        return productDatabase[id] || null;
    };

    /**
     * Redirect to collection page
     */
    const redirectToCollection = () => {
        console.warn('❌ Product not found. Redirecting to collection page...');
        window.location.href = 'collectionpage.html';
    };

    /**
     * Format paragraph text into HTML
     * @param {string} text - Text with paragraph breaks
     * @returns {string} - HTML string
     */
    const formatDescription = (text) => {
        return text
            .split('\n\n')
            .map(para => `<p>${para.trim()}</p>`)
            .join('');
    };

    // ============================================
    // RENDER FUNCTIONS
    // ============================================

    /**
     * Render main product information
     */
    const renderProductInfo = () => {
        // Set badge
        if (currentProduct.badge) {
            elements.badge.textContent = currentProduct.badge === 'bestseller' ? 'Bestseller' : 'New';
            elements.badge.className = `pdp-badge ${currentProduct.badge}`;
            elements.badge.style.display = 'inline-block';
        } else {
            elements.badge.style.display = 'none';
        }

        // Set text content
        elements.title.textContent = currentProduct.name;
        elements.subtitle.textContent = currentProduct.subtitle;
        elements.price.textContent = currentProduct.priceString;

        // Set main image
        elements.mainImage.src = currentProduct.mainImage;
        elements.mainImage.alt = currentProduct.name;

        // Update page title
        document.title = `${currentProduct.name} - EJ Farm`;

        console.log('✅ Product info rendered:', currentProduct.name);
    };

    /**
     * Render gallery thumbnails
     */
    const renderGallery = () => {
        elements.thumbnails.innerHTML = '';

        currentProduct.galleryImages.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `pdp-thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${imageSrc}" alt="${currentProduct.name} view ${index + 1}">`;
            
            // Add click listener to change main image
            thumbnail.addEventListener('click', () => {
                elements.mainImage.src = imageSrc;
                
                // Update active state
                document.querySelectorAll('.pdp-thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                thumbnail.classList.add('active');
            });

            elements.thumbnails.appendChild(thumbnail);
        });

        console.log(`✅ Gallery rendered: ${currentProduct.galleryImages.length} images`);
    };

    /**
     * Render product story description
     */
    const renderDescription = () => {
        elements.description.innerHTML = formatDescription(currentProduct.longDescription);
        console.log('✅ Description rendered');
    };

    /**
     * Render product details list
     */
    const renderDetails = () => {
        elements.detailsList.innerHTML = '';

        currentProduct.details.forEach(detail => {
            const detailItem = document.createElement('div');
            detailItem.className = 'pdp-detail-item';
            detailItem.innerHTML = `
                <div class="pdp-detail-icon">${detail.icon}</div>
                <div class="pdp-detail-content">
                    <div class="pdp-detail-label">${detail.label}</div>
                    <div class="pdp-detail-value">${detail.value}</div>
                </div>
            `;
            elements.detailsList.appendChild(detailItem);
        });

        console.log(`✅ Details rendered: ${currentProduct.details.length} items`);
    };

    /**
     * Render cross-sell products (same category, excluding current product)
     */
    const renderCrossSell = () => {
        elements.crossSellScroll.innerHTML = '';

        // Get products from same category
        const relatedProducts = Object.values(productDatabase)
            .filter(product => 
                product.category === currentProduct.category && 
                product.id !== currentProduct.id
            )
            .slice(0, 4); // Limit to 4 products

        // If no products in same category, show random products
        if (relatedProducts.length === 0) {
            const allProducts = Object.values(productDatabase)
                .filter(product => product.id !== currentProduct.id)
                .slice(0, 4);
            relatedProducts.push(...allProducts);
        }

        relatedProducts.forEach(product => {
            const card = document.createElement('a');
            card.className = 'pdp-cross-sell-card';
            card.href = `product-detail.html?id=${product.id}`;
            card.innerHTML = `
                <img src="${product.mainImage}" alt="${product.name}" class="pdp-cross-sell-image">
                <div class="pdp-cross-sell-content">
                    <h3 class="pdp-cross-sell-card-title">${product.name}</h3>
                    <p class="pdp-cross-sell-card-price">${product.priceString}</p>
                </div>
            `;
            elements.crossSellScroll.appendChild(card);
        });

        console.log(`✅ Cross-sell rendered: ${relatedProducts.length} products`);
    };

    /**
     * Render complete product page
     */
    const renderProductPage = () => {
        renderProductInfo();
        renderGallery();
        renderDescription();
        renderDetails();
        renderCrossSell();
    };

    // ============================================
    // EVENT HANDLERS
    // ============================================

    /**
     * Handle quantity decrease
     */
    const handleQuantityDecrease = () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            elements.qtyInput.value = currentQuantity;
            elements.qtyDecrease.disabled = currentQuantity <= 1;
        }
    };

    /**
     * Handle quantity increase
     */
    const handleQuantityIncrease = () => {
        if (currentQuantity < 99) {
            currentQuantity++;
            elements.qtyInput.value = currentQuantity;
            elements.qtyDecrease.disabled = false;
        }
    };

    /**
     * Handle Add to Cart button click
     */
    const handleAddToCart = () => {
        if (!currentProduct) {
            console.error('❌ No product loaded');
            return;
        }

        // Check if cart engine is available
        if (typeof EJC_Cart === 'undefined') {
            console.error('❌ Cart engine not loaded');
            alert('Cart system unavailable. Please refresh the page.');
            return;
        }

        // Create product object for cart
        const cartProduct = {
            id: currentProduct.id,
            title: currentProduct.name,
            subtitle: currentProduct.subtitle,
            price: currentProduct.priceString,
            image: currentProduct.mainImage,
            category: currentProduct.category
        };

        // Add to cart using cart engine
        const addedItem = EJC_Cart.addItem(cartProduct, currentQuantity);

        if (addedItem) {
            // Show success feedback
            const originalHTML = elements.addToCartBtn.innerHTML;
            elements.addToCartBtn.classList.add('added');
            elements.addToCartBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Added to Cart!</span>
            `;
            elements.addToCartBtn.disabled = true;

            console.log(`✅ Added to cart: ${currentProduct.name} (Qty: ${currentQuantity})`);

            // Reset after 2 seconds
            setTimeout(() => {
                elements.addToCartBtn.classList.remove('added');
                elements.addToCartBtn.innerHTML = originalHTML;
                elements.addToCartBtn.disabled = false;
                
                // Reset quantity to 1
                currentQuantity = 1;
                elements.qtyInput.value = currentQuantity;
                elements.qtyDecrease.disabled = true;
            }, 2000);

            // Optional: Show notification toast
            showNotification(`${currentProduct.name} added to cart!`, 'success');
        } else {
            console.error('❌ Failed to add to cart');
            showNotification('Failed to add item. Please try again.', 'error');
        }
    };

    /**
     * Show notification toast
     * @param {string} message - Message to display
     * @param {string} type - 'success' or 'error'
     */
    const showNotification = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `cart-toast cart-toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: black;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            font-size: 0.95rem;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            max-width: 300px;
            border-left: 4px solid ${type === 'success' ? '#10b981' : '#ef4444'};
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    /**
     * Handle cart updated event
     */
    const handleCartUpdated = (e) => {
        console.log('🔔 Cart updated:', e.detail);
        // Badge will be updated by cart-badge-updater.js
    };

    // ============================================
    // INITIALIZATION
    // ============================================

    /**
     * Initialize product detail page
     */
    const init = () => {
        console.log('🎨 Initializing Product Detail Page...');

        // Get product ID from URL
        const productId = getProductIdFromURL();

        if (!productId) {
            console.error('❌ No product ID in URL');
            redirectToCollection();
            return;
        }

        // Find product in database
        currentProduct = findProduct(productId);

        if (!currentProduct) {
            console.error(`❌ Product not found: ${productId}`);
            redirectToCollection();
            return;
        }

        console.log(`✅ Product loaded: ${currentProduct.name} (ID: ${productId})`);

        // Render product page
        renderProductPage();

        // Set up event listeners
        elements.qtyDecrease.addEventListener('click', handleQuantityDecrease);
        elements.qtyIncrease.addEventListener('click', handleQuantityIncrease);
        elements.addToCartBtn.addEventListener('click', handleAddToCart);
        window.addEventListener('cartupdated', handleCartUpdated);

        // Disable decrease button initially
        elements.qtyDecrease.disabled = true;

        console.log('✅ Product Detail Page initialized successfully');
    };

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
