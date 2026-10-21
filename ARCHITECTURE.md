# Code&Paint System Architecture

> Version 5.0.0 · Comprehensive Technical Blueprint

---

## 1. High-Level System Architecture

```mermaid
graph TD
    subgraph Inputs ["Input Layer"]
        IMG["Image / Drag-and-Drop (PNG, JPG, WebP)"]
        VID["Video File (MP4, WebM)"]
        CAM["Live Video (Webcam / USB Camera)"]
        OBJ["3D Geometry (GLB, GLTF, OBJ, STL, PLY)"]
        AUD["Audio Track (MP3, WAV, Beats)"]
        SYP["Syphon / Spout VJ Feed"]
    end

    subgraph Core ["Code&Paint Core Engine"]
        SAMPLER["Image & Color Sampler"]
        ROUTER["Path Traverser (Free, Spiral, Raster, Line)"]
        SYNTH["Stroke Synthesizer (48 Styles)"]
        BEAT["Audio FFT & Transient Detector"]
        CODEGEN["Realtime Code Streamer"]
    end

    subgraph Rendering ["Render Pipeline"]
        STAGE2D["2D Canvas Surface"]
        WGL["WebGL 2 Height-Map & Normal Relief Shader"]
        THREE["Three.js 3D Viewer & Capture Stream"]
    end

    subgraph Outputs ["Export & Performance Output"]
        STANDALONE["Standalone HTML Player"]
        VECTOR["SVG Vector Export"]
        IMAGE["4K / 8K High-Res PNG / Contact Sheets"]
        VIDEO["60 FPS Constant Framerate MP4"]
        LIVE_OUT["Syphon / Spout Stream (Code&Paint Output)"]
    end

    IMG --> SAMPLER
    VID --> SAMPLER
    CAM --> SAMPLER
    OBJ --> THREE --> SAMPLER
    AUD --> BEAT

    SAMPLER --> ROUTER --> SYNTH
    BEAT --> SYNTH
    SYNTH --> CODEGEN
    SYNTH --> STAGE2D
    SYNTH --> WGL

    STAGE2D --> STANDALONE
    STAGE2D --> VECTOR
    STAGE2D --> IMAGE
    STAGE2D --> VIDEO
    STAGE2D --> LIVE_OUT
    CODEGEN --> STANDALONE
```

---

## 2. Component Subsystems

### 2.1 Stroke Synthesizer & Brush Simulation
The core algorithm breaks down source frames into distinct organic marks. Each mark has:
1. **Geometric Topology**: Quadratic Bézier ribbons, elliptical stamps, or polyline splines.
2. **Pressure Profile**: Tapering endpoints, dry bristle dissipation, or continuous flow.
3. **Height Elevation Map**: Stamped into a 2D canvas elevation buffer representing physical relief (impasto oil ridges, clay edges, linocut cuts).
4. **Lighting Shader**: Computed in WebGL 2 with directional light sources and specular reflection.

### 2.2 Audio Reactivity Subsystem
```mermaid
sequenceDiagram
    participant Audio as Audio Track (Web Audio API)
    participant FFT as FFT AnalyserNode
    participant Tracker as Peak & Transient Tracker
    participant Engine as Stroke Engine
    participant Stage as Canvas Stage

    Audio->>FFT: Stream stereo PCM buffer
    FFT->>Tracker: 1024-bin Frequency Spectrum
    Tracker->>Tracker: Detect Sub-bass (<120Hz) & High Transients
    Tracker->>Engine: Send Beat Triggers, Energy Scalar & Hit Moments
    Engine->>Stage: Modulate Stroke Caliber, Bristle Spread & Relief Flare
```

### 2.3 Realtime Code Generation Subsystem
Every physical stroke dispatched by the engine is serialized as a concise JavaScript call:
- `E(cx, cy, rx, ry, angle, color)` — Elliptical stamp
- `B(x0, y0, cx, cy, x1, y1, color)` — Bézier ribbon
- `S(x0, y0, cx, cy, x1, y1, width, color)` — Pressure-variable stroke
- `T(text, x, y, font, size, color)` — Typographic ligature

The code buffer maintains a syntax-highlighted editor view and can bundle the entire generated artwork into a standalone self-executing HTML file containing its own micro-runtime.

### 2.4 Offline Frame-by-Frame Video Recorder
For rock-solid 60 FPS video capture up to 4K resolution, Code&Paint decouples wall-clock time from rendering:
1. Engine halts real-time requestAnimationFrame loops.
2. Time increments by `1 / fps` per frame.
3. Audio buffer slices are extracted synchronously.
4. Canvas renders complete simulation steps into an `OffscreenCanvas`.
5. Video frames are streamed into a background Web Worker running a constant-bitrate H.264/AAC muxer.
