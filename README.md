# StyleyeS

**Vivid Prompt Engineering for AI Image Generation**

StyleyeS is an interactive prompt engineering studio that helps you craft rich, descriptive prompts for AI image generators. Select from curated art styles, lighting controls, and color grading options, then combine them into a "recipe" that generates optimized prompts tailored to your target AI model.

## Features

### Multi-Model Support
Generate prompts optimized for popular AI image generators:
- **GPT-Image 1.5** — Natural language prompts
- **Midjourney** — CLI-style with parameters
- **FLUX** — Raw style formatting
- **Stable Diffusion** — Quality-focused prompts
- **Leonardo AI** — Image-to-image workflows
- **Qwen** — Clean descriptive prompts
- **Nano Banana Pro** — Detailed pro-quality output

### Curated Style Library
60+ professionally curated styles across 8 categories:
- **Photo** — Raw Realism, Studio Portrait, Street Documentary, Editorial Fashion, Macro, Landscape, Product, Food, Architecture, Wildlife
- **Cinematic** — Blockbuster Epic, Film Noir, Sci-Fi Dystopia, Wes Anderson, Horror, Period Drama, Indie Film, Action Thriller
- **Art** — Oil Painting, Watercolor, Art Nouveau, Impressionist, Surrealist, Pop Art, Ukiyo-e, Renaissance, Expressionist, Baroque
- **Digital** — Anime Cel, 3D Render, Pixel Art, Glitch Art, Vector Minimal, Vaporwave, Isometric, Concept Art
- **Mood** — Golden Hour, Neon Noir, Ethereal Dream, Dark Brooding, Misty Melancholy, Vibrant Energy
- **Texture** — Heavy Film Grain, Matte Editorial, Crisp Clarity, Soft Diffusion
- **Color** — Monochrome Drama, Cross Process, Desaturated Cine, Hyper Saturated, Pastel Soft, Earth Tones
- **Era** — 1950s Americana, 1970s Analog, 1980s Synthwave, 1990s Grunge, Y2K Futurism, Victorian Gothic

### Lighting & White Balance Controls
Fine-tune your prompts with professional lighting options:
- **White Balance** — Neutral 5600K, Cool 6500K, Warm 3200K, Magenta Tint
- **Anti-Cast** — Remove unwanted yellow or green color casts
- **Lighting Setups** — Overcast, Softbox, North Window, HMI Daylight, Rembrandt, Rim Light

### Recipe Stack System
- Combine up to 5 art styles and 3 lighting controls
- Adjust style and lighting intensity with weight sliders (1-10)
- Visual stack management with easy add/remove

### Aspect Ratio Selection
Visual ratio picker with common formats:
- 21:9 Cinema, 16:9 Wide, 3:2 Photo, 1:1 Square
- 2:3 Portrait, 4:5 Social, 9:16 Story

### Additional Features
- **Text & Image Modes** — Describe subjects or use reference images
- **Prompt History** — Auto-save copied prompts with timestamps
- **Favorites** — Star styles for quick access
- **Export/Import** — Backup and restore your settings, favorites, and history
- **Offline Support** — Full PWA with service worker caching
- **iOS Optimized** — Native-feeling experience on iPhone/iPad

## Installation

### Web Deployment
1. Clone the repository
2. Deploy to any static hosting (Netlify, Vercel, GitHub Pages, etc.)
3. Access via browser — works on desktop and mobile

### Progressive Web App
StyleyeS works as an installable PWA:
1. Visit the deployed site on mobile
2. Tap "Add to Home Screen" (iOS) or install prompt (Android)
3. Launch from home screen for full-screen experience

## Project Structure

```
StyleyeS/
├── index.html          # Main application
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline support
├── css/
│   ├── variables.css   # Design tokens & CSS custom properties
│   ├── base.css        # Reset, typography, form elements
│   ├── components.css  # UI components (cards, buttons, modals)
│   ├── layout.css      # Page structure & responsive grid
│   └── animations.css  # Keyframes & motion effects
├── js/
│   ├── config.js       # App configuration & model settings
│   ├── data.js         # Style & control definitions
│   ├── state.js        # State management & localStorage
│   ├── ui.js           # DOM rendering & updates
│   ├── handlers.js     # Event binding & user interactions
│   └── app.js          # Application initialization
└── icons/
    ├── favicon.svg     # Vector favicon
    ├── icon-*.png      # PWA icons (72-512px)
    ├── icon-maskable-*.png  # Maskable icons for Android
    └── apple-touch-icon-*.png  # iOS home screen icons
```

## Usage

1. **Enter a Subject** — Describe what you want to generate (e.g., "A lone astronaut on Mars")
2. **Select Target Model** — Choose your AI image generator
3. **Choose Aspect Ratio** — Pick the format for your image
4. **Build Your Recipe** — Tap styles and lighting controls to add them
5. **Adjust Weights** — Fine-tune style and lighting intensity
6. **Copy Prompt** — Click copy to use in your AI tool

## Technical Details

- **No Dependencies** — Pure vanilla JavaScript, no frameworks
- **Modular Architecture** — Separated concerns across config, data, state, UI, handlers
- **Responsive Design** — Mobile-first with breakpoints at 500px, 768px, 1024px, 1440px
- **Accessibility** — Reduced motion support, focus-visible states, semantic HTML
- **PWA Ready** — Manifest, service worker, offline caching, iOS standalone mode
- **State Persistence** — localStorage for favorites, history, and preferences

## Browser Support

- Chrome/Edge 88+
- Safari 14+
- Firefox 85+
- iOS Safari 14+

## Credits

**StyleyeS v1.5** by [VASEY/AI](https://vasey.ai)

## License

MIT License — See [LICENSE](LICENSE) for details
