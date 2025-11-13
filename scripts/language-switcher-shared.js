// Shared Language Switcher Functions
// This file is used by all pages

function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

function updatePageLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (window.translations && window.translations[lang] && window.translations[lang][key]) {
            element.textContent = window.translations[lang][key];
        }
    });
    document.documentElement.setAttribute('lang', lang);
    updateLanguageSelectorDisplay(lang);
}

function updateLanguageSelectorDisplay(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        const btnLang = button.getAttribute('data-lang');
        if (btnLang === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function switchLanguage(lang) {
    setLanguage(lang);
    updatePageLanguage(lang);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    updatePageLanguage(currentLang);
    
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});
