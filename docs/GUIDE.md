# Code&Paint: the guide

Code&Paint repaints any picture, video or live camera stroke by stroke, and writes the code for every stroke as it goes. It runs entirely in your browser: nothing you drop in is uploaded.

**Open it:** [mahik504.github.io/Code-and-Paint](https://mahik504.github.io/Code-and-Paint)

---

## Quick start (one minute)

1. Open the site. On a first visit you land in **easy** mode.
2. Press **▶ try a demo**, or **open picture / video** (or drop a file anywhere on the page).
3. Pick a **look** (pencil sketch, graffiti, watercolour, ink drawing, liquid chrome, hylics).
4. Pick a **path**: *free*, *one line*, *spiral out* or *top → bottom*. Each press of ▶ try a demo shows the next one.
5. Press **record video**, **save picture** or **save as code**.

When you want more control, switch to **console** (top left).

**More room for the painting** (top right): **ui** sets the size of the controls (*auto* makes them smaller on a smaller window, or pick 70–110%), and the panel button (or the **H** key) hides the panels under the painting.

---

## Easy mode and console

| | |
|---|---|
| **easy** | Four steps down the left: *source · look · motion · export*. Each one has a "more ▸" link that opens the console at the right panel. |
| **console** | Every control. Hover any control for a description of what it does. |
| **phone** | On a phone the page gives you the painting with its code, plus the essentials: photo/video, camera, looks, path, styles, speed, restart, record and save. |

---

## Sources

- **Pictures**: drop one, or several to make a **playlist**.
- **Videos**: repainted live, frame by frame. The *video sound* button chooses what happens to the video's own sound: *off*, *keep* (it goes into the recording, nothing else changes), or *music* (it drives the painting).
- **Live input**: the camera, a shared screen, or a 3D model you can turn.
- **Text**: type a word and it's painted.
- **Examples**: a menu of ready pictures.
- **Playlist** (up to 10 slots): *cycle* (each holds for a few seconds), *hand* (you play them), *bars* (they change on the song's bars).

## Styles (48)

Styles are grouped in tabs. Tick several and every stroke picks one of them. Right-click a style key to give that style its own size.

| tab | styles |
|---|---|
| **paint** | paint, oil, acrylic, palette knife, gouache, watercolour, wet watercolour, sumi, ink, calligraphy, graffiti, soft |
| **draw** | pencil, charcoal, pastel, pen, hatch, marker |
| **graphic** | flat, geo, dots, halftone, scribble, string, paper, bokeh, neon, hylics, linocut, riso |
| **craft** | thread, cross-stitch, clay, beads, foam, tape |
| **3d** | ceramic, stone, puffy, metal, molten, pewter, copper, gold, bronze, glass, lens, crystal |

- **3d** styles and oil / acrylic / knife are lit in 3D: the light follows the **light pad**, and you can drag it.
- **Glass**, **lens** and **crystal** bend the picture behind them.
- The **brush** menu only changes the plain styles (paint, soft, flat, geo, hatch, string). Every other style draws with its own tool.

## Motion: how a stroke arrives

The options are *draw, glide, sketch, ink, spiral, fall, pop, shard, pixel* and *hilite*. Tick several and each stroke picks one.

## Path: how the painter travels

- **order**: *free* (the biggest mistake first), *top → bottom*, *bottom → top*, *left → right*, *right → left*, *diagonal*, *spiral out / in*, *rings out / in*, or *clock sweep*.
- **one line**: a pen that never lifts. With music, *branch* (on the beat) splits the line on every beat.
- **circles** (*circles · ink* or *circles · colour*, in the line menu): the picture's lines are joined into one closed path and drawn by a chain of spinning circles (a Fourier series, up to 300 circles), the way the epicycle drawing videos do it. The circles show while it draws and disappear at the end. *trace · ink* and *trace · colour* draw the same loop without showing the circles.
- **outlines**: the picture's real lines, drawn first or last.
- **shapes by hand**: big patches of one colour get their outline traced, then are scribbled in (*outline + scribble*, *outline + rows*, *scribble*).
- **cuts**: when a video cuts to a new scene, the change is either drawn or pre-drawn. With *pre-drawn*, recordings have no pause: ⏺ render pre-draws between frames, and ⏺ live leaves the pre-draw out of the file (the song waits with it). The video cuts straight to the new scene, already painted.

Order and one line also work in playlists.

## Brush panel

- **detail**: *fast*, *sharp*, *ultra*, *max* or *hq*.
- **shapes**: *auto* picks a stroke count from the stroke size.
- **size**: the stroke-size knob, or *rnd* for random sizes.
- **faces** (*off*, *detail*, *max*): face detail. Faces are found in the picture, or in every frame of a video, and painted with more, finer strokes, the eyes and mouth most. It uses Google's MediaPipe face detector, which runs on your computer (nothing is sent anywhere) and loads the first time you switch it on. It finds faces that fill a good part of the frame, and needs the page served (online, or the local version's start.command), not opened as a file.
- **fill**: how a tool fills a stroke much wider than itself: *one stroke* (the default), *zigzag* or *cross*.
- **spray** (for the graffiti style):
  - The paint goes down as a cloud of fine droplets, the way a real can (or a Photoshop / Affinity spray brush) lays it: a grainy body, a fine overspray mist round it, a few splatters and drips.
  - **cap**: the nozzle. *auto* picks skinny caps for thin lines, fat caps for fills and soft for big areas. *skinny* is sharp with little overspray; *fat* is wide, with more mist and drips; *calligraphy* is a flat cap whose ribbon thins and thickens with the angle; *soft* is a wide fog.
  - **wall**: *canvas*, *concrete* or *brick*. The paint takes on the wall's texture as if it was sprayed onto it. The wall shows on screen, in stills and in recordings; saved code paints on plain canvas.
  - **finish**: *clean* (the default: base colours and big shapes first, then the detail, nothing added at the end) or *+ lines*: once the piece is painted, black outlines and white shines are sprayed over it.

## Music

Load a song, pick one of the 10 **demo ♪** songs (house, boom bap, drum & bass, techno, trap, lo-fi, dubstep, synthwave, breakbeat, ambient: 18–28 s each, each with a quiet part, a build and a drop), or use live sound.

- **hits**: strokes land on the song's hits.
- **flow**: the painting follows the song's energy.
- **free**: hits throw bursts of strokes.
- **sections**: drops paint bolder, breaks paint calmer.
- **music in the paint** (*amount*): how much the song changes the painting itself. At 0 the music only sets the pace.
  - Every beat lands **one big, bold stroke**, snapped down on the beat. With *one line*, the line swells on the beat instead.
  - **Loud parts paint with broad brushes, quiet parts with fine ones.** Loud and quiet are measured against the song itself, so any track gets the full range.
  - On the **3D styles** (oil, acrylic, metals, glass…), **every beat flares the surface**: the light snaps to one side and rakes low, then settles and holds still until the next beat.
- Extras on the beat:
  - *splash*: the brushes being drawn flick drops of their paint off the tip.
  - *branch*: in one-line mode, the line splits on each beat.
  - *glow*: on the beat, the tip of each brush being drawn lights up in its own shape and colour, then fades as it moves on.
- **fx**: punch zoom, flashing border, grid pulse.

## Settings travel with what you make

Every PNG, MP4 (⏺ render or ⏺ live), SVG and ⬇ code page you save carries the settings it was made with, like ComfyUI does with its workflows. **Drop one of those files back onto the page and its settings come back**: styles, motion, path, brush, music mode and amount, splash / branch / glow, recording size and the rest. The picture and the song are not stored: open them again to paint with those settings (a demo song is picked again by itself).

- **Drop it anywhere on the page**, or use **load** in the preset row (under the painting).
- To paint a file that carries settings (instead of loading them), **hold Alt (Option on a Mac) while you drop it**.
- Only files saved from version 4.25.0 on carry settings; an older file is simply opened as a picture or video.

## Score: the sound as a moving picture

**score** (music panel, in the *music in the paint* row) animates the sound the way producers' audio-reactive visuals do:
a dark spine down the middle swells with the sound (the swells run out from its centre). On every hit, lines shoot out
of the spine with nodes along them; rings pulse on the low hits, curves join things up, fans of short sprigs fly off on
the high ones, rows of dots drift away to the right, and soft clouds of colour bloom and smear behind it all.
Everything is drawn in your ticked styles, so spray gives sprayed lines and rings, ink gives inked ones, and so on.

- **score · paper**: on its own, on paper, in the picture's colours.
- **score · painting**: over the painting as it's made. The lines run from the spine to the strokes that are landing,
  the rings and sprigs sit on them in each stroke's own style and colour, and the painting smears and blooms with the bass.
- **score · motion only**: none of the score is drawn. The strokes that land swell out on the hits, colour blooms under
  them, and the painting smears and glows with the bass.

It shows on the stage and in recordings (live and rendered).

## Text bar

**text** (out panel) adds your own words between the picture and the code: one or more sentences, set in one of ten
fonts (Archivo Black, Bebas Neue, Playfair, Marker, Caveat, Space Mono, Abril Fatface, Rubik Mono, Pacifico, Rock Salt)
and painted out stroke by stroke in your ticked styles as the painting goes, finishing just before it does. Colour:
*light*, *picture* (the words take the picture's colours) or *accent*. It works in the studio, simple, +code and editor
displays, shows in recordings, and the words travel with presets. The fonts are carried with the app, so they work offline.

## Recording and export

- **⏺ render** (the default): the run starts again and is rendered frame by frame, perfectly smooth, at **720p, 1080p, 1440p or 4K**. The message line shows how long is left.
- **⏺ live**: the stage in real time. **interface** records the whole page; **from now** records the stage from this moment on.
- **⬇ code**: a small web page that paints the picture again by itself, stroke by stroke, in the same styles (self-playing, with the song if you like).
- **svg**, **png 1K / 4K / 8K**, **stills**, **contact sheet**, **cover**.
- **window**: open the painting on its own, for a projector or a second screen.
- **Displays** (above the stage): *studio*, *simple*, *paint*, *+code* and *editor*. *editor* puts the painting beside its code in an editor window (painting.js, window dots, big line numbers, the current line highlighted, "Code&Paint by Code&Paint" along the bottom). In 16:9 they sit side by side. In the tall frames the painting is as big as it fits, with a thin black trim, and the editor sits under it, lined up with its edges.

## Colour grade

**grade** (in the out panel) opens the colour sliders: *brightness*, *contrast*, *saturation*, *highlights*, *shadows*, *hue*, *colour boost*, *glow* and *haze*. They change the painting as it shows, so recordings get them too, and the saved PNGs, stills and covers. Saved code and SVG keep the plain colours. Double-click a slider to put it back to 0; *reset* clears them all. The **grade** button lights up while any slider is in use.

## Presets and reset

The preset row under the painting keeps four sets of settings: press **store**, then a letter; press a letter to bring them back; **save** / **load** them as a file. **reset** (press it twice) puts every setting back to its default; your presets and the easy / console choice are kept.

## Replay and layering (local version)

The local version has 383 hand-coded recreations of Code&Paint Studio artworks to **replay**, with live strokes mixed in (**+live**) and the code finishing on top (**finish**).

**layer ⤮** replays the pieces in a random order, each one on top of the last. It keeps one frame for the whole show:
- **frame**: the first piece's shape, or a fixed one: 5:7 (most pieces), 1:1, 4:5, 9:16, 16:9 or 7:5.
- **same shape / all shapes**: only the pieces whose own shape matches the frame, or every piece.
- **crop / fit**: a piece of another shape fills the frame (cropped), or fits inside it whole, with black bars.

Saving a picture (PNG, 4K / 8K), stills or a contact sheet during a replay with live strokes or layers saves the canvas as you see it, strokes and layers included.

## Local version: Resolume and more

`download/code-and-paint-local.zip` (also *resolume ↓* in the studio) is the studio run from your own computer, on Mac or Windows. It adds **Syphon / Spout** in and out for Resolume and other VJ software. Unzip it and double-click *start.command* (Mac) or *start.bat* (Windows).

---

## How it works

1. The picture is analysed for edges, detail and important areas.
2. A **worker** (a background thread) proposes candidate strokes where the painting differs most from the picture. Each candidate is scored by how much closer it would bring the canvas to the picture, and the best one is kept and refined.
3. The chosen stroke is sent to the page, which draws it in its style and adds its line to the code.
4. The 3D styles are drawn into a **height map** (with a material and a direction per pixel), lit by a **WebGL 2** shader with shadows, reflections and, for glass, lens and crystal, refraction.
5. Saving the code packs the strokes and the style renderers into one HTML file, so the painting can be replayed anywhere.

## Example outputs

| | | |
|---|---|---|
| ![pencil](examples/pencil.webp) | ![graffiti](examples/graffiti.webp) | ![foam](examples/foam.webp) |
| pencil | graffiti | foam |
| ![acrylic](examples/acrylic.webp) | ![watercolour](examples/watercolour.webp) | ![linocut](examples/linocut.webp) |
| acrylic | watercolour | linocut |
| ![riso](examples/riso.webp) | ![bronze](examples/bronze.webp) | ![hylics](examples/hylics.webp) |
| riso | bronze | hylics |

## Tips

- A portrait or a picture with a clear subject paints best.
- **Lower the stroke count** for bold, graphic pictures; **raise it** (or use *hq*) for detail.
- To make the music obvious, turn **amount** up and pick a 3D style such as oil or gold: the beat strokes and the swinging light both show it.
- Rendering at 4K takes about four times as long as 1080p.
