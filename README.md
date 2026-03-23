# 🐍 SnakeCore: OOP Snake Game Engine

A modern web version of the classic Snake game built with OOP principles in JavaScript/React. Runs in the browser, works offline, and installs as a native app on any device.

**Built by [anointedthedeveloper](https://github.com/anointedthedeveloper)**

---

## Live Demo

[snakecore-jade.vercel.app](snakecore-jade.vercel.app)

---

## Features

- OOP architecture — `GameEngine`, `Snake`, and `Food` classes
- Neon retro theme rendered on HTML5 Canvas
- Score tracking with high score saved to localStorage
- Speed increases every 50 points
- Fully playable on desktop and mobile
- Progressive Web App — install to home screen, works offline
- SEO optimised with Open Graph, Twitter Card, and JSON-LD structured data

---

## Controls

| Platform | Control |
|----------|---------|
| Desktop | `WASD` or `Arrow Keys` to move |
| Desktop | `R` to restart, `Enter` / `Space` to start |
| Mobile | Swipe on the game board to change direction |
| Mobile | Tap the game board to start |
| Mobile | D-pad buttons below the canvas |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Rendering | HTML5 Canvas |
| Styling | Tailwind CSS |
| Build | Vite |
| PWA | vite-plugin-pwa + Workbox |
| Deployment | Vercel |

---

## Project Structure

```
snakecore/
├── public/
│   ├── icons/              # PNG + SVG app icons
│   └── manifest.json       # Static PWA manifest fallback
├── scripts/
│   └── gen-icons.mjs       # Generates PNG icons from SVG via sharp
├── src/
│   ├── components/game/
│   │   ├── GameCanvas.jsx      # Main layout, canvas, scaling
│   │   ├── GameHUD.jsx         # Score and high score display
│   │   ├── StartOverlay.jsx    # Start screen
│   │   ├── GameOverOverlay.jsx # Game over screen
│   │   ├── MobileControls.jsx  # D-pad for mobile
│   │   └── Footer.jsx          # Credit + project name
│   ├── hooks/
│   │   └── useSnakeGame.js     # Game loop, input, swipe, draw
│   ├── lib/
│   │   └── snakeGame.js        # OOP engine: GameEngine, Snake, Food
│   └── pages/
│       └── Home.jsx
├── index.html              # SEO, PWA meta, structured data
└── vite.config.js          # Vite + PWA plugin config
```

---

## OOP Design

```
GameEngine          manages game state, tick loop, score
  └── Snake         body segments, movement, growth, collision
  └── Food          random position, respawn logic
```

---

## Getting Started

```bash
npm install
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

### Regenerate PWA icons

```bash
npm run gen-icons
```

---

## Deployment

Push to GitHub and import on [vercel.com](https://vercel.com) — zero config needed. The `vercel.json` SPA rewrite rule is already included.

---

## Author

**anointedthedeveloper** — [github.com/anointedthedeveloper](https://github.com/anointedthedeveloper)
