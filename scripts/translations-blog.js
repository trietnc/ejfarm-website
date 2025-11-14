// ===================================
// BLOG PAGE TRANSLATIONS
// ===================================

const translations = {
    en: {
        // Navigation (shared)
        'nav.brand': 'EJ Farm',
        'nav.story': 'Our Story',
        'nav.process': 'Our Process',
        'nav.shop': 'Shop',
        'nav.blogs': 'Blogs',
        'nav.cta': 'Shop Coffee',

        // Blog Hero
        'blog.hero.title': 'The EJ Farm Journal',
        'blog.hero.subtitle': 'Stories of tradition, craft, and community from Vietnam\'s highlands',

        // Sidebar
        'blog.sidebar.categories': 'Blog Categories',
        'blog.sidebar.recent': 'Latest Stories',

        // Categories
        'blog.category.origin': 'Our Origin',
        'blog.category.community': 'Community',
        'blog.category.craft': 'The Craft',
        'blog.category.culture': 'Culture & Heritage',
        'blog.category.sustainability': 'Sustainability',
        'blog.category.recipes': 'Recipes & Tips',

        // Footer
        'footer.brand': 'EJ Farm',
        'footer.tagline': 'Artisan Coffee & Chocolate from Vietnam\'s Mo Nong Highlands',
        'footer.quicklinks': 'Quick Links',
        'footer.contact': 'Contact',
        'footer.follow': 'Follow Us',
        'footer.copyright': 'All rights reserved.'
    },
    vi: {
        // Navigation (shared)
        'nav.brand': 'EJ Farm',
        'nav.story': 'Câu Chuyện',
        'nav.process': 'Quy Trình',
        'nav.shop': 'Cửa Hàng',
        'nav.blogs': 'Blog',
        'nav.cta': 'Mua Cà Phê',

        // Blog Hero
        'blog.hero.title': 'Tạp Chí EJ Farm',
        'blog.hero.subtitle': 'Những câu chuyện về truyền thống, nghề thủ công và cộng đồng từ cao nguyên Việt Nam',

        // Sidebar
        'blog.sidebar.categories': 'Danh Mục Blog',
        'blog.sidebar.recent': 'Bài Viết Mới Nhất',

        // Categories
        'blog.category.origin': 'Nguồn Gốc',
        'blog.category.community': 'Cộng Đồng',
        'blog.category.craft': 'Nghề Thủ Công',
        'blog.category.culture': 'Văn Hóa & Di Sản',
        'blog.category.sustainability': 'Bền Vững',
        'blog.category.recipes': 'Công Thức & Mẹo',

        // Footer
        'footer.brand': 'EJ Farm',
        'footer.tagline': 'Cà Phê & Sô-cô-la Thủ Công từ Cao Nguyên Mo Nong, Việt Nam',
        'footer.quicklinks': 'Liên Kết Nhanh',
        'footer.contact': 'Liên Hệ',
        'footer.follow': 'Theo Dõi Chúng Tôi',
        'footer.copyright': 'Đã đăng ký bản quyền.'
    }
};

// ===================================
// TRANSLATION UTILITIES
// ===================================

// Get current language from localStorage or default to 'en'
function getCurrentLanguage() {
    return localStorage.getItem('preferredLanguage') || 'en';
}

// Apply translations to all elements with data-key attribute
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            // Check if element is an input with placeholder
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Initialize translations on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    applyTranslations(currentLang);
    
    // Update active language button
    updateActiveLanguageButton(currentLang);
});

// Update active language button styling
function updateActiveLanguageButton(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1.1)';
        } else {
            btn.style.opacity = '0.6';
            btn.style.transform = 'scale(1)';
        }
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, getCurrentLanguage, applyTranslations };
}
