import React, { useState } from 'react';
import { calculateFabricRequirements } from '../utils/calculations';
import { FabricRollIcon, CheckIcon, InfoIcon, SparklesIcon } from './Icons';

export default function YardageCalculator({
  garment,
  sizeLabel,
  options,
  unit
}) {
  const [fabricWidthCm, setFabricWidthCm] = useState(140);
  const [hasNap, setHasNap] = useState(false);
  const [checkedSupplies, setCheckedSupplies] = useState({});

  const { meters, yards } = calculateFabricRequirements(
    garment,
    sizeLabel,
    fabricWidthCm,
    hasNap,
    options.hem || 'knee',
    options.sleeves || 'short'
  );

  const toggleSupply = (id) => {
    setCheckedSupplies((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = garment.supplies.filter((s) => checkedSupplies[s.id]).length;
  const totalCount = garment.supplies.length;

  return (
    <div className="space-y-6">
      {/* Fabric Yardage Calculator Card */}
      <div className="bg-[#121217] border border-[#d4af37]/25 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-800">
          <div>
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <FabricRollIcon className="w-5 h-5 text-[#d4af37]" />
              Fabric Estimation Engine
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Estimated for {garment.name} (Size {sizeLabel}) with selected silhouette options.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#181822] p-3 rounded-2xl border border-stone-800">
            <div className="text-right">
              <div className="text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fceec5] via-[#d4af37] to-[#e8c676]">
                {unit === 'in' ? `${yards} yds` : `${meters} m`}
              </div>
              <div className="text-[11px] font-mono text-[#d4af37]">
                {unit === 'in' ? `≈ ${meters} meters` : `≈ ${yards} yards`}
              </div>
            </div>
          </div>
        </div>

        {/* Inputs: Fabric Width & Nap Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Fabric Bolt Width */}
          <div>
            <label className="block text-xs font-semibold text-[#fceec5] mb-2.5">
              Fabric Bolt Width
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { cm: 110, inch: 44, label: 'Narrow (110 cm / 44")' },
                { cm: 140, inch: 55, label: 'Apparel (140 cm / 55")' },
                { cm: 150, inch: 60, label: 'Wide (150 cm / 60")' }
              ].map((w) => {
                const isSelected = fabricWidthCm === w.cm;
                return (
                  <button
                    key={w.cm}
                    type="button"
                    onClick={() => setFabricWidthCm(w.cm)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#d4af37] bg-[#d4af37]/15 ring-1 ring-[#d4af37]/60 shadow-lg'
                        : 'border-stone-800 bg-[#16161f] hover:border-stone-700'
                    }`}
                  >
                    <div className="text-sm font-bold text-white font-mono">
                      {w.cm} cm
                    </div>
                    <div className="text-[11px] text-stone-400 font-mono">
                      {w.inch} inches
                    </div>
                  </button>
                );
              })}
            </div>
            {fabricWidthCm <= 115 && garment.isWideGarment && (
              <p className="text-[11px] text-amber-300 mt-2.5 flex items-center gap-1.5">
                <InfoIcon className="w-3.5 h-3.5 shrink-0 text-[#d4af37]" />
                Narrow fabric requires an extra garment length as wide panels cannot nest side-by-side.
              </p>
            )}
          </div>

          {/* Directional Print / Nap Toggle */}
          <div>
            <label className="block text-xs font-semibold text-[#fceec5] mb-2.5">
              Fabric Surface & Direction
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setHasNap(false)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  !hasNap
                    ? 'border-[#d4af37] bg-[#d4af37]/15 ring-1 ring-[#d4af37]/60 shadow-lg'
                    : 'border-stone-800 bg-[#16161f] hover:border-stone-700'
                }`}
              >
                <div className="text-xs font-bold text-white">
                  Non-Directional
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  Solid, 2-way print, no pile
                </div>
              </button>

              <button
                type="button"
                onClick={() => setHasNap(true)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  hasNap
                    ? 'border-[#d4af37] bg-[#d4af37]/15 ring-1 ring-[#d4af37]/60 shadow-lg'
                    : 'border-stone-800 bg-[#16161f] hover:border-stone-700'
                }`}
              >
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Directional / Nap</span>
                  <span className="text-[9px] bg-[#d4af37] text-black px-1.5 py-0.2 rounded font-bold">
                    +15%
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  Velvet, corduroy, one-way
                </div>
              </button>
            </div>
            {hasNap && (
              <p className="text-[11px] text-stone-400 mt-2.5">
                All pattern pieces are cut in the same direction to ensure uniform light reflection across silk velvet and corduroy piles.
              </p>
            )}
          </div>
        </div>

        {/* Tailor's Buffer Note */}
        <div className="p-4 bg-[#181822] rounded-2xl border border-stone-800/80 text-xs text-stone-300 flex items-start gap-2.5">
          <SparklesIcon className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <span>
            Estimation includes a <strong>6% buffer</strong> for standard pre-wash shrinkage (essential for silk crepe, linen, and cotton) plus hem fold allowances.
          </span>
        </div>
      </div>

      {/* Auto-generated Supplies Checklist */}
      <div className="bg-[#121217] border border-[#d4af37]/25 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h3 className="text-xl font-serif font-bold text-white">
              Notions & Supplies Checklist
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Haberdashery, closures, and traditional Moroccan trims for {garment.name}.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-[#fceec5] bg-[#1a1a26] border border-[#d4af37]/30 px-3.5 py-1.5 rounded-full">
            {completedCount} of {totalCount} Ready
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#1c1c28] rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#d4af37] to-[#e5c07b] h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>

        {/* Checklist Items */}
        <div className="divide-y divide-stone-800/80">
          {garment.supplies.map((supply) => {
            const isChecked = Boolean(checkedSupplies[supply.id]);
            return (
              <div
                key={supply.id}
                onClick={() => toggleSupply(supply.id)}
                className="py-3.5 flex items-center justify-between gap-3 cursor-pointer group hover:bg-[#181822] px-3 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-sm'
                        : 'border-stone-700 group-hover:border-[#d4af37]'
                    }`}
                  >
                    {isChecked && <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span
                    className={`text-xs font-medium transition-all ${
                      isChecked
                        ? 'line-through text-stone-500'
                        : 'text-stone-200'
                    }`}
                  >
                    {supply.item}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#d4af37] bg-[#d4af37]/15 border border-[#d4af37]/30 px-3 py-1 rounded-lg">
                  {supply.qty}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
