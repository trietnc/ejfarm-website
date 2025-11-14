# 🚀 Quick Start Guide - Language Switching System

## 🎯 What Was Implemented?

A complete **English ↔ Vietnamese** language switching system for the EJ Farm website with:
- ✅ Persistent storage (localStorage)
- ✅ Instant translation (no page reload)
- ✅ Beautiful UI with flag emojis (🇬🇧 🇻🇳)
- ✅ Fully responsive (mobile/desktop)
- ✅ Dark/light mode compatible
- ✅ Keyboard accessible

---

## 📁 Files Added

```
EJ Farm v2/
├── scripts/
│   ├── translations.js           ← Translation dictionary (EN/VI)
│   └── language-switcher.js      ← Core logic + localStorage
├── styles/
│   └── language-switcher.css     ← Language selector UI styles
└── index.html                     ← Modified with data-key attributes
```

---

## 🔧 How It Works

### 1️⃣ **User Clicks Language Selector**
Located in navbar (top right, between theme toggle and hamburger menu)

### 2️⃣ **Dropdown Opens**
Shows two options:
- 🇬🇧 English
- 🇻🇳 Tiếng Việt

### 3️⃣ **User Selects Language**
Click on desired language

### 4️⃣ **Page Translates Instantly**
All text with `data-key` attributes updates

### 5️⃣ **Choice Saved**
Preference stored in localStorage

### 6️⃣ **Persists Forever**
On next visit, page loads in chosen language

---

## 🧪 Testing Instructions

### **Open the Website:**
1. Navigate to: `g:\My Drive\Coding\EJ Farm v2\`
2. Open `index.html` in your browser

### **Test Language Switching:**
1. Look at top-right navbar
2. You'll see: `🇬🇧 English ▼` button
3. Click it
4. Select `🇻🇳 Tiếng Việt`
5. ✅ **Entire page translates to Vietnamese!**

### **Test Persistence:**
1. Refresh the page (F5)
2. ✅ **Page stays in Vietnamese!**

### **Switch Back:**
1. Click `🇻🇳 Tiếng Việt ▼`
2. Select `🇬🇧 English`
3. ✅ **Page translates back to English!**

---

## 📱 Mobile Testing

1. Open DevTools (F12)
2. Click device icon (responsive mode)
3. Select "iPhone" or "Pixel"
4. Language selector shows: `🇬🇧 ▼` (flag only, compact)
5. Click it, dropdown still works!

---

## ⌨️ Keyboard Testing

1. Press `Tab` until language selector is focused
2. Press `Enter` to open dropdown
3. Press `Tab` to move between options
4. Press `Enter` to select
5. Press `Escape` to close dropdown

---

## 🔍 What Was Translated?

### **Every Section of the Homepage:**
- ✅ Navigation menu (5 links)
- ✅ Hero section (headline, subtitle, 2 buttons)
- ✅ Social proof (3 trust indicators)
- ✅ Origin story (headline, 4 paragraphs, button)
- ✅ Process section (3 steps with descriptions)
- ✅ Product collection (3 products)
- ✅ Testimonials (2 reviews)
- ✅ Final CTA (headline, description, 3 badges)
- ✅ Footer (all links and text)

### **Total:** 100+ translation keys

---

## 🎨 Where to Find Things

### **Need to Add/Edit Translations?**
📂 `scripts/translations.js`

Example:
```javascript
en: {
    'nav.shop': 'Shop',
    'hero.headline': 'Welcome to EJ Farm'
},
vi: {
    'nav.shop': 'Mua Hàng',
    'hero.headline': 'Chào Mừng Đến EJ Farm'
}
```

### **Need to Style the Language Selector?**
📂 `styles/language-switcher.css`

Example:
```css
.lang-current {
    background: var(--bg-light);
    border: 2px solid var(--border-muted);
}
```

### **Need to Change Logic?**
📂 `scripts/language-switcher.js`

Main functions:
- `switchLanguage(lang)` - Change language
- `getCurrentLanguage()` - Get current language
- `updatePageLanguage(lang)` - Update DOM

---

## 🆘 Troubleshooting

### **Problem: Language selector not visible**
**Solution:** Clear browser cache and hard refresh (Ctrl+F5)

### **Problem: Text not translating**
**Solution:** Open browser console (F12), check for errors

### **Problem: Language not persisting**
**Solution:** Check localStorage:
```javascript
console.log(localStorage.getItem('language'));
```

### **Problem: Wrong text showing**
**Solution:** Verify `data-key` attributes match translation keys

---

## 📚 Full Documentation

For complete details, see:
- 📄 **`LANGUAGE_SYSTEM_README.md`** - Full documentation
- 📄 **`IMPLEMENTATION_SUMMARY.md`** - Implementation details

---

## 🎯 Next Steps

### **To Add Language Switching to Other Pages:**

1. **Copy language selector HTML** from `index.html` navbar
2. **Add `data-key` attributes** to all translatable text
3. **Add translations** to `scripts/translations.js`
4. **Include scripts** before closing `</body>`:
   ```html
   <link rel="stylesheet" href="styles/language-switcher.css">
   <script src="scripts/translations.js"></script>
   <script src="scripts/language-switcher.js"></script>
   ```

### **To Add More Languages (e.g., French):**

1. Add flag emoji to selector:
   ```html
   <button class="lang-option" data-lang="fr">
       <span class="lang-option-flag">🇫🇷</span>
       <span class="lang-option-text">Français</span>
   </button>
   ```

2. Add translations to dictionary:
   ```javascript
   fr: {
       'hero.headline': 'Café Artisanal du Vietnam',
       // ... more translations
   }
   ```

---

## ✨ Features Summary

| Feature | Status |
|---------|--------|
| English Translation | ✅ Complete |
| Vietnamese Translation | ✅ Complete |
| Persistent Storage | ✅ localStorage |
| Instant Switching | ✅ No Reload |
| Mobile Responsive | ✅ Adaptive UI |
| Dark Mode Support | ✅ Compatible |
| Light Mode Support | ✅ Compatible |
| Keyboard Navigation | ✅ Full Support |
| Screen Reader | ✅ Accessible |
| Documentation | ✅ Complete |

---

## 🎉 You're All Set!

**The language switching system is ready to use!**

Just open `index.html` and click the language selector in the navbar.

Enjoy your bilingual website! 🇬🇧🇻🇳

---

## 💡 Tips

- **Bookmark this guide** for quick reference
- **Check console logs** for debugging (F12)
- **Test on multiple devices** for best UX
- **Read full docs** for advanced customization

---

**Questions?** See `LANGUAGE_SYSTEM_README.md` for detailed documentation.
