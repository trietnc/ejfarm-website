# 🚀 Checkout Quick Start Guide

## ⚡ Test Your Checkout in 5 Minutes

### Step 1: Add Items to Cart
1. Open `collectionpage.html` in your browser
2. Click "Add to Cart" on any product (e.g., Mo Nong)
3. See the cart badge update in the header

### Step 2: View Cart
1. Click the cart icon in the header
2. Verify your items show correctly
3. Try adjusting quantity with +/- buttons
4. See the "Proceed to Checkout" green button at bottom

### Step 3: Go to Checkout
1. Click "Proceed to Checkout"
2. You'll land on `checkout.html`
3. See your order summary on the right
4. See the form on the left

### Step 4: Fill the Form
```
Name: Test Customer
Phone: 0901234567
Email: test@example.com
Address: 123 Test Street, District 1, Ho Chi Minh City
Payment: Choose COD or Bank Transfer
```

### Step 5: Test Shipping Calculation

**Test Case 1: Paid Shipping**
- Add items totaling < 500,000₫
- Check shipping shows: **30,000₫**

**Test Case 2: Free Shipping**
- Add items totaling ≥ 500,000₫
- Check shipping shows: **Miễn phí** (Free)

### Step 6: Test Payment Toggle

**COD Test:**
- Select "Thanh toán khi giao hàng (COD)"
- Bank info box should hide

**Bank Transfer Test:**
- Select "Chuyển khoản ngân hàng"
- Bank info box should appear with account details

### Step 7: Submit (Optional)
⚠️ Only do this if you want to test Formspree:
1. Fill all required fields
2. Click "Hoàn tất đơn hàng"
3. Button shows loading spinner
4. Check your email for submission

---

## 📱 Mobile Test

1. Open DevTools (F12)
2. Click device toolbar (responsive mode)
3. Select "iPhone 12 Pro" or similar
4. Navigate through: Collection → Cart → Checkout
5. Verify layout looks good at all steps

---

## 🎨 Visual Checklist

### On Desktop
- [ ] Two columns: Form left, Summary right
- [ ] Summary is sticky (follows scroll)
- [ ] Green buttons look prominent
- [ ] Trust badges visible below totals
- [ ] Bank info box appears/disappears smoothly

### On Mobile
- [ ] Single column layout
- [ ] Summary shows first (at top)
- [ ] Form below summary
- [ ] All buttons full-width
- [ ] Easy to tap everything

### Dark Mode
- [ ] Toggle dark mode (moon icon)
- [ ] Colors invert properly
- [ ] Still looks professional
- [ ] Text remains readable

---

## 🐛 Common Issues & Quick Fixes

### Issue: "Items not showing in checkout"
**Fix:** Make sure you have items in cart before going to checkout
```
1. Go back to collectionpage.html
2. Add 1-2 items to cart
3. Then go to checkout again
```

### Issue: "Shipping shows 0₫ but should show 30,000₫"
**Check:** Your cart total might be ≥ 500,000₫
```
Free shipping threshold: 500,000₫
Add cheaper items to test paid shipping
```

### Issue: "Form won't submit"
**Check:**
1. All required fields filled? (marked with *)
2. Email format valid? (contains @)
3. Internet connected?
4. Check browser console for errors (F12)

### Issue: "Bank info not showing"
**Check:**
1. Click the "Chuyển khoản ngân hàng" radio button
2. Look for the gray box below payment options
3. Check console for JavaScript errors

---

## 📧 Formspree Email Preview

When someone completes checkout, you'll receive:

```
Subject: New submission from checkoutForm

name: Nguyễn Văn A
phone: 0901234567
email: customer@example.com
address: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM
payment-method: COD

Order Summary: 
2x Mo Nong (250g - Whole Bean) - 400,000₫; 
1x Community Blend (500g - Ground) - 250,000₫

Final Total: 
Tạm tính: 650,000₫ | Phí ship: 0₫ | Tổng: 650,000₫
```

You can then:
- Copy customer details
- Prepare the order
- Contact customer via phone/email
- Ship the products

---

## ⚙️ Formspree Configuration

### In Your Formspree Dashboard:

1. **Go to:** https://formspree.io/forms/xyzlzdqj

2. **Settings to Configure:**

   **Success URL (Redirect after submission):**
   ```
   https://yourwebsite.com/order-success.html
   ```
   (You can create this page later)

   **Email Notifications:**
   - ✅ Enable email notifications
   - Add your business email
   - Optionally add multiple recipients

   **Spam Protection:**
   - ✅ Enable reCAPTCHA (optional, but recommended)
   - Prevents spam submissions

   **Custom Reply-To:**
   - Set to customer's email field
   - Allows you to reply directly from email

