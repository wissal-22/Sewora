import React, { useState } from 'react';
import { MEASURING_TIPS } from '../data/sizes';
import { cmToInch, inchToCm, validateMeasurements } from '../utils/calculations';
import { TapeMeasureIcon, PlusIcon, TrashIcon, AlertCircleIcon, InfoIcon, CheckIcon, SparklesIcon } from './Icons';

/**
 * Dynamic Haute Couture Dressmaker Mannequin Diagram
 * Morphing in real-time according to entered Bust, Waist, Hips, Shoulder, Arm, and Height.
 */
function BodyDiagram({ activeField, measurements, unit }) {
  const currentTip = MEASURING_TIPS[activeField] || MEASURING_TIPS.bust;
  const currentVal = measurements ? measurements[activeField] : 0;
  const displayVal = unit === 'in' ? `${cmToInch(currentVal, 1)}" in` : `${currentVal} cm`;

  // Center axis
  const cx = 110;

  // Real measurements in cm (fallbacks to realistic defaults)
  const mBust = Number(measurements?.bust) || 92;
  const mWaist = Number(measurements?.waist) || 74;
  const mHips = Number(measurements?.hips) || 101;
  const mShoulder = Number(measurements?.shoulder) || 40;
  const mInseam = Number(measurements?.inseam) || 78;
  const mArm = Number(measurements?.arm) || 58;
  const mHeight = Number(measurements?.height) || 168;

  // Dynamic scaled half-widths relative to center cx=110
  // Baseline (Size M): shoulder=56, bust=48, waist=38, hips=52
  const shoulderHalf = Math.min(78, Math.max(34, 56 * (mShoulder / 40)));
  const bustHalf = Math.min(76, Math.max(26, 48 * (mBust / 92)));
  const waistHalf = Math.min(70, Math.max(18, 38 * (mWaist / 74)));
  const hipsHalf = Math.min(84, Math.max(30, 52 * (mHips / 101)));

  // Key horizontal coordinates
  const leftShoulderX = cx - shoulderHalf;
  const rightShoulderX = cx + shoulderHalf;

  const leftArmscyeX = cx - Math.min(bustHalf * 0.95, shoulderHalf * 0.92);
  const rightArmscyeX = cx + Math.min(bustHalf * 0.95, shoulderHalf * 0.92);

  const leftBustX = cx - bustHalf;
  const rightBustX = cx + bustHalf;

  const leftWaistX = cx - waistHalf;
  const rightWaistX = cx + waistHalf;

  const leftHipX = cx - hipsHalf;
  const rightHipX = cx + hipsHalf;

  const leftBaseX = cx - hipsHalf * 0.95;
  const rightBaseX = cx + hipsHalf * 0.95;

  // Dynamic Torso Silhouette SVG path
  const torsoPath = `
    M ${cx - 7} 45
    C ${cx - shoulderHalf * 0.45} 47, ${leftShoulderX + 8} 56, ${leftShoulderX} 68
    C ${leftShoulderX - 3} 74, ${leftArmscyeX - 4} 82, ${leftArmscyeX} 90
    C ${leftArmscyeX + 4} 98, ${leftBustX + 2} 104, ${leftBustX} 114
    C ${leftBustX - 2} 125, ${leftWaistX - 4} 136, ${leftWaistX} 146
    C ${leftWaistX - 2} 156, ${leftHipX - 2} 170, ${leftHipX} 185
    C ${leftHipX} 196, ${leftBaseX} 204, ${cx} 204
    C ${rightBaseX} 204, ${rightHipX} 196, ${rightHipX} 185
    C ${rightHipX - 2} 170, ${rightWaistX + 2} 156, ${rightWaistX} 146
    C ${rightWaistX + 4} 136, ${rightBustX + 2} 125, ${rightBustX} 114
    C ${rightBustX - 2} 104, ${rightArmscyeX - 4} 98, ${rightArmscyeX} 90
    C ${rightArmscyeX + 4} 82, ${rightShoulderX + 3} 74, ${rightShoulderX} 68
    C ${rightShoulderX - 8} 56, ${cx + shoulderHalf * 0.45} 47, ${cx + 7} 45
    Z
  `;

  // French Princess Seams adapting to width
  const leftPrincess = `
    M ${cx - shoulderHalf * 0.46} 54
    C ${cx - bustHalf * 0.48} 88, ${cx - waistHalf * 0.44} 128, ${cx - hipsHalf * 0.52} 198
  `;
  const rightPrincess = `
    M ${cx + shoulderHalf * 0.46} 54
    C ${cx + bustHalf * 0.48} 88, ${cx + waistHalf * 0.44} 128, ${cx + hipsHalf * 0.52} 198
  `;

  // Arm length endpoint
  const armLenFactor = Math.min(1.3, Math.max(0.7, mArm / 58));
  const armEndY = 185 + (armLenFactor - 1) * 35;

  return (
    <div className="bg-[#121217] text-stone-100 p-6 rounded-3xl border border-[#d4af37]/25 shadow-2xl flex flex-col items-center relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#d4af37]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header Pill & Morph indicator */}
      <div className="relative z-10 flex items-center justify-between w-full mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f5d77f] text-[11px] font-serif font-bold uppercase tracking-widest">
          <TapeMeasureIcon className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{currentTip.title}</span>
        </div>
        <div className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-stone-900 border border-[#d4af37]/40 text-[#d4af37] font-bold">
          {displayVal}
        </div>
      </div>

      {/* Morph Status Indicator */}
      <div className="relative z-10 text-[10px] font-mono text-stone-400 mb-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
        <span>Live Proportions: Bust {mBust} · Waist {mWaist} · Hips {mHips} cm</span>
      </div>

      {/* Morphing Haute Couture Mannequin SVG */}
      <div className="relative z-10 w-full flex items-center justify-center my-1">
        <svg viewBox="0 0 220 300" className="w-48 sm:w-56 h-72 select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
          <defs>
            {/* Gold Metallic Gradient */}
            <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff1c5" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#99731a" />
            </linearGradient>

            {/* Mannequin Body Gradient */}
            <linearGradient id="mannequinShading" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e1e24" />
              <stop offset="25%" stopColor="#2c2c36" />
              <stop offset="50%" stopColor="#353542" />
              <stop offset="75%" stopColor="#2c2c36" />
              <stop offset="100%" stopColor="#1e1e24" />
            </linearGradient>

            {/* Wood finial and stand gradient */}
            <linearGradient id="turnedWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#533314" />
              <stop offset="50%" stopColor="#875628" />
              <stop offset="100%" stopColor="#41270c" />
            </linearGradient>
          </defs>

          {/* STAND: Turned wooden pole and cast-iron tripod legs */}
          <g>
            <rect x="108" y="196" width="4" height="74" fill="url(#turnedWood)" rx="1" />
            <circle cx="110" cy="208" r="4" fill="url(#goldRibbon)" />
            <rect x="106" y="240" width="8" height="4" fill="url(#goldRibbon)" rx="1" />
            {/* Tripod Base Legs */}
            <path d="M110 265 Q95 272 70 286" stroke="#533314" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M110 265 Q125 272 150 286" stroke="#533314" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M110 265 L110 288" stroke="#41270c" strokeWidth="4" strokeLinecap="round" />
            <circle cx="70" cy="286" r="2.5" fill="#d4af37" />
            <circle cx="150" cy="286" r="2.5" fill="#d4af37" />
            <circle cx="110" cy="288" r="2.5" fill="#d4af37" />
          </g>

          {/* DRESSMAKER FORM (MANNEQUIN TORSO) - MORPHS DYNAMICALLY */}
          <g>
            {/* Top turned wood neck finial */}
            <ellipse cx="110" cy="24" rx="5" ry="7" fill="url(#turnedWood)" />
            <circle cx="110" cy="17" r="3" fill="url(#goldRibbon)" />
            <ellipse cx="110" cy="32" rx="10" ry="3" fill="url(#turnedWood)" />
            {/* Neck pillar */}
            <path d="M103 32 L103 45 Q110 47 117 45 L117 32 Z" fill="#2c2c36" stroke="#4a4a58" strokeWidth="0.8" />

            {/* Dynamic Morphed Torso Path */}
            <path
              d={torsoPath}
              fill="url(#mannequinShading)"
              stroke="#58586c"
              strokeWidth="1.2"
              style={{ transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* Center Front Placket / Grainline Seam */}
            <line x1="110" y1="46" x2="110" y2="202" stroke="#6f6f84" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

            {/* Dynamic Couture French Princess Seams */}
            <path
              d={leftPrincess}
              fill="none"
              stroke="#4f4f62"
              strokeWidth="1"
              opacity="0.8"
              style={{ transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
            <path
              d={rightPrincess}
              fill="none"
              stroke="#4f4f62"
              strokeWidth="1"
              opacity="0.8"
              style={{ transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* Bottom wooden base cap (scales with hips) */}
            <ellipse
              cx="110"
              cy="196"
              rx={Math.max(12, hipsHalf * 0.42)}
              ry="4"
              fill="url(#turnedWood)"
              stroke="#3a220b"
              strokeWidth="0.8"
              style={{ transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </g>

          {/* DYNAMIC MEASURING TAPE & CALLOUTS - FOLLOWS MORPHED CONTOURS */}
          {/* 1. BUST MEASUREMENT HIGHLIGHT */}
          {activeField === 'bust' && (
            <g style={{ transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              {/* Back Tape Loop */}
              <path
                d={`M ${leftBustX} 114 C ${cx - bustHalf * 0.5} 102, ${cx + bustHalf * 0.5} 102, ${rightBustX} 114`}
                fill="none"
                stroke="#d4af37"
                strokeWidth="2.5"
                strokeDasharray="3 3"
                opacity="0.5"
              />
              {/* Front Tape Loop */}
              <path
                d={`M ${leftBustX} 114 C ${cx - bustHalf * 0.5} 126, ${cx + bustHalf * 0.5} 126, ${rightBustX} 114`}
                fill="none"
                stroke="url(#goldRibbon)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Tape tick marks */}
              <path
                d={`M ${leftBustX} 114 C ${cx - bustHalf * 0.5} 126, ${cx + bustHalf * 0.5} 126, ${rightBustX} 114`}
                fill="none"
                stroke="#3c240d"
                strokeWidth="2"
                strokeDasharray="1 3"
              />
              {/* Apex indicator pins */}
              <circle cx={cx - bustHalf * 0.5} cy="120" r="3.5" fill="#fceec5" stroke="#99731a" strokeWidth="1" />
              <circle cx={cx + bustHalf * 0.5} cy="120" r="3.5" fill="#fceec5" stroke="#99731a" strokeWidth="1" />
              {/* Pointer to label */}
              <line x1={rightBustX} y1="114" x2={Math.min(205, rightBustX + 32)} y2="108" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx={Math.min(205, rightBustX + 32)} cy="108" r="2.5" fill="#d4af37" />
              <text x={Math.min(205, rightBustX + 16)} y="100" fill="#fceec5" className="text-[10px] font-mono font-bold">Bust Line</text>
            </g>
          )}

          {/* 2. WAIST MEASUREMENT HIGHLIGHT */}
          {activeField === 'waist' && (
            <g style={{ transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              {/* Back Tape Loop */}
              <path
                d={`M ${leftWaistX} 146 C ${cx - waistHalf * 0.5} 138, ${cx + waistHalf * 0.5} 138, ${rightWaistX} 146`}
                fill="none"
                stroke="#d4af37"
                strokeWidth="2.5"
                strokeDasharray="3 3"
                opacity="0.5"
              />
              {/* Front Tape Loop */}
              <path
                d={`M ${leftWaistX} 146 C ${cx - waistHalf * 0.5} 156, ${cx + waistHalf * 0.5} 156, ${rightWaistX} 146`}
                fill="none"
                stroke="url(#goldRibbon)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d={`M ${leftWaistX} 146 C ${cx - waistHalf * 0.5} 156, ${cx + waistHalf * 0.5} 156, ${rightWaistX} 146`}
                fill="none"
                stroke="#3c240d"
                strokeWidth="2"
                strokeDasharray="1 3"
              />
              <circle cx={cx} cy="153" r="3" fill="#fceec5" stroke="#99731a" strokeWidth="1" />
              <line x1={rightWaistX} y1="146" x2={Math.min(205, rightWaistX + 32)} y2="142" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx={Math.min(205, rightWaistX + 32)} cy="142" r="2.5" fill="#d4af37" />
              <text x={Math.min(205, rightWaistX + 16)} y="134" fill="#fceec5" className="text-[10px] font-mono font-bold">Natural Waist</text>
            </g>
          )}

          {/* 3. HIPS MEASUREMENT HIGHLIGHT */}
          {activeField === 'hips' && (
            <g style={{ transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              {/* Back Tape Loop */}
              <path
                d={`M ${leftHipX} 185 C ${cx - hipsHalf * 0.5} 174, ${cx + hipsHalf * 0.5} 174, ${rightHipX} 185`}
                fill="none"
                stroke="#d4af37"
                strokeWidth="2.5"
                strokeDasharray="3 3"
                opacity="0.5"
              />
              {/* Front Tape Loop */}
              <path
                d={`M ${leftHipX} 185 C ${cx - hipsHalf * 0.5} 198, ${cx + hipsHalf * 0.5} 198, ${rightHipX} 185`}
                fill="none"
                stroke="url(#goldRibbon)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d={`M ${leftHipX} 185 C ${cx - hipsHalf * 0.5} 198, ${cx + hipsHalf * 0.5} 198, ${rightHipX} 185`}
                fill="none"
                stroke="#3c240d"
                strokeWidth="2"
                strokeDasharray="1 3"
              />
              <line x1={rightHipX} y1="185" x2={Math.min(205, rightHipX + 28)} y2="182" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx={Math.min(205, rightHipX + 28)} cy="182" r="2.5" fill="#d4af37" />
              <text x={Math.min(205, rightHipX + 12)} y="174" fill="#fceec5" className="text-[10px] font-mono font-bold">Full Hips</text>
            </g>
          )}

          {/* 4. SHOULDER WIDTH HIGHLIGHT */}
          {activeField === 'shoulder' && (
            <g style={{ transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <line x1={leftShoulderX} y1="68" x2={rightShoulderX} y2="68" stroke="url(#goldRibbon)" strokeWidth="3" />
              <polyline points={`${leftShoulderX + 6},63 ${leftShoulderX},68 ${leftShoulderX + 6},73`} fill="none" stroke="#fff1c5" strokeWidth="2.5" strokeLinecap="round" />
              <polyline points={`${rightShoulderX - 6},63 ${rightShoulderX},68 ${rightShoulderX - 6},73`} fill="none" stroke="#fff1c5" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx={leftShoulderX} cy="68" r="3.5" fill="#d4af37" />
              <circle cx={rightShoulderX} cy="68" r="3.5" fill="#d4af37" />
              <text x="110" y="58" textAnchor="middle" fill="#fceec5" className="text-[10px] font-mono font-bold">Acromion to Acromion</text>
            </g>
          )}

          {/* 5. INSEAM MEASUREMENT HIGHLIGHT */}
          {activeField === 'inseam' && (
            <g>
              <line x1="102" y1="204" x2="92" y2="280" stroke="#4f4f62" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="102" y1="204" x2="102" y2="284" stroke="url(#goldRibbon)" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="102" y1="204" x2="102" y2="284" stroke="#3c240d" strokeWidth="1.5" strokeDasharray="1 3" />
              <circle cx="102" cy="204" r="3.5" fill="#d4af37" />
              <circle cx="102" cy="284" r="3.5" fill="#d4af37" />
              <line x1="90" y1="284" x2="114" y2="284" stroke="#d4af37" strokeWidth="2" />
              <text x="118" y="248" fill="#fceec5" className="text-[10px] font-mono font-bold">Inseam ({mInseam} cm)</text>
            </g>
          )}

          {/* 6. ARM LENGTH HIGHLIGHT */}
          {activeField === 'arm' && (
            <g style={{ transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <path
                d={`M ${rightShoulderX} 68 Q ${rightShoulderX + 18} 115 ${rightShoulderX + 14} 145 Q ${rightShoulderX + 8} 165 ${rightShoulderX + 2} ${armEndY}`}
                fill="none"
                stroke="url(#goldRibbon)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d={`M ${rightShoulderX} 68 Q ${rightShoulderX + 18} 115 ${rightShoulderX + 14} 145 Q ${rightShoulderX + 8} 165 ${rightShoulderX + 2} ${armEndY}`}
                fill="none"
                stroke="#3c240d"
                strokeWidth="2"
                strokeDasharray="1 3"
              />
              <circle cx={rightShoulderX} cy="68" r="4" fill="#fceec5" stroke="#99731a" strokeWidth="1.2" />
              <circle cx={rightShoulderX + 14} cy="145" r="3.5" fill="#fceec5" stroke="#99731a" strokeWidth="1.2" />
              <circle cx={rightShoulderX + 2} cy={armEndY} r="3.5" fill="#fceec5" stroke="#99731a" strokeWidth="1.2" />
              <text x={rightShoulderX - 10} y={armEndY + 16} fill="#fceec5" className="text-[10px] font-mono font-bold">Wrist Bone</text>
            </g>
          )}

          {/* 7. FULL HEIGHT HIGHLIGHT */}
          {activeField === 'height' && (
            <g>
              <line x1="18" y1="17" x2="18" y2="286" stroke="url(#goldRibbon)" strokeWidth="3" />
              <line x1="18" y1="17" x2="18" y2="286" stroke="#3c240d" strokeWidth="1.5" strokeDasharray="1 4" />
              <line x1="10" y1="17" x2="36" y2="17" stroke="#d4af37" strokeWidth="2.5" />
              <line x1="10" y1="286" x2="36" y2="286" stroke="#d4af37" strokeWidth="2.5" />
              <polyline points="14,24 18,17 22,24" fill="none" stroke="#fff1c5" strokeWidth="2" />
              <polyline points="14,279 18,286 22,279" fill="none" stroke="#fff1c5" strokeWidth="2" />
              <text x="24" y="150" fill="#fceec5" transform="rotate(-90, 24, 150)" className="text-[10px] font-mono font-bold tracking-widest">
                FULL HEIGHT ({mHeight} cm)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Tailor Tip Guidance */}
      <div className="relative z-10 w-full mt-3 pt-3 border-t border-stone-800 text-center">
        <p className="text-xs text-stone-300 font-sans leading-relaxed">
          {currentTip.instruction}
        </p>
      </div>
    </div>
  );
}

export default function MeasurementForm({
  profiles,
  activeProfile,
  onSelectProfile,
  onSaveProfile,
  onDeleteProfile,
  onNewProfile,
  unit,
  onToggleUnit
}) {
  const [activeField, setActiveField] = useState('bust');
  const [newProfileName, setNewProfileName] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const measurements = activeProfile?.measurements || {
    bust: 92,
    waist: 74,
    hips: 101,
    shoulder: 39.5,
    inseam: 78,
    arm: 58,
    height: 168
  };

  const warnings = validateMeasurements(measurements);

  const handleInputChange = (field, rawValue) => {
    // International decimal support: replace comma with dot (e.g. "27,6" -> 27.6)
    const normalized = typeof rawValue === 'string' ? rawValue.replace(',', '.') : rawValue;
    const num = parseFloat(normalized);
    // If unit is in, convert entered value to cm before storing
    const valInCm = unit === 'in' ? inchToCm(num) : num;

    const updated = {
      ...activeProfile,
      measurements: {
        ...measurements,
        [field]: isNaN(valInCm) ? '' : valInCm
      }
    };
    onSaveProfile(updated, false);
  };

  const handleSaveExplicitly = () => {
    onSaveProfile(activeProfile, true);
    setFeedbackMsg('Profile saved to local storage!');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    onNewProfile(newProfileName.trim());
    setNewProfileName('');
    setShowNewModal(false);
  };

  const fields = [
    { id: 'bust', label: 'Bust / Chest', placeholder: unit === 'cm' ? '92' : '36' },
    { id: 'waist', label: 'Natural Waist', placeholder: unit === 'cm' ? '74' : '29' },
    { id: 'hips', label: 'Full Hips', placeholder: unit === 'cm' ? '101' : '40' },
    { id: 'shoulder', label: 'Shoulder Width', placeholder: unit === 'cm' ? '40' : '15.5' },
    { id: 'inseam', label: 'Inseam Length', placeholder: unit === 'cm' ? '78' : '30.5' },
    { id: 'arm', label: 'Arm Length', placeholder: unit === 'cm' ? '58' : '23' },
    { id: 'height', label: 'Full Height', placeholder: unit === 'cm' ? '168' : '66' }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Bar */}
      <div className="bg-[#121217] border border-[#d4af37]/20 rounded-3xl p-5 sm:p-6 shadow-xl transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fceec5] via-[#d4af37] to-[#99731a] text-[#121217] flex items-center justify-center font-serif text-xl font-black shadow-lg shadow-[#d4af37]/20 shrink-0">
              {activeProfile?.name?.charAt(0) || 'P'}
            </div>
            <div className="min-w-0 flex-1 sm:flex-initial">
              <label htmlFor="profile-select" className="block text-[11px] font-mono tracking-widest text-[#d4af37] uppercase font-semibold">
                Active Client Profile
              </label>
              <select
                id="profile-select"
                value={activeProfile?.id}
                onChange={(e) => onSelectProfile(e.target.value)}
                className="bg-transparent font-serif font-bold text-stone-100 text-lg sm:text-xl focus:outline-none cursor-pointer pr-4 hover:text-[#fceec5] transition-colors"
              >
                {profiles.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#121217] text-stone-100">
                    {p.name} {p.relation ? `(${p.relation})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center">
            {/* Unit Toggle */}
            <div className="inline-flex items-center bg-[#1c1c24] p-1 rounded-2xl text-xs font-semibold border border-stone-800">
              <button
                type="button"
                onClick={() => unit !== 'cm' && onToggleUnit('cm')}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  unit === 'cm'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0c0c0e] shadow-md font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Metric (cm)
              </button>
              <button
                type="button"
                onClick={() => unit !== 'in' && onToggleUnit('in')}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  unit === 'in'
                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0c0c0e] shadow-md font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Imperial (in)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowNewModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-2xl border border-[#d4af37]/30 hover:border-[#d4af37] bg-[#1a1a22] text-[#fceec5] transition-colors shadow-sm"
            >
              <PlusIcon className="w-3.5 h-3.5 text-[#d4af37]" />
              New Profile
            </button>
          </div>
        </div>

        {/* Profile Notes */}
        {activeProfile?.notes && (
          <div className="mt-4 text-xs italic text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-[#1a1a24]/80 border border-stone-200 dark:border-stone-800/80 px-4 py-2.5 rounded-xl">
            "{activeProfile.notes}"
          </div>
        )}
      </div>

      {/* Main Form + Interactive Visual Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Fields */}
        <div className="lg:col-span-7 bg-[#121217] border border-[#d4af37]/20 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3.5 border-b border-stone-800">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-[#d4af37]" />
                Body Measurements
              </h3>
              <p className="text-xs text-stone-400">
                Change any measurement: the mannequin on the right will visually morph and rescale in real time.
              </p>
            </div>
            <span className="text-xs whitespace-nowrap shrink-0 bg-[#d4af37]/15 text-[#f5d77f] border border-[#d4af37]/30 px-3 py-1 rounded-full font-mono font-medium">
              Live {unit.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {fields.map((f) => {
              const rawCm = measurements[f.id];
              const displayVal = unit === 'in' ? cmToInch(rawCm) : rawCm;
              const isSelected = activeField === f.id;

              return (
                <div
                  key={f.id}
                  onClick={() => setActiveField(f.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#d4af37] bg-[#d4af37]/10 ring-1 ring-[#d4af37]/60 shadow-lg shadow-[#d4af37]/10'
                      : 'border-stone-800/80 bg-[#171720] hover:border-stone-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <label
                      htmlFor={`input-${f.id}`}
                      className={`text-xs font-semibold ${isSelected ? 'text-[#fceec5]' : 'text-stone-300'}`}
                    >
                      {f.label}
                    </label>
                    <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">
                      {unit}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id={`input-${f.id}`}
                      type="number"
                      step={unit === 'in' ? '0.25' : '0.5'}
                      value={displayVal ?? ''}
                      onChange={(e) => handleInputChange(f.id, e.target.value)}
                      onFocus={() => setActiveField(f.id)}
                      placeholder={f.placeholder}
                      className="w-full text-xl font-mono font-bold bg-transparent text-white focus:outline-none"
                    />
                    <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                      {unit === 'in'
                        ? `≈ ${(rawCm ?? 0).toFixed(1)} cm`
                        : `≈ ${cmToInch(rawCm, 1)} in`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Validation Warnings */}
          {warnings.length > 0 && (
            <div className="bg-amber-950/40 border border-amber-800/80 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                <AlertCircleIcon className="w-4 h-4 shrink-0" />
                Measurement Check
              </div>
              {warnings.map((w, idx) => (
                <p key={idx} className="text-xs text-amber-200/90 pl-6 leading-relaxed">
                  • {w.message}
                </p>
              ))}
            </div>
          )}

          {/* Save Action & Feedback */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleSaveExplicitly}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b89228] hover:opacity-95 text-[#0c0c0e] rounded-xl text-xs font-bold shadow-md shadow-[#d4af37]/20 transition-all cursor-pointer"
              >
                <CheckIcon className="w-4 h-4" />
                Save Profile Changes
              </button>
              {feedbackMsg && (
                <span className="text-xs text-emerald-400 font-semibold">
                  {feedbackMsg}
                </span>
              )}
            </div>

            {profiles.length > 1 && (
              <button
                type="button"
                onClick={() => onDeleteProfile(activeProfile.id)}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Delete this profile"
              >
                <TrashIcon className="w-3.5 h-3.5" />
                Delete Profile
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Morphing Visual Diagram */}
        <div className="lg:col-span-5 space-y-4">
          <BodyDiagram
            activeField={activeField}
            measurements={measurements}
            unit={unit}
          />

          <div className="bg-[#121217] border border-[#d4af37]/20 rounded-3xl p-5 text-xs text-stone-300 space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-stone-100 text-sm">
              <InfoIcon className="w-4 h-4 text-[#d4af37]" />
              Real-Time Dynamic Morpher
            </div>
            <p className="leading-relaxed text-stone-400">
              The dressmaker form adjusts its chest apex, waistline width, hip flare, and shoulder span smoothly as you change measurements.
            </p>
          </div>
        </div>
      </div>

      {/* New Profile Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#14141c] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-white mb-2">
              Create New Measurement Profile
            </h3>
            <p className="text-xs text-stone-400 mb-5 leading-relaxed">
              Save dedicated measurements for another person, family member, or client.
            </p>
            <form onSubmit={handleCreateNew} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#fceec5] mb-1.5">
                  Profile Name (e.g. "Sister Sara", "Wedding Client")
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Enter name..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c26] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>
              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-700 text-stone-300 hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0c0c0e] hover:opacity-95 shadow-md"
                >
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
