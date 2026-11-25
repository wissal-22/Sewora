/**
 * Standard Sizing Charts and Ease Definitions
 * Sizes XS through 3XL and Numeric US/EU equivalents (US 2-24 / EU 32-54).
 * Values provided in cm as baseline; inches are computed or referenced.
 */

export const SIZE_CHART = [
  { label: 'XS', numericUS: 2, numericEU: 32, bust: 81, waist: 62, hips: 88, shoulder: 37, inseam: 76, arm: 56, height: 165 },
  { label: 'XS/S', numericUS: 4, numericEU: 34, bust: 84, waist: 65, hips: 91, shoulder: 37.5, inseam: 76.5, arm: 56.5, height: 165 },
  { label: 'S', numericUS: 6, numericEU: 36, bust: 88, waist: 69, hips: 95, shoulder: 38.5, inseam: 77, arm: 57, height: 167 },
  { label: 'S/M', numericUS: 8, numericEU: 38, bust: 92, waist: 73, hips: 99, shoulder: 39.5, inseam: 77.5, arm: 57.5, height: 167 },
  { label: 'M', numericUS: 10, numericEU: 40, bust: 96, waist: 77, hips: 103, shoulder: 40.5, inseam: 78, arm: 58, height: 168 },
  { label: 'M/L', numericUS: 12, numericEU: 42, bust: 100, waist: 81, hips: 107, shoulder: 41.5, inseam: 78.5, arm: 58.5, height: 168 },
  { label: 'L', numericUS: 14, numericEU: 44, bust: 105, waist: 86, hips: 112, shoulder: 42.5, inseam: 79, arm: 59, height: 170 },
  { label: 'L/XL', numericUS: 16, numericEU: 46, bust: 110, waist: 91, hips: 117, shoulder: 43.5, inseam: 79.5, arm: 59.5, height: 170 },
  { label: 'XL', numericUS: 18, numericEU: 48, bust: 116, waist: 97, hips: 123, shoulder: 44.5, inseam: 80, arm: 60, height: 170 },
  { label: '2XL', numericUS: 20, numericEU: 50, bust: 122, waist: 103, hips: 129, shoulder: 45.5, inseam: 80.5, arm: 60.5, height: 172 },
  { label: '2XL/3XL', numericUS: 22, numericEU: 52, bust: 128, waist: 109, hips: 135, shoulder: 46.5, inseam: 81, arm: 61, height: 172 },
  { label: '3XL', numericUS: 24, numericEU: 54, bust: 134, waist: 115, hips: 141, shoulder: 47.5, inseam: 81.5, arm: 61.5, height: 172 },
];

/**
 * Fit Ease allowances (in cm) added to body measurements
 * Fitted: close to body with minimal movement ease
 * Regular: classic comfortable tailoring ease
 * Relaxed: loose, casual, or flowy silhouette
 */
export const FIT_PREFERENCES = {
  fitted: {
    label: 'Fitted',
    description: 'Body-skimming silhouette with close tailoring (minimal wearing ease)',
    bustEase: 2.0,   // cm
    waistEase: 2.0,
    hipsEase: 3.0,
    armEase: 2.5
  },
  regular: {
    label: 'Regular Fit',
    description: 'Classic comfortable fit with standard room for movement',
    bustEase: 6.0,   // cm
    waistEase: 4.5,
    hipsEase: 7.0,
    armEase: 5.0
  },
  relaxed: {
    label: 'Relaxed / Flowy',
    description: 'Loose, airy drape ideal for caftans, oversized tops, and cozy wear',
    bustEase: 12.0,  // cm
    waistEase: 10.0,
    hipsEase: 14.0,
    armEase: 8.0
  }
};

/**
 * Plausibility bounds (in cm) for friendly validation warnings
 */
export const MEASUREMENT_BOUNDS = {
  bust: { min: 65, max: 175, label: 'Bust / Chest' },
  waist: { min: 45, max: 165, label: 'Waist' },
  hips: { min: 70, max: 185, label: 'Hips' },
  shoulder: { min: 30, max: 62, label: 'Shoulder Width' },
  inseam: { min: 50, max: 105, label: 'Inseam' },
  arm: { min: 40, max: 80, label: 'Arm Length' },
  height: { min: 120, max: 220, label: 'Height' }
};

/**
 * How to measure tips with guidance for users
 */
export const MEASURING_TIPS = {
  bust: {
    title: 'Bust / Chest',
    instruction: 'Measure around the fullest part of your bust or chest, keeping the tape level across your shoulder blades and parallel to the floor.',
    diagramType: 'bust'
  },
  waist: {
    title: 'Natural Waist',
    instruction: 'Locate the narrowest part of your torso (usually 2-3 cm above your belly button). Bend sideways to find your natural crease. Breathe naturally.',
    diagramType: 'waist'
  },
  hips: {
    title: 'Full Hips',
    instruction: 'Stand with feet together. Wrap the measuring tape around the fullest part of your buttocks and hips, keeping tape parallel to the floor.',
    diagramType: 'hips'
  },
  shoulder: {
    title: 'Shoulder Width',
    instruction: 'Measure across your back from the bony tip of one shoulder bone across the base of the neck to the bony tip of the other.',
    diagramType: 'shoulder'
  },
  inseam: {
    title: 'Inseam',
    instruction: 'Measure from the top of your inner thigh down along the inside of your leg to the floor or your desired trouser hem length.',
    diagramType: 'inseam'
  },
  arm: {
    title: 'Arm Length',
    instruction: 'Slightly bend your elbow. Measure from the shoulder bone tip, down past the elbow to the wrist bone.',
    diagramType: 'arm'
  },
  height: {
    title: 'Full Height',
    instruction: 'Stand barefoot with heels and back against a flat wall. Measure from floor to the top of your head.',
    diagramType: 'height'
  }
};
