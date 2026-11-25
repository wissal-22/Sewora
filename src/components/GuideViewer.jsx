import React, { useState } from 'react';
import { STITCH_LIBRARY, GLOSSARY, TROUBLESHOOTING } from '../data/guideData';
import { CheckIcon, AlertCircleIcon } from './Icons';

/**
 * Diagram for each stitch technique
 */
function StitchDiagram({ type }) {
  return (
    <svg viewBox="0 0 160 80" className="w-full h-20 bg-stone-50 dark:bg-stone-950/60 rounded-lg p-1 border border-stone-200 dark:border-stone-800">
      {type === 'straight' && (
        <g stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round">
          <line x1="20" y1="40" x2="45" y2="40" />
          <line x1="55" y1="40" x2="80" y2="40" />
          <line x1="90" y1="40" x2="115" y2="40" />
          <line x1="125" y1="40" x2="145" y2="40" />
          {/* Thread penetration needle holes */}
          {[20, 45, 55, 80, 90, 115, 125, 145].map((x) => (
            <circle key={x} cx={x} cy="40" r="1.5" fill="#78350f" />
          ))}
        </g>
      )}

      {type === 'zigzag' && (
        <g stroke="#d4af37" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15,55 35,25 55,55 75,25 95,55 115,25 135,55 145,35" />
        </g>
      )}

      {type === 'backstitch' && (
        <g stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round">
          {/* Forward */}
          <line x1="20" y1="35" x2="50" y2="35" />
          {/* Overlapped reverse lock */}
          <line x1="50" y1="42" x2="25" y2="42" stroke="#b45309" strokeWidth="3" />
          {/* Forward continuous */}
          <line x1="25" y1="38" x2="145" y2="38" />
        </g>
      )}

      {type === 'french' && (
        <g>
          {/* Two layers enclosing raw edges */}
          <path d="M20 25 C60 25 80 40 100 40 L140 40" fill="none" stroke="#78716c" strokeWidth="2" />
          <path d="M20 30 C60 30 80 45 100 45 L140 45" fill="none" stroke="#78716c" strokeWidth="2" />
          {/* First inner seam */}
          <line x1="60" y1="20" x2="60" y2="50" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 2" />
          {/* Second enclosing seam */}
          <line x1="105" y1="30" x2="105" y2="55" stroke="#d4af37" strokeWidth="2.5" />
          <text x="110" y="70" className="fill-amber-600 text-[9px] font-mono">Enclosed SA</text>
        </g>
      )}

      {type === 'hem' && (
        <g>
          {/* Main body fabric */}
          <line x1="20" y1="25" x2="140" y2="25" stroke="#78716c" strokeWidth="2" />
          {/* Fold 1 & Fold 2 */}
          <path d="M140 25 C145 25 145 45 135 45 L70 45 C65 45 65 55 70 55 L135 55" fill="none" stroke="#78716c" strokeWidth="2" />
          {/* Topstitch */}
          <line x1="75" y1="20" x2="75" y2="60" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 2" />
        </g>
      )}

      {type === 'dart' && (
        <g>
          <polygon points="20,20 130,40 20,60" fill="rgba(212,175,55,0.15)" stroke="#78716c" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="130" y2="40" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="20" y1="60" x2="130" y2="40" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="130" cy="40" r="3" fill="#d4af37" />
          <text x="110" y="30" className="fill-amber-600 text-[9px] font-mono">Apex</text>
        </g>
      )}

      {type === 'buttonhole' && (
        <g>
          {/* Satin stitch border box */}
          <rect x="30" y="30" width="100" height="20" rx="3" fill="none" stroke="#d4af37" strokeWidth="3" />
          <line x1="30" y1="40" x2="130" y2="40" stroke="#78350f" strokeWidth="1.5" strokeDasharray="1 1" />
          {/* Bartacks */}
          <line x1="30" y1="25" x2="30" y2="55" stroke="#d4af37" strokeWidth="4" />
          <line x1="130" y1="25" x2="130" y2="55" stroke="#d4af37" strokeWidth="4" />
        </g>
      )}

      {type === 'sfifa' && (
        <g>
          {/* Moroccan Sfifa woven braid */}
          <rect x="25" y="25" width="110" height="30" rx="3" fill="#d4af37" stroke="#78350f" strokeWidth="1" />
          {/* Braided chevron pattern */}
          <path d="M30 25 L45 55 M45 25 L60 55 M60 25 L75 55 M75 25 L90 55 M90 25 L105 55 M105 25 L120 55 M120 25 L135 55" stroke="#fff8dc" strokeWidth="1.5" />
          {/* Aakad button */}
          <circle cx="15" cy="40" r="7" fill="#d4af37" stroke="#78350f" strokeWidth="1.5" />
          <circle cx="15" cy="40" r="3" fill="#fff8dc" />
        </g>
      )}
    </svg>
  );
}

