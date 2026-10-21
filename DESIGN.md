# Code&Paint Design System & Aesthetic Manifesto

> Version 5.0.0 · The Cyber-Tactile Studio

---

## 1. Design Philosophy

**Code&Paint** is built upon the premise that algorithmic art creation should feel physical, luminous, and direct. Rather than presenting generic modern flat UI or disconnected dropdowns, Code&Paint emulates a precision hardware synthesizer console with tactile micro-switches, illuminated LEDs, weighted rotary knobs, and rich dark-field canvas projection.

Every stroke drawn on the canvas is simultaneously synthesized as executable code right before the artist's eyes. The UI honors this mechanical elegance with high-contrast OLED dark themes, physical depression mechanics, and neon phosphor indicators.

---

## 2. Color Palette & Chromatic Science

### Dark Theme (Default Studio Console)
- `--case`: `#0a0b0e` (Deep Obsidian Chassis)
- `--panel`: `#111317` (Matte Carbon Surface)
- `--line`: `#1c1f26` (Precision Milled Groove)
- `--key`: `#17191f` (Machined Anodized Keycap)
- `--keyon`: `#121418` (Depressed Switch Well)
- `--keyline`: `#262b35` (Beveled Edge Highlight)
- `--keyshadow`: `#050608` (Ambient Occlusion Drop)
- `--text`: `#f0f2f5` (Bright Off-White Legend)
- `--muted`: `#6e7482` (Subdued Engraved Label)
- `--well`: `#0c0e12` (Recessed Bay)

### Accents & Signal Indicators
- `--accent`: `#00f59b` (Primary Cyber Emerald Mint — Active Run / Core Action)
- `--accent2`: `#9d4edd` (Electric Ultraviolet — Audio Reactivity / Special Looks)
- `--accent3`: `#00d4ff` (Neon Cyan — Vector Outlines / Shaders)
- `--rec`: `#ff3b30` (Luminous Crimson — Recording Active Pulse)
- `--ledoff`: `#2c303a` (Extinguished Phosphor Diode)

### Light Theme (Architectural Workspace)
- `--case`: `#eceee9` (Warm Industrial Porcelain)
- `--panel`: `#f7f8f5` (Clean Alabaster Surface)
- `--line`: `#d8dbd4` (Architectural Guide)
- `--key`: `#ffffff` (Gloss Ceramic Keycap)
- `--keyon`: `#e6e9e2` (Tactile Engaged Surface)
- `--text`: `#16181b` (Carbon Jet Text)

---

## 3. Typography Hierarchy

| Role | Font Family | Weight | Size / Line-Height | Tracking | Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Brand Title** | Archivo, sans-serif | 800 (Heavy) | 15px / 1.0 | +0.08em | UPPERCASE |
| **Section Labels** | IBM Plex Mono, monospace | 600 (Semi-Bold) | 9px / 1.0 | +0.20em | UPPERCASE |
| **Keycaps / Buttons** | IBM Plex Mono, monospace | 500 (Medium) | 9px / 1.0 | +0.03em | lowercase |
| **Status / Hints** | IBM Plex Mono, monospace | 400 (Regular) | 10px / 1.4 | 0 | Sentence |
| **Live Code Buffer**| Cascadia Mono, monospace | 400 (Book) | 18px / 24px | 0 | Regular |

---

## 4. Tactile Button & Switch Mechanics

### 4.1 Pushbutton Physics
Buttons are modeled as tactile switches with real physical feedback:
```css
.key {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 9px;
  border: 1px solid var(--keyline);
  background: var(--key);
  box-shadow: 0 2px 0 var(--keyshadow);
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.1s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.15s ease;
}

.key:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--accent) 40%, var(--keyline));
}

.key.on, .key:has(input:checked) {
  transform: translateY(1px);
  background: var(--keyon);
  box-shadow: 0 1px 0 var(--keyshadow), inset 0 1px 3px var(--press);
}
```

### 4.2 Status LEDs
Each interactive button and switch houses an integrated 5px indicator LED:
- **Off State**: Subdued diode casing (`--ledoff`).
- **Active State**: Saturated glow with dual-layered optical diffusion (`box-shadow: 0 0 4px color-mix(in srgb, var(--accent) 90%, transparent)`).
- **Pulse State (Recording)**: Sinusoidal opacity breath cycle with 1.2s period.

---

## 5. Shaders & 3D Materials

The 3D model engine (`viewer3d.js`) and 2.5D relief rendering system utilize WebGL 2 shaders calibrated for tactile depth:
1. **Iridescent Clearcoat Shader**:
   - High refractive index (`IOR = 1.75`) with physical thin-film interference.
   - Dual directional key and rim lighting tinted with cyber violet (`0x9d4edd`) and mint fill (`0x00f59b`).
2. **Height-Map Relief Shader**:
   - Real-time normal computation from 8-bit stroke elevation channels.
   - Blinn-Phong specular glint highlights with ambient light attenuation.
   - Oil paint dragging and bristle scrape dynamics.

---

## 6. Responsive Ergonomics

### Desktop / Laptop (16:9 and Ultra-Wide)
- Three-column command layout: Source / Styles on left, Live Canvas + Code Monitor in center, Motion / Audio / Output controls on right.
- Persistent top transport bar with play/pause, restart, record, display mode selector, and GitHub repository link.
- Expandable bottom deck for audio timeline scrubbing, frequency bin visualization, and beat scoring.

### Mobile & Touch Screens (9:16 and 4:5)
- Streamlined vertical command stack with priority gestures.
- Adaptive canvas scaling to maintain 60 FPS under touch dragging.
- Floating quick-action buttons for capture, look selection, and playback toggle.
