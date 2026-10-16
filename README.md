# Little Things 🌿✨

> A Cozy 2D Platformer and Personal Confession Website

**Little Things** is a frontend-only interactive web game and personal letter reveal experience built with React, Vite, HTML Canvas 2D, and Vanilla CSS. Players guide an adorable cozy explorer through lavender meadows, collect warm cups of matcha and glowing stars, and discover a heartfelt handwritten confession letter at the end of the path.

---

## 🍵 Features

- **Cozy Visual Aesthetic**: Styled with a curated palette of lavender, purple, cream, pastel matcha green, and soft starlight gold.
- **Canvas 2D Platformer Engine**: Smooth 60 FPS physics with multi-layer parallax background, rounded platforms, animated bunny character with flowing matcha scarf, squash & stretch animations, and footstep particles.
- **10 Sweet Collectibles**: 5 Matcha Cups 🍵 and 5 Golden Stars ⭐ with animated steam, sparkling glows, and floating point popups.
- **Progress Tracking**: Real-time HUD showing matcha cups, stars, and total treasures found along the journey.
- **Celebratory Endpoint**: Cozy illuminated cottage with lantern arch and confetti fireworks upon completing the path.
- **Interactive Wax-Sealed Envelope**: Opens into an authentic paper-style modal with postal stamp decorations and handwritten script typography.
- **Zero-Dependency Synthesized Audio**: Built-in Web Audio API sound generator providing charming chimes for jumps, item collections, celebrations, and envelope rustles (includes instant mute/unmute toggle).
- **Responsive & Touch-Ready**: Full keyboard support (`A/D`, arrows, `W`, `Space`) and on-screen touch buttons for mobile devices.
- **Confession Letter Customization**: Simple in-code customization for personalizing the letter before sharing.
- **Static Hosting Ready**: Zero backend or database requirements; easily deployable to Vercel, GitHub Pages, or Netlify.

---

## 🎮 Controls

### Desktop Keyboard Controls
| Action | Key(s) |
| :--- | :--- |
| **Move Left** | `A` or `←` (Left Arrow) |
| **Move Right** | `D` or `→` (Right Arrow) |
| **Jump** | `W`, `↑` (Up Arrow), or `Space` |

### Mobile Touch Controls
- **◀ Button**: Move Left
- **▶ Button**: Move Right
- **JUMP Button**: Jump

---

## 💌 Personalizing Your Confession Letter

Before sharing the website with your special person, you can customize the letter text directly in `src/App.jsx`.

1. Open `src/App.jsx`.
2. Locate the comment section labeled:
   ```jsx
   /* ========================================================
      FR-18 & Section 12.4: EDIT YOUR CONFESSION LETTER HERE
      The project owner can easily update the text below!
      ======================================================== */
   ```
3. Update the salutation (e.g., `Dear You,`), the paragraphs, and the sign-off to express your own feelings.
4. Save the file and rebuild the app!

---

## 🛠️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- npm (comes with Node.js)

### Installation
```bash
# 1. Clone or extract the repository
cd "Little Things 2"

# 2. Install dependencies
npm install

# 3. Start the Vite local development server
npm run dev
```

Open your browser to the local URL (typically `http://localhost:5173`).

---

## 🚀 Building & Deploying to Vercel

### Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### Preview Production Build Locally
```bash
npm run preview
```

### Deploying to Vercel
1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/), click **Add New Project** and select your repository.
3. Configure the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.
5. Once deployment completes, your site will be live on your custom `.vercel.app` domain!

---

## 📋 Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Rendering**: HTML5 Canvas 2D
- **Styling**: Vanilla CSS3 (Custom design system, flexbox, CSS grid, keyframe animations)
- **Audio**: Web Audio API (Synthesizer)
- **FX**: Canvas Confetti
- **Typography**: Google Fonts (*Quicksand*, *Nunito*, *Caveat*)

---

*Made with love, warm matcha, and starlight.* 🍵✨
