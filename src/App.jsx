import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

/* ==========================================================================
   SOUND SYSTEM (Web Audio API Synthesizer)
   Produces cozy, zero-latency sounds without external audio file dependencies
   ========================================================================== */
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playJump() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(540, t + 0.14);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.17);
    } catch {
      // Audio not permitted or interrupted
    }
  }

  playMatcha() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      // Warm dual-tone chime
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.04);
        gain.gain.setValueAtTime(0.15, t + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.04);
        osc.stop(t + idx * 0.04 + 0.36);
      });
    } catch { }
  }

  playStar() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      // Sparkly ascending chime
      [659.25, 830.61, 987.77, 1318.51].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.05);
        gain.gain.setValueAtTime(0.14, t + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 0.41);
      });
    } catch { }
  }

  playComplete() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const melody = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      melody.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.12);
        gain.gain.setValueAtTime(0.2, t + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.12);
        osc.stop(t + idx * 0.12 + 0.65);
      });
    } catch { }
  }

  playPaper() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.2);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.26);
    } catch { }
  }

  playWritingScratch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320 + Math.random() * 160, t);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.Q.setValueAtTime(2.5, t);

      gain.gain.setValueAtTime(0.015, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch { }
  }
}

const sfx = new SoundEffects();

/* ==========================================================================
   CONFESSION LETTER SECTIONS
   The personal letter content for Chae with real-time ink writing animation
   ========================================================================== */
const LETTER_SECTIONS = [
  { id: 'salutation', type: 'salutation', text: 'Hey Chae,' },
  {
    id: 'p1',
    type: 'p',
    text: "Our friendship means the world to me, and because we've become close, I want to be honest with you about something I've been feeling. Over the past few weeks, I've realized that my feelings for you have grown into something more than friendship."
  },
  {
    id: 'p2',
    type: 'p',
    text: "It started about three weeks ago. I remember hearing you talk to other people and noticing how approachable you are. Then I found out that you enjoy watching movies and traveling, and that you like matcha too hehe 😁. Those little things made me want to get to know you more, but as I got to know you, I realized that there's something I like even more than the things we have in common."
  },
  {
    id: 'p3',
    type: 'p',
    text: "It's you, Chae. I like you for who you are, for your personality, and for the little things that make you the person you are. I admire how soft-hearted you are, and I want you to know that I would always do my best to treat your feelings with care and respect."
  },
  {
    id: 'p4',
    type: 'p',
    text: "I know you've been through things in the past, and I don't want to make promises just for the sake of saying them. What I can promise is that I'll be honest with you, respect your feelings, and make an effort to understand you."
  },
  {
    id: 'p5',
    type: 'p',
    text: "I'm telling you this not because I expect you to feel the same way, but because I value you and wanted you to know how I genuinely feel. Whatever your answer may be, I'm grateful that I got the chance to know you. ❤️"
  }
];

/* ==========================================================================
   LEVEL CONFIGURATION
   Platforms, ground, and 10 total collectibles (5 matcha + 5 stars)
   World coordinates: width = 3800, height = 540
   ========================================================================== */
const INITIAL_COLLECTIBLES = [
  // 5 Matcha Cups
  { id: 'm1', type: 'matcha', x: 380, y: 330, collected: false },
  { id: 'm2', type: 'matcha', x: 1090, y: 260, collected: false },
  { id: 'm3', type: 'matcha', x: 1710, y: 280, collected: false },
  { id: 'm4', type: 'matcha', x: 2380, y: 150, collected: false },
  { id: 'm5', type: 'matcha', x: 2890, y: 310, collected: false },

  // 5 Glowing Stars
  { id: 's1', type: 'star', x: 720, y: 240, collected: false },
  { id: 's2', type: 'star', x: 1330, y: 180, collected: false },
  { id: 's3', type: 'star', x: 2020, y: 290, collected: false },
  { id: 's4', type: 'star', x: 2600, y: 240, collected: false },
  { id: 's5', type: 'star', x: 3180, y: 220, collected: false }
];

const PLATFORMS = [
  // Section 1: Starting & Matcha Meadow
  { x: 320, y: 390, w: 120, h: 22 },
  { x: 490, y: 320, w: 140, h: 22 },
  { x: 670, y: 290, w: 110, h: 22 },
  { x: 840, y: 360, w: 130, h: 22 },

  // Section 2: Lavender Steps
  { x: 1040, y: 320, w: 120, h: 22 },
  { x: 1230, y: 230, w: 130, h: 22 },
  { x: 1420, y: 290, w: 140, h: 22 },
  { x: 1640, y: 340, w: 130, h: 22 },

  // Section 3: Starlight Canopy & Tree Perches
  { x: 1850, y: 370, w: 120, h: 22 },
  { x: 1970, y: 340, w: 110, h: 22 },
  { x: 2140, y: 270, w: 150, h: 22 },
  { x: 2320, y: 200, w: 130, h: 22 },
  { x: 2530, y: 300, w: 140, h: 22 },

  // Section 4: Sunset Haven & Cottage Approach
  { x: 2740, y: 370, w: 130, h: 22 },
  { x: 2840, y: 360, w: 110, h: 22 },
  { x: 3020, y: 300, w: 140, h: 22 },
  { x: 3140, y: 270, w: 110, h: 22 },
  { x: 3310, y: 380, w: 120, h: 22 },
];

const GROUND_Y = 460;
const LEVEL_ENDPOINT_X = 3520;
const WORLD_WIDTH = 3780;

