import React from 'react';
import {
  NeedleThreadIcon,
  MannequinIcon,
  TapeMeasureIcon,
  RulerIcon,
  FabricRollIcon,
  ScissorsIcon,
  BookOpenIcon,
  FolderCheckIcon,
  PrinterIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon
} from './Icons';

const NAV_ITEMS = [
  { id: 'preview', label: 'Design Atelier', shortLabel: 'Design', icon: MannequinIcon },
  { id: 'measurements', label: 'Measurement Studio', shortLabel: 'Measure', icon: TapeMeasureIcon },
  { id: 'sizing', label: 'Size Finder & Ease', shortLabel: 'Sizes', icon: RulerIcon },
  { id: 'yardage', label: 'Fabric & Supplies', shortLabel: 'Fabric', icon: FabricRollIcon },
  { id: 'cutting', label: 'Cutting Marker', shortLabel: 'Cutting', icon: ScissorsIcon },
  { id: 'guide', label: 'Couture Guide', shortLabel: 'Guide', icon: BookOpenIcon },
  { id: 'projects', label: 'My Projects', shortLabel: 'Orders', icon: FolderCheckIcon },
  { id: 'export', label: 'Print Dossier', shortLabel: 'Export', icon: PrinterIcon }
];

export function Sidebar({ activeTab, onSelectTab, isDark, onToggleDark }) {
  return (
    <aside className="hidden lg:flex flex-col w-68 shrink-0 bg-white dark:bg-[#0e0e13] border-r border-stone-200 dark:border-[#d4af37]/20 p-5 justify-between h-screen sticky top-0 shadow-xl dark:shadow-2xl transition-colors">
      <div className="space-y-6">
        {/* Brand Logo & Couture Emblem */}
        <div className="px-2 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#fceec5] via-[#d4af37] to-[#99731a] text-[#0e0e13] flex items-center justify-center shadow-lg shadow-[#d4af37]/25 ring-2 ring-[#d4af37]/30">
              <NeedleThreadIcon className="w-6 h-6 text-[#0e0e13]" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-amber-700 to-amber-500 dark:from-[#fceec5] dark:via-[#d4af37] dark:to-[#e8c676]">
                SEWORA
              </h1>
              <p className="text-[10px] whitespace-nowrap tracking-[0.18em] text-amber-700 dark:text-[#d4af37]/80 uppercase font-sans font-semibold">
                Design · Tailor · Wear
              </p>
            </div>
          </div>
        </div>

        {/* User Card (Inspired by reference mockup profile) */}
        <div className="p-3 bg-stone-50 dark:bg-[#16161f] rounded-2xl border border-stone-200 dark:border-[#d4af37]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#99731a] to-[#d4af37] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              W
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 dark:text-white">Wissal Rioui</div>
              <div className="text-[10px] font-mono text-amber-700 dark:text-[#d4af37] flex items-center gap-1 font-semibold">
                <SparklesIcon className="w-2.5 h-2.5" />
                Premium Member
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b89228] text-[#0c0c0e] font-bold shadow-lg shadow-[#d4af37]/25 scale-102'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#1a1a24] hover:text-stone-900 dark:hover:text-[#fceec5]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0c0c0e]' : 'text-amber-600 dark:text-[#d4af37]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls: Dark mode toggle & version */}
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
        <button
          type="button"
          onClick={onToggleDark}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-[#16161f] border border-stone-300 dark:border-stone-800 hover:border-amber-400 dark:hover:border-stone-700 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            {isDark ? <SunIcon className="w-4 h-4 text-[#d4af37]" /> : <MoonIcon className="w-4 h-4 text-stone-600" />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </span>
          <span className="text-[10px] font-mono text-amber-700 dark:text-[#d4af37] font-semibold uppercase">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>

        <div className="text-[10px] text-stone-500 font-mono text-center">
          SEWORA Atelier Studio • Moroccan Couture
        </div>
      </div>
    </aside>
  );
}

export function MobileTopHeader({ isDark, onToggleDark }) {
  return (
    <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-[#0e0e13]/95 backdrop-blur-md border-b border-stone-200 dark:border-[#d4af37]/20 sticky top-0 z-40">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#fceec5] to-[#d4af37] text-[#0c0c0e] flex items-center justify-center shadow-md">
          <NeedleThreadIcon className="w-4 h-4 text-[#0c0c0e]" />
        </div>
        <div>
          <span className="font-serif font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-stone-900 to-amber-600 dark:from-[#fceec5] dark:to-[#d4af37]">
            SEWORA
          </span>
          <span className="block text-[8px] tracking-[0.2em] text-amber-700 dark:text-[#d4af37]/80 uppercase font-sans font-semibold">
            Design · Tailor · Wear
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleDark}
        className="p-2 rounded-xl bg-stone-100 dark:bg-[#181822] border border-stone-300 dark:border-stone-800 text-amber-700 dark:text-[#d4af37]"
        aria-label="Toggle theme"
      >
        {isDark ? <SunIcon className="w-4 h-4 text-[#d4af37]" /> : <MoonIcon className="w-4 h-4 text-stone-700" />}
      </button>
    </header>
  );
}

export function MobileBottomNav({ activeTab, onSelectTab }) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0e0e13]/95 backdrop-blur-xl border-t border-stone-200 dark:border-[#d4af37]/25 px-2 py-2 flex items-center justify-around shadow-2xl">
      {NAV_ITEMS.slice(0, 5).map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
              isActive
                ? 'relative -top-4 w-12 h-12 min-w-0 p-0 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#fceec5] to-[#b89228] text-[#0c0c0e] shadow-xl shadow-[#d4af37]/40 ring-4 ring-white dark:ring-[#0e0e13]'
                : 'min-w-[50px] py-1 px-1.5 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
            }`}
          >
            <Icon className={`shrink-0 ${isActive ? 'w-6 h-6 text-[#0c0c0e]' : 'w-4 h-4 mb-0.5'}`} />
            {!isActive && <span className="text-[9px] tracking-tight">{item.shortLabel}</span>}
          </button>
        );
      })}
    </nav>
  );
}