export default function GuideViewer({ garment }) {
  const [activeTab, setActiveTab] = useState('steps'); // 'steps' | 'stitches' | 'glossary' | 'troubleshooting'
  const [completedSteps, setCompletedSteps] = useState({});
  const [glossaryQuery, setGlossaryQuery] = useState('');

  const toggleStep = (stepNumber) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const stepsDone = garment.steps.filter((s) => completedSteps[s.step]).length;
  const totalSteps = garment.steps.length;

  const filteredGlossary = GLOSSARY.filter((item) =>
    item.term.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
    item.definition.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
    item.tag.toLowerCase().includes(glossaryQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Tabs */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-2 shadow-sm flex flex-wrap gap-1">
        {[
          { id: 'steps', label: `${garment.name} Assembly Steps`, badge: `${stepsDone}/${totalSteps}` },
          { id: 'stitches', label: 'Stitch & Technique Library' },
          { id: 'glossary', label: 'Sewing Glossary' },
          { id: 'troubleshooting', label: 'Machine Troubleshooting' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Garment Steps */}
      {activeTab === 'steps' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                Step-by-Step Construction Guide
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Follow this sequential plan. Check off each milestone as you sew.
              </p>
            </div>
            <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl">
              Est. Time: {garment.estimatedHours} • {garment.difficulty}
            </div>
          </div>

          <div className="space-y-3">
            {garment.steps.map((s) => {
              const isDone = Boolean(completedSteps[s.step]);
              return (
                <div
                  key={s.step}
                  onClick={() => toggleStep(s.step)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isDone
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                      : 'bg-white dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    {isDone ? <CheckIcon className="w-3.5 h-3.5" /> : s.step}
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4
                      className={`text-sm font-semibold transition-all ${
                        isDone
                          ? 'line-through text-stone-400 dark:text-stone-500'
                          : 'text-stone-900 dark:text-stone-100'
                      }`}
                    >
                      {s.title}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed transition-all ${
                        isDone
                          ? 'text-stone-400 dark:text-stone-500'
                          : 'text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {s.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Stitch Library */}
      {activeTab === 'stitches' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STITCH_LIBRARY.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Stitch Diagram */}
              <StitchDiagram type={item.svgType} />

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] space-y-1 font-mono">
                <div className="text-stone-500">
                  <strong className="text-stone-700 dark:text-stone-300 font-sans">Uses:</strong> {item.uses}
                </div>
                <div className="text-amber-700 dark:text-amber-400">
                  <strong className="text-stone-700 dark:text-stone-300 font-sans">Settings:</strong> {item.settings}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Glossary */}
      {activeTab === 'glossary' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                Sewing & Tailoring Glossary
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Clear definitions of terms used on patterns and in couture ateliers.
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={glossaryQuery}
                onChange={(e) => setGlossaryQuery(e.target.value)}
                placeholder="Search term or concept..."
                className="w-full text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((g, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-800/30 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
                    {g.term}
                  </h4>
                  <span className="text-[10px] font-mono font-semibold bg-stone-200 dark:bg-stone-700 px-2 py-0.5 rounded text-stone-700 dark:text-stone-300">
                    {g.tag}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {g.definition}
                </p>
              </div>
            ))}
          </div>

          {filteredGlossary.length === 0 && (
            <div className="text-center py-8 text-stone-400 text-xs">
              No sewing terms found matching "{glossaryQuery}".
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Troubleshooting */}
      {activeTab === 'troubleshooting' && (
        <div className="space-y-4">
          {TROUBLESHOOTING.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-3"
            >
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <AlertCircleIcon className="w-4 h-4 text-amber-600" />
                {item.problem}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                {/* Causes */}
                <div className="bg-red-50/60 dark:bg-red-950/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
                  <span className="font-bold text-red-900 dark:text-red-300 block mb-2">
                    Likely Causes:
                  </span>
                  <ul className="space-y-1 text-red-800 dark:text-red-300/90 pl-3 list-disc">
                    {item.causes.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Fixes */}
                <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-2">
                    Recommended Fixes:
                  </span>
                  <ul className="space-y-1 text-emerald-800 dark:text-emerald-300/90 pl-3 list-disc">
                    {item.fixes.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
