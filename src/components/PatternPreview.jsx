import React from 'react';
import { FABRIC_PALETTES } from '../data/garments';
import { formatMeasurement, cmToInch } from '../utils/calculations';
import { ScissorsIcon, SparklesIcon, CheckIcon } from './Icons';

/**
 * High-Resolution SVG Pattern Definitions for fabric preview
 */
export function PatternDefs() {
  return (
    <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
      <defs>
        {/* Breton Stripe */}
        <pattern id="pattern-stripe" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="12" fill="#faf8f5" />
          <rect y="12" width="24" height="12" fill="#141a29" />
        </pattern>

        {/* Gingham Check */}
        <pattern id="pattern-check" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#f1ece1" />
          <rect x="12" width="12" height="12" fill="#a48c68" />
          <rect y="12" width="12" height="12" fill="#a48c68" />
          <rect x="12" y="12" width="12" height="12" fill="#66543b" />
        </pattern>

        {/* Vintage French Floral */}
        <pattern id="pattern-floral" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#201c1e" />
          <circle cx="20" cy="20" r="6" fill="#c2654a" />
          <circle cx="14" cy="16" r="4.5" fill="#e07a5f" />
          <circle cx="26" cy="16" r="4.5" fill="#e07a5f" />
          <circle cx="16" cy="24" r="4.5" fill="#e07a5f" />
          <circle cx="24" cy="24" r="4.5" fill="#e07a5f" />
          <circle cx="20" cy="20" r="3" fill="#f4d06f" />
          <path d="M8 8 C12 10 14 14 11 18" stroke="#3d5a45" strokeWidth="1.5" fill="none" />
          <path d="M32 32 C28 30 26 26 29 22" stroke="#3d5a45" strokeWidth="1.5" fill="none" />
        </pattern>

        {/* Moroccan Arabesque Zellij / Brocade Motif */}
        <pattern id="pattern-arabesque" width="36" height="36" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" fill="#0d0d12" />
          {/* Interlocking geometric gold stars */}
          <path d="M18 0 L36 18 L18 36 L0 18 Z" fill="none" stroke="#d4af37" strokeWidth="1.2" />
          <rect x="9" y="9" width="18" height="18" fill="none" stroke="#aa8022" strokeWidth="1" />
          <circle cx="18" cy="18" r="4" fill="#d4af37" />
          <circle cx="18" cy="18" r="1.5" fill="#0d0d12" />
          <circle cx="0" cy="0" r="2" fill="#d4af37" />
          <circle cx="36" cy="0" r="2" fill="#d4af37" />
          <circle cx="0" cy="36" r="2" fill="#d4af37" />
          <circle cx="36" cy="36" r="2" fill="#d4af37" />
        </pattern>

        {/* Realistic Fabric Drape Shading Filter */}
        <filter id="fabricDrape" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * 2D Haute Couture Finished Garment Illustration
 */
function GarmentMockup({ garment, options, selectedPalette }) {
  const isPattern = selectedPalette.type === 'pattern';
  const fillValue = isPattern ? `url(#pattern-${selectedPalette.patternId})` : selectedPalette.color;
  const isDarkColor = selectedPalette.color === '#161618' || selectedPalette.id === 'royal-navy' || selectedPalette.id === 'emerald-velvet' || selectedPalette.id === 'moroccan-zellij';
  const strokeColor = isDarkColor ? '#e8c874' : '#292524';

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-stone-100 to-white dark:from-[#16161e] dark:to-[#0f0f14] rounded-3xl border border-[#d4af37]/30 relative min-h-[440px] shadow-2xl overflow-hidden">
      {/* Background atelier aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-80 bg-[#d4af37]/6 rounded-full blur-3xl pointer-events-none" />

      {/* Header labels */}
      <div className="absolute top-4 left-5 flex items-center gap-2 text-xs font-serif font-bold text-[#fceec5]">
        <SparklesIcon className="w-4 h-4 text-[#d4af37]" />
        Haute Couture Studio Mockup
      </div>
      <div className="absolute top-4 right-5 text-[11px] font-mono bg-[#1f1f2a] px-3 py-1 rounded-full border border-[#d4af37]/30 text-[#fceec5] shadow-sm">
        {selectedPalette.name}
      </div>

      <svg viewBox="0 0 260 350" className="w-64 sm:w-72 h-88 select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        {/* Moroccan Kaftan / Djellaba */}
        {garment.id === 'moroccan-kaftan' && (
          <g>
            {/* Subtle under-robe shadow */}
            <path
              d={
                options.hem === 'midi'
                  ? 'M92 48 L168 48 L188 150 L198 250 L62 250 L72 150 Z'
                  : 'M92 48 L168 48 L194 150 L212 315 L48 315 L66 150 Z'
              }
              fill="rgba(0,0,0,0.4)"
              transform="translate(0, 4)"
            />

            {/* Main flowing Kaftan flared silhouette */}
            <path
              d={
                options.hem === 'midi'
                  ? 'M92 48 C110 50, 150 50, 168 48 L188 150 C194 200, 196 235, 198 250 L62 250 C64 235, 66 200, 72 150 Z'
                  : 'M92 48 C110 50, 150 50, 168 48 L194 150 C204 220, 208 275, 212 315 L48 315 C52 275, 56 220, 66 150 Z'
              }
              fill={fillValue}
              stroke={strokeColor}
              strokeWidth="2.2"
            />

            {/* Luxurious Fabric Draping Folds (vertical shadows) */}
            <path d="M105 140 Q100 220 95 315" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
            <path d="M155 140 Q160 220 165 315" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
            <path d="M130 140 L130 315" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />

            {/* Sleeves */}
            {options.sleeves === 'long' && (
              <g>
                {/* Left flared bell sleeve */}
                <path d="M92 48 L28 125 L45 148 L74 100 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
                {/* Right flared bell sleeve */}
                <path d="M168 48 L232 125 L215 148 L186 100 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
                {/* Shimmering Gold Sfifa sleeve cuff borders */}
                <line x1="28" y1="125" x2="45" y2="148" stroke="#d4af37" strokeWidth="5" />
                <line x1="28" y1="125" x2="45" y2="148" stroke="#fff5d0" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="232" y1="125" x2="215" y2="148" stroke="#d4af37" strokeWidth="5" />
                <line x1="232" y1="125" x2="215" y2="148" stroke="#fff5d0" strokeWidth="1.5" strokeDasharray="2 2" />
              </g>
            )}

            {options.sleeves === 'threeQuarter' && (
              <g>
                <path d="M92 48 L46 105 L60 120 L76 90 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
                <path d="M168 48 L214 105 L200 120 L184 90 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
                <line x1="46" y1="105" x2="60" y2="120" stroke="#d4af37" strokeWidth="4.5" />
                <line x1="214" y1="105" x2="200" y2="120" stroke="#d4af37" strokeWidth="4.5" />
              </g>
            )}

            {options.sleeves === 'short' && (
              <g>
                <path d="M92 48 L65 82 L78 98 L82 76 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
                <path d="M168 48 L195 82 L182 98 L178 76 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
              </g>
            )}

            {/* Traditional Moroccan Gold Belt (Mdamma) */}
            <rect x="94" y="132" width="72" height="12" rx="3" fill="#d4af37" stroke="#78550a" strokeWidth="1" />
            <circle cx="130" cy="138" r="4.5" fill="#fceec5" stroke="#78550a" strokeWidth="1" />
            <circle cx="130" cy="138" r="2" fill="#d4af37" />

            {/* Center Front Sfifa Gold Placket */}
            <line x1="130" y1="48" x2="130" y2={options.hem === 'midi' ? 250 : 315} stroke="#d4af37" strokeWidth="6" />
            <line x1="130" y1="48" x2="130" y2={options.hem === 'midi' ? 250 : 315} stroke="#fff1c5" strokeWidth="1.8" strokeDasharray="3 2" />

            {/* Handmade Aakad Buttons along chest */}
            {[66, 80, 94, 108, 122].map((y) => (
              <g key={y}>
                <circle cx="130" cy={y} r="3" fill="#fceec5" stroke="#78550a" strokeWidth="1" />
                <circle cx="130" cy={y} r="1.2" fill="#d4af37" />
              </g>
            ))}

            {/* Neckline variations */}
            {options.neckline === 'djellaba-hood' ? (
              // Moroccan pointed Qob hood
              <g>
                <path d="M96 48 Q130 76 164 48 Q178 12 130 2 Q82 12 96 48 Z" fill={fillValue} stroke="#d4af37" strokeWidth="2.2" />
                <line x1="130" y1="2" x2="130" y2="-8" stroke="#d4af37" strokeWidth="2" />
                {/* Silk Tassel (Chousha) */}
                <circle cx="130" cy="-9" r="3.5" fill="#d4af37" />
                <path d="M127 -6 L124 2 M130 -6 L130 3 M133 -6 L136 2" stroke="#d4af37" strokeWidth="1.5" />
              </g>
            ) : (
              // Royal Caftan V-Collar with gold edging
              <path d="M102 48 Q130 86 158 48" fill="none" stroke="#d4af37" strokeWidth="3.5" strokeLinecap="round" />
            )}

            {/* Traditional Side Slits (Fethate) */}
            {options.pockets === 'side-slit' && (
              <g>
                <line x1="48" y1="315" x2="56" y2="265" stroke="#d4af37" strokeWidth="3.5" />
                <line x1="212" y1="315" x2="204" y2="265" stroke="#d4af37" strokeWidth="3.5" />
              </g>
            )}
          </g>
        )}

        {/* A-Line Skirt */}
        {garment.id === 'a-line-skirt' && (
          <g>
            <path
              d={
                options.hem === 'mini'
                  ? 'M85 85 L175 85 L205 195 L55 195 Z'
                  : options.hem === 'maxi'
                  ? 'M85 85 L175 85 L225 315 L35 315 Z'
                  : 'M85 85 L175 85 L215 255 L45 255 Z'
              }
              fill={fillValue}
              stroke={strokeColor}
              strokeWidth="2.2"
            />
            {/* Waistband */}
            <rect x="85" y="73" width="90" height="14" rx="3" fill={fillValue} stroke={strokeColor} strokeWidth="1.8" />
            <line x1="110" y1="87" x2="111" y2="115" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="150" y1="87" x2="149" y2="115" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" />
            {options.pockets === 'patch' && (
              <g>
                <rect x="74" y="135" width="32" height="36" rx="4" fill={fillValue} stroke={strokeColor} strokeWidth="1.8" />
                <rect x="154" y="135" width="32" height="36" rx="4" fill={fillValue} stroke={strokeColor} strokeWidth="1.8" />
              </g>
            )}
          </g>
        )}

        {/* T-Shirt */}
        {garment.id === 't-shirt' && (
          <g>
            <path
              d={
                options.hem === 'mini'
                  ? 'M85 68 L175 68 L180 185 L80 185 Z'
                  : options.hem === 'midi'
                  ? 'M85 68 L175 68 L182 275 L78 275 Z'
                  : 'M85 68 L175 68 L180 235 L80 235 Z'
              }
              fill={fillValue}
              stroke={strokeColor}
              strokeWidth="2.2"
            />
            {options.sleeves === 'long' ? (
              <g>
                <path d="M85 68 L36 165 L56 175 L82 108 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
                <path d="M175 68 L224 165 L204 175 L178 108 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
              </g>
            ) : options.sleeves === 'short' ? (
              <g>
                <path d="M85 68 L52 102 L68 118 L82 96 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
                <path d="M175 68 L208 102 L192 118 L178 96 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
              </g>
            ) : null}
            {options.neckline === 'v-neck' ? (
              <path d="M110 68 L130 96 L150 68" fill="none" stroke={strokeColor} strokeWidth="3" />
            ) : options.neckline === 'scoop' ? (
              <path d="M106 68 Q130 102 154 68" fill="none" stroke={strokeColor} strokeWidth="3" />
            ) : (
              <path d="M110 68 Q130 84 150 68" fill="none" stroke={strokeColor} strokeWidth="3" />
            )}
            {options.pockets === 'patch' && (
              <rect x="96" y="115" width="22" height="24" rx="3" fill={fillValue} stroke={strokeColor} strokeWidth="1.5" />
            )}
          </g>
        )}

        {/* Simple Dress */}
        {garment.id === 'simple-dress' && (
          <g>
            <path
              d={
                options.hem === 'mini'
                  ? 'M88 62 L172 62 L184 125 L204 215 L56 215 L76 125 Z'
                  : options.hem === 'midi'
                  ? 'M88 62 L172 62 L184 125 L215 305 L45 305 L76 125 Z'
                  : 'M88 62 L172 62 L184 125 L208 260 L52 260 L76 125 Z'
              }
              fill={fillValue}
              stroke={strokeColor}
              strokeWidth="2.2"
            />
            {options.sleeves === 'short' && (
              <g>
                <path d="M88 62 L60 90 L74 104 L82 85 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
                <path d="M172 62 L200 90 L186 104 L178 85 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
              </g>
            )}
            {options.sleeves === 'threeQuarter' && (
              <g>
                <path d="M88 62 L50 120 L66 132 L82 95 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
                <path d="M172 62 L210 120 L194 132 L178 95 Z" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
              </g>
            )}
            {options.neckline === 'boat' ? (
              <path d="M98 62 Q130 72 162 62" fill="none" stroke={strokeColor} strokeWidth="3" />
            ) : options.neckline === 'v-neck' ? (
              <path d="M110 62 L130 92 L150 62" fill="none" stroke={strokeColor} strokeWidth="3" />
            ) : (
              <path d="M108 62 Q130 90 152 62" fill="none" stroke={strokeColor} strokeWidth="3" />
            )}
            {/* Bust Darts */}
            <line x1="76" y1="112" x2="105" y2="108" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="184" y1="112" x2="155" y2="108" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" />
          </g>
        )}

        {/* Tote Bag */}
        {garment.id === 'tote-bag' && (
          <g>
            <rect x="65" y="110" width="130" height="160" rx="6" fill={fillValue} stroke={strokeColor} strokeWidth="2.2" />
            <line x1="65" y1="245" x2="85" y2="270" stroke={strokeColor} strokeWidth="1.8" strokeDasharray="3 2" />
            <line x1="195" y1="245" x2="175" y2="270" stroke={strokeColor} strokeWidth="1.8" strokeDasharray="3 2" />
            <path d="M92 110 V45 H108 V110" fill="none" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M152 110 V45 H168 V110" fill="none" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" />
            <line x1="65" y1="125" x2="195" y2="125" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        )}

        {/* Pillow Cover */}
        {garment.id === 'pillow-cover' && (
          <g>
            <rect x="55" y="75" width="150" height="150" rx="8" fill={fillValue} stroke={strokeColor} strokeWidth="2.2" />
            <line x1="140" y1="75" x2="140" y2="225" stroke={strokeColor} strokeWidth="2" strokeDasharray="4 3" />
            <rect x="62" y="82" width="136" height="136" rx="5" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="3 2" />
          </g>
        )}

        {/* Pants */}
        {garment.id === 'pants' && (
          <g>
            <rect x="80" y="58" width="100" height="16" rx="3" fill={fillValue} stroke={strokeColor} strokeWidth="2" />
            <path
              d={
                options.hem === 'mini'
                  ? 'M80 74 L75 230 L122 230 L130 135 L138 135 L146 230 L193 230 L180 74 Z'
                  : 'M80 74 L68 310 L122 310 L130 150 L138 150 L146 310 L200 310 L180 74 Z'
              }
              fill={fillValue}
              stroke={strokeColor}
              strokeWidth="2.2"
            />
            {options.pockets === 'slant' && (
              <g>
                <line x1="88" y1="74" x2="76" y2="108" stroke={strokeColor} strokeWidth="2" />
                <line x1="172" y1="74" x2="184" y2="108" stroke={strokeColor} strokeWidth="2" />
              </g>
            )}
            <line x1="96" y1="78" x2="96" y2="300" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="164" y1="78" x2="164" y2="300" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
}

/**
 * Authentic CAD-Style Scaled Flat Pattern Piece Blueprint
 */
function FlatPatternSheet({ garment, piece, seamAllowanceCm, measurements, unit }) {
  const baseWidthCm = Math.round((measurements.bust || 92) * (piece.widthRatio || 0.45));
  const baseHeightCm = Math.round((garment.baseLengthCm || 70) * (piece.heightRatio || 0.8));

  const svgW = 280;
  const svgH = 320;
  const pad = 24;
  const saOffset = Math.min(16, Math.max(6, seamAllowanceCm * 7.5));

  return (
    <div className="bg-[#121217] border border-[#d4af37]/20 rounded-3xl p-5 flex flex-col items-center justify-between shadow-xl relative group hover:border-[#d4af37]/60 transition-all">
      {/* Pattern Piece Header */}
      <div className="w-full flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
            {piece.name}
          </h4>
          <span className="text-[10px] font-mono text-[#d4af37] font-bold bg-[#d4af37]/15 border border-[#d4af37]/30 px-2 py-0.5 rounded">
            {piece.cutCount}
          </span>
        </div>
        <div className="text-right text-[11px] font-mono text-stone-400">
          <div>W: {formatMeasurement(baseWidthCm, unit)}</div>
          <div>L: {formatMeasurement(baseHeightCm, unit)}</div>
        </div>
      </div>

      {/* SVG Drafting Mat with Precision Millimeter Grid */}
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-56 select-none my-1" aria-label={`Pattern schematic for ${piece.name}`}>
        <defs>
          <pattern id={`draftGrid-${piece.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(212, 175, 55, 0.08)" strokeWidth="0.8" />
          </pattern>
        </defs>

        <rect width={svgW} height={svgH} fill={`url(#draftGrid-${piece.id})`} rx="12" />

        {/* Outer Cutting Line (Curved blueprint contour) */}
        <path
          d={`
            M ${pad + 20} ${pad}
            Q ${svgW / 2} ${pad + 6} ${svgW - pad - 20} ${pad}
            C ${svgW - pad} ${pad + 30}, ${svgW - pad - 10} ${svgH / 2}, ${svgW - pad} ${svgH - pad}
            Q ${svgW / 2} ${svgH - pad - 6} ${pad} ${svgH - pad}
            C ${pad + 10} ${svgH / 2}, ${pad} ${pad + 30}, ${pad + 20} ${pad}
            Z
          `}
          fill="rgba(212, 175, 55, 0.04)"
          stroke="#d4af37"
          strokeWidth="2.2"
        />

        {/* Dashed Seam Allowance Line */}
        <path
          d={`
            M ${pad + 20 + saOffset} ${pad + saOffset}
            Q ${svgW / 2} ${pad + 6 + saOffset} ${svgW - pad - 20 - saOffset} ${pad + saOffset}
            C ${svgW - pad - saOffset} ${pad + 30}, ${svgW - pad - 10 - saOffset} ${svgH / 2}, ${svgW - pad - saOffset} ${svgH - pad - saOffset}
            Q ${svgW / 2} ${svgH - pad - 6 - saOffset} ${pad + saOffset} ${svgH - pad - saOffset}
            C ${pad + 10 + saOffset} ${svgH / 2}, ${pad + saOffset} ${pad + 30}, ${pad + 20 + saOffset} ${pad + saOffset}
            Z
          `}
          fill="none"
          stroke="#e5c07b"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Grainline Arrow */}
        {piece.hasGrainline && (
          <g>
            <line
              x1={svgW / 2}
              y1={pad + 35}
              x2={svgW / 2}
              y2={svgH - pad - 35}
              stroke="#d4af37"
              strokeWidth="2"
            />
            <polyline
              points={`${svgW / 2 - 6},${pad + 45} ${svgW / 2},${pad + 35} ${svgW / 2 + 6},${pad + 45}`}
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
            />
            <polyline
              points={`${svgW / 2 - 6},${svgH - pad - 45} ${svgW / 2},${svgH - pad - 35} ${svgW / 2 + 6},${svgH - pad - 45}`}
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
            />
            <text
              x={svgW / 2 + 9}
              y={svgH / 2}
              className="fill-[#fceec5] text-[10px] font-mono font-bold tracking-widest"
              transform={`rotate(90, ${svgW / 2 + 9}, ${svgH / 2})`}
            >
              GRAINLINE / DROIT-FIL
            </text>
          </g>
        )}

        {/* Precision Notches along Cutting Perimeter */}
        <polygon points={`${svgW / 2 - 5},${pad} ${svgW / 2},${pad - 7} ${svgW / 2 + 5},${pad}`} fill="#d4af37" />
        <polygon points={`${pad},${svgH / 2 - 5} ${pad - 7},${svgH / 2} ${pad},${svgH / 2 + 5}`} fill="#d4af37" />
        <polygon points={`${svgW - pad},${svgH / 2 - 10} ${svgW - pad + 7},${svgH / 2 - 6} ${svgW - pad},${svgH / 2 - 2}`} fill="#d4af37" />
        <polygon points={`${svgW - pad},${svgH / 2 + 2} ${svgW - pad + 7},${svgH / 2 + 6} ${svgW - pad},${svgH / 2 + 10}`} fill="#d4af37" />

        {/* Seam Allowance Indicator Badge */}
        <text
          x={pad + saOffset + 6}
          y={pad + saOffset + 14}
          className="fill-[#fceec5] text-[10px] font-mono font-bold"
        >
          SA: {seamAllowanceCm} cm ({cmToInch(seamAllowanceCm)}" in)
        </text>
      </svg>

      <p className="text-[11px] text-stone-400 text-center line-clamp-1 mt-2">
        {piece.description}
      </p>
    </div>
  );
}

export default function PatternPreview({
  garments,
  activeGarment,
  onSelectGarment,
  options,
  onChangeOption,
  measurements,
  seamAllowanceCm,
  onChangeSeamAllowance,
  selectedPalette,
  onSelectPalette,
  unit
}) {
  return (
    <div className="space-y-6">
      <PatternDefs />

      {/* Garment Selector Tabs */}
      <div className="bg-[#121217] border border-[#d4af37]/20 rounded-3xl p-4 sm:p-5 shadow-xl">
        <label className="block text-xs font-mono font-bold text-[#d4af37] uppercase tracking-wider mb-3">
          Select Garment Template
        </label>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {garments.map((g) => {
            const isActive = activeGarment.id === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => onSelectGarment(g)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b89228] text-[#0c0c0e] font-bold shadow-lg shadow-[#d4af37]/20 scale-102'
                    : 'bg-[#181822] text-stone-300 border border-stone-800 hover:border-stone-700 hover:text-white'
                }`}
              >
                <span>{g.name}</span>
                {g.id === 'moroccan-kaftan' && (
                  <span className="text-[9px] bg-[#221707] text-[#fceec5] border border-[#d4af37]/50 px-1.5 py-0.5 rounded font-bold uppercase">
                    Couture
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Customizer: Options + Fabric Palette + Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Options Controls & Fabric Swatches */}
        <div className="lg:col-span-7 bg-[#121217] border border-[#d4af37]/20 rounded-3xl p-6 shadow-xl space-y-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-[#d4af37]" />
              {activeGarment.name} Customizer
            </h3>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              {activeGarment.description}
            </p>
          </div>

          {/* Option Groups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeGarment.options.neckline && activeGarment.options.neckline.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-[#fceec5] mb-2">
                  Neckline & Collar
                </label>
                <select
                  value={options.neckline || activeGarment.options.neckline[0].id}
                  onChange={(e) => onChangeOption('neckline', e.target.value)}
                  className="w-full text-xs bg-[#1a1a24] border border-stone-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  {activeGarment.options.neckline.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-[#121217]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeGarment.options.sleeves && activeGarment.options.sleeves.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-[#fceec5] mb-2">
                  Sleeve Style & Length
                </label>
                <select
                  value={options.sleeves || activeGarment.options.sleeves[0].id}
                  onChange={(e) => onChangeOption('sleeves', e.target.value)}
                  className="w-full text-xs bg-[#1a1a24] border border-stone-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  {activeGarment.options.sleeves.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-[#121217]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeGarment.options.hem && activeGarment.options.hem.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-[#fceec5] mb-2">
                  Hem Length
                </label>
                <select
                  value={options.hem || activeGarment.options.hem[0].id}
                  onChange={(e) => onChangeOption('hem', e.target.value)}
                  className="w-full text-xs bg-[#1a1a24] border border-stone-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  {activeGarment.options.hem.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-[#121217]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeGarment.options.pockets && activeGarment.options.pockets.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-[#fceec5] mb-2">
                  Pockets & Slits
                </label>
                <select
                  value={options.pockets || activeGarment.options.pockets[0].id}
                  onChange={(e) => onChangeOption('pockets', e.target.value)}
                  className="w-full text-xs bg-[#1a1a24] border border-stone-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                >
                  {activeGarment.options.pockets.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-[#121217]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Seam Allowance Slider */}
          <div className="pt-3 border-t border-stone-800">
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="font-semibold text-[#fceec5] flex items-center gap-2">
                <ScissorsIcon className="w-4 h-4 text-[#d4af37]" />
                Adjustable Seam Allowance (SA)
              </span>
              <span className="font-mono font-bold text-[#d4af37] bg-[#d4af37]/15 border border-[#d4af37]/40 px-2.5 py-0.5 rounded-full">
                {seamAllowanceCm} cm ({cmToInch(seamAllowanceCm)}" in)
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={seamAllowanceCm}
              onChange={(e) => onChangeSeamAllowance(parseFloat(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1.5 font-mono">
              <span>0.5 cm (1/4 in) Knits</span>
              <span>1.0 cm (3/8 in)</span>
              <span>1.5 cm (5/8 in) Standard</span>
              <span>2.0 cm (3/4 in) French Seams</span>
            </div>
          </div>

          {/* Fabric Color & Pattern Picker */}
          <div className="pt-3 border-t border-stone-800">
            <label className="block text-xs font-semibold text-[#fceec5] mb-2.5">
              Fabric Color & Woven Pattern
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {FABRIC_PALETTES.map((palette) => {
                const isSelected = selectedPalette.id === palette.id;
                return (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => onSelectPalette(palette)}
                    title={palette.name}
                    className={`h-12 rounded-2xl border flex items-center justify-center relative overflow-hidden transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-[#d4af37] scale-105 shadow-lg shadow-[#d4af37]/20 border-[#d4af37]'
                        : 'border-stone-700/80 hover:border-stone-500'
                    }`}
                    style={
                      palette.type === 'solid'
                        ? { backgroundColor: palette.color }
                        : {}
                    }
                  >
                    {palette.type === 'pattern' && (
                      <div className="w-full h-full flex items-center justify-center bg-[#1c1c24]">
                        <span className="text-[10px] font-bold text-[#fceec5] capitalize">
                          {palette.patternId}
                        </span>
                      </div>
                    )}
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-black/80 flex items-center justify-center text-[#d4af37] shadow-sm">
                        <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
              <label
                title="Choose a custom fabric color"
                className={`h-12 rounded-2xl border flex items-center justify-center relative overflow-hidden transition-all cursor-pointer ${
                  selectedPalette.id === 'custom-color'
                    ? 'ring-2 ring-[#d4af37] scale-105 shadow-lg shadow-[#d4af37]/20 border-[#d4af37]'
                    : 'border-stone-700/80 hover:border-stone-500'
                }`}
                style={{
                  backgroundColor:
                    selectedPalette.type === 'solid' ? selectedPalette.color : '#d4af37'
                }}
              >
                <input
                  type="color"
                  aria-label="Choose a custom fabric color"
                  value={
                    selectedPalette.type === 'solid' ? selectedPalette.color : '#d4af37'
                  }
                  onChange={(event) =>
                    onSelectPalette({
                      id: 'custom-color',
                      name: 'Custom Color',
                      type: 'solid',
                      color: event.target.value
                    })
                  }
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                {selectedPalette.id === 'custom-color' && (
                  <span className="pointer-events-none w-5 h-5 rounded-full bg-black/80 flex items-center justify-center text-[#d4af37] shadow-sm">
                    <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Right: 2D Finished Mockup */}
        <div className="lg:col-span-5">
          <GarmentMockup
            garment={activeGarment}
            options={options}
            selectedPalette={selectedPalette}
          />
        </div>
      </div>

      {/* Flat Pattern Pieces Grid */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <ScissorsIcon className="w-5 h-5 text-[#d4af37]" />
              Flat Pattern Pieces (Drafted to Measurements)
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              CAD-style scaled drafting schematics with seam allowance, grainlines, notches, and cut instructions.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#d4af37] bg-[#d4af37]/15 border border-[#d4af37]/30 px-3 py-1 rounded-full">
            {activeGarment.pieces.length} Pattern Pieces
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeGarment.pieces.map((piece) => (
            <FlatPatternSheet
              key={piece.id}
              garment={activeGarment}
              piece={piece}
              seamAllowanceCm={seamAllowanceCm}
              measurements={measurements}
              unit={unit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
