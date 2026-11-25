/**
 * Sewing Guide & Learning Hub Data
 * - Stitch & Technique Library with SVG diagrams
 * - Searchable Sewing Glossary
 * - Machine & Stitch Troubleshooting Guide
 */

export const STITCH_LIBRARY = [
  {
    id: 'straight-stitch',
    name: 'Straight Stitch',
    category: 'Essential',
    uses: 'Basic seams, basting, topstitching, gathering.',
    description: 'The foundation of sewing. Uses upper and bobbin threads interlocking at the center of the fabric layers.',
    settings: 'Length: 2.5 mm for regular seams, 4–5 mm for basting / gathering. Tension: 4.0.',
    svgType: 'straight'
  },
  {
    id: 'zigzag-stitch',
    name: 'Zigzag Stitch',
    category: 'Finishing & Stretch',
    uses: 'Raw edge finishing, sewing stretch knits, attaching elastic, appliques.',
    description: 'A side-to-side stitch that gives seams flexibility so they will not pop when the fabric stretches.',
    settings: 'Length: 1.5–2.5 mm, Width: 2.0–4.0 mm. Use narrower width for knits.',
    svgType: 'zigzag'
  },
  {
    id: 'backstitch',
    name: 'Backstitch (Securing Seams)',
    category: 'Essential',
    uses: 'Locking thread ends at start and stop of every seam to prevent unraveling.',
    description: 'Sew 3-4 stitches forward, reverse over them, then proceed. Eliminates need for hand knotting.',
    settings: 'Standard length 2.5 mm. Use reverse lever or automatic backstitch button.',
    svgType: 'backstitch'
  },
  {
    id: 'french-seam',
    name: 'French Seam (Couture Finish)',
    category: 'Couture Seams',
    uses: 'Delicate silks, chiffons, linen, and sheer garments with no raw edges visible.',
    description: 'Encloses raw edges inside a neat double seam. Sew first with wrong sides together (5 mm), trim to 3 mm, flip right sides together and stitch 7 mm.',
    settings: 'Straight stitch 2.0–2.5 mm. Requires sharp Microtex needle and crisp pressing.',
    svgType: 'french'
  },
  {
    id: 'hemming',
    name: 'Blind Hem & Double-Fold Hem',
    category: 'Hemming',
    uses: 'Pants, skirts, curtain bottoms, and dresses.',
    description: 'Double-fold encloses raw hem completely with machine topstitch; blind hem catches just one thread of outer fabric for an invisible exterior finish.',
    settings: 'Use blind hem foot with special stitch #4 or #5 on sewing machine.',
    svgType: 'hem'
  },
  {
    id: 'darts',
    name: 'Contour Darts (Shaping)',
    category: 'Shaping',
    uses: 'Sculpting flat fabric to 3D body curves at bust, waist, and hips.',
    description: 'V-shaped wedge sewn from outer edge tapering to nothing at apex. Do not backstitch at apex; tie thread ends in square knot to avoid dimpling.',
    settings: 'Reduce stitch length to 1.5 mm over last 1.5 cm before the apex point.',
    svgType: 'dart'
  },
  {
    id: 'buttonholes',
    name: 'Automatic Buttonholes',
    category: 'Closures',
    uses: 'Shirts, waistbands, caftans, jackets, cushions.',
    description: 'Dense satin zigzag rectangle with bartacks at each end. Cut open with chisel or seam ripper with a pin blocking the end.',
    settings: 'Stitch length 0.4–0.6 mm, automatic 1-step or 4-step buttonhole foot.',
    svgType: 'buttonhole'
  },
  {
    id: 'sfifa-aakad',
    name: 'Moroccan Sfifa & Aakad Attachment',
    category: 'Moroccan Couture',
    uses: 'Moroccan Kaftans, Djellabas, Takchitas, and traditional festive tunics.',
    description: 'Sfifa is braided metallic or silk trim applied along center-front plackets and cuffs. Kitane piping is basted along the edge first, then Sfifa is edgestitched flat, and handmade Aakad buttons are sewn through loops.',
    settings: 'Fine silk or polyester thread, zipper foot or edge guide foot, stitch length 2.2 mm.',
    svgType: 'sfifa'
  }
];

