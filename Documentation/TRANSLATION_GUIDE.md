# Translation System - EJ Farm Website

## Overview
All translation data has been moved to separate JavaScript files for easy management and future modifications.

## File Structure

### Translation Files (in `/scripts/` folder):
- **translations-index.js** - Translations for index.html (homepage)
- **translations-story.js** - Translations for storypage.html  
- **translations-process.js** - Translations for processpage.html
- **translations-collection.js** - Translations for collectionpage.html

### Shared Language Switcher:
- **language-switcher-shared.js** - Common language switching logic used by all pages

## How It Works

Each HTML page loads its specific translation file + the shared language switcher:

```html
<!-- Load translations and language switcher -->
<script src="scripts/translations-[pagename].js"></script>
<script src="scripts/language-switcher-shared.js"></script>
```

## Adding New Translations

### For Existing Pages:
1. Open the appropriate `translations-[pagename].js` file
2. Find the key in the `en:` section
3. Add the corresponding Vietnamese translation in the `vi:` section

Example:
```javascript
en: {
    'mykey': 'Hello World'
},
vi: {
    'mykey': 'Xin Chào Thế Giới'
}
```

### For New Content in HTML:
1. Add `data-key` attribute to the HTML element:
   ```html
   <h1 data-key="my.new.key">My New Heading</h1>
   ```

2. Add translations to the appropriate file:
   ```javascript
   en: {
       'my.new.key': 'My New Heading'
   },
   vi: {
       'my.new.key': 'Tiêu Đề Mới Của Tôi'
   }
   ```

3. **Automatic Translation**: The system will automatically switch the text when users click EN/VI buttons

## Current Translation Status

✅ **index.html** - COMPLETE (All content translated)
✅ **storypage.html** - COMPLETE (All content translated)
⏳ **processpage.html** - BASIC SETUP (Nav/Footer only - page content needs translation)
⏳ **collectionpage.html** - BASIC SETUP (Nav/Footer only - page content needs translation)

## Features

- **Persistent Language Selection**: User's language choice is saved in localStorage
- **Cross-Page Consistency**: Language selection persists across all pages
- **Easy Management**: All translations in one file per page
- **Auto-Translation**: No need to manually update HTML - just update the JS translation files

## Notes for Future Development

- Always use `data-key` attribute for translatable content
- Keep translation keys organized (use dot notation: `section.subsection.element`)
- Test both EN and VI after adding new translations
- The language switcher automatically handles all elements with `data-key` attributes
