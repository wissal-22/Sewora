import React, { useState, useEffect } from 'react';
import { safeStorage, STORAGE_KEYS } from './utils/storage';
import { GARMENTS, FABRIC_PALETTES } from './data/garments';
import { INITIAL_PROFILES, INITIAL_PROJECTS } from './data/sampleData';
import { determineRecommendedSize } from './utils/calculations';

import { Sidebar, MobileTopHeader, MobileBottomNav } from './components/Navigation';
import MeasurementForm from './components/MeasurementForm';
import SizeFinder from './components/SizeFinder';
import PatternPreview from './components/PatternPreview';
import YardageCalculator from './components/YardageCalculator';
import CuttingLayout from './components/CuttingLayout';
import GuideViewer from './components/GuideViewer';
import ProjectTracker from './components/ProjectTracker';
import PrintSummary from './components/PrintSummary';
import {
  NeedleThreadIcon,
  SparklesIcon,
  ScissorsIcon,
  RulerIcon,
  FabricRollIcon,
  BookOpenIcon
} from './components/Icons';

export default function App() {
  // Theme state: default dark as shown in luxury couture reference image
  const [isDark, setIsDark] = useState(() => {
    const saved = safeStorage.get(STORAGE_KEYS.THEME, null);
    if (saved !== null) return saved === 'dark';
    return true;
  });

  useEffect(() => {
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    if (isDark) {
      document.documentElement.classList.add('dark');
      safeStorage.set(STORAGE_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      safeStorage.set(STORAGE_KEYS.THEME, 'light');
    }
  }, [isDark]);

  // Unit of measure: 'cm' | 'in'
  const [unit, setUnit] = useState(() => {
    return safeStorage.get(STORAGE_KEYS.UNIT, 'cm');
  });

  const handleToggleUnit = (newUnit) => {
    setUnit(newUnit);
    safeStorage.set(STORAGE_KEYS.UNIT, newUnit);
  };

  // Active Tab
  const [activeTab, setActiveTab] = useState('preview');

  // Profiles State
  const [profiles, setProfiles] = useState(() => {
    return safeStorage.get(STORAGE_KEYS.PROFILES, INITIAL_PROFILES);
  });

  const [activeProfileId, setActiveProfileId] = useState(() => {
    const savedId = safeStorage.get(STORAGE_KEYS.ACTIVE_PROFILE_ID, null);
    if (savedId && profiles.some((p) => p.id === savedId)) return savedId;
    return profiles[0]?.id || 'profile-me';
  });

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  // Garment Selection State
  const [activeGarmentId, setActiveGarmentId] = useState(() => {
    return safeStorage.get(STORAGE_KEYS.ACTIVE_GARMENT_ID, 'moroccan-kaftan');
  });

  const activeGarment = GARMENTS.find((g) => g.id === activeGarmentId) || GARMENTS[0];

  // Garment Options State
  const [garmentOptions, setGarmentOptions] = useState(() => {
    const initialOpts = {};
    if (activeGarment.options.neckline?.length) initialOpts.neckline = activeGarment.options.neckline[0].id;
    if (activeGarment.options.sleeves?.length) initialOpts.sleeves = activeGarment.options.sleeves[0].id;
    if (activeGarment.options.hem?.length) initialOpts.hem = activeGarment.options.hem[0].id;
    if (activeGarment.options.pockets?.length) initialOpts.pockets = activeGarment.options.pockets[0].id;
    return initialOpts;
  });

  // Seam Allowance (cm)
  const [seamAllowanceCm, setSeamAllowanceCm] = useState(1.5);

  // Selected Fabric Palette
  const [selectedPalette, setSelectedPalette] = useState(FABRIC_PALETTES[0]);

  // Fit Preference: 'fitted' | 'regular' | 'relaxed'
  const [fitPreference, setFitPreference] = useState(() => {
    return safeStorage.get(STORAGE_KEYS.FIT_PREFERENCE, 'regular');
  });

  const handleSelectFit = (fit) => {
    setFitPreference(fit);
    safeStorage.set(STORAGE_KEYS.FIT_PREFERENCE, fit);
  };

  // Projects State
  const [projects, setProjects] = useState(() => {
    return safeStorage.get(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  });

  // Size recommendation derived from active profile + fit
  const { recommendedSize } = determineRecommendedSize(
    activeProfile?.measurements || {},
    fitPreference
  );

  // Handlers for Profiles
  const handleSelectProfile = (id) => {
    setActiveProfileId(id);
    safeStorage.set(STORAGE_KEYS.ACTIVE_PROFILE_ID, id);
  };

  const handleSaveProfile = (updatedProfile, persist = true) => {
    const updated = profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p));
    setProfiles(updated);
    if (persist) {
      safeStorage.set(STORAGE_KEYS.PROFILES, updated);
    }
  };

  const handleNewProfile = (name) => {
    const newId = `profile-${Date.now()}`;
    const newP = {
      id: newId,
      name,
      relation: 'Custom',
      unit: 'cm',
      measurements: {
        bust: 90,
        waist: 72,
        hips: 98,
        shoulder: 39,
        inseam: 76,
        arm: 57,
        height: 165
      },
      notes: ''
    };
    const updated = [...profiles, newP];
    setProfiles(updated);
    setActiveProfileId(newId);
    safeStorage.set(STORAGE_KEYS.PROFILES, updated);
    safeStorage.set(STORAGE_KEYS.ACTIVE_PROFILE_ID, newId);
  };

  const handleDeleteProfile = (id) => {
    if (profiles.length <= 1) return;
    const filtered = profiles.filter((p) => p.id !== id);
    setProfiles(filtered);
    setActiveProfileId(filtered[0].id);
    safeStorage.set(STORAGE_KEYS.PROFILES, filtered);
    safeStorage.set(STORAGE_KEYS.ACTIVE_PROFILE_ID, filtered[0].id);
  };

  // Handlers for Garment Options
  const handleSelectGarment = (g) => {
    setActiveGarmentId(g.id);
    safeStorage.set(STORAGE_KEYS.ACTIVE_GARMENT_ID, g.id);

    const defaultOpts = {};
    if (g.options.neckline?.length) defaultOpts.neckline = g.options.neckline[0].id;
    if (g.options.sleeves?.length) defaultOpts.sleeves = g.options.sleeves[0].id;
    if (g.options.hem?.length) defaultOpts.hem = g.options.hem[0].id;
    if (g.options.pockets?.length) defaultOpts.pockets = g.options.pockets[0].id;
    setGarmentOptions(defaultOpts);
  };

  const handleChangeGarmentOption = (key, value) => {
    setGarmentOptions((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // Handlers for Projects
  const handleSaveProject = (newProject) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    safeStorage.set(STORAGE_KEYS.PROJECTS, updated);
  };

  const handleDeleteProject = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    safeStorage.set(STORAGE_KEYS.PROJECTS, updated);
  };

  const handleUpdateProjectStatus = (id, newStatus) => {
    const updated = projects.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: newStatus,
          progress: newStatus === 'Finished' ? 100 : newStatus === 'Sewing' ? 60 : newStatus === 'Cutting' ? 30 : 10
        };
      }
      return p;
    });
    setProjects(updated);
    safeStorage.set(STORAGE_KEYS.PROJECTS, updated);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#faf8f5] dark:bg-[#0b0b0e] text-stone-900 dark:text-stone-100 transition-colors">
      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* Mobile Top Header */}
      <MobileTopHeader
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 pb-24 lg:pb-12 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* TOP BRAND HERO BANNER (Matches user's reference UI) */}
        <div className="mb-8 relative rounded-3xl overflow-hidden border border-amber-300/80 dark:border-[#d4af37]/30 bg-gradient-to-r from-[#fefbf6] via-[#f7f0e1] to-[#ede0c2] dark:from-[#121218] dark:via-[#1a1720] dark:to-[#251b14] p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-2xl">
          {/* Subtle silk draped watermarks */}
          <div className="absolute -right-12 -bottom-16 opacity-10 text-amber-700 dark:text-[#d4af37] pointer-events-none">
            <NeedleThreadIcon className="w-96 h-96" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-[#fceec5] text-xs font-serif font-bold uppercase tracking-widest">
                  <SparklesIcon className="w-3.5 h-3.5 text-amber-600 dark:text-[#d4af37]" />
                  Haute Couture & Tailoring Atelier
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-amber-800 to-amber-600 dark:from-[#ffffff] dark:via-[#fceec5] dark:to-[#d4af37]">
                  Design Your Perfect Style
                </h2>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans max-w-xl">
                  Draft bespoke patterns scaled to your measurements, calculate fabric & supplies, and master traditional Moroccan Sfifa & Aakad craftsmanship.
                </p>
              </div>

              {/* Status Badge */}
              <div className="bg-white/90 dark:bg-[#121217]/90 border border-amber-300/60 dark:border-[#d4af37]/30 rounded-2xl p-4 backdrop-blur-md shadow-lg dark:shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#875628] text-black flex items-center justify-center font-serif text-xl font-bold shadow-md">
                  {recommendedSize.label}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-amber-700 dark:text-[#d4af37] font-semibold">Recommended Size</div>
                  <div className="font-serif font-bold text-base text-stone-900 dark:text-white">Size {recommendedSize.label} (US {recommendedSize.numericUS})</div>
                  <div className="text-[11px] text-stone-600 dark:text-stone-400 font-sans">Active: <span className="text-amber-800 dark:text-[#fceec5] font-semibold">{activeProfile?.name}</span></div>
                </div>
              </div>
            </div>

            {/* Quick Action Feature Cards (from reference image) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-amber-500/20 dark:bg-[#d4af37]/20 border-amber-500 dark:border-[#d4af37] shadow-md dark:shadow-lg dark:shadow-[#d4af37]/20'
                    : 'bg-white/80 dark:bg-[#14141c] border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-stone-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 dark:text-[#d4af37] flex items-center justify-center shrink-0">
                  <ScissorsIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-white">Custom Design</div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">Unique patterns</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('measurements')}
                className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                  activeTab === 'measurements'
                    ? 'bg-amber-500/20 dark:bg-[#d4af37]/20 border-amber-500 dark:border-[#d4af37] shadow-md dark:shadow-lg dark:shadow-[#d4af37]/20'
                    : 'bg-white/80 dark:bg-[#14141c] border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-stone-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 dark:text-[#d4af37] flex items-center justify-center shrink-0">
                  <RulerIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-white">Measurements</div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">Sculpted dummy</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('yardage')}
                className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                  activeTab === 'yardage'
                    ? 'bg-amber-500/20 dark:bg-[#d4af37]/20 border-amber-500 dark:border-[#d4af37] shadow-md dark:shadow-lg dark:shadow-[#d4af37]/20'
                    : 'bg-white/80 dark:bg-[#14141c] border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-stone-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 dark:text-[#d4af37] flex items-center justify-center shrink-0">
                  <FabricRollIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-white">Fabric Calculator</div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">Bolt & yardage</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('guide')}
                className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                  activeTab === 'guide'
                    ? 'bg-amber-500/20 dark:bg-[#d4af37]/20 border-amber-500 dark:border-[#d4af37] shadow-md dark:shadow-lg dark:shadow-[#d4af37]/20'
                    : 'bg-white/80 dark:bg-[#14141c] border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-stone-700'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-700 dark:text-[#d4af37] flex items-center justify-center shrink-0">
                  <BookOpenIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-white">Couture Academy</div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">Sfifa & Stitches</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Views */}
        <section aria-label="Atelier Workspace">
          {activeTab === 'preview' && (
            <PatternPreview
              garments={GARMENTS}
              activeGarment={activeGarment}
              onSelectGarment={handleSelectGarment}
              options={garmentOptions}
              onChangeOption={handleChangeGarmentOption}
              measurements={activeProfile.measurements}
              seamAllowanceCm={seamAllowanceCm}
              onChangeSeamAllowance={setSeamAllowanceCm}
              selectedPalette={selectedPalette}
              onSelectPalette={setSelectedPalette}
              unit={unit}
            />
          )}

          {activeTab === 'measurements' && (
            <MeasurementForm
              profiles={profiles}
              activeProfile={activeProfile}
              onSelectProfile={handleSelectProfile}
              onSaveProfile={handleSaveProfile}
              onDeleteProfile={handleDeleteProfile}
              onNewProfile={handleNewProfile}
              unit={unit}
              onToggleUnit={handleToggleUnit}
            />
          )}

          {activeTab === 'sizing' && (
            <SizeFinder
              measurements={activeProfile.measurements}
              fitPreference={fitPreference}
              onSelectFit={handleSelectFit}
              unit={unit}
            />
          )}

          {activeTab === 'yardage' && (
            <YardageCalculator
              garment={activeGarment}
              sizeLabel={recommendedSize.label}
              options={garmentOptions}
              unit={unit}
            />
          )}

          {activeTab === 'cutting' && (
            <CuttingLayout
              garment={activeGarment}
              sizeLabel={recommendedSize.label}
              fabricWidthCm={140}
              unit={unit}
            />
          )}

          {activeTab === 'guide' && (
            <GuideViewer garment={activeGarment} />
          )}

          {activeTab === 'projects' && (
            <ProjectTracker
              projects={projects}
              profiles={profiles}
              garments={GARMENTS}
              onSaveProject={handleSaveProject}
              onDeleteProject={handleDeleteProject}
              onUpdateStatus={handleUpdateProjectStatus}
            />
          )}

          {activeTab === 'export' && (
            <PrintSummary
              garment={activeGarment}
              activeProfile={activeProfile}
              recommendedSize={recommendedSize}
              options={garmentOptions}
              seamAllowanceCm={seamAllowanceCm}
              selectedPalette={selectedPalette}
              unit={unit}
            />
          )}
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />
    </div>
  );
}