3. **Save all settings**

---

## 🎯 What Makes This Special

### 1. Empty Cart Protection
If someone tries to access checkout without items:
→ Automatic redirect back to cart.html

### 2. Smart Shipping
- Calculates on page load
- Shows exact amount immediately
- Free shipping incentive clear

### 3. Clean Summary
- Read-only (not editable)
- Receipt-style design
- Professional appearance

### 4. Payment Flexibility
- COD for convenience
- Bank transfer for prepayment
- Clear instructions for each

### 5. Trust Building
- Lock icons
- Truck icons
- Professional design
- Clear pricing

---

## 📂 File Reference

### Core Files
```
checkout.html                 ← The page
styles/checkout-styles.css    ← The design
scripts/checkout.js           ← The functionality
```

### Dependencies
```
scripts/cart-engine.js        ← Cart data source
scripts/cart-badge-updater.js ← Badge counter
scripts/script.js             ← Site-wide features
styles/styles.css             ← Global styles
```

### Documentation
```
CHECKOUT_SYSTEM_README.md              ← Full docs
CHECKOUT_IMPLEMENTATION_COMPLETE.md    ← Implementation summary
CHECKOUT_ARCHITECTURE.md               ← Visual diagrams
CHECKOUT_QUICK_START.md                ← This file
```

---

## 🔍 Debug Mode

Want to see what's happening? Open browser console (F12) and look for:

```
🛒 Checkout page loaded
✅ Rendered 3 items in order summary
💰 Totals calculated: {
  subtotal: "650,000₫",
  shipping: "0₫",
  total: "650,000₫"
}
📋 Hidden inputs updated
✅ Payment toggle setup complete
✅ Form submission handler setup complete
```

These logs confirm everything is working correctly!

---

## 🎨 Customization Tips

### Change Shipping Threshold
In `scripts/checkout.js`, line ~74:
```javascript
const shippingCost = (subtotal >= 500000) ? 0 : 30000;
```
Change `500000` to your desired threshold

### Change Shipping Cost
Same line:
```javascript
const shippingCost = (subtotal >= 500000) ? 0 : 30000;
```
Change `30000` to your desired shipping fee

### Change Bank Details
In `checkout.html`, search for "Vietcombank" and update:
- Bank name
- Account number
- Account holder name

### Change Button Text
In `checkout.html`, search for "Hoàn tất đơn hàng" and change to your preference

### Change Colors
In `styles/styles.css`, modify:
```css
--accent-primary: #4c8c4a;  /* Change this green */
```

---

## ✅ Pre-Launch Checklist

Before going live with real customers:

- [ ] Test with empty cart (redirects to cart)
- [ ] Test with 1 item
- [ ] Test with multiple items
- [ ] Test free shipping (≥500k)
- [ ] Test paid shipping (<500k)
- [ ] Test COD payment selection
- [ ] Test bank transfer selection
- [ ] Submit test order to Formspree
- [ ] Verify email received with correct data
- [ ] Test on Chrome
- [ ] Test on mobile device
- [ ] Test dark mode toggle
- [ ] Update bank details (if not using Vietcombank)
- [ ] Set Formspree success redirect URL
- [ ] Update Formspree notification email

---

## 🆘 Need More Help?

### Documentation Files
1. **Quick overview:** `CHECKOUT_IMPLEMENTATION_COMPLETE.md`
2. **Full technical docs:** `CHECKOUT_SYSTEM_README.md`
3. **Architecture diagrams:** `CHECKOUT_ARCHITECTURE.md`
4. **This guide:** `CHECKOUT_QUICK_START.md`

### Debug Steps
1. Open browser console (F12)
2. Look for red error messages
3. Check "Network" tab for failed requests
4. Verify all scripts loaded (Sources tab)

### Test Data
```
Name: Test Nguyễn
Phone: 0901234567
Email: test@example.com
Address: 123 Nguyễn Huệ, Quận 1, TP.HCM
```

---

## 🎉 You're Ready!

Your checkout system is complete and ready to use. Just:

1. **Test thoroughly** (5-10 minutes)
2. **Configure Formspree** (2 minutes)
3. **Update bank details** (if needed)
4. **Go live!** 🚀

---

**Created:** November 13, 2025  
**Status:** ✅ Production Ready  
**Support:** See documentation files for details

*Happy selling!* ☕🎊
