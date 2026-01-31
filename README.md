# 🦦 OtterGuide

Comprehensive documentation and guide website for [OtterSpeak](https://otterspeak.com) - the AI-powered speech and reading practice platform.

**Live at:** [guide.otterspeak.com](https://guide.otterspeak.com)

## Features

- 📖 **Complete Documentation** - Covers all OtterSpeak features, modes, and settings
- 🌙 **Dark/Light Mode** - Toggle between themes with persistent preference
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight** - Built with vanilla HTML, CSS, and JavaScript
- 🎨 **Beautiful UI** - Modern design with smooth animations and icons

## Documentation Sections

1. **Getting Started** - Quick start guide for new users
2. **Reading Modes** - Detailed breakdown of all 6 modes:
   - Blink Mode (RSVP reading)
   - Click Mode (Self-paced)
   - Eye Track Mode (Visual tracking)
   - Psycho Mode (Extreme challenge)
   - Memory Mode (Memory training)
   - How2Speak Mode (Pronunciation)
3. **Features** - Core functionality:
   - OtterBrain AI
   - Energy System
   - Progression & XP
   - Rewards & Battlepass
   - Leaderboard
4. **Settings** - Customization options
5. **Plans & Pricing** - Subscription tiers
6. **FAQ** - Frequently asked questions

## Tech Stack

- HTML5
- CSS3 (Custom Properties for theming)
- Vanilla JavaScript (ES6+)
- [Lucide Icons](https://lucide.dev) - Beautiful open-source icons
- [Vite](https://vitejs.dev) - Build tool
- [Vercel](https://vercel.com) - Hosting

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Project Structure

```
otterguide/
├── index.html          # Main HTML file
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel deployment config
├── styles/
│   └── main.css        # All styles with dark/light themes
└── scripts/
    └── main.js         # JavaScript for interactivity
```

## Deployment

The site is configured for Vercel deployment:

1. Connect the `otterguide` folder to a Vercel project
2. Set the root directory to `otterguide`
3. Deploy!

Or deploy manually:

```bash
pnpm build
# Deploy the 'dist' folder to any static host
```

## Customization

### Changing Colors

Edit the CSS custom properties in `styles/main.css`:

```css
:root {
  --accent: #2dd4bf;        /* Primary accent color */
  --bg-deep: #0a0a0f;       /* Background color */
  --text-main: #f0f0f5;     /* Main text color */
  /* ... */
}
```

### Adding New Sections

1. Add HTML section in `index.html`
2. Add navigation link in header and sidebar
3. Update CSS if needed for new components

## License

Part of the OtterSpeak project. All rights reserved.

---

Made with 🦦 by the OtterSpeak team