export default function App() {
  // Screen state: 'title' | 'game' | 'complete'
  const [screen, setScreen] = useState('title');
  const [letterOpen, setLetterOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  // Real-time Writing Animation State
  const [writingProgress, setWritingProgress] = useState({
    sectionIndex: 0,
    charIndex: 0,
    isComplete: false
  });
  const letterBodyRef = useRef(null);
  const penNibRef = useRef(null);

  // Collectibles state
  const [collectibles, setCollectibles] = useState(INITIAL_COLLECTIBLES);

  // Canvas and game loop refs
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  // In-memory gameplay state
  const gameStateRef = useRef({
    player: {
      x: 100,
      y: GROUND_Y - 44,
      w: 36,
      h: 44,
      vx: 0,
      vy: 0,
      isGrounded: true,
      facing: 1, // 1 for right, -1 for left
      runFrame: 0,
      blinkTimer: 0,
      isBlinking: false
    },
    camera: { x: 0 },
    keys: {
      left: false,
      right: false,
      jump: false
    },
    particles: [],
    floatingTexts: [],
    clouds: [
      { x: 50, y: 60, speed: 0.2, scale: 1 },
      { x: 380, y: 110, speed: 0.15, scale: 0.8 },
      { x: 750, y: 45, speed: 0.25, scale: 1.2 },
      { x: 1200, y: 80, speed: 0.18, scale: 0.9 },
      { x: 1650, y: 55, speed: 0.22, scale: 1.1 },
      { x: 2100, y: 100, speed: 0.16, scale: 0.85 },
      { x: 2600, y: 65, speed: 0.24, scale: 1.05 },
      { x: 3100, y: 90, speed: 0.19, scale: 0.95 },
    ],
    fireflies: Array.from({ length: 45 }, () => ({
      x: Math.random() * WORLD_WIDTH,
      y: 200 + Math.random() * 240,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
      size: 1.5 + Math.random() * 2
    })),
    coyoteTimer: 0,
    jumpBuffer: 0
  });

  // Calculate scores
  const totalCollected = collectibles.filter((c) => c.collected).length;
  const matchaCollected = collectibles.filter((c) => c.collected && c.type === 'matcha').length;
  const starsCollected = collectibles.filter((c) => c.collected && c.type === 'star').length;

  // Toggle sound
  const toggleSound = () => {
    sfx.enabled = !soundOn;
    setSoundOn(!soundOn);
  };

  // Launch celebration confetti
  const triggerCelebrationConfetti = () => {
    try {
      const colors = ['#b8a8e8', '#ffd166', '#a4cc8e', '#f7a8b8', '#ffffff'];
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        });
      }, 300);
    } catch { }
  };

  // Open Letter and start writing animation
  const handleOpenLetter = () => {
    sfx.playPaper();
    triggerCelebrationConfetti();
    setWritingProgress({
      sectionIndex: 0,
      charIndex: 0,
      isComplete: false
    });
    setLetterOpen(true);
  };

  // Replay writing animation from start
  const replayWriting = () => {
    setWritingProgress({
      sectionIndex: 0,
      charIndex: 0,
      isComplete: false
    });
    if (letterBodyRef.current) {
      letterBodyRef.current.scrollTop = 0;
    }
  };

  // Writing Animation Effect
  useEffect(() => {
    if (!letterOpen || writingProgress.isComplete) return;

    const currentSection = LETTER_SECTIONS[writingProgress.sectionIndex];
    if (!currentSection) {
      setWritingProgress((prev) => ({ ...prev, isComplete: true }));
      return;
    }

    // Determine speed and punctuation pauses (brisk and natural)
    let delay = 9;
    if (writingProgress.charIndex < currentSection.text.length) {
      const char = currentSection.text[writingProgress.charIndex];
      if (char === ',') delay = 40;
      else if (char === '.' || char === '!' || char === '?' || char === '😁') delay = 75;
      else if (char === ' ') delay = 12;
    } else {
      // Pause between paragraphs
      delay = 110;
    }

    const timer = setTimeout(() => {
      if (writingProgress.charIndex < currentSection.text.length) {
        setWritingProgress((prev) => ({
          ...prev,
          charIndex: prev.charIndex + 1
        }));

        if (writingProgress.charIndex % 10 === 0) {
          sfx.playWritingScratch();
        }

        // Smooth auto-scroll as lines appear
        if (letterBodyRef.current) {
          letterBodyRef.current.scrollTop = letterBodyRef.current.scrollHeight;
        }
      } else {
        if (writingProgress.sectionIndex < LETTER_SECTIONS.length - 1) {
          setWritingProgress((prev) => ({
            ...prev,
            sectionIndex: prev.sectionIndex + 1,
            charIndex: 0
          }));
        } else {
          setWritingProgress((prev) => ({ ...prev, isComplete: true }));
          triggerCelebrationConfetti();
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [letterOpen, writingProgress]);

  // Reset/Restart Game
  const startNewGame = useCallback(() => {
    setCollectibles(INITIAL_COLLECTIBLES.map((c) => ({ ...c, collected: false })));
    gameStateRef.current.player = {
      x: 100,
      y: GROUND_Y - 44,
      w: 36,
      h: 44,
      vx: 0,
      vy: 0,
      isGrounded: true,
      facing: 1,
      runFrame: 0,
      blinkTimer: 0,
      isBlinking: false
    };
    gameStateRef.current.camera = { x: 0 };
    gameStateRef.current.particles = [];
    gameStateRef.current.floatingTexts = [];
    setLetterOpen(false);
    setScreen('game');
  }, []);

  // Keyboard controls handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (screen !== 'game') return;

      const key = e.key.toLowerCase();
      if (key === 'a' || key === 'arrowleft') {
        gameStateRef.current.keys.left = true;
      }
      if (key === 'd' || key === 'arrowright') {
        gameStateRef.current.keys.right = true;
      }
      if (key === 'w' || key === 'arrowup' || key === ' ') {
        e.preventDefault(); // Prevent page scroll
        gameStateRef.current.keys.jump = true;
        gameStateRef.current.jumpBuffer = 6;
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'a' || key === 'arrowleft') {
        gameStateRef.current.keys.left = false;
      }
      if (key === 'd' || key === 'arrowright') {
        gameStateRef.current.keys.right = false;
      }
      if (key === 'w' || key === 'arrowup' || key === ' ') {
        gameStateRef.current.keys.jump = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [screen]);

  // Touch control handlers
  const handleTouchStart = (action) => {
    if (action === 'left') gameStateRef.current.keys.left = true;
    if (action === 'right') gameStateRef.current.keys.right = true;
    if (action === 'jump') {
      gameStateRef.current.keys.jump = true;
      gameStateRef.current.jumpBuffer = 6;
    }
  };

  const handleTouchEnd = (action) => {
    if (action === 'left') gameStateRef.current.keys.left = false;
    if (action === 'right') gameStateRef.current.keys.right = false;
    if (action === 'jump') gameStateRef.current.keys.jump = false;
  };

  // Main Canvas Game Loop
  useEffect(() => {
    if (screen !== 'game') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set internal resolution
    canvas.width = 960;
    canvas.height = 540;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const state = gameStateRef.current;
      const { player, camera, keys, particles, floatingTexts } = state;

      // ----------------------------------------------------
      // 1. UPDATE PHYSICS & PLAYER
      // ----------------------------------------------------
      const accel = 1.1;
      const maxSpeed = 5.2;
      const friction = 0.82;
      const gravity = 0.54;

      if (keys.left) {
        player.vx -= accel;
        player.facing = -1;
      }
      if (keys.right) {
        player.vx += accel;
        player.facing = 1;
      }
      if (!keys.left && !keys.right) {
        player.vx *= friction;
        if (Math.abs(player.vx) < 0.1) player.vx = 0;
      }
      player.vx = Math.max(-maxSpeed, Math.min(maxSpeed, player.vx));

      // Gravity & Vertical movement
      player.vy += gravity;
      if (player.vy > 12) player.vy = 12;

      // Coyote time & Jump buffering
      if (player.isGrounded) {
        state.coyoteTimer = 7;
      } else if (state.coyoteTimer > 0) {
        state.coyoteTimer--;
      }

      if (state.jumpBuffer > 0) {
        state.jumpBuffer--;
        if (state.coyoteTimer > 0) {
          player.vy = -12.4;
          player.isGrounded = false;
          state.coyoteTimer = 0;
          state.jumpBuffer = 0;
          sfx.playJump();

          // Jump dust puff
          for (let i = 0; i < 5; i++) {
            particles.push({
              x: player.x + player.w / 2 + (Math.random() - 0.5) * 16,
              y: player.y + player.h,
              vx: (Math.random() - 0.5) * 2,
              vy: -Math.random() * 1.5,
              alpha: 0.8,
              color: '#d6cce8',
              size: 3 + Math.random() * 2
            });
          }
        }
      }

      // Variable jump height (releasing jump button cuts jump short)
      if (!keys.jump && player.vy < -4) {
        player.vy *= 0.88;
      }

      // Tentative next position
      const nextX = player.x + player.vx;
      const nextY = player.y + player.vy;

      // Horizontal boundaries
      if (nextX < 20) {
        player.x = 20;
        player.vx = 0;
      } else if (nextX > WORLD_WIDTH - 60) {
        player.x = WORLD_WIDTH - 60;
        player.vx = 0;
      } else {
        player.x = nextX;
      }

      // Platform collision
      let groundedThisFrame = false;

      // Check ground collision
      if (nextY + player.h >= GROUND_Y) {
        player.y = GROUND_Y - player.h;
        player.vy = 0;
        groundedThisFrame = true;
      } else {
        // Check solid platform landings (landing from above)
        for (const plat of PLATFORMS) {
          const isAbovePlat = player.y + player.h <= plat.y + 8;
          const willLandOnPlat = nextY + player.h >= plat.y && nextY + player.h <= plat.y + plat.h + 8;
          const withinPlatX = player.x + player.w > plat.x && player.x < plat.x + plat.w;

          if (isAbovePlat && willLandOnPlat && withinPlatX && player.vy >= 0) {
            player.y = plat.y - player.h;
            player.vy = 0;
            groundedThisFrame = true;
            break;
          }
        }
        if (!groundedThisFrame) {
          player.y = nextY;
        }
      }

      player.isGrounded = groundedThisFrame;

      // Run animation & blink timer
      if (Math.abs(player.vx) > 0.4 && player.isGrounded) {
        player.runFrame += 0.22;
        if (Math.random() < 0.2) {
          particles.push({
            x: player.x + player.w / 2 - player.facing * 10,
            y: player.y + player.h,
            vx: -player.facing * (0.8 + Math.random()),
            vy: -Math.random() * 1.2,
            alpha: 0.6,
            color: '#e2d8f0',
            size: 2.5
          });
        }
      } else {
        player.runFrame = 0;
      }

      player.blinkTimer++;
      if (player.blinkTimer > 180) {
        player.isBlinking = true;
        if (player.blinkTimer > 192) {
          player.isBlinking = false;
          player.blinkTimer = 0;
        }
      }

      // Camera Lerp
      const targetCamX = player.x - 300;
      const minCamX = 0;
      const maxCamX = WORLD_WIDTH - 960;
      const clampedCamX = Math.max(minCamX, Math.min(maxCamX, targetCamX));
      camera.x += (clampedCamX - camera.x) * 0.08;

      // ----------------------------------------------------
      // 2. CHECK COLLECTIBLE COLLISIONS
      // ----------------------------------------------------
      collectibles.forEach((item) => {
        if (!item.collected) {
          const dist = Math.hypot(
            (player.x + player.w / 2) - item.x,
            (player.y + player.h / 2) - item.y
          );
          if (dist < 32) {
            // Collect item!
            item.collected = true;
            setCollectibles([...collectibles]);

            if (item.type === 'matcha') {
              sfx.playMatcha();
              floatingTexts.push({
                x: item.x,
                y: item.y - 10,
                text: '+1 Matcha! 🍵',
                color: '#4d733c',
                alpha: 1,
                vy: -1.2
              });
              // Matcha splash particles
              for (let i = 0; i < 14; i++) {
                particles.push({
                  x: item.x,
                  y: item.y,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 4,
                  alpha: 1,
                  color: ['#a4cc8e', '#75a75d', '#dbeef0', '#ffffff'][i % 4],
                  size: 3 + Math.random() * 3
                });
              }
            } else {
              sfx.playStar();
              floatingTexts.push({
                x: item.x,
                y: item.y - 10,
                text: '+1 Star! ⭐',
                color: '#d48806',
                alpha: 1,
                vy: -1.2
              });
              // Star sparkle particles
              for (let i = 0; i < 16; i++) {
                particles.push({
                  x: item.x,
                  y: item.y,
                  vx: (Math.random() - 0.5) * 4.5,
                  vy: (Math.random() - 0.5) * 4.5,
                  alpha: 1,
                  color: ['#ffd166', '#fff3b0', '#ffbe3b', '#ffffff'][i % 4],
                  size: 3 + Math.random() * 3
                });
              }
            }
          }
        }
      });

      // ----------------------------------------------------
      // 3. CHECK LEVEL ENDPOINT REACHED
      // ----------------------------------------------------
      if (player.x >= LEVEL_ENDPOINT_X) {
        isRunning = false;
        sfx.playComplete();
        triggerCelebrationConfetti();
        setScreen('complete');
        return;
      }

      // ----------------------------------------------------
      // 4. DRAWING ROUTINE
      // ----------------------------------------------------
      ctx.clearRect(0, 0, 960, 540);

      // A. Sky Gradient (Twilight Lavender to Soft Peach/Night)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 540);
      skyGrad.addColorStop(0, '#2d1f47');
      skyGrad.addColorStop(0.5, '#4b3570');
      skyGrad.addColorStop(0.85, '#765696');
      skyGrad.addColorStop(1, '#a682b8');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, 960, 540);

      // B. Crescent Moon & Background Stars (Fixed / slight parallax)
      ctx.save();
      ctx.fillStyle = 'rgba(255, 248, 220, 0.9)';
      ctx.shadowColor = '#ffeaa7';
      ctx.shadowBlur = 18;
      // Soft crescent moon
      ctx.beginPath();
      ctx.arc(820, 90, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#3a275a';
      ctx.beginPath();
      ctx.arc(810, 84, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Fluffy Drifting Pastel Clouds
      ctx.fillStyle = 'rgba(240, 230, 255, 0.28)';
      state.clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x > WORLD_WIDTH) cloud.x = -150;
        const screenCloudX = cloud.x - camera.x * 0.2;
        if (screenCloudX > -200 && screenCloudX < 1160) {
          ctx.beginPath();
          ctx.arc(screenCloudX, cloud.y, 28 * cloud.scale, 0, Math.PI * 2);
          ctx.arc(screenCloudX + 25 * cloud.scale, cloud.y - 10 * cloud.scale, 32 * cloud.scale, 0, Math.PI * 2);
          ctx.arc(screenCloudX + 55 * cloud.scale, cloud.y, 26 * cloud.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // C. Far Background Hills (Parallax: 0.15)
      ctx.fillStyle = '#513b73';
      ctx.beginPath();
      ctx.moveTo(-50, 540);
      for (let x = -50; x <= 1010; x += 100) {
        const worldX = x + camera.x * 0.15;
        const hillY = 320 + Math.sin(worldX * 0.003) * 60 + Math.cos(worldX * 0.007) * 30;
        ctx.lineTo(x, hillY);
      }
      ctx.lineTo(1010, 540);
      ctx.closePath();
      ctx.fill();

      // D. Midground Rolling Lavender Meadows (Parallax: 0.4)
      ctx.fillStyle = '#674d8d';
      ctx.beginPath();
      ctx.moveTo(-50, 540);
      for (let x = -50; x <= 1010; x += 80) {
        const worldX = x + camera.x * 0.4;
        const meadowY = 380 + Math.sin(worldX * 0.004) * 45;
        ctx.lineTo(x, meadowY);
      }
      ctx.lineTo(1010, 540);
      ctx.closePath();
      ctx.fill();

      // Whimsical Pastel Trees in Midground
      for (let tx = 200; tx < WORLD_WIDTH; tx += 450) {
        const screenTx = tx - camera.x * 0.4;
        if (screenTx > -80 && screenTx < 1040) {
          ctx.fillStyle = '#4c356b';
          ctx.fillRect(screenTx - 5, 360, 10, 60);
          ctx.fillStyle = '#7d5f9e';
          ctx.beginPath();
          ctx.arc(screenTx, 340, 28, 0, Math.PI * 2);
          ctx.arc(screenTx - 16, 350, 20, 0, Math.PI * 2);
          ctx.arc(screenTx + 16, 350, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // E. Foreground Camera Space
      ctx.save();
      ctx.translate(-camera.x, 0);

      // Main Ground Base (y = 460 to 540)
      const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, 540);
      groundGrad.addColorStop(0, '#563e75');
      groundGrad.addColorStop(0.12, '#483463');
      groundGrad.addColorStop(1, '#2c1e40');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, GROUND_Y, WORLD_WIDTH, 540 - GROUND_Y);

      // Lush Grassy Top Rim of Ground
      ctx.fillStyle = '#8cb369';
      ctx.fillRect(0, GROUND_Y, WORLD_WIDTH, 8);
      // Soft grassy tufts
      ctx.fillStyle = '#a4cc8e';
      for (let gx = 0; gx < WORLD_WIDTH; gx += 32) {
        ctx.beginPath();
        ctx.arc(gx + 16, GROUND_Y, 4, Math.PI, 0);
        ctx.fill();
      }

      // Lavender sprigs and flowers along the path
      for (let fx = 60; fx < WORLD_WIDTH - 200; fx += 85) {
        ctx.fillStyle = '#9d84dd';
        ctx.fillRect(fx, GROUND_Y - 14, 2, 14);
        ctx.beginPath();
        ctx.arc(fx + 1, GROUND_Y - 14, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(fx + 1, GROUND_Y - 14, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Starting Area Sign
      ctx.fillStyle = '#8b6f4e';
      ctx.fillRect(140, GROUND_Y - 40, 8, 40);
      ctx.fillStyle = '#f5efe4';
      ctx.strokeStyle = '#c2b39b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(100, GROUND_Y - 75, 88, 36, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#4a3875';
      ctx.font = 'bold 11px Quicksand, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Start Path 🌿', 144, GROUND_Y - 52);

      // Platforms Drawing
      PLATFORMS.forEach((plat) => {
        // Platform Shadow
        ctx.fillStyle = 'rgba(25, 15, 38, 0.35)';
        ctx.beginPath();
        ctx.roundRect(plat.x + 3, plat.y + 4, plat.w, plat.h, 10);
        ctx.fill();

        // Platform Wood/Stone Base
        const platGrad = ctx.createLinearGradient(0, plat.y, 0, plat.y + plat.h);
        platGrad.addColorStop(0, '#755894');
        platGrad.addColorStop(1, '#533c6e');
        ctx.fillStyle = platGrad;
        ctx.beginPath();
        ctx.roundRect(plat.x, plat.y, plat.w, plat.h, 8);
        ctx.fill();

        // Platform Lush Grass Top
        ctx.fillStyle = '#8cb369';
        ctx.fillRect(plat.x, plat.y, plat.w, 6);
        ctx.fillStyle = '#a4cc8e';
        for (let px = plat.x + 6; px < plat.x + plat.w - 6; px += 14) {
          ctx.beginPath();
          ctx.arc(px, plat.y, 3, Math.PI, 0);
          ctx.fill();
        }

        // Hanging cozy flower vine
        ctx.fillStyle = '#a4cc8e';
        ctx.fillRect(plat.x + 12, plat.y + plat.h, 2, 8);
        ctx.fillStyle = '#f7a8b8';
        ctx.beginPath();
        ctx.arc(plat.x + 13, plat.y + plat.h + 8, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Destination: Cozy Cottage & Warm Light (x: 3480 to 3720)
      // Warm glowing cottage base
      const cottageX = 3520;
      // Ambient glow from windows & door
      ctx.save();
      ctx.shadowColor = '#ffd166';
      ctx.shadowBlur = 35;
      ctx.fillStyle = 'rgba(255, 230, 160, 0.4)';
      ctx.beginPath();
      ctx.arc(cottageX + 90, GROUND_Y - 60, 90, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Cottage Walls
      ctx.fillStyle = '#ece4d4';
      ctx.strokeStyle = '#c4b59d';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cottageX + 20, GROUND_Y - 120, 140, 120, 8);
      ctx.fill();
      ctx.stroke();

      // Roof (Pastel Purple & Cream Shingles)
      ctx.fillStyle = '#7a5e99';
      ctx.beginPath();
      ctx.moveTo(cottageX, GROUND_Y - 110);
      ctx.lineTo(cottageX + 90, GROUND_Y - 180);
      ctx.lineTo(cottageX + 180, GROUND_Y - 110);
      ctx.closePath();
      ctx.fill();

      // Chimney & Puffs of Smoke
      ctx.fillStyle = '#9b7e68';
      ctx.fillRect(cottageX + 120, GROUND_Y - 190, 22, 50);
      const smokeOffset = (Date.now() / 400) % 20;
      ctx.fillStyle = 'rgba(255, 250, 240, 0.6)';
      ctx.beginPath();
      ctx.arc(cottageX + 131, GROUND_Y - 195 - smokeOffset, 8, 0, Math.PI * 2);
      ctx.arc(cottageX + 136, GROUND_Y - 210 - smokeOffset, 12, 0, Math.PI * 2);
      ctx.fill();

      // Warm Glowing Doorway & Windows
      ctx.fillStyle = '#ffdf7a';
      ctx.beginPath();
      ctx.roundRect(cottageX + 65, GROUND_Y - 70, 36, 70, [18, 18, 0, 0]);
      ctx.fill();

      // Windows with curtains
      ctx.fillStyle = '#ffea9f';
      ctx.fillRect(cottageX + 115, GROUND_Y - 95, 30, 30);
      ctx.strokeStyle = '#856448';
      ctx.lineWidth = 2;
      ctx.strokeRect(cottageX + 115, GROUND_Y - 95, 30, 30);

      // Floral Arch & Fairy Lanterns
      ctx.strokeStyle = '#6b9351';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cottageX - 20, GROUND_Y - 50, 50, Math.PI, 0);
      ctx.stroke();

      // Lantern on Arch
      ctx.fillStyle = '#ffd166';
      ctx.shadowColor = '#ffd166';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(cottageX - 20, GROUND_Y - 80, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Endpoint Sign
      ctx.fillStyle = '#8b6f4e';
      ctx.fillRect(cottageX - 70, GROUND_Y - 45, 6, 45);
      ctx.fillStyle = '#fffdf7';
      ctx.strokeStyle = '#d4c5b0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cottageX - 110, GROUND_Y - 85, 86, 40, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#7a3e50';
      ctx.font = 'bold 12px Quicksand, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Destination ✨', cottageX - 67, GROUND_Y - 60);

      // F. Collectibles Drawing
      const timeMs = Date.now();
      collectibles.forEach((item) => {
        if (!item.collected) {
          const bob = Math.sin(timeMs / 250 + item.x) * 4;
          const curY = item.y + bob;

          if (item.type === 'matcha') {
            // MATCHA CUP
            // Glow
            ctx.save();
            ctx.shadowColor = 'rgba(164, 204, 142, 0.7)';
            ctx.shadowBlur = 16;

            // Cup body
            ctx.fillStyle = '#75a75d';
            ctx.beginPath();
            ctx.arc(item.x, curY + 6, 12, 0, Math.PI);
            ctx.lineTo(item.x - 12, curY);
            ctx.lineTo(item.x + 12, curY);
            ctx.closePath();
            ctx.fill();

            // Cup Rim
            ctx.fillStyle = '#5c8a46';
            ctx.beginPath();
            ctx.ellipse(item.x, curY, 12, 4, 0, 0, Math.PI * 2);
            ctx.fill();

            // Matcha Foam
            ctx.fillStyle = '#c8e8b7';
            ctx.beginPath();
            ctx.ellipse(item.x, curY - 0.5, 10, 3, 0, 0, Math.PI * 2);
            ctx.fill();

            // Latte Art Heart
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 8px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('💚', item.x, curY + 2);

            // Handle
            ctx.strokeStyle = '#5c8a46';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(item.x + 13, curY + 4, 5, -Math.PI / 2, Math.PI / 2);
            ctx.stroke();

            // Rising Steam
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            const steamT = (timeMs / 300) % Math.PI;
            ctx.moveTo(item.x - 4, curY - 5);
            ctx.quadraticCurveTo(item.x - 2 + Math.sin(steamT) * 3, curY - 14, item.x - 4, curY - 20);
            ctx.moveTo(item.x + 4, curY - 5);
            ctx.quadraticCurveTo(item.x + 6 + Math.cos(steamT) * 3, curY - 14, item.x + 4, curY - 20);
            ctx.stroke();

            ctx.restore();
          } else {
            // GOLDEN GLOWING STAR
            ctx.save();
            ctx.shadowColor = '#ffd166';
            ctx.shadowBlur = 18;
            ctx.translate(item.x, curY);
            ctx.rotate(timeMs / 1000);

            ctx.fillStyle = '#ffbe3b';
            ctx.beginPath();
            const spikes = 5;
            const outerR = 14;
            const innerR = 7;
            for (let i = 0; i < spikes * 2; i++) {
              const r = i % 2 === 0 ? outerR : innerR;
              const angle = (i * Math.PI) / spikes;
              const sx = Math.cos(angle) * r;
              const sy = Math.sin(angle) * r;
              if (i === 0) ctx.moveTo(sx, sy);
              else ctx.lineTo(sx, sy);
            }
            ctx.closePath();
            ctx.fill();

            // Star Center Shine
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, 0, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
          }
        }
      });

      // G. Player Character (Adorable Bunny Spirit)
      ctx.save();
      ctx.translate(player.x + player.w / 2, player.y + player.h / 2);
      ctx.scale(player.facing, 1);

      // Squash and stretch
      let scaleX = 1;
      let scaleY = 1;
      if (!player.isGrounded) {
        scaleX = 0.9;
        scaleY = 1.12; // stretch in air
      } else if (Math.abs(player.vx) > 0.4) {
        const bounce = Math.sin(player.runFrame * Math.PI * 2) * 0.08;
        scaleX = 1 + bounce;
        scaleY = 1 - bounce;
      }
      ctx.scale(scaleX, scaleY);

      const px = -player.w / 2;
      const py = -player.h / 2;

      // Character Shadow on ground/platform
      ctx.fillStyle = 'rgba(25, 15, 38, 0.25)';
      ctx.beginPath();
      ctx.ellipse(0, player.h / 2 + 1, 14, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bunny Body (Cream with soft lavender tinge)
      ctx.fillStyle = '#fffdf7';
      ctx.beginPath();
      ctx.roundRect(px + 4, py + 12, player.w - 8, player.h - 14, 16);
      ctx.fill();

      // Cozy Matcha Scarf
      ctx.fillStyle = '#75a75d';
      ctx.beginPath();
      ctx.roundRect(px + 3, py + 22, player.w - 6, 7, 3);
      ctx.fill();

      // Scarf Tail flowing behind
      ctx.fillStyle = '#5c8a46';
      const scarfLag = Math.sin(timeMs / 180) * 4;
      ctx.beginPath();
      ctx.moveTo(px + 5, py + 25);
      ctx.quadraticCurveTo(px - 10, py + 26 + scarfLag, px - 14, py + 34 + scarfLag);
      ctx.lineTo(px - 6, py + 34 + scarfLag);
      ctx.closePath();
      ctx.fill();

      // Bunny Ears
      // Left Ear
      ctx.fillStyle = '#fffdf7';
      ctx.beginPath();
      ctx.ellipse(px + 10, py + 6, 5, 14, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f7a8b8';
      ctx.beginPath();
      ctx.ellipse(px + 10, py + 7, 2.5, 9, -0.15, 0, Math.PI * 2);
      ctx.fill();

      // Right Ear
      ctx.fillStyle = '#fffdf7';
      ctx.beginPath();
      ctx.ellipse(px + 22, py + 5, 5, 14, 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f7a8b8';
      ctx.beginPath();
      ctx.ellipse(px + 22, py + 6, 2.5, 9, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Cute Face
      // Eyes
      ctx.fillStyle = '#2d2149';
      if (player.isBlinking) {
        // Blinking line
        ctx.fillRect(px + 16, py + 18, 5, 1.5);
        ctx.fillRect(px + 24, py + 18, 5, 1.5);
      } else {
        // Big cute eyes with shine
        ctx.beginPath();
        ctx.arc(px + 18, py + 18, 2.8, 0, Math.PI * 2);
        ctx.arc(px + 26, py + 18, 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px + 17, py + 17, 1, 0, Math.PI * 2);
        ctx.arc(px + 25, py + 17, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rosy Cheeks
      ctx.fillStyle = 'rgba(247, 168, 184, 0.7)';
      ctx.beginPath();
      ctx.arc(px + 13, py + 21, 3, 0, Math.PI * 2);
      ctx.arc(px + 29, py + 21, 3, 0, Math.PI * 2);
      ctx.fill();

      // Cute Little Nose
      ctx.fillStyle = '#f7a8b8';
      ctx.beginPath();
      ctx.arc(px + 22, py + 20, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Feet / Paws
      ctx.fillStyle = '#ede5d5';
      const footOffset = Math.sin(player.runFrame * Math.PI * 2) * 3;
      ctx.beginPath();
      ctx.arc(px + 10, py + player.h - 1 - footOffset, 4, 0, Math.PI * 2);
      ctx.arc(px + 24, py + player.h - 1 + footOffset, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // H. Floating Particles & Ambient Fireflies
      state.fireflies.forEach((ff) => {
        ff.phase += ff.speed;
        const currentAlpha = 0.3 + Math.sin(ff.phase) * 0.4;
        if (currentAlpha > 0.1) {
          ctx.save();
          ctx.fillStyle = `rgba(255, 240, 170, ${currentAlpha})`;
          ctx.shadowColor = '#ffd166';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(ff.x, ff.y + Math.sin(ff.phase * 0.5) * 8, ff.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Trail & Item Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Floating Pickup Texts (+1 Matcha!, +1 Star!)
      for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const ft = floatingTexts[i];
        ft.y += ft.vy;
        ft.alpha -= 0.02;
        if (ft.alpha <= 0) {
          floatingTexts.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = ft.alpha;
          ctx.font = 'bold 14px Quicksand, sans-serif';
          ctx.fillStyle = ft.color;
          ctx.textAlign = 'center';
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        }
      }

      ctx.restore();

      // Loop next frame
      requestRef.current = requestAnimationFrame(renderLoop);
    };

    requestRef.current = requestAnimationFrame(renderLoop);
    return () => {
      isRunning = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [screen, collectibles]);

  return (
    <div className="app-container">
      {/* Ambient background particles */}
      <div className="ambient-sparkles">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="ambient-particle"
            style={{
              left: `${(i * 5.8) % 100}%`,
              width: `${6 + (i % 5) * 2}px`,
              height: `${6 + (i % 5) * 2}px`,
              animationDelay: `${(i * 0.7) % 6}s`,
              animationDuration: `${10 + (i % 4) * 3}s`
            }}
          />
        ))}
      </div>

      {/* ========================================================
          1. TITLE SCREEN (FR-01, FR-02, FR-03)
          No confession letter or romantic spoilers on this screen!
          ======================================================== */}
      {screen === 'title' && (
        <section className="title-screen" id="title-screen" aria-label="Welcome Screen">
          <div className="title-badge">
            <span className="dot" />
            <span>Cozy Adventure</span>
          </div>

          <h1>Little Things</h1>
          <p className="title-tagline">
            A gentle journey through cozy hills, matcha treats, and starlit memories.
          </p>

          <div className="preview-cards">
            <div className="preview-card">
              <span className="preview-icon">🍵</span>
              <span className="preview-label">Matcha Cups</span>
              <span className="preview-sub">Warm & sweet</span>
            </div>
            <div className="preview-card">
              <span className="preview-icon">⭐</span>
              <span className="preview-label">Golden Stars</span>
              <span className="preview-sub">Soft starlight</span>
            </div>
            <div className="preview-card">
              <span className="preview-icon">🐰</span>
              <span className="preview-label">Cozy Explorer</span>
              <span className="preview-sub">Hop & jump</span>
            </div>
          </div>

          <button
            id="start-game-btn"
            className="btn-primary"
            onClick={startNewGame}
          >
            <span>Start the Adventure</span>
            <span>✨</span>
          </button>

          <div className="controls-hint">
            <div className="keys-badge">
              <span className="key-cap">A</span>
              <span className="key-cap">D</span>
              <span>or</span>
              <span className="key-cap">←</span>
              <span className="key-cap">→</span>
              <span>to move</span>
            </div>
            <div className="keys-badge">
              <span className="key-cap">W</span>
              <span>/</span>
              <span className="key-cap">↑</span>
              <span>/</span>
              <span className="key-cap">Space</span>
              <span>to jump</span>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          2. GAMEPLAY SCREEN (FR-04 to FR-10, FR-16)
          ======================================================== */}
      {screen === 'game' && (
        <section className="game-screen" id="game-screen" aria-label="Game Screen">
          {/* Top HUD */}
          <header className="game-hud">
            <div className="hud-left">
              <button
                className="hud-btn"
                title="Return to Menu"
                onClick={() => setScreen('title')}
                aria-label="Return to Menu"
              >
                🏠
              </button>
              <button
                className="hud-btn"
                title={soundOn ? 'Mute Audio' : 'Unmute Audio'}
                onClick={toggleSound}
                aria-label="Toggle Sound"
              >
                {soundOn ? '🔊' : '🔇'}
              </button>
              <div className="hud-pill">
                <span>Little Things</span>
              </div>
            </div>

            {/* Collectibles Counter & Progress */}
            <div className="hud-progress-group">
              <div className="collectible-badge badge-matcha" title="Matcha Cups Collected">
                <span>🍵</span>
                <span>{matchaCollected} / 5</span>
              </div>

              <div className="collectible-badge badge-star" title="Stars Collected">
                <span>⭐</span>
                <span>{starsCollected} / 5</span>
              </div>

              <div className="progress-bar-container">
                <div className="progress-track" aria-label="Total Collection Progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${(totalCollected / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </header>

          {/* HTML Canvas Game Viewport */}
          <div className="canvas-wrapper">
            <canvas id="game-canvas" ref={canvasRef} />
          </div>

          {/* Touch Controls Overlay for Mobile (FR-16) */}
          <div className="touch-controls">
            <div className="touch-group">
              <button
                id="touch-left"
                className="touch-btn"
                aria-label="Move Left"
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleTouchStart('left');
                }}
                onPointerUp={() => handleTouchEnd('left')}
                onPointerCancel={() => handleTouchEnd('left')}
                onPointerLeave={() => handleTouchEnd('left')}
              >
                ◀
              </button>
              <button
                id="touch-right"
                className="touch-btn"
                aria-label="Move Right"
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleTouchStart('right');
                }}
                onPointerUp={() => handleTouchEnd('right')}
                onPointerCancel={() => handleTouchEnd('right')}
                onPointerLeave={() => handleTouchEnd('right')}
              >
                ▶
              </button>
            </div>

            <div className="touch-group">
              <button
                id="touch-jump"
                className="touch-btn touch-btn-jump"
                aria-label="Jump"
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleTouchStart('jump');
                }}
                onPointerUp={() => handleTouchEnd('jump')}
                onPointerCancel={() => handleTouchEnd('jump')}
                onPointerLeave={() => handleTouchEnd('jump')}
              >
                JUMP
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          3. LEVEL COMPLETION SCREEN (FR-11, FR-12)
          Envelope reveal and replay action
          ======================================================== */}
      {screen === 'complete' && (
        <section className="complete-screen" id="complete-screen" aria-label="Level Complete">
          <div className="complete-badge">
            <span>🎉 Journey Complete</span>
          </div>

          <h2>You Reached the End!</h2>
          <p className="complete-sub">
            {totalCollected === 10
              ? 'Incredible! You collected every single little treasure along the way.'
              : `You gathered ${totalCollected} out of 10 little treasures on this sweet adventure.`}
          </p>

          <div className="completion-stats">
            <div className="stat-item">
              <span className="stat-val">🍵 {matchaCollected} / 5</span>
              <span className="stat-lbl">Matcha Cups</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">⭐ {starsCollected} / 5</span>
              <span className="stat-lbl">Stars Found</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">✨ {totalCollected} / 10</span>
              <span className="stat-lbl">Total Treasures</span>
            </div>
          </div>

          {/* Interactive Envelope (FR-12) */}
          <div
            id="envelope-trigger"
            className="envelope-container"
            onClick={handleOpenLetter}
            title="Open the Little Letter"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpenLetter();
              }
            }}
          >
            <div className="envelope-base">
              <div className="envelope-pocket-sides" />
              <div className="envelope-pocket" />
              <div className="envelope-flap" />
              <div className="wax-seal">💌</div>
            </div>
          </div>

          <div className="action-buttons">
            <button
              id="open-letter-btn"
              className="btn-open-letter"
              onClick={handleOpenLetter}
            >
              <span>Open the Little Letter</span>
              <span>✉️</span>
            </button>

            <button
              id="replay-game-btn"
              className="btn-secondary"
              onClick={startNewGame}
            >
              <span>Play Again</span>
              <span>↺</span>
            </button>
          </div>
        </section>
      )}

      {/* ========================================================
          4. CONFESSION LETTER MODAL (FR-13, FR-14, FR-18)
          Paper-style modal overlay with real-time writing animation
          ======================================================== */}
      {letterOpen && (
        <div
          id="letter-modal-backdrop"
          className="modal-backdrop"
          onClick={() => setLetterOpen(false)}
        >
          <div
            className="letter-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-salutation"
            onClick={(e) => e.stopPropagation()} /* Prevent backdrop click */
          >
            {/* Close Icon Button */}
            <button
              id="close-letter-icon"
              className="letter-modal-close-icon"
              aria-label="Close Letter"
              onClick={() => setLetterOpen(false)}
            >
              ✕
            </button>

            {/* Postage Stamp & Postal Markings */}
            <div className="letter-decorations">
              <div className="postage-stamp">
                <span className="stamp-icon">🌸</span>
                <span className="stamp-text">SPECIAL</span>
              </div>
            </div>

            {/* Scrollable Letter Content with Real-time Writing */}
            <div className="letter-body" ref={letterBodyRef}>
              {LETTER_SECTIONS.map((sec, idx) => {
                if (idx > writingProgress.sectionIndex) return null;

                const isCurrent = idx === writingProgress.sectionIndex;
                const textToShow = isCurrent
                  ? sec.text.slice(0, writingProgress.charIndex)
                  : sec.text;

                if (sec.type === 'salutation') {
                  return (
                    <div
                      key={sec.id}
                      id="letter-salutation"
                      className="letter-salutation"
                    >
                      {textToShow}
                      {isCurrent && !writingProgress.isComplete && (
                        <span className="quill-pen-cursor" ref={penNibRef}>
                          🖋️
                        </span>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={sec.id} className="letter-text">
                    <p>
                      {textToShow}
                      {isCurrent && !writingProgress.isComplete && (
                        <span className="quill-pen-cursor" ref={penNibRef}>
                          🖋️
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Footer with Replay & Close Buttons */}
            <div className="letter-footer">
              <div className="letter-footer-actions">
                {writingProgress.isComplete && (
                  <button
                    id="replay-writing-btn"
                    className="btn-replay-writing"
                    onClick={replayWriting}
                    title="Watch writing animation again"
                  >
                    <span>Replay Writing</span>
                    <span>↺</span>
                  </button>
                )}

                <button
                  id="close-letter-btn"
                  className="btn-close-letter"
                  onClick={() => setLetterOpen(false)}
                >
                  Close & Keep in Heart 🌿
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
