# Checkout System Documentation

## Overview
The EJ Farm checkout system provides a secure, modern, and user-friendly checkout experience. It features a clean two-column layout, live shipping calculations, multiple payment options, and seamless Formspree integration for order submissions.

---

## Files Created

### 1. `checkout.html`
**Purpose:** Main checkout page with two-column layout

**Key Features:**
- **Modern Navigation:** Full site-wide navbar with language switcher and cart icon
- **Progress Steps:** Visual indicator showing "Cart → Information → Complete"
- **Two-Column Layout:**
  - **Left:** Customer information form
  - **Right:** Clean order summary (receipt-style, non-editable)
- **Form Integration:** Direct submission to Formspree (https://formspree.io/f/xyzlzdqj)
- **Responsive Design:** Mobile-first, adapts to all screen sizes

**HTML Structure:**
```html
<main class="checkout-page">
  <div class="checkout-header">...</div>
  <div class="checkout-layout">
    <!-- Left Column: Form -->
    <div class="checkout-form-section">
      <form id="checkoutForm">
        <fieldset>Customer Info</fieldset>
        <fieldset>Shipping Address</fieldset>
        <fieldset>Payment Method</fieldset>
        <button type="submit">Complete Order</button>
      </form>
    </div>
    
    <!-- Right Column: Summary -->
    <div class="order-summary-section">
      <div class="order-summary-card">
        <div id="order-summary-list">...</div>
        <div class="order-totals">...</div>
        <div class="trust-badges">...</div>
      </div>
    </div>
  </div>
</main>
```

---

### 2. `styles/checkout-styles.css`
**Purpose:** Complete styling for checkout page following "modern & minimal" design philosophy

**Design Principles:**
- **Generous Whitespace:** Clean, uncluttered layout
- **Trust-Building:** Lock icons, secure badges, professional appearance
- **Color System:** Uses CSS variables from main theme
- **Responsive:** Breakpoints at 1024px, 768px, and 480px

**Key Style Components:**

#### Form Styling
- Full-width inputs with subtle borders
- Clear labels above inputs
- Custom radio buttons with `accent-color`
- Interactive payment option cards
- Bank transfer info box with smooth transitions

#### Order Summary Styling
- Card-based design with light background
- Non-editable item list (clean receipt style)
- Small product images (60px × 60px)
- Clear pricing hierarchy
- Bold, large total price in accent color

#### Trust Elements
- Trust badges with icons
- Shipping note box
- Secure checkout indicators

**CSS Variables Used:**
```css
--bg-primary, --bg-secondary, --bg-light
--text-primary, --text-muted
--accent-primary, --accent-hover
--border-muted
--font-heading, --font-body
```

---

### 3. `scripts/checkout.js`
**Purpose:** Controller script for checkout page functionality

**Core Functions:**

#### `renderOrderSummary()`
- Fetches cart items via `EJC_Cart.getCart()`
- **Empty Cart Protection:** Redirects to cart.html if no items
- Generates clean HTML for each item:
  - Product image (60px)
  - Quantity × Product name
  - Subtotal for that item
- Injects HTML into `#order-summary-list`

```javascript
Example item:
{
  id: "mo-nong-250g",
  title: "Mo Nong",
  subtitle: "250g - Whole Bean",
  priceNumeric: 200000,
  quantity: 2,
  image: "images/mo-nong.jpg"
}
```

#### `calculateTotals()`
- Gets subtotal from `EJC_Cart.getStats()`
- **Shipping Logic:**
  - Subtotal ≥ 500,000₫ → Free shipping (0₫)
  - Subtotal < 500,000₫ → 30,000₫ shipping
- Calculates total: `subtotal + shipping`
- Updates DOM elements:
  - `#summary-subtotal`
  - `#summary-shipping` (shows "Miễn phí" or formatted amount)
  - `#summary-total`
- Stores totals in `window.checkoutTotals` for later use

#### `updateHiddenInputs()`
- Creates text summary of order items
- Updates hidden form fields:
  - `#hidden-order-summary`: "2x Mo Nong (250g) - 400,000₫; 1x Community Blend..."
  - `#hidden-final-total`: "Tạm tính: 400,000₫ | Phí ship: 30,000₫ | Tổng: 430,000₫"
- These values are sent to your email via Formspree

#### `setupPaymentToggle()`
- Adds click listeners to radio buttons
- **COD selected:** Hides `#bank-info` div
- **Bank transfer selected:** Shows `#bank-info` div with bank details
- Smooth transition effect (display: none/block)

#### `setupFormSubmission()`
- Adds submit handler to form
- Shows loading state on button (spinner animation)
- Disables button to prevent double-submission
- Formspree handles actual submission and redirect

---

## Technical Architecture

### Data Flow
```
1. User clicks "Proceed to Checkout" on cart.html
2. checkout.html loads
3. checkout.js executes:
   - renderOrderSummary() → Reads from cart-engine
   - calculateTotals() → Applies shipping logic
   - updateHiddenInputs() → Prepares form data
   - setupPaymentToggle() → Enables payment selection
4. User fills form and clicks "Complete Order"
5. Form submits to Formspree with:
   - Customer info (name, phone, email, address)
   - Payment method (COD or Bank Transfer)
   - Hidden order summary and total
6. Formspree sends email and redirects user
```

### Dependencies
```html
<script src="scripts/cart-engine.js"></script>      <!-- Required: Cart data -->
<script src="scripts/cart-badge-updater.js"></script> <!-- Updates cart badge -->
<script src="scripts/checkout.js"></script>         <!-- Main controller -->
<script src="scripts/script.js"></script>           <!-- Header functionality -->
```

### Cart Engine Integration
**Required Methods:**
- `EJC_Cart.getCart()` → Returns array of cart items
- `EJC_Cart.getStats()` → Returns `{ subtotal, itemCount, items }`

**Item Object Structure:**
```javascript
{
  id: string,           // Product ID
  title: string,        // Product name
  subtitle: string,     // Variant (e.g., "250g - Whole Bean")
  priceNumeric: number, // Price as number (e.g., 200000)
  quantity: number,     // Quantity in cart
  image: string,        // Image URL
  subtotal: number      // priceNumeric × quantity
}
```

---

## Formspree Configuration

### Form Setup
- **Action URL:** `https://formspree.io/f/xyzlzdqj`
- **Method:** POST
- **Form Name:** `checkoutForm`

### Fields Sent to Email
1. **name** (text) - Customer's full name
2. **phone** (tel) - Customer's phone number
3. **email** (email) - Customer's email address
4. **address** (textarea) - Full shipping address
5. **payment-method** (radio) - "COD" or "Bank Transfer"
6. **Order Summary** (hidden) - List of ordered items
7. **Final Total** (hidden) - Breakdown of costs

### Formspree Settings Recommendations
In your Formspree dashboard, configure:
- **Success Redirect:** `https://yoursite.com/order-confirmation.html`
- **Email Template:** Include all fields in notification email
- **Spam Protection:** Enable reCAPTCHA if needed
- **Notification Email:** Your business email address

---

## Design Specifications

### Color Palette
```css
/* Light Mode */
--accent-primary: #4c8c4a;     /* Green accent */
--bg-primary: #ffffff;          /* White background */
--bg-secondary: #f9fafb;        /* Light gray */
--bg-light: #f3f4f6;            /* Lighter gray for cards */
--text-primary: #1a202c;        /* Dark text */
--text-muted: #718096;          /* Gray text */
--border-muted: #e2e8f0;        /* Light border */

/* Dark Mode */
[data-theme="dark"] uses inverted colors
```

### Typography
```css
--font-heading: 'Crimson Pro', serif;
--font-body: 'Inter', sans-serif;

Heading sizes:
- Page title: 2.5rem (40px)
- Fieldset title: 1.4rem (22.4px)
- Summary title: 1.5rem (24px)

Body sizes:
- Form inputs: 1rem (16px)
- Labels: 0.95rem (15.2px)
- Hints: 0.85rem (13.6px)
```

### Spacing System
- Page padding: 3rem top, 4rem bottom
- Section gaps: 3rem between columns
- Form field margin: 1.5rem bottom
- Card padding: 2rem (desktop), 1.25rem (mobile)

### Border Radius
- Cards/sections: 12px
- Inputs: 8px
- Payment options: 10px
- Small elements (notes): 6px

---

## Shipping Logic

### Free Shipping Threshold
```javascript
const FREE_SHIPPING_THRESHOLD = 500000; // 500,000₫

if (subtotal >= FREE_SHIPPING_THRESHOLD) {
  shippingCost = 0; // Free shipping
} else {
  shippingCost = 30000; // 30,000₫ flat rate
}
```

### Display Logic
- **Cart Page:** Shows "Calculated at checkout"
- **Checkout Page:** Shows actual shipping cost or "Miễn phí"
- **Shipping Note:** Visible below totals explaining free shipping threshold

---

## Payment Methods

### 1. COD (Cash on Delivery)
**Default Option:** Checked by default
- Icon: Credit card SVG
- Title: "Thanh toán khi giao hàng (COD)"
- Description: "Thanh toán bằng tiền mặt khi nhận hàng"
- **Action:** Hides bank info div

### 2. Bank Transfer
**Alternative Option:**
- Icon: Dollar sign SVG
- Title: "Chuyển khoản ngân hàng"
- Description: "Chuyển khoản trước, giao hàng sau khi xác nhận"
- **Action:** Shows bank info div with details:
  - Bank name: Vietcombank
  - Account number: 1234567890
  - Account holder: NGUYEN VAN A
  - Transfer note format: [Name] - [Phone]

---

## Responsive Breakpoints

### Desktop (> 1024px)
- Two-column layout
- Order summary sticky on right
- Full form width on left

### Tablet (768px - 1024px)
- Single column layout
- Order summary moves to top
- Form below summary
- Reduced padding

### Mobile (< 768px)
- Full-width layout
- Form fields stack vertically
- Smaller fonts and padding
- Touch-friendly tap targets (min 44px)

### Small Mobile (< 480px)
- Minimal padding
- Compact form elements
- Simplified navigation

---

## Trust & Security Features

### Visual Trust Elements
1. **Lock Icon** - "Thanh toán an toàn" (Secure checkout)
2. **Truck Icon** - "Giao hàng nhanh chóng" (Fast delivery)
3. **Home Icon** - Free shipping reminder
4. **Progress Steps** - Shows user where they are in process

### UX Trust Building
- Clean, professional design
- Clear pricing (no hidden fees)
- Shipping cost shown upfront
- Bank details in secure-looking info box
- Loading state on form submission
- Validation on all required fields

---

## Form Validation

### Required Fields
All marked with red asterisk (`*`):
- ✅ Full Name (`name`)
- ✅ Phone Number (`phone`)
- ✅ Email (`email`)
- ✅ Address (`address`)

### HTML5 Validation
```html
<input type="text" required>     <!-- Must not be empty -->
<input type="tel" required>      <!-- Must be phone format -->
<input type="email" required>    <!-- Must be email format -->
<textarea required></textarea>   <!-- Must not be empty -->
```

### Browser-Native Validation
- Prevents form submission if fields invalid
- Shows error messages automatically
- No custom JavaScript validation needed (relies on HTML5)

---

## Testing Checklist

### Before Launch
- [ ] Test with empty cart (should redirect to cart.html)
- [ ] Test with 1 item in cart
- [ ] Test with multiple items in cart
- [ ] Test shipping calculation (< 500k and ≥ 500k)
- [ ] Test COD payment selection (bank info hides)
- [ ] Test bank transfer selection (bank info shows)
- [ ] Test form submission to Formspree
- [ ] Test mobile responsiveness (all breakpoints)
- [ ] Test with dark mode enabled
- [ ] Verify all translations load correctly
- [ ] Check cart badge updates properly

### Cross-Browser Testing
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile Safari ✓
- Mobile Chrome ✓

---

## Future Enhancements

### Potential Features
1. **Real-time Address Validation**
   - Integrate with Google Maps API
   - Auto-complete address fields

2. **Multiple Shipping Options**
   - Standard (3-5 days) - 30,000₫
   - Express (1-2 days) - 50,000₫
   - Same Day (selected cities) - 80,000₫

3. **Discount Codes**
   - Add coupon input field
   - Validate against backend/database
   - Show discount in summary

4. **Order Tracking**
   - Generate unique order ID
   - Send to tracking page after submission
   - Email tracking link

5. **Save Address**
   - Store customer addresses
   - Quick select for returning customers
   - Requires user accounts/login

6. **Payment Gateway Integration**
   - Stripe for credit cards
   - PayPal integration
   - MoMo/ZaloPay for Vietnamese market

---

## Troubleshooting

### Cart Items Not Showing
**Issue:** Order summary is empty
**Solution:** 
- Check if `cart-engine.js` is loaded before `checkout.js`
- Verify `EJC_Cart.getCart()` returns items
- Check browser console for errors

### Shipping Not Calculating
**Issue:** Shipping shows 0₫ when it should be 30,000₫
**Solution:**
- Verify `EJC_Cart.getStats().subtotal` returns correct value
- Check shipping logic in `calculateTotals()` function
- Ensure `subtotal` is a number, not a string

### Form Not Submitting
**Issue:** Button click does nothing
**Solution:**
- Check Formspree URL is correct (`xyzlzdqj`)
- Verify all required fields are filled
- Check browser console for JavaScript errors
- Test network request in DevTools

### Bank Info Not Toggling
**Issue:** Bank info doesn't show when selected
**Solution:**
- Verify radio button IDs match: `payment_cod` and `payment_bank`
- Check `#bank-info` div exists in HTML
- Ensure `setupPaymentToggle()` is called
- Check for CSS `display: none !important` overrides

### Mobile Layout Issues
**Issue:** Layout breaks on mobile
**Solution:**
- Check viewport meta tag in HTML
- Verify media queries in `checkout-styles.css`
- Test with browser DevTools responsive mode
- Clear browser cache

---

## Support

For questions or issues:
1. Check this documentation first
2. Review browser console for errors
3. Test with empty cart, then with items
4. Verify all files are loaded in correct order
5. Check Formspree dashboard for submission errors

---

## Changelog

### Version 1.0 (November 13, 2025)
- ✅ Initial release
- ✅ Two-column checkout layout
- ✅ Order summary rendering
- ✅ Shipping calculation (free over 500k)
- ✅ Payment method toggle (COD/Bank)
- ✅ Formspree integration
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Trust badges and security indicators

---

**Built with ❤️ for EJ Farm**
*Modern, minimal, secure checkout experience*
