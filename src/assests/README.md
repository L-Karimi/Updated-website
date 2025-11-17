# QXP Playful Sticker Pack

## Overview
This is the ECDE-first playful sticker and illustration system for QXP LMS. All assets are production-ready SVGs with token-based theming, WCAG 2.2 AA+ accessibility, and multi-language support.

## Structure

```
assets/
├── stickers/
│   ├── rewards/          # Achievement badges, stars, medals
│   ├── animals/          # Safari animals with friendly expressions
│   ├── school/           # School supplies and classroom items
│   ├── emotions/         # Facial expressions for feelings
│   └── nature/           # Natural elements (sun, trees, etc.)
├── manifests/
│   └── stickers.manifest.json  # Searchable metadata with i18n
└── README.md
```

## Design Principles

1. **Big & Bright** - Large tap targets (≥56×56px), bold contrast
2. **Token-Tintable** - Uses CSS variables for light/dark theme support
3. **Accessible** - Includes `<title>` and `<desc>` for screen readers
4. **Lightweight** - Clean SVG code, no embedded rasters
5. **Inclusive** - Represents diverse skin tones and abilities

## Using Stickers

### In React Components

```tsx
import RewardStar from './assets/stickers/rewards/reward_star_gold_fill_v1.svg';

function MyComponent() {
  return (
    <div className="theme-playful">
      <img src={RewardStar} alt="Gold Star" className="w-16 h-16" />
    </div>
  );
}
```

### With Theming

All stickers use these CSS custom properties:

- `--ink` - Primary text/stroke color
- `--accent` - Primary accent color
- `--accent-2` - Secondary accent color
- `--surface` - Background/surface color

Set the theme class on a parent element:

```tsx
<div className="theme-playful">
  {/* Stickers here will use playful theme colors */}
</div>
```

### Dark Mode Support

```tsx
<div className="theme-playful dark">
  {/* Stickers automatically adapt to dark mode */}
</div>
```

## Sticker Categories

### Rewards (3 stickers)
- Gold Star - Achievement reward
- Blue Ribbon - Merit badge
- Bronze Medal - 3rd place

### Animals (3 stickers)
- Happy Lion - Smiling with mane
- Calm Elephant - Gentle trunk & ears
- Curious Giraffe - Long neck with spots

### School Life (2 stickers)
- School Book - Open reading book
- Pencil - Writing instrument

### Emotions (2 stickers)
- Happy - Smiling face
- Proud - Confident expression

### Nature (1 sticker)
- Bright Sun - Cheerful sunny day

## Manifest System

The `stickers.manifest.json` file provides:

- **Searchable metadata** - Tags, categories, types
- **Multi-language labels** - English, Kiswahili, French, Arabic
- **RTL support flags** - For direction-sensitive icons
- **Age suitability** - ECDE, Primary, Secondary
- **Accessibility info** - Titles and descriptions

## Accessibility Features

1. **Semantic SVG** - Proper `role="img"` and `focusable="false"`
2. **Text alternatives** - `<title>` and `<desc>` elements
3. **Contrast ratios** - ≥3:1 for essential figure/ground
4. **No color-only meaning** - Always paired with shape/icon
5. **Reduced motion** - Respects user preferences

## Localization

All stickers have labels in:
- 🇬🇧 English (en)
- 🇰🇪 Kiswahili (sw)
- 🇫🇷 French (fr)
- 🇸🇦 Arabic (ar)

Access via manifest:
```js
const manifest = require('./manifests/stickers.manifest.json');
const starLabel = manifest.items[0].label.sw; // "Nyota ya Dhahabu"
```

## Technical Specifications

- **ViewBox:** 256×256 (rewards/animals/emotions), 24×24 (UI icons)
- **Stroke width:** 3px (stickers), 2.25px (icons)
- **Line caps:** Round
- **Line joins:** Round
- **Safe margins:** 8-12px internal padding
- **File size:** <2KB per sticker (optimized)

## Wave 1 Complete ✓

- ✓ 3 Reward stickers
- ✓ 3 Animal stickers  
- ✓ 2 School stickers
- ✓ 2 Emotion stickers
- ✓ 1 Nature sticker
- ✓ Manifest with full i18n
- ✓ Token-based theming
- ✓ WCAG 2.2 AA+ compliance

## Upcoming Waves

### Wave 2 - Alphabet & Numbers
- A-Z uppercase (26 stickers)
- a-z lowercase (26 stickers)
- 0-9 numbers (10 stickers)
- Math symbols (+, -, ×, ÷, =)

### Wave 3 - Shapes & Colors
- Basic shapes (circle, square, triangle, star, heart)
- Color swatches with labels
- Pattern stickers

### Wave 4 - Sports & ECA
- Football, netball, basketball
- Music notes, palette, camera
- Whistle, trophy, ribbon

### Wave 5 - Safety & Health
- Hand wash, mask, thermometer
- Bandage, nurse, doctor
- Safety symbols

## License

**QXP Internal Use Only**

These assets are proprietary to QXP LMS and are designed specifically for the ECDE Playful theme. Not for redistribution.

## Support

For questions or requests for new stickers, contact the QXP Design Team.

---

**Version:** 1.0.0  
**Last Updated:** November 5, 2025  
**Maintained by:** QXP Design Team
