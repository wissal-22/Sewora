/**
 * SEWORA Garment Templates Data
 * Includes:
 * 1. A-line Skirt
 * 2. Classic T-Shirt
 * 3. Simple Day Dress
 * 4. Market Tote Bag
 * 5. Envelope Pillow Cover
 * 6. Tailored Relaxed Pants
 * 7. Moroccan Kaftan & Djellaba (Traditional couture)
 *
 * Each garment defines options, pieces, base dimensions, supplies, and step-by-step sewing instructions.
 */

export const GARMENTS = [
  {
    id: 'moroccan-kaftan',
    name: 'Moroccan Kaftan & Djellaba',
    subtitle: 'Traditional Moroccan Haute Couture with Sfifa & Aakad',
    category: 'Traditional & Formal',
    difficulty: 'Intermediate',
    estimatedHours: '8–12 hrs',
    baseLengthCm: 145,
    lengthMultiplier: 2.2,
    hasSleeves: true,
    isWideGarment: true,
    description: 'An elegant Moroccan robe featuring a regal flared cut, center-front placket for Sfifa (ornate woven gold or silk trim), hand-knotted Aakad buttons, and an optional traditional Qob (pointed hood) for the Djellaba style.',
    options: {
      neckline: [
        { id: 'moroccan-sfifa', label: 'Caftan V-Collar with Sfifa', default: true },
        { id: 'djellaba-hood', label: 'Djellaba Pointed Hood (Qob)' },
        { id: 'round-mandarin', label: 'Round Collar with Slit' }
      ],
      sleeves: [
        { id: 'long', label: 'Full Flared Sleeve (Traditional)', default: true },
        { id: 'threeQuarter', label: '3/4 Flared Sleeve' },
        { id: 'short', label: 'Short Bell Sleeve' }
      ],
      hem: [
        { id: 'maxi', label: 'Floor-length Maxi (145 cm)', default: true },
        { id: 'midi', label: 'Midi Kaftan Tunica (115 cm)' }
      ],
      pockets: [
        { id: 'side-slit', label: 'Side Seam Slits & Open Pocket Reach', default: true },
        { id: 'none', label: 'Closed Seams' }
      ]
    },
    pieces: [
      {
        id: 'front-left',
        name: 'Front Left Panel',
        cutCount: 'Cut 1 Fabric',
        widthRatio: 0.38,
        heightRatio: 1.0,
        hasGrainline: true,
        notches: ['armscye', 'bust-level', 'hip-slit'],
        description: 'Features 1.5 cm center-front extension for Sfifa tape application.'
      },
      {
        id: 'front-right',
        name: 'Front Right Panel',
        cutCount: 'Cut 1 Fabric (Mirror)',
        widthRatio: 0.38,
        heightRatio: 1.0,
        hasGrainline: true,
        notches: ['armscye', 'bust-level', 'hip-slit'],
        description: 'Receives the Aakad handmade loop buttons.'
      },
      {
        id: 'back',
        name: 'Back Panel',
        cutCount: 'Cut 1 on Fold',
        widthRatio: 0.65,
        heightRatio: 1.0,
        hasGrainline: true,
        notches: ['center-fold', 'armscye', 'hip-slit'],
        description: 'Graceful flared back panel cut on the lengthwise fold.'
      },
      {
        id: 'sleeves',
        name: 'Sleeves (Flared)',
        cutCount: 'Cut 2 (Pair)',
        widthRatio: 0.48,
        heightRatio: 0.55,
        hasGrainline: true,
        notches: ['sleeve-cap-center', 'front-notch'],
        description: 'Flared wrists designed for horizontal Sfifa borders and cuff embroidery.'
      },
      {
        id: 'hood-or-facing',
        name: 'Hood (Qob) / Neck Facing',
        cutCount: 'Cut 2 Fabric',
        widthRatio: 0.32,
        heightRatio: 0.42,
        hasGrainline: true,
        notches: ['back-neck-match', 'front-edge'],
        description: 'Pointed Moroccan hood with point for tassel (Chousha) or clean inner facing.'
      }
    ],
    supplies: [
      { id: 'fabric', item: 'Fluid Crepe, Silk Satin, or Velvet', qty: '3.5–4.2 m' },
      { id: 'sfifa', item: 'Sfifa (Moroccan woven gold/silk trim, 2-3 cm wide)', qty: '9–12 m' },
      { id: 'aakad', item: 'Aakad (Handmade silk knot buttons)', qty: '35–50 pieces' },
      { id: 'kitane', item: 'Kitane / Dfira (Fine cord piping matching sfifa)', qty: '12–15 m' },
      { id: 'thread', item: 'High-tenacity silk or polyester matching thread', qty: '2 spools' },
      { id: 'interfacing', item: 'Lightweight fusible interfacing (for collar/placket)', qty: '0.5 m' },
      { id: 'needles', item: 'Microtex or Silk hand needles (size 9/11 for Aakad)', qty: '1 pack' }
    ],
    steps: [
      { step: 1, title: 'Preparation & Staystitching', text: 'Pre-wash or steam your fabric. Staystitch the front and back necklines 6 mm from the cut edge to prevent stretching.' },
      { step: 2, title: 'Attach Shoulder Seams', text: 'Place front panels and back right sides together. Pin, sew shoulder seams with a 1.5 cm seam allowance, and press seams open.' },
      { step: 3, title: 'Prepare Center-Front Sfifa Placket', text: 'Fuse interfacing strips along the center front edge. Fold raw edges under 1 cm and press. Baste the Kitane cord along the leading edge.' },
      { step: 4, title: 'Apply Sfifa & Aakad Buttons', text: 'Sew the Sfifa braided trim along the center front from neck to hem using a matching edge stitch. Hand-knot or stitch the Aakad buttons spaced 2 cm apart along the right panel and create thread loops on the left.' },
      { step: 5, title: 'Construct & Attach Sleeves', text: 'Attach Sfifa border to sleeve cuffs. Pin sleeve cap into armscye matching center notch to shoulder seam. Stitch and finish seams.' },
      { step: 6, title: 'Assemble Hood (Djellaba) or Neck Facing', text: 'If making a Djellaba, stitch the curved hood seam, edge-finish with Kitane, and attach to neckline. For Kaftan, apply shaped neck facing.' },
      { step: 7, title: 'Side Seams & Side Slits (Fethate)', text: 'Sew side seams from sleeve cuff down through the hip, stopping 35 cm from the hem to form traditional Moroccan side slits. Press seams open and finish slit edges with Sfifa or rolled hem.' },
      { step: 8, title: 'Hemming & Final Press', text: 'Turn up the lower hem by 3 cm, press, and hand-hem with a blind stitch. Steam thoroughly for a drape worthy of a celebration.' }
    ]
  },
  {
    id: 'a-line-skirt',
    name: 'A-Line Skirt',
    subtitle: 'Flattering classic wardrobe essential',
    category: 'Skirts',
    difficulty: 'Beginner',
    estimatedHours: '2–3 hrs',
    baseLengthCm: 60,
    lengthMultiplier: 1.8,
    hasSleeves: false,
    isWideGarment: false,
    description: 'A beginner-friendly A-line skirt with gentle flare, fitted waistband or facing, back zipper closure, and optional patch or in-seam pockets.',
    options: {
      neckline: [],
      sleeves: [],
      hem: [
        { id: 'mini', label: 'Mini (45 cm)' },
        { id: 'knee', label: 'Knee Length (60 cm)', default: true },
        { id: 'midi', label: 'Midi Length (75 cm)' },
        { id: 'maxi', label: 'Maxi Length (95 cm)' }
      ],
      pockets: [
        { id: 'patch', label: 'Curved Patch Pockets', default: true },
        { id: 'in-seam', label: 'Hidden In-Seam Pockets' },
        { id: 'none', label: 'Clean (No Pockets)' }
      ]
    },
    pieces: [
      {
        id: 'skirt-front',
        name: 'Skirt Front',
        cutCount: 'Cut 1 on Fold',
        widthRatio: 0.58,
        heightRatio: 0.75,
        hasGrainline: true,
        notches: ['waist-center', 'hip-level', 'dart-marks'],
        description: 'Front panel flared at the hem with waist shaping darts.'
      },
      {
        id: 'skirt-back',
        name: 'Skirt Back',
        cutCount: 'Cut 2 Fabric (Mirror)',
        widthRatio: 0.32,
        heightRatio: 0.75,
        hasGrainline: true,
        notches: ['zip-stop', 'hip-level', 'dart-marks'],
        description: 'Back panels with center-back seam for zipper insertion.'
      },
      {
        id: 'waistband',
        name: 'Waistband',
        cutCount: 'Cut 1 Fabric + 1 Interfacing',
        widthRatio: 0.85,
        heightRatio: 0.12,
        hasGrainline: true,
        notches: ['side-seam-match', 'center-front'],
        description: 'Straight or contoured waistband with 3 cm button overlap.'
      },
      {
        id: 'pockets',
        name: 'Pocket Pieces',
        cutCount: 'Cut 2 or 4 Fabric',
        widthRatio: 0.22,
        heightRatio: 0.25,
        hasGrainline: true,
        notches: ['placement-notches'],
        description: 'Comfortable hand pockets.'
      }
    ],
    supplies: [
      { id: 'fabric', item: 'Medium weight cotton, linen, wool crepe, or denim', qty: '1.4–1.8 m' },
      { id: 'zipper', item: '7" (18 cm) Invisible or regular dress zipper', qty: '1 piece' },
      { id: 'interfacing', item: 'Medium fusible interfacing for waistband', qty: '0.3 m' },
      { id: 'button', item: 'Waistband button (18 mm) or hook & bar', qty: '1 piece' },
      { id: 'thread', item: 'All-purpose matching polyester thread', qty: '1 spool' }
    ],
    steps: [
      { step: 1, title: 'Sew Waist Darts', text: 'Fold front and back darts right sides together, aligning notch marks. Stitch from the raw edge to the apex point without backstitching; tie thread tails. Press darts toward center.' },
      { step: 2, title: 'Attach Pockets (if chosen)', text: 'If using patch pockets, press upper hem down and topstitch. Position on skirt front using notches, pin, and edgestitch in place.' },
      { step: 3, title: 'Install Center-Back Zipper', text: 'Baste the center-back seam where the zipper will sit, stitch firmly below the zipper stop to the hem. Press open and sew the zipper in place using a zipper foot.' },
      { step: 4, title: 'Sew Side Seams', text: 'Pin skirt front to skirt back pieces at side seams, right sides together. Stitch with a 1.5 cm seam allowance. Finish raw edges with a serger or zigzag stitch and press open.' },
      { step: 5, title: 'Apply Waistband', text: 'Fuse interfacing to the waistband piece. Pin one edge along the skirt waist right sides together, matching notches. Stitch, fold waistband over to inside, tuck raw edge under, and stitch in the ditch.' },
      { step: 6, title: 'Hem the Skirt', text: 'Try on the skirt to check length. Press up a double-fold hem (1 cm then 2 cm) and topstitch neatly 2 mm from the fold.' }
    ]
  },
  {
    id: 't-shirt',
    name: 'Classic T-Shirt',
    subtitle: 'Comfy everyday knit tee',
    category: 'Tops',
    difficulty: 'Beginner',
    estimatedHours: '1.5–2 hrs',
    baseLengthCm: 65,
    lengthMultiplier: 1.6,
    hasSleeves: true,
    isWideGarment: false,
    description: 'A versatile everyday crew or V-neck t-shirt designed for 2-way or 4-way stretch jersey knit fabrics with neckband and hem bands.',
    options: {
      neckline: [
        { id: 'crew', label: 'Classic Crew Neck', default: true },
        { id: 'v-neck', label: 'V-Neck' },
        { id: 'scoop', label: 'Wide Scoop Neck' }
      ],
      sleeves: [
        { id: 'short', label: 'Short Sleeve', default: true },
        { id: 'long', label: 'Long Sleeve' },
        { id: 'none', label: 'Sleeveless / Muscle Tank' }
      ],
      hem: [
        { id: 'knee', label: 'Standard Hip Length (65 cm)', default: true },
        { id: 'mini', label: 'Cropped Length (50 cm)' },
        { id: 'midi', label: 'Tunic Length (80 cm)' }
      ],
      pockets: [
        { id: 'none', label: 'No Pocket', default: true },
        { id: 'patch', label: 'Small Chest Pocket' }
      ]
    },
    pieces: [
      {
        id: 'tee-front',
        name: 'T-Shirt Front',
        cutCount: 'Cut 1 on Fold',
        widthRatio: 0.52,
        heightRatio: 0.70,
        hasGrainline: true,
        notches: ['neckline-center', 'armscye', 'side-notch'],
        description: 'Curved neckline and armholes cut on fold.'
      },
      {
        id: 'tee-back',
        name: 'T-Shirt Back',
        cutCount: 'Cut 1 on Fold',
        widthRatio: 0.52,
        heightRatio: 0.72,
        hasGrainline: true,
        notches: ['neckline-center', 'armscye'],
        description: 'Higher back neckline cut on fold.'
      },
      {
        id: 'tee-sleeve',
        name: 'Sleeves',
        cutCount: 'Cut 2 Fabric (Pair)',
        widthRatio: 0.44,
        heightRatio: 0.35,
        hasGrainline: true,
        notches: ['sleeve-cap', 'front-notch'],
        description: 'Set-in knit sleeve with stretch crosswise.'
      },
      {
        id: 'neckband',
        name: 'Rib Neckband',
        cutCount: 'Cut 1 Fabric across stretch',
        widthRatio: 0.65,
        heightRatio: 0.08,
        hasGrainline: true,
        notches: ['quarter-marks'],
        description: 'Stretched 15% shorter than neckline for a flat collar.'
      }
    ],
    supplies: [
      { id: 'fabric', item: 'Cotton jersey, bamboo, or modal knit (min 30% stretch)', qty: '1.2–1.6 m' },
      { id: 'ribbing', item: 'Matching rib knit or self-fabric for neckband', qty: '0.2 m' },
      { id: 'needle', item: 'Ballpoint or Stretch sewing machine needle (size 75/11)', qty: '1 pack' },
      { id: 'tape', item: 'Clear elastic or stay tape for shoulder seams', qty: '0.5 m' },
      { id: 'thread', item: 'Polyester thread or stretch thread (Eloflex)', qty: '1 spool' }
    ],
    steps: [
      { step: 1, title: 'Reinforce Shoulders', text: 'Stitch clear elastic or twill tape into the shoulder seams on the wrong side to keep the jersey from stretching out with wear.' },
      { step: 2, title: 'Sew Shoulder Seams', text: 'Place front and back right sides together. Sew shoulder seams with a narrow zigzag stitch (0.5 mm width, 2.5 mm length) or serger.' },
      { step: 3, title: 'Prepare & Attach Neckband', text: 'Sew short ends of neckband right sides together to make a loop. Fold in half lengthwise wrong sides together. Divide neckband and neckline into quarters. Pin and stitch while stretching only the band.' },
      { step: 4, title: 'Insert Sleeves Flat', text: 'Lay shirt open flat. Pin sleeve cap to armhole matching center notch to shoulder seam. Stitch seam with a stretch stitch.' },
      { step: 5, title: 'One-Pass Side & Sleeve Seams', text: 'Fold front over back right sides together. Pin from sleeve hem down through armpit to bottom hem. Stitch in one continuous seam.' },
      { step: 6, title: 'Twin-Needle Hemming', text: 'Press sleeve cuffs and bottom hem up 2 cm. Topstitch using a twin needle or zigzag stitch for professional stretch hems.' }
    ]
  },
  {
    id: 'simple-dress',
    name: 'Simple Day Dress',
    subtitle: 'Effortless shift dress with neckline & sleeve options',
    category: 'Dresses',
    difficulty: 'Beginner / Intermediate',
    estimatedHours: '3–4 hrs',
    baseLengthCm: 95,
    lengthMultiplier: 2.0,
    hasSleeves: true,
    isWideGarment: false,
    description: 'A timeless shift or fit-and-flare day dress with bust darts, waist shaping, neck facing or bias binding, and custom hem & sleeve variations.',
    options: {
      neckline: [
        { id: 'boat', label: 'Bateau / Boat Neck', default: true },
        { id: 'scoop', label: 'Scoop Neck' },
        { id: 'v-neck', label: 'Gentle V-Neck' }
      ],
      sleeves: [
        { id: 'short', label: 'Cap / Short Sleeves', default: true },
        { id: 'threeQuarter', label: '3/4 Sleeves' },
        { id: 'none', label: 'Sleeveless with Bias Finish' }
      ],
      hem: [
        { id: 'knee', label: 'Knee Length (95 cm)', default: true },
        { id: 'midi', label: 'Midi Length (115 cm)' },
        { id: 'mini', label: 'Mini (82 cm)' }
      ],
      pockets: [
        { id: 'in-seam', label: 'Hidden In-Seam Pockets', default: true },
        { id: 'none', label: 'No Pockets' }
      ]
    },
    pieces: [
      {
        id: 'dress-front',
        name: 'Dress Front',
        cutCount: 'Cut 1 on Fold',
        widthRatio: 0.54,
        heightRatio: 1.0,
        hasGrainline: true,
        notches: ['bust-dart', 'waist-notch', 'pocket-placement'],
        description: 'Single front panel with bust darts.'
      },
      {
        id: 'dress-back',
        name: 'Dress Back',
        cutCount: 'Cut 2 Fabric (Mirror)',
        widthRatio: 0.30,
        heightRatio: 1.0,
        hasGrainline: true,
        notches: ['zip-stop', 'waist-notch', 'pocket-placement'],
        description: 'Two back pieces for clean zipper closure.'
      },
      {
        id: 'dress-facings',
        name: 'Neck Facings (Front & Back)',
        cutCount: 'Cut 1 Front on fold + 2 Back',
        widthRatio: 0.40,
        heightRatio: 0.15,
        hasGrainline: true,
        notches: ['shoulder-match'],
        description: 'Shaped facings to provide a crisp, clean neckline.'
      },
      {
        id: 'dress-sleeves',
        name: 'Sleeves',
        cutCount: 'Cut 2 Fabric (Pair)',
        widthRatio: 0.42,
        heightRatio: 0.38,
        hasGrainline: true,
        notches: ['sleeve-cap', 'front-notch'],
        description: 'Fitted woven sleeves.'
      }
    ],
    supplies: [
      { id: 'fabric', item: 'Linen, cotton chambray, rayon challis, or lightweight wool', qty: '2.0–2.6 m' },
      { id: 'zipper', item: '22" (55 cm) Invisible dress zipper', qty: '1 piece' },
      { id: 'interfacing', item: 'Lightweight fusible interfacing for neck facings', qty: '0.4 m' },
      { id: 'hook', item: 'Hook and eye closure for back neck', qty: '1 set' },
      { id: 'thread', item: 'Matching thread', qty: '1 spool' }
    ],
    steps: [
      { step: 1, title: 'Bust Darts', text: 'Mark and stitch bust darts toward apex. Press darts downward toward waistline.' },
      { step: 2, title: 'Install Invisible Zipper', text: 'Insert invisible zipper into center-back seam using an invisible zipper foot. Finish the remaining center-back seam to hem.' },
      { step: 3, title: 'Shoulders & Neck Facing', text: 'Sew shoulder seams of dress and facing. Fuse interfacing to facing, stitch around neckline right sides together, clip curves, understitch facing, and turn inside.' },
      { step: 4, title: 'Attach In-Seam Pockets', text: 'Stitch pocket bags to side seams of front and back at marked notches. Press pocket bags away from dress.' },
      { step: 5, title: 'Sew Sleeves & Side Seams', text: 'Set in sleeves, then sew continuous side seams pivotting around pocket bags to enclose pockets cleanly.' },
      { step: 6, title: 'Hemming', text: 'Turn hem up 1.5 cm twice, press, and hand blind-stitch or machine topstitch.' }
    ]
  },
  {
    id: 'tote-bag',
    name: 'Everyday Market Tote Bag',
    subtitle: 'Sturdy lined canvas tote with inner pocket and key leash',
    category: 'Accessories & Home',
    difficulty: 'Absolute Beginner',
    estimatedHours: '1–1.5 hrs',
    baseLengthCm: 42,
    lengthMultiplier: 1.2,
    hasSleeves: false,
    isWideGarment: false,
    description: 'A structured, boxed-corner tote bag lined inside with contrasting fabric, strong reinforced straps, and an internal slip pocket for phone and keys.',
    options: {
      neckline: [],
      sleeves: [],
      hem: [
        { id: 'knee', label: 'Standard Tote (40 x 38 x 10 cm)', default: true },
        { id: 'mini', label: 'Compact Book Tote (32 x 30 x 8 cm)' },
        { id: 'maxi', label: 'Oversized Beach Tote (52 x 45 x 14 cm)' }
      ],
      pockets: [
        { id: 'inner', label: 'Divided Inner Slip Pocket', default: true },
        { id: 'none', label: 'No Pocket' }
      ]
    },
    pieces: [
      {
        id: 'tote-outer',
        name: 'Outer Bag Body',
        cutCount: 'Cut 2 Heavy Fabric',
        widthRatio: 0.50,
        heightRatio: 0.55,
        hasGrainline: true,
        notches: ['boxed-corner-cutout', 'strap-placement'],
        description: 'Main body with 5 cm boxed corner cutouts.'
      },
      {
        id: 'tote-lining',
        name: 'Lining Body',
        cutCount: 'Cut 2 Cotton Lining',
        widthRatio: 0.50,
        heightRatio: 0.55,
        hasGrainline: true,
        notches: ['boxed-corner-cutout'],
        description: 'Matches outer body dimensions.'
      },
      {
        id: 'tote-straps',
        name: 'Straps (Handles)',
        cutCount: 'Cut 2 Fabric or Cotton Webbing',
        widthRatio: 0.14,
        heightRatio: 0.75,
        hasGrainline: true,
        notches: ['fold-lines'],
        description: '65 cm long handles for comfortable shoulder carrying.'
      },
      {
        id: 'tote-pocket',
        name: 'Interior Pocket',
        cutCount: 'Cut 1 Fabric',
        widthRatio: 0.30,
        heightRatio: 0.25,
        hasGrainline: true,
        notches: ['divider-line'],
        description: 'Slip pocket for phone and notions.'
      }
    ],
    supplies: [
      { id: 'fabric-outer', item: 'Heavy canvas, duck cloth, or denim', qty: '0.8 m' },
      { id: 'fabric-lining', item: 'Light to medium cotton poplin / quilting cotton', qty: '0.8 m' },
      { id: 'webbing', item: 'Optional: 1.5" (38 mm) Cotton webbing for straps', qty: '1.5 m' },
      { id: 'thread', item: 'Heavy-duty / Jeans thread (topstitch #40)', qty: '1 spool' },
      { id: 'magnetic-snap', item: 'Optional magnetic snap closure', qty: '1 set' }
    ],
    steps: [
      { step: 1, title: 'Make the Straps', text: 'Fold strap strips in half lengthwise wrong sides together and press. Open, fold raw edges into center crease, refold, and topstitch along both outer edges 3 mm in.' },
      { step: 2, title: 'Sew Inner Pocket', text: 'Hem top edge of pocket piece, press raw edges in 1 cm, and center onto one lining piece. Topstitch around sides and bottom; stitch a vertical line down center to create two compartments.' },
      { step: 3, title: 'Assemble Outer Bag & Box Corners', text: 'Sew outer panels right sides together at sides and bottom. Flatten boxed corner cutouts matching bottom and side seams, pin, and stitch straight across.' },
      { step: 4, title: 'Assemble Lining', text: 'Sew lining panels similarly, leaving a 10 cm opening at the center bottom seam for turning.' },
      { step: 5, title: 'Attach Straps & Join Outer to Lining', text: 'Baste straps to outer bag top edge pointing down. Slip outer bag inside lining right sides together. Stitch around the entire top opening with 1.2 cm seam allowance.' },
      { step: 6, title: 'Turn & Topstitch', text: 'Pull outer bag through the lining opening. Press opening closed and edgestitch shut. Push lining inside tote, press top edge crisp, and topstitch 5 mm from top rim.' }
    ]
  },
  {
    id: 'pillow-cover',
    name: 'Envelope Pillow Cover',
    subtitle: 'Quick decorative cushion cover with no zippers needed',
    category: 'Accessories & Home',
    difficulty: 'Absolute Beginner',
    estimatedHours: '45 mins',
    baseLengthCm: 45,
    lengthMultiplier: 1.0,
    hasSleeves: false,
    isWideGarment: false,
    description: 'A fast and beautiful envelope-back cushion cover with neat French seams or serged edges. Easy to take on and off for washing.',
    options: {
      neckline: [],
      sleeves: [],
      hem: [
        { id: 'knee', label: 'Standard Square 18"x18" (45x45 cm)', default: true },
        { id: 'mini', label: 'Accent Pillow 14"x14" (35x35 cm)' },
        { id: 'midi', label: 'Euro Sham 24"x24" (60x60 cm)' },
        { id: 'maxi', label: 'Lumbar Pillow 14"x28" (35x70 cm)' }
      ],
      pockets: []
    },
    pieces: [
      {
        id: 'pillow-front',
        name: 'Pillow Front',
        cutCount: 'Cut 1 Fabric',
        widthRatio: 0.50,
        heightRatio: 0.50,
        hasGrainline: true,
        notches: ['corner-marks'],
        description: 'Single square cut exactly 2 cm smaller than cushion insert for plump fill.'
      },
      {
        id: 'pillow-back-left',
        name: 'Back Envelope Deep Flap',
        cutCount: 'Cut 1 Fabric',
        widthRatio: 0.40,
        heightRatio: 0.50,
        hasGrainline: true,
        notches: ['hem-fold'],
        description: 'Overlaps by 10 cm to fully enclose insert.'
      },
      {
        id: 'pillow-back-right',
        name: 'Back Envelope Shallow Flap',
        cutCount: 'Cut 1 Fabric',
        widthRatio: 0.35,
        heightRatio: 0.50,
        hasGrainline: true,
        notches: ['hem-fold'],
        description: 'Inner flap.'
      }
    ],
    supplies: [
      { id: 'fabric', item: 'Linen, cotton canvas, velvet, or upholstery jacquard', qty: '0.7–1.0 m' },
      { id: 'insert', item: 'Pillow cushion insert (feather or polyester fill)', qty: '1 piece' },
      { id: 'thread', item: 'Matching thread', qty: '1 spool' }
    ],
    steps: [
      { step: 1, title: 'Hem Envelope Backs', text: 'On one long edge of each back piece, fold under 1 cm then 1.5 cm to create a clean double hem. Press and topstitch along the fold.' },
      { step: 2, title: 'Layer Pieces Right Sides Together', text: 'Lay the front square right side up. Place deep back piece right side down aligning outer edges. Place shallow back piece on top right side down. Back pieces will overlap at center.' },
      { step: 3, title: 'Pin & Stitch Perimeter', text: 'Pin all 4 edges securely. Stitch around perimeter with a 1.2 cm seam allowance, backstitching over the overlapping flap areas for reinforcement.' },
      { step: 4, title: 'Clip Corners & Turn', text: 'Trim corner seam allowances diagonally to reduce bulk. Turn right side out through envelope opening, push corners sharp with a point turner, and press.' }
    ]
  },
  {
    id: 'pants',
    name: 'Tailored Relaxed Pants',
    subtitle: 'Modern wide-leg or tapered trousers with elastic back',
    category: 'Bottoms',
    difficulty: 'Intermediate',
    estimatedHours: '4–5 hrs',
    baseLengthCm: 102,
    lengthMultiplier: 2.2,
    hasSleeves: false,
    isWideGarment: true,
    description: 'Chic wide-leg trousers featuring a flat front waistband, comfort-fit elastic back, slant hip pockets, and clean trouser hems.',
    options: {
      neckline: [],
      sleeves: [],
      hem: [
        { id: 'knee', label: 'Full Length Floor Skim (102 cm)', default: true },
        { id: 'mini', label: 'Cropped Ankle Length (90 cm)' },
        { id: 'midi', label: 'Culottes / Mid-Calf (78 cm)' }
      ],
      pockets: [
        { id: 'slant', label: 'Slant Front Slash Pockets', default: true },
        { id: 'none', label: 'No Pockets' }
      ]
    },
    pieces: [
      {
        id: 'pant-front',
        name: 'Pant Front Leg',
        cutCount: 'Cut 2 Fabric (Mirror Pair)',
        widthRatio: 0.38,
        heightRatio: 1.0,
        hasGrainline: true,
        notches: ['crotch-curve', 'knee-level', 'pocket-notch'],
        description: 'Front leg shaped for flat front waistband.'
      },
      {
        id: 'pant-back',
        name: 'Pant Back Leg',
        cutCount: 'Cut 2 Fabric (Mirror Pair)',
        widthRatio: 0.44,
        heightRatio: 1.0,
        hasGrainline: true,
        notches: ['crotch-curve', 'knee-level', 'inseam-notch'],
        description: 'Back leg cut with extended crotch curve and rise.'
      },
      {
        id: 'pant-pocket-bearer',
        name: 'Pocket Facing & Bag',
        cutCount: 'Cut 2 Front Facing + 2 Pocket Bag',
        widthRatio: 0.24,
        heightRatio: 0.30,
        hasGrainline: true,
        notches: ['slant-edge'],
        description: 'Slanted hip pocket construction.'
      },
      {
        id: 'pant-waistband',
        name: 'Waistband (Flat Front / Elastic Back)',
        cutCount: 'Cut 1 Front + 1 Back',
        widthRatio: 0.70,
        heightRatio: 0.12,
        hasGrainline: true,
        notches: ['side-seam-match'],
        description: 'Flat front for sleek styling, casing in back for elastic comfort.'
      }
    ],
    supplies: [
      { id: 'fabric', item: 'Tencel twill, linen, lightweight wool, cotton chino', qty: '2.2–2.8 m' },
      { id: 'elastic', item: '1.5" (38 mm) Wide knit non-roll elastic for back waist', qty: '0.6 m' },
      { id: 'interfacing', item: 'Fusible interfacing for front waistband', qty: '0.3 m' },
      { id: 'pocket-lining', item: 'Light cotton lawn for pocket bags', qty: '0.4 m' },
      { id: 'thread', item: 'Matching thread', qty: '1 spool' }
    ],
    steps: [
      { step: 1, title: 'Sew Front Slant Pockets', text: 'Sew pocket bag to pant front along slant opening. Clip, understitch, press to inside, then stitch pocket facing to bag along curved bottom edge.' },
      { step: 2, title: 'Inseams', text: 'Pin front and back leg panels right sides together at the inseams, stretching back inseam slightly around knee. Stitch and press open.' },
      { step: 3, title: 'Crotch Seam', text: 'Turn one pant leg right side out and slip inside the other leg right sides together. Match crotch intersections. Stitch from front waist down curve and up to back waist with double reinforced stitching.' },
      { step: 4, title: 'Side Seams', text: 'Stitch outer side seams from waist to hem, catching pocket edge securely. Press seams open.' },
      { step: 5, title: 'Construct Waistband', text: 'Fuse front waistband. Join front and back waistband at side seams. Attach waistband to pants. Thread 38 mm non-roll elastic through back casing, secure at side seams, and stitch in the ditch.' },
      { step: 6, title: 'Trouser Hem', text: 'Try on with planned shoes to verify break. Press up 4 cm, fold under 1 cm, and hand blind-stitch for an invisible couture finish.' }
    ]
  }
];

