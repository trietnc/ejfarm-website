# EJ Farm Blog Page - Visual Preview

## 🎨 Page Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                        │
│  EJ Farm | Our Story | Our Process | Shop | [Blogs] | 🛒 ☀️  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                               │
│              📷 HERO SECTION (Full Width)                    │
│         [Coffee cherries background with overlay]            │
│                                                               │
│              "The EJ Farm Journal"                           │
│    Stories of tradition, craft, and community from...        │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────────────────────────────────────┐
│   SIDEBAR    │           BLOG POSTS GRID                    │
│              │                                              │
│ Categories   │  ┌──────────┬──────────┐                   │
│ ┌──────────┐ │  │          │          │                   │
│ │ Origin   │ │  │ FEATURED │          │                   │
│ │ Community│ │  │  POST    │  Post 2  │                   │
│ │ Craft    │ │  │ (Large)  │          │                   │
│ │ Culture  │ │  └──────────┴──────────┘                   │
│ │ Sustain. │ │  ┌──────────┬──────────┐                   │
│ │ Recipes  │ │  │          │          │                   │
│ └──────────┘ │  │  Post 3  │  Post 4  │                   │
│              │  │  (Tall)  │  (Wide)  │                   │
│ Recent Posts │  │          ├──────────┤                   │
│ ┌──────────┐ │  │          │  Post 5  │                   │
│ │ 📷 Title │ │  └──────────┴──────────┘                   │
│ │ 📷 Title │ │  ┌──────────┬──────────┐                   │
│ │ 📷 Title │ │  │  Post 6  │  Post 7  │                   │
│ │ 📷 Title │ │  │          │  (Tall)  │                   │
│ └──────────┘ │  └──────────┤          │                   │
│              │              │          │                   │
└──────────────┴──────────────┴──────────┴───────────────────┘

                    ← 1 2 3 4 →
                   [Pagination]

┌─────────────────────────────────────────────────────────────┐
│                         FOOTER                               │
│  Quick Links | Contact | Follow Us | © 2025 EJ Farm         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎭 Card Variations

### Featured Card (2x2):
```
┌────────────────────────────────┐
│                                │
│      [Large Image 800x600]     │
│                                │
├────────────────────────────────┤
│ 🏷️ THE CRAFT    📅 Nov 12      │
│                                │
│ The Perfect Pour: Mastering    │
│ Vietnamese Coffee Brewing      │
│                                │
│ Discover the ancient           │
│ techniques and modern...       │
│                                │
│ Read More →                    │
└────────────────────────────────┘
```

### Regular Card (1x1):
```
┌──────────────────┐
│                  │
│   [Image 250px]  │
│                  │
├──────────────────┤
│ 🏷️ ORIGIN 📅 Nov │
│                  │
│ The Magic of     │
│ Mo Nong's Soil   │
│                  │
│ What makes the   │
│ highlands...     │
│                  │
│ Read More →      │
└──────────────────┘
```

### Wide Card (2x1):
```
┌────────────────────────────────┐
│                                │
│      [Wide Image 640x250]      │
│                                │
├────────────────────────────────┤
│ 🏷️ COMMUNITY    📅 Nov 8       │
│                                │
│ Meet the Farmers Behind        │
│ Your Morning Cup               │
│                                │
│ Stories of dedication...       │
│                                │
│ Read More →                    │
└────────────────────────────────┘
```

---

## 🎨 Color Palette in Action

