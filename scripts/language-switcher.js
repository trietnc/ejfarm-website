// ===================================
// LANGUAGE SWITCHER FUNCTIONALITY
// ===================================

// Get current language from localStorage or default to 'en'
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Set language in localStorage
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    console.log(`Language changed to: ${lang === 'en' ? 'English 🇬🇧' : 'Tiếng Việt 🇻🇳'}`);
}

// Update all text content based on data-key attributes
function updatePageLanguage(lang) {
    console.log('=== UPDATE PAGE LANGUAGE ===');
    console.log('Target language:', lang);
    
    // Update all elements with data-key attribute
    const elements = document.querySelectorAll('[data-key]');
    console.log(`Found ${elements.length} elements with data-key attribute`);
    
    let updatedCount = 0;
    let missingCount = 0;
    
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        
        // Check if translation exists
        if (translations[lang] && translations[lang][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else if (element.hasAttribute('aria-label')) {
                element.setAttribute('aria-label', translations[lang][key]);
            } else {
                element.textContent = translations[lang][key];
            }
            updatedCount++;
        } else {
            console.warn(`Missing translation for key: "${key}" in language: ${lang}`);
            missingCount++;
        }
    });
    
    console.log(`✓ Updated ${updatedCount} elements`);
    if (missingCount > 0) {
        console.warn(`⚠ ${missingCount} translations missing`);
    }
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
    console.log(`✓ HTML lang attribute set to: ${lang}`);
    
    // Update language selector display
    updateLanguageSelectorDisplay(lang);
    console.log('✓ Language selector display updated');
}

// Update the language selector button display (for inline version)
function updateLanguageSelectorDisplay(lang) {
    // Update inline language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        const btnLang = button.getAttribute('data-lang');
        if (btnLang === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Legacy support: Update old dropdown if present
    const langCurrent = document.querySelector('.lang-current');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (langCurrent) {
        if (lang === 'en') {
            langCurrent.innerHTML = `
                <span class="lang-flag">🇬🇧</span>
                <span class="lang-text">English</span>
                <span class="lang-arrow">▼</span>
            `;
        } else {
            langCurrent.innerHTML = `
                <span class="lang-flag">🇻🇳</span>
                <span class="lang-text">Tiếng Việt</span>
                <span class="lang-arrow">▼</span>
            `;
        }
    }
    
    // Update active state in dropdown
    langOptions.forEach(option => {
        const optionLang = option.getAttribute('data-lang');
        if (optionLang === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Switch language when a language option is clicked
function switchLanguage(lang) {
    console.log('=== SWITCH LANGUAGE CALLED ===');
    console.log('Requested language:', lang);
    
    if (lang !== 'en' && lang !== 'vi') {
        console.error('Invalid language code. Use "en" or "vi".');
        return;
    }
    
    // Check if translations exist
    if (typeof translations === 'undefined') {
        console.error('ERROR: translations object is not defined!');
        return;
    }
    
    console.log('Translations object exists:', typeof translations);
    console.log('Available languages:', Object.keys(translations));
    
    if (!translations[lang]) {
        console.error(`ERROR: Language "${lang}" not found in translations!`);
        return;
    }
    
    console.log(`Language "${lang}" found with ${Object.keys(translations[lang]).length} keys`);
    
    setLanguage(lang);
    updatePageLanguage(lang);
    
    console.log('Language switched successfully!');
    
    // Close dropdown after selection
    const langSelector = document.querySelector('.lang-selector');
    if (langSelector) {
        langSelector.classList.remove('active');
    }
}

// Initialize language switcher
function initLanguageSwitcher() {
    console.log('=== INITIALIZING LANGUAGE SWITCHER ===');
    
    // Check if translations are loaded
    if (typeof translations === 'undefined') {
        console.error('CRITICAL ERROR: translations object not found! Make sure translations.js is loaded before language-switcher.js');
        return;
    }
    console.log('✓ Translations object loaded');
    
    const currentLang = getCurrentLanguage();
    console.log('Current language from localStorage:', currentLang);
    
    // Apply saved language on page load
    updatePageLanguage(currentLang);
    
    // Set up inline language buttons (new simple version)
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log(`Found ${langButtons.length} language buttons`);
    
    langButtons.forEach((button, index) => {
        const lang = button.getAttribute('data-lang');
        console.log(`Button ${index + 1}: ${lang}`);
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Language button clicked: ${lang}`);
            const selectedLang = button.getAttribute('data-lang');
            switchLanguage(selectedLang);
        });
    });
    
    // Legacy support: Set up dropdown if present
    const langSelector = document.querySelector('.lang-selector');
    const langDropdown = document.querySelector('.lang-dropdown');
    
    if (langSelector && langDropdown) {
        // Toggle dropdown on click
        langSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            langSelector.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langSelector.contains(e.target)) {
                langSelector.classList.remove('active');
            }
        });
    }
    
    // Set up language option buttons (dropdown version)
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = option.getAttribute('data-lang');
            switchLanguage(selectedLang);
        });
    });
    
    // Keyboard accessibility for dropdown
    if (langSelector) {
        langSelector.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                langSelector.classList.toggle('active');
            } else if (e.key === 'Escape') {
                langSelector.classList.remove('active');
            }
        });
    }
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
    initLanguageSwitcher();
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.switchLanguage = switchLanguage;
    window.getCurrentLanguage = getCurrentLanguage;
    window.updatePageLanguage = updatePageLanguage;
}
