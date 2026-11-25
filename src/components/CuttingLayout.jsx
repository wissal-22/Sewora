import React, { useState } from 'react';
import { ScissorsIcon } from './Icons';

export default function CuttingLayout({
  garment,
  sizeLabel,
  fabricWidthCm = 140,
  unit = 'cm'
}) {
  const [foldMode, setFoldMode] = useState('lengthwise'); // 'lengthwise' | 'single'

  // Approximate scaled layout rendering for SVG
  const boltWidth = 700;
  const boltHeight = 360;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ScissorsIcon className="w-4 h-4 text-amber-600" />
              Cutting Layout & Fabric Marker ({garment.name} - Size {sizeLabel})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Arranged for {fabricWidthCm} {unit} fabric bolt width. Follow grainlines to prevent garment twisting.
            </p>
          </div>

          {/* Fold Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFoldMode('lengthwise')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                foldMode === 'lengthwise'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Folded (Selvage to Selvage)
            </button>
            <button
              type="button"
              onClick={() => setFoldMode('single')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                foldMode === 'single'
                  ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Single Layer (Flat)
            </button>
          </div>
        </div>

        {/* Fabric Rectangle Schematic */}
        <div className="relative overflow-x-auto p-2 bg-stone-50 dark:bg-stone-950/60 rounded-xl border border-stone-200 dark:border-stone-800">
          <svg viewBox={`0 0 ${boltWidth} ${boltHeight}`} className="w-full min-w-[620px] select-none">
            {/* Fabric Bolt Base */}
            <rect
              x="25"
              y="25"
              width={boltWidth - 50}
              height={boltHeight - 50}
              fill="rgba(212, 175, 55, 0.04)"
              stroke="#a8a29e"
              strokeWidth="2"
              strokeDasharray="4 4"
              rx="6"
            />

            {/* Top Selvage */}
            <line x1="25" y1="25" x2={boltWidth - 25} y2="25" stroke="#78716c" strokeWidth="4" />
            <text x="35" y="18" className="fill-stone-500 dark:fill-stone-400 text-[10px] font-mono tracking-widest font-semibold uppercase">
              ↑ Raw Factory Selvage (Lisière)
            </text>

            {/* Bottom Selvage or Fold Line */}
            {foldMode === 'lengthwise' ? (
              <g>
                <line x1="25" y1={boltHeight - 25} x2={boltWidth - 25} y2={boltHeight - 25} stroke="#d4af37" strokeWidth="4" />
                <text x="35" y={boltHeight - 10} className="fill-amber-600 dark:fill-amber-400 text-[11px] font-mono tracking-wider font-bold">
                  ↓ FOLD LINE (PLI DU TISSU) — Align "Cut on Fold" pieces exactly here!
                </text>
              </g>
            ) : (
              <g>
                <line x1="25" y1={boltHeight - 25} x2={boltWidth - 25} y2={boltHeight - 25} stroke="#78716c" strokeWidth="4" />
                <text x="35" y={boltHeight - 10} className="fill-stone-500 dark:fill-stone-400 text-[10px] font-mono tracking-widest font-semibold uppercase">
                  ↓ Lower Selvage (Lisière)
                </text>
              </g>
            )}

            {/* Crosswise Cut Edge (Start of Yardage) */}
            <line x1="25" y1="25" x2="25" y2={boltHeight - 25} stroke="#a8a29e" strokeWidth="3" />
            <text x="10" y={boltHeight / 2} transform={`rotate(-90, 10, ${boltHeight / 2})`} className="fill-stone-400 text-[9px] font-mono tracking-widest uppercase">
              Cut Raw Edge
            </text>

            {/* Layout pieces dynamically arranged based on garment */}
            {garment.id === 'moroccan-kaftan' && (
              <g>
                {/* Back Panel (Placed on Fold at bottom) */}
                <rect x="45" y="130" width="180" height="185" rx="6" fill="#fdfbf7" className="dark:fill-stone-800" stroke="#78350f" strokeWidth="1.5" />
                <text x="55" y="155" className="fill-stone-900 dark:fill-stone-100 font-serif font-bold text-xs">Back Panel</text>
                <text x="55" y="172" className="fill-amber-700 dark:fill-amber-400 font-mono text-[10px] font-bold">Cut 1 on Fold (Placed along bottom)</text>
                {/* Grainline */}
                <line x1="135" y1="180" x2="135" y2="290" stroke="#a8a29e" strokeWidth="1.2" strokeDasharray="3 2" />

                {/* Front Left Panel */}
                <rect x="240" y="45" width="160" height="150" rx="6" fill="#fdfbf7" className="dark:fill-stone-800" stroke="#78350f" strokeWidth="1.5" />
                <text x="250" y="70" className="fill-stone-900 dark:fill-stone-100 font-serif font-bold text-xs">Front Left Panel</text>
                <text x="250" y="87" className="fill-amber-700 dark:fill-amber-400 font-mono text-[10px] font-bold">Cut 1 Fabric (For Sfifa)</text>
                <line x1="320" y1="95" x2="320" y2="180" stroke="#a8a29e" strokeWidth="1.2" strokeDasharray="3 2" />

                {/* Front Right Panel (Mirror) */}
                <rect x="240" y="205" width="160" height="110" rx="6" fill="#fdfbf7" className="dark:fill-stone-800" stroke="#78350f" strokeWidth="1.5" />
                <text x="250" y="230" className="fill-stone-900 dark:fill-stone-100 font-serif font-bold text-xs">Front Right Panel</text>
                <text x="250" y="247" className="fill-amber-700 dark:fill-amber-400 font-mono text-[10px] font-bold">Cut 1 Fabric (Mirror)</text>

                {/* Sleeves (Pair) */}
                <rect x="415" y="45" width="135" height="150" rx="6" fill="#fdfbf7" className="dark:fill-stone-800" stroke="#78350f" strokeWidth="1.5" />
                <text x="425" y="70" className="fill-stone-900 dark:fill-stone-100 font-serif font-bold text-xs">Flared Sleeves</text>
                <text x="425" y="87" className="fill-amber-700 dark:fill-amber-400 font-mono text-[10px] font-bold">Cut 2 (Pair)</text>

                {/* Hood or Facings */}
                <rect x="415" y="205" width="135" height="110" rx="6" fill="#fdfbf7" className="dark:fill-stone-800" stroke="#78350f" strokeWidth="1.5" />
                <text x="425" y="230" className="fill-stone-900 dark:fill-stone-100 font-serif font-bold text-xs">Hood (Qob) / Facings</text>
                <text x="425" y="247" className="fill-amber-700 dark:fill-amber-400 font-mono text-[10px] font-bold">Cut 2 Fabric</text>

                {/* Remaining Bolt Length */}
                <line x1="565" y1="25" x2="565" y2={boltHeight - 25} stroke="#d4af37" strokeWidth="2" strokeDasharray="4 2" />
                <text x="575" y={boltHeight / 2} className="fill-stone-400 text-[10px] font-mono">
                  Remaining Yardage / Remnants
                </text>
              </g>
            )}

            {garment.id !== 'moroccan-kaftan' && (
              <g>
                {/* Standard pieces layout */}
                {garment.pieces.map((p, index) => {
                  const x = 45 + index * 125;
                  const y = p.cutCount.includes('Fold') ? 160 : 45;
                  const w = 115;
                  const h = p.cutCount.includes('Fold') ? 155 : 105;

                  return (
                    <g key={p.id}>
                      <rect
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        rx="6"
                        fill="#fdfbf7"
                        className="dark:fill-stone-800"
                        stroke="#78350f"
                        strokeWidth="1.5"
                      />
                      <text x={x + 10} y={y + 25} className="fill-stone-900 dark:fill-stone-100 font-serif font-bold text-[11px]">
                        {p.name}
                      </text>
                      <text x={x + 10} y={y + 42} className="fill-amber-700 dark:fill-amber-400 font-mono text-[9px] font-bold">
                        {p.cutCount}
                      </text>
                      <line x1={x + w / 2} y1={y + 50} x2={x + w / 2} y2={y + h - 15} stroke="#a8a29e" strokeWidth="1" strokeDasharray="2 2" />
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </div>

        {/* Legend & Cutting Advice */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl">
            <span className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">
              Grainline Alignment:
            </span>
            <p className="text-stone-500 dark:text-stone-400 text-[11px]">
              Measure from both ends of each grainline arrow to the selvage; both numbers must match exactly.
            </p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl">
            <span className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">
              Cut on Fold Rule:
            </span>
            <p className="text-stone-500 dark:text-stone-400 text-[11px]">
              Pieces marked "Cut on fold" must align their straight fold edge right against the folded crease with zero allowance.
            </p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl">
            <span className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">
              Pins & Weights:
            </span>
            <p className="text-stone-500 dark:text-stone-400 text-[11px]">
              Use sewing pattern weights or fine silk pins inserted perpendicular to the cutting lines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