### Dark Mode (Default):
- **Background**: Deep charcoal (#0A0A0A)
- **Cards**: Slightly lighter (#171717)
- **Text**: Light gray (#F2F2F2)
- **Primary (Green)**: #9CCC9C
- **Accents**: Purple highlights
- **Borders**: Subtle gray (#474747)

### Light Mode:
- **Background**: Pure white (#FFFFFF)
- **Cards**: Off-white (#F7F7F7)
- **Text**: Dark gray (#262626)
- **Primary**: Darker green
- **Borders**: Light gray (#D9D9D9)

---

## ✨ Interactive Effects

### 1. Card Hover:
```
Before:           After:
┌────────┐       ┌────────┐
│ Image  │  →    │ Image  │ (zoomed 1.08x)
├────────┤       ├────────┤
│ Title  │       │ Title  │ (lifted -8px)
│ Text   │       │ Text   │ (shadow applied)
└────────┘       └────────┘
```

### 2. Scroll Animation:
```
Off-screen:       On-screen:
    ↓                ↓
[Invisible]  →  [Fade In + Slide Up]
opacity: 0      opacity: 1
y: +30px        y: 0px
                (0.6s ease)
```

### 3. Category Filter:
```
Click "Craft"
     ↓
Filter posts
     ↓
Hide others (fade out 0.3s)
     ↓
Show "Craft" posts (stagger 50ms each)
```

### 4. Parallax Hero:
```
Scroll Down
     ↓
Background moves slower (0.5x speed)
     ↓
Creates depth effect
```

---

## 📱 Responsive Behavior

### Desktop (1200px+):
- Sidebar: Fixed 300px width, sticky position
- Grid: 3-4 columns depending on card variants
- Featured cards span multiple grid cells
- Full hover effects enabled

### Tablet (768px - 992px):
- Sidebar: Horizontal grid above content
- Grid: 2-3 columns
- Reduced spacing
- Maintained hover effects

### Mobile (<768px):
- Sidebar: Single column, stacked
- Grid: Single column only
- All cards same size (no spanning)
- Hero height reduced to 50vh
- Touch-optimized targets (44px minimum)

---

## 🎯 User Journey

### 1. Landing:
```
User arrives → Hero with compelling title → Scroll down
```

### 2. Discovery:
```
Browse grid → See varied layouts → Attracted to visual hierarchy
```

### 3. Filtering:
```
Spot category of interest → Click sidebar → Posts filter instantly
```

### 4. Engagement:
```
Hover over card → See image zoom → Click anywhere on card
```

### 5. Navigation:
```
Read more posts → Use pagination → Smooth scroll to top
```

---

## 🎨 Typography Hierarchy

### Hero Section:
- **Title**: 64px (desktop), 40px (mobile)
- **Font**: Crimson Pro, Bold (700)
- **Color**: White with text shadow

### Card Titles:
- **Regular**: 24px (1.5rem)
- **Featured**: 32px (2rem)
- **Font**: Crimson Pro, Bold (700)
- **Line Height**: 1.3

### Body Text:
- **Excerpt**: 15px (0.9375rem)
- **Metadata**: 14px (0.875rem)
- **Font**: Inter, Regular (400)
- **Line Height**: 1.6

### Category Tags:
- **Size**: 12px (0.75rem)
- **Font**: Inter, Semi-bold (600)
- **Style**: Uppercase, letter-spacing 0.05em
- **Color**: Dark on green background

---

## 🎭 Animation Timeline

### Page Load:
```
0ms:    Hero fades in
100ms:  Card 1 appears
200ms:  Card 2 appears
300ms:  Card 3 appears
400ms:  Card 4 appears
500ms:  Card 5 appears
600ms:  Card 6 appears
...
```

### Scroll Trigger:
```
Card enters viewport (10% visible)
     ↓
Wait 50ms
     ↓
Fade in + Slide up (600ms ease)
     ↓
Stay visible (no reverse)
```

### Pagination Click:
```
Click page number
     ↓
Scroll to top (smooth, 800ms)
     ↓
Load new posts (instant)
     ↓
Trigger scroll animations again
```

---

## 🎨 Sidebar Details

### Categories Section:
```
┌─────────────────────────┐
│ Blog Categories          │ ← Green underline
├─────────────────────────┤
│ Our Origin          [8]  │ ← Hover: shift right
│ Community          [12]  │
│ The Craft          [15]  │ ← Active: green text
│ Culture & Heritage [10]  │
│ Sustainability      [9]  │
│ Recipes & Tips      [6]  │
└─────────────────────────┘
```

### Recent Posts:
```
┌─────────────────────────┐
│ Latest Stories           │
├─────────────────────────┤
│ [📷 60x60] Title here    │ ← Hover: image zoom
│            Nov 10, 2025  │
├─────────────────────────┤
│ [📷 60x60] Another post  │
│            Nov 8, 2025   │
└─────────────────────────┘
```

---

## 🔗 Navigation Integration

### Updated Nav Bar:
```
Old:                           New:
━━━━━━━━━━━━━━━━━━━━━━        ━━━━━━━━━━━━━━━━━━━━━━
Story | Process | Shop |  →   Story | Process | Shop |
Reviews | [Shop Coffee]       Blogs | [Shop Coffee]
```

### All Pages Updated:
✅ index.html
✅ storypage.html
✅ processpage.html
✅ collectionpage.html
✅ cart.html
✅ checkout.html
✅ order-confirmation.html

---

## 📊 Grid System Logic

### Auto-Fill Magic:
```css
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
```

**Behavior**:
- Container width: 1400px
- Minimum card width: 320px
- Maximum columns: 4 (1400 / 320 = 4.375)
- Cards grow to fill space equally
- Responsive without media queries

### Masonry Effect:
```css
grid-auto-flow: dense;
```

**Result**:
- Cards fill gaps intelligently
- No orphan white space
- Organic, magazine-like flow
- Featured/wide/tall cards create visual rhythm

---

## 🎨 Hover State Details

### Card Hover Transform:
```css
/* Before */
transform: translateY(0);
box-shadow: none;

/* After (0.3s ease) */
transform: translateY(-8px);
box-shadow: 0 12px 40px rgba(0,0,0,0.3);
```

### Image Zoom:
```css
/* Before */
img { transform: scale(1); }

/* After (0.4s ease) */
img { transform: scale(1.08); }
```

### Read More Arrow:
```css
/* Before */
.read-more { gap: 0.5rem; }
     Text →

/* After (0.3s ease) */
.read-more { gap: 0.75rem; }
     Text  →
```

---

## 🌟 Special Features

### 1. Intersection Observer:
- Watches when cards enter viewport
- Triggers once (no repeat on scroll up)
- Threshold: 10% visible
- Better performance than scroll listeners

### 2. Category Active State:
```javascript
Click category
  ↓
Remove 'active' from all links
  ↓
Add 'active' to clicked link
  ↓
Filter matching posts
  ↓
Animate filtered results
```

### 3. Sticky Sidebar:
```css
position: sticky;
top: 100px; /* Below navbar */
```
**Effect**: Sidebar follows scroll until bottom reached

---

This visual guide complements the technical README and provides designers and content creators with a clear understanding of the blog page structure and behavior.