export const GLOSSARY = [
  {
    term: 'Selvage (Selvedge)',
    definition: 'The tightly woven factory-finished border running down both lengthwise edges of a fabric bolt. It does not fray and runs parallel to the lengthwise grain.',
    tag: 'Fabric'
  },
  {
    term: 'Grainline',
    definition: 'The orientation of warp (lengthwise) and weft (crosswise) threads. Patterns contain an arrow that must be aligned exactly parallel to the fabric selvage to ensure the garment hangs straight.',
    tag: 'Pattern'
  },
  {
    term: 'Bias (True Bias)',
    definition: 'The 45-degree diagonal angle across warp and weft threads. Fabric cut on the bias has maximum natural stretch and fluid drape, ideal for cowls and neck bindings.',
    tag: 'Fabric'
  },
  {
    term: 'Ease (Wearing vs. Design)',
    definition: 'The difference between body measurements and finished garment dimensions. Wearing ease allows breathing, sitting, and walking; design ease creates stylistic fullness or oversized volume.',
    tag: 'Fitting'
  },
  {
    term: 'Seam Allowance (SA)',
    definition: 'The distance between the stitching line and the raw cut edge of the fabric. Common standard allowances are 1.5 cm (5/8 in) for woven garments and 0.6–1.0 cm (1/4–3/8 in) for knits.',
    tag: 'Technique'
  },
  {
    term: 'Notch',
    definition: 'Small marks or triangular outward snips on pattern edges used to align adjoining pieces (e.g. matching sleeve cap to shoulder seam or front and back side seams).',
    tag: 'Pattern'
  },
  {
    term: 'Nap (Directional Pile)',
    definition: 'A textured fabric surface (such as velvet, corduroy, or brushed fleece) or directional print that looks different when brushed up vs. down. All pattern pieces must be cut facing the same direction.',
    tag: 'Fabric'
  },
  {
    term: 'Staystitching',
    definition: 'A line of straight stitching placed 3 mm inside the seam line on curved or bias edges (like necklines and armholes) right after cutting to prevent them from stretching out of shape during handling.',
    tag: 'Technique'
  },
  {
    term: 'Facing',
    definition: 'A fabric piece cut to match the shape of a garment opening (neckline, armhole, or hem) sewn to the raw edge and turned to the inside to create a clean, unsupported edge finish.',
    tag: 'Garment'
  },
  {
    term: 'Understitching',
    definition: 'Stitching the seam allowances to the facing or lining piece 2 mm from the seam line. This prevents the facing from rolling out and showing on the outside of the finished garment.',
    tag: 'Technique'
  },
  {
    term: 'Basting',
    definition: 'Long, loose temporary stitches (by hand or machine at 4–5 mm) used to hold fabric layers together for fitting or gathering, easily pulled out later.',
    tag: 'Technique'
  },
  {
    term: 'Grading (Graduated Seam)',
    definition: 'Trimming seam allowances to different widths (e.g., cutting the garment side to 6 mm and facing to 3 mm) to avoid a noticeable raised ridge on the outside of pressed garments.',
    tag: 'Technique'
  },
  {
    term: 'Sfifa (Moroccan)',
    definition: 'Artisanal woven metallic gold, silver, or silk trim traditionally sewn down the center front, collar, and cuffs of Moroccan Kaftans and Djellabas.',
    tag: 'Moroccan'
  },
  {
    term: 'Aakad (Moroccan)',
    definition: 'Intricately hand-woven spherical silk or sabra thread buttons used as decorative and functional fasteners on traditional Moroccan garments.',
    tag: 'Moroccan'
  },
  {
    term: 'Qob (Moroccan)',
    definition: 'The signature triangular pointed hood found on authentic Moroccan Djellabas, designed to shield from sun and mountain winds, often decorated with a silk tassel (Chousha).',
    tag: 'Moroccan'
  }
];

export const TROUBLESHOOTING = [
  {
    problem: 'Puckering Seams (Fabric wrinkles along stitch line)',
    causes: [
      'Needle is dull, burred, or too thick for fine fabric.',
      'Upper thread tension is set too tight.',
      'Stitch length is too short for light, dense fabrics like chiffon or silk.',
      'Pulling or pushing fabric through the feed dogs by hand.'
    ],
    fixes: [
      'Install a brand-new Microtex or Sharp needle (size 70/10 or 60/8).',
      'Lower top tension dial slightly (e.g. from 4 to 3).',
      'Increase stitch length to 2.5–3.0 mm.',
      'Place tissue paper or tear-away stabilizer underneath slippery fabrics while sewing.'
    ]
  },
  {
    problem: 'Skipped Stitches (Needle enters fabric without interlocking)',
    causes: [
      'Needle type does not match fabric (e.g. using universal needle on high-stretch spandex/jersey).',
      'Needle is bent, blunt, or inserted backwards with flat side facing wrong way.',
      'Lint buildup inside bobbin race and feed dogs.'
    ],
    fixes: [
      'Switch to a dedicated Ballpoint or Stretch needle for knits.',
      'Ensure the needle is inserted all the way up with the flat side facing the back.',
      'Remove needle plate, blow or brush out lint from around bobbin case.'
    ]
  },
  {
    problem: 'Thread Bunching / Birdnesting on Underside of Fabric',
    causes: [
      'Upper thread was threaded while presser foot was down (tension discs remained clamped shut).',
      'Upper thread missed the take-up lever.',
      'Bobbin is inserted backwards (thread unwinds in the wrong clockwise/counterclockwise direction).'
    ],
    fixes: [
      'Raise presser foot and completely re-thread the upper thread from spool through every guide and take-up lever.',
      'Check bobbin orientation: for drop-in bobbins, thread should form the letter "P" when pulled.',
      'Hold both upper and bobbin thread tails firmly behind the presser foot for the first 3 stitches.'
    ]
  },
  {
    problem: 'Wavy, Stretched Seams on Knits',
    causes: [
      'Feed dogs stretching knit fabric as it feeds through.',
      'Presser foot pressure is too high.',
      'Using a rigid straight stitch instead of a stretch or zigzag stitch.'
    ],
    fixes: [
      'Use a Walking Foot (even feed foot) so top and bottom layers move synchronously.',
      'Reduce presser foot pressure dial if your machine has one.',
      'Sew with a narrow zigzag (0.5 mm width, 2.5 mm length) or lightning stretch stitch.',
      'Steam the seam thoroughly with an iron to bounce fibers back into shape.'
    ]
  },
  {
    problem: 'Needle Snapping or Breaking',
    causes: [
      'Sewing over thick pins or thick seam intersections.',
      'Pulling fabric manually, causing the needle to deflect and hit the needle plate.',
      'Needle clamp screw is loose.'
    ],
    fixes: [
      'Remove pins right before the presser foot reaches them; never sew over pins.',
      'Let the machine feed dogs feed the fabric naturally; only gently guide the fabric edge.',
      'Hand-turn balance wheel toward you when crossing heavy bulky seams.'
    ]
  }
];
