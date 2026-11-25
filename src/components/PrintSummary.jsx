import React, { useState } from 'react';
import { formatMeasurement, cmToInch, calculateFabricRequirements } from '../utils/calculations';
import { PrinterIcon } from './Icons';

export default function PrintSummary({
  garment,
  activeProfile,
  recommendedSize,
  options,
  seamAllowanceCm,
  selectedPalette,
  unit
}) {
  const { meters, yards } = calculateFabricRequirements(
    garment,
    recommendedSize.label,
    140,
    false,
    options.hem || 'knee',
    options.sleeves || 'short'
  );

  const [printMeta] = useState(() => ({
    dateStr: '2026-11-20',
    refCode: '849201'
  }));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action banner (hidden in print) */}
      <div className="print:hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <PrinterIcon className="w-4 h-4 text-amber-600" />
            Printable Project Specification Sheet
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            A printer-optimized atelier sheet formatted with measurements, pattern pieces, yardage, haberdashery checklist, and assembly steps.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <PrinterIcon className="w-4 h-4" />
          Print / Save as PDF
        </button>
      </div>

      {/* The Printable Document */}
      <div className="printable-document bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto space-y-6 print:p-0 print:border-none print:shadow-none print:text-black print:bg-white">
        {/* Document Header */}
        <div className="border-b-2 border-stone-900 dark:border-amber-400/60 pb-4 flex justify-between items-start print:border-black">
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-amber-700 dark:text-amber-400 print:text-black">
              SEWORA ATELIER SPEC SHEET
            </div>
            <div className="text-xs text-stone-500 font-mono tracking-widest uppercase mt-0.5 print:text-gray-600">
              Garment Cutting & Tailoring Dossier • Ref #{printMeta.refCode}
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <div>Date: {printMeta.dateStr}</div>
            <div className="font-bold text-stone-800 dark:text-stone-200 print:text-black">
              Client: {activeProfile.name}
            </div>
          </div>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl print:bg-gray-100 print:border print:border-gray-300">
          <div>
            <span className="text-[10px] uppercase font-mono text-stone-400 print:text-gray-500">Pattern</span>
            <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 print:text-black">
              {garment.name}
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-stone-400 print:text-gray-500">Recommended Size</span>
            <div className="font-mono font-bold text-sm text-amber-700 dark:text-amber-400 print:text-black">
              Size {recommendedSize.label} (US {recommendedSize.numericUS})
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-stone-400 print:text-gray-500">Fabric Required</span>
            <div className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100 print:text-black">
              {unit === 'in' ? `${yards} yds` : `${meters} m`} (140cm width)
            </div>
            <div className="text-[10px] text-stone-500 font-sans print:text-gray-600">
              {selectedPalette?.name || 'Selected Fabric'}
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-stone-400 print:text-gray-500">Seam Allowance</span>
            <div className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100 print:text-black">
              {seamAllowanceCm} cm ({cmToInch(seamAllowanceCm)}" in)
            </div>
          </div>
        </div>

        {/* Client Measurements Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-1 print:text-black print:border-gray-300">
            1. Client Measurements ({unit.toUpperCase()})
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 text-xs font-mono">
            {Object.entries(activeProfile.measurements).map(([key, val]) => (
              <div key={key} className="p-2 border border-stone-100 dark:border-stone-800 rounded bg-stone-50/50 dark:bg-stone-800/20 print:border-gray-200 print:bg-white">
                <div className="text-[10px] text-stone-400 uppercase capitalize print:text-gray-500">{key}</div>
                <div className="font-bold text-stone-900 dark:text-stone-100 print:text-black">
                  {formatMeasurement(val, unit, true)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern Pieces Breakdown */}
        <div className="space-y-2">
          <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-1 print:text-black print:border-gray-300">
            2. Pattern Cutting Pieces
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {garment.pieces.map((p) => (
              <div key={p.id} className="p-2.5 border border-stone-200 dark:border-stone-800 rounded-lg flex items-center justify-between print:border-gray-300">
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100 print:text-black">{p.name}</div>
                  <div className="text-[10px] text-stone-500 print:text-gray-600">{p.description}</div>
                </div>
                <span className="font-mono text-[11px] font-bold text-amber-700 dark:text-amber-400 print:text-black bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded print:bg-gray-100">
                  {p.cutCount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Haberdashery & Supplies Checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-1 print:text-black print:border-gray-300">
            3. Supplies Checklist
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {garment.supplies.map((s) => (
              <div key={s.id} className="flex items-center gap-2 print:gap-1.5">
                <span className="w-3.5 h-3.5 border border-stone-400 print:border-black rounded-xs inline-block shrink-0" />
                <span className="font-medium text-stone-800 dark:text-stone-200 print:text-black">{s.item}</span>
                <span className="text-stone-400 print:text-gray-600 text-[10px] font-mono">({s.qty})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sequential Assembly Guide */}
        <div className="space-y-2">
          <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-1 print:text-black print:border-gray-300">
            4. Step-by-Step Construction Guide
          </h4>
          <ol className="space-y-2 text-xs leading-relaxed pl-4 list-decimal print:space-y-1.5">
            {garment.steps.map((s) => (
              <li key={s.step} className="text-stone-700 dark:text-stone-300 print:text-black">
                <strong className="text-stone-900 dark:text-stone-100 print:text-black">{s.title}:</strong> {s.text}
              </li>
            ))}
          </ol>
        </div>

        {/* Footer Notes */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-3 text-[10px] text-stone-400 print:text-gray-500 font-mono flex justify-between">
          <span>Printed from SEWORA • Tailored for Artisan Home Sewers</span>
          <span>sewora.app</span>
        </div>
      </div>
    </div>
  );
}
