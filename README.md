# SEWORA (Design · Tailor · Wear)
### Couture Pattern, Sizing & Sewing Studio

**SEWORA** is a responsive frontend web application built with React and Tailwind CSS that guides beginner to intermediate sewists through measurement profiling, intelligent sizing, live SVG pattern piece generation, fabric and haberdashery calculators, cutting layouts, Moroccan couture techniques, project tracking, and print specification export.

---

## 🌟 Core Features

1. **Measurement Profile System**
   - Fields: Bust/Chest, Natural Waist, Full Hips, Shoulder Width, Inseam Length, Arm Length, and Full Height.
   - Live two-way conversion between **Metric (cm)** and **Imperial (inches)**.
   - Interactive anatomical mannequin silhouette diagram with highlight lines for each measurement.
   - Multi-profile management (e.g., "Me", "Mom", "Kid") persisted safely in `localStorage` with `try/catch` fault tolerance.
   - Plausibility validation warnings for out-of-range dimensions.

2. **Intelligent Size Finder & Grading Advisor**
   - Matches measurements against standard sizing (XS to 3XL and US 2–24 / EU 32–54).
   - Weighted Euclidean matching formula prioritizing chest, hips, and waist contours.
   - Detects multi-body-part discrepancies (e.g. Bust: M, Hips: L) and provides custom grading instructions for blending pattern sizes.
   - Fit ease allowance selector: **Fitted** (+2 cm), **Regular** (+6 cm), and **Relaxed / Flowy** (+12 cm).
   - Highlighted interactive size chart table.

3. **Live Design Preview & Flat Pattern Generator**
   - Garment templates:
     1. **Moroccan Kaftan & Djellaba** (Authentic couture flared silhouette with Sfifa placket, Aakad buttons, and traditional Qob hood)
     2. **A-Line Skirt** (Mini, knee, midi, and maxi length variations with pockets)
     3. **Classic T-Shirt** (Crew, scoop, and V-neck with short/long sleeves)
     4. **Simple Day Dress** (Boat neck, scoop, and V-neck with waist shaping)
     5. **Everyday Market Tote Bag** (Boxed corners, lining, and inner slip pocket)
     6. **Envelope Pillow Cover** (No-zipper overlapping back flaps)
     7. **Tailored Relaxed Pants** (Front slant pockets and elastic back)
   - Scaled SVG flat pattern pieces showing dimensions, dashed seam allowance lines (adjustable from 0.5 to 2.0 cm), grainlines, and alignment notches.
   - Interactive fabric color & woven pattern swatches (Solid Onyx, Moroccan Amber Gold, Emerald Velvet, Royal Navy, Terracotta, Natural Linen, Breton Stripes, Gingham Check, Dainty Floral, and Moroccan Arabesque Brocade).
   - 2D finished garment mockup updating live.

