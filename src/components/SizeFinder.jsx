import React from 'react';
import { SIZE_CHART, FIT_PREFERENCES } from '../data/sizes';
import { determineRecommendedSize, formatMeasurement } from '../utils/calculations';
import { SparklesIcon, AlertCircleIcon, CheckIcon } from './Icons';

export default function SizeFinder({
  measurements,
  fitPreference,
  onSelectFit,
  unit
}) {
  const {
    recommendedSize,
    breakdown,
    hasMismatch,
    mismatchNotes,
    fitEase,
    usedDefaults,
    outOfChart
  } = determineRecommendedSize(measurements, fitPreference);

  return (
    <div className="space-y-6">
      {/* Top Banner: Recommendation & Fit Selector */}
      <div className="bg-[#121217] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-widest text-[#d4af37]">
              <SparklesIcon className="w-4 h-4" />
              Tailoring Recommendation
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-amber-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[#fceec5] via-[#d4af37] to-[#e8c676]">
                Size {recommendedSize.label}
              </h2>
              <span className="text-sm font-mono font-semibold text-stone-300">
                (US {recommendedSize.numericUS} / EU {recommendedSize.numericEU})
              </span>
            </div>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              Calculated using weighted bust, waist, and hip contours with{' '}
              <strong className="text-[#fceec5]">{FIT_PREFERENCES[fitPreference].label}</strong>{' '}
              ease allowance (+{fitEase.bustEase} cm bust, +{fitEase.waistEase} cm waist, +{fitEase.hipsEase} cm hips).
            </p>
          </div>

          {/* Fit Allowance Selector */}
          <div className="w-full md:w-auto bg-[#1a1a24] p-2 rounded-2xl border border-stone-800 shadow-xl">
            <div className="text-[11px] font-mono tracking-wider text-[#d4af37] font-semibold px-3 py-1 uppercase">
              Select Desired Fit Ease
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-1">
              {Object.entries(FIT_PREFERENCES).map(([key, item]) => {
                const isActive = fitPreference === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onSelectFit(key)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0c0c0e] font-bold shadow-md'
                        : 'text-stone-300 hover:bg-[#252533] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Data-quality warnings: missing or out-of-chart measurements */}
        {(usedDefaults.length > 0 || outOfChart.length > 0) && (
          <div className="mt-6 flex items-start gap-3.5 bg-[#1a1714] border border-[#d4af37]/30 p-4 rounded-2xl text-xs text-stone-200">
            <AlertCircleIcon className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="space-y-1">
              {usedDefaults.length > 0 && (
                <p>
                  Missing measurement(s): <strong>{usedDefaults.join(', ')}</strong>. A typical value was
                  used, so this size is only an estimate. Fill them in on the Measurements tab.
                </p>
              )}
              {outOfChart.length > 0 && (
                <p>
                  <strong>{outOfChart.join(', ')}</strong> fall outside the standard size chart. The
                  closest size is shown, but custom pattern grading is needed.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Multi-Body-Part Mismatch Alert & Grading Advice */}
        {hasMismatch && (
          <div className="mt-6 pt-5 border-t border-stone-800/80 flex flex-col sm:flex-row items-start gap-3.5 bg-[#1a1714] border border-[#d4af37]/30 p-4 sm:p-5 rounded-2xl text-xs text-stone-200">
            <AlertCircleIcon className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <div className="font-bold text-[#fceec5] text-sm font-serif">
                Body Proportions Span Multiple Sizes:
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono font-medium my-1.5">
                <span className="bg-[#121217] px-2.5 py-1 rounded-md border border-[#d4af37]/40 text-[#fceec5]">
                  Bust: Size {breakdown.bust.size} (US {breakdown.bust.numericUS})
                </span>
                <span className="bg-[#121217] px-2.5 py-1 rounded-md border border-[#d4af37]/40 text-[#fceec5]">
                  Waist: Size {breakdown.waist.size} (US {breakdown.waist.numericUS})
                </span>
                <span className="bg-[#121217] px-2.5 py-1 rounded-md border border-[#d4af37]/40 text-[#fceec5]">
                  Hips: Size {breakdown.hips.size} (US {breakdown.hips.numericUS})
                </span>
              </div>
              <p className="leading-relaxed text-stone-300">
                {mismatchNotes[mismatchNotes.length - 1]}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Size Chart Table */}
      <div className="bg-[#121217] border border-[#d4af37]/20 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-serif font-bold text-white">
              Standard Sizing Chart (XS to 3XL / US 2 to 24)
            </h3>
            <p className="text-xs text-stone-400">
              The highlighted gold row represents your closest primary pattern baseline.
            </p>
          </div>
          <div className="text-xs text-[#d4af37] font-mono font-bold bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
            Unit: {unit === 'cm' ? 'Centimeters (cm)' : 'Inches (in)'}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#181822] border-b border-stone-800 text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-mono">Size</th>
                <th className="py-3.5 px-3 font-mono">US / EU</th>
                <th className="py-3.5 px-4 font-mono">Bust</th>
                <th className="py-3.5 px-4 font-mono">Waist</th>
                <th className="py-3.5 px-4 font-mono">Hips</th>
                <th className="py-3.5 px-4 font-mono">Shoulder</th>
                <th className="py-3.5 px-4 font-mono">Inseam</th>
                <th className="py-3.5 px-4 text-center font-mono">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {SIZE_CHART.map((row) => {
                const isMatched = row.label === recommendedSize.label;
                const isBustMatch = row.label === breakdown.bust.size;
                const isWaistMatch = row.label === breakdown.waist.size;
                const isHipsMatch = row.label === breakdown.hips.size;

                return (
                  <tr
                    key={row.label}
                    className={`transition-colors ${
                      isMatched
                        ? 'bg-[#d4af37]/15 font-semibold text-white'
                        : 'hover:bg-[#181824] text-stone-300'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold flex items-center gap-2">
                      {isMatched && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] shadow-sm shadow-[#d4af37]" />
                      )}
                      {row.label}
                    </td>
                    <td className="py-3.5 px-3 text-stone-400 font-mono">
                      {row.numericUS} / {row.numericEU}
                    </td>
                    <td className={`py-3.5 px-4 font-mono ${isBustMatch ? 'text-[#fceec5] font-bold underline decoration-[#d4af37]' : ''}`}>
                      {formatMeasurement(row.bust, unit, false)}
                    </td>
                    <td className={`py-3.5 px-4 font-mono ${isWaistMatch ? 'text-[#fceec5] font-bold underline decoration-[#d4af37]' : ''}`}>
                      {formatMeasurement(row.waist, unit, false)}
                    </td>
                    <td className={`py-3.5 px-4 font-mono ${isHipsMatch ? 'text-[#fceec5] font-bold underline decoration-[#d4af37]' : ''}`}>
                      {formatMeasurement(row.hips, unit, false)}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {formatMeasurement(row.shoulder, unit, false)}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {formatMeasurement(row.inseam, unit, false)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isMatched ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0c0c0e] shadow-md">
                          <CheckIcon className="w-3 h-3 stroke-[3]" />
                          Recommended
                        </span>
                      ) : (
                        <span className="text-stone-600 text-[10px]">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#16161f] text-[11px] text-stone-400 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2 font-mono">
          <span>
            Underlined numbers indicate body match points for bust, waist, or hips.
          </span>
          <span className="text-[#d4af37] font-semibold">
            SEWORA Pattern Engine v2.4
          </span>
        </div>
      </div>
    </div>
  );
}