export const FABRIC_PALETTES = [
  { id: 'onyx-black', name: 'Haute Onyx Noir', color: '#161618', type: 'solid' },
  { id: 'moroccan-gold', name: 'Moroccan Amber Gold', color: '#d4af37', type: 'solid' },
  { id: 'emerald-velvet', name: 'Emerald Jewel Velvet', color: '#134e40', type: 'solid' },
  { id: 'royal-navy', name: 'Royal Midnight Navy', color: '#1a2744', type: 'solid' },
  { id: 'terracotta-clay', name: 'Marrakech Terracotta', color: '#b9533c', type: 'solid' },
  { id: 'linen-natural', name: 'Artisan Natural Linen', color: '#e8dec8', type: 'solid' },
  { id: 'blush-rose', name: 'Dusty Rose Silk', color: '#c7928b', type: 'solid' },
  { id: 'stripes', name: 'Breton Navy Stripe', type: 'pattern', patternId: 'stripe' },
  { id: 'gingham', name: 'Bistro Gingham Check', type: 'pattern', patternId: 'check' },
  { id: 'floral', name: 'Vintage French Floral', type: 'pattern', patternId: 'floral' },
  { id: 'moroccan-zellij', name: 'Moroccan Arabesque Brocade', type: 'pattern', patternId: 'arabesque' }
];