4. **Fabric & Haberdashery Calculator**
   - Calculates yardage and meters based on garment length, sleeve option, hem option, size scaling, and fabric bolt width (110 cm / 44", 140 cm / 55", 150 cm / 60").
   - Directional nap toggle (+15% yardage for velvets, corduroys, or one-way prints).
   - Pre-wash shrinkage buffer (6%) included in calculation.
   - Auto-generated notions checklist (thread, zippers, buttons, interfacing, Sfifa/Aakad).

5. **Cutting Layout Helper**
   - Visual fabric bolt schematic showing folded selvages, center fold lines, cut counts, and grainline orientation.

6. **Sewing Guide & Learning Hub**
   - Step-by-step sequential garment construction guide with check-off progress.
   - Stitch & technique library with bespoke SVG diagrams (Straight stitch, Zigzag, Backstitch, French seam, Blind hem, Darts, Buttonholes, and Moroccan Sfifa & Aakad application).
   - Searchable glossary of essential sewing terminology.
   - Machine troubleshooting matrix (puckering, skipped stitches, thread bunching, wavy seams, broken needles).

7. **Project Atelier Tracker**
   - Create, filter, and track sewing projects across 4 stages: **Planned**, **Cutting**, **Sewing**, and **Finished**.
   - Track fabric choices, size, client profile, cost estimates, target due dates, and custom notes.

8. **Print & Export Dossier**
   - Clean, dedicated `@media print` stylesheet.
   - Generates an atelier-ready specification sheet for the cutting table with measurements, yardage, pattern piece checklist, and assembly steps.

---

## 🚀 How to Run the App

1. Ensure [Node.js](https://nodejs.org) (v18+) is installed.
2. In the project directory, install dependencies with `npm install`, then start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open the URL shown in your terminal (typically `http://localhost:5173`) in any modern browser.
4. To build for production:
   ```bash
   npm run build
   ```
   Preview the production build:
   ```bash
   npm run preview
   ```

---

## ✂️ How to Add a New Garment Template

All garment data is stored in the modular data file at `src/data/garments.js`.

To add a new garment template (for example, a **Kimono Robe** or **Bucket Hat**):

1. Open `src/data/garments.js`.
2. Append a new garment object to the `GARMENTS` array following this structure:
   ```js
   {
     id: 'kimono-robe',
     name: 'Artisan Kimono Robe',
     subtitle: 'Relaxed drop-shoulder lounge robe with tie belt',
     category: 'Loungewear',
     difficulty: 'Beginner',
     estimatedHours: '2–3 hrs',
     baseLengthCm: 110,
     lengthMultiplier: 2.0,
     hasSleeves: true,
     isWideGarment: true,
     description: 'Flowy traditional robe with neckband band collar and deep patch pockets.',
     options: {
       neckline: [
         { id: 'classic-band', label: 'Folded Neckband', default: true }
       ],
       sleeves: [
         { id: 'wide-bell', label: 'Wide Kimono Sleeve', default: true },
         { id: 'short', label: 'Short Sleeve' }
       ],
       hem: [
         { id: 'midi', label: 'Midi Length (110 cm)', default: true },
         { id: 'maxi', label: 'Maxi Floor Length (135 cm)' }
       ],
       pockets: [
         { id: 'patch', label: 'Deep Front Patch Pockets', default: true },
         { id: 'none', label: 'No Pockets' }
       ]
     },
     pieces: [
       {
         id: 'robe-back',
         name: 'Robe Back',
         cutCount: 'Cut 1 on Fold',
         widthRatio: 0.60,
         heightRatio: 1.0,
         hasGrainline: true,
         notches: ['neck-center', 'shoulder-match'],
         description: 'Cut on the lengthwise fold with drop shoulder.'
       },
       {
         id: 'robe-front',
         name: 'Robe Front Panels',
         cutCount: 'Cut 2 Fabric (Mirror Pair)',
         widthRatio: 0.35,
         heightRatio: 1.0,
         hasGrainline: true,
         notches: ['neck-slant', 'pocket-placement'],
         description: 'Front panels angled toward neckband.'
       },
       {
         id: 'robe-sleeves',
         name: 'Wide Sleeves',
         cutCount: 'Cut 2 (Pair)',
         widthRatio: 0.50,
         heightRatio: 0.45,
         hasGrainline: true,
         notches: ['center-sleeve-cap'],
         description: 'Rectangular drop sleeves.'
       },
       {
         id: 'robe-belt',
         name: 'Tie Belt & Loops',
         cutCount: 'Cut 1 Belt + 2 Loops',
         widthRatio: 0.90,
         heightRatio: 0.10,
         hasGrainline: true,
         notches: ['center-back'],
         description: '180 cm long sash tie belt.'
       }
     ],
     supplies: [
       { id: 'fabric', item: 'Linen, washed silk, or cotton waffle', qty: '2.8–3.4 m' },
       { id: 'interfacing', item: 'Light fusible interfacing for collar band', qty: '0.4 m' },
       { id: 'thread', item: 'Matching thread', qty: '1 spool' }
     ],
     steps: [
       { step: 1, title: 'Staystitch Necklines', text: 'Staystitch front neck edges to maintain shape.' },
       { step: 2, title: 'Sew Shoulder Seams', text: 'Join front and back at shoulders right sides together.' },
       { step: 3, title: 'Attach Drop Sleeves', text: 'Sew sleeves into armholes while garment is flat.' },
       { step: 4, title: 'Continuous Side & Sleeve Seams', text: 'Stitch from sleeve cuff down side hem.' },
       { step: 5, title: 'Apply Neckband & Hem', text: 'Fold neckband in half lengthwise and sew around opening. Turn hem up 2 cm twice and topstitch.' }
     ]
   }
   ```
3. In `src/components/PatternPreview.jsx`, optionally add an SVG branch in `<GarmentMockup />` to render its specific 2D silhouette. The flat pattern generator and fabric calculator will automatically adapt to the dimensions specified.
