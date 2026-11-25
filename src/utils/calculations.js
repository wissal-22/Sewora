/**
 * SEWORA Tailoring & Sizing Calculation Engine
 * Pure functions with documented mathematical and tailoring formulas.
 */

import { SIZE_CHART, FIT_PREFERENCES, MEASUREMENT_BOUNDS } from '../data/sizes';

export const CM_PER_INCH = 2.54;

/**
 * Converts centimeters to inches
 * @param {number} cm 
 * @returns {number} inches rounded to 2 decimal places
 */
export function cmToInch(cm) {
  if (cm === null || cm === undefined || isNaN(cm)) return 0;
  return Number((cm / CM_PER_INCH).toFixed(1));
}

/**
 * Converts inches to centimeters
 * @param {number} inch 
 * @returns {number} cm rounded to 1 decimal place
 */
export function inchToCm(inch) {
  if (inch === null || inch === undefined || isNaN(inch)) return 0;
  return Number((inch * CM_PER_INCH).toFixed(1));
}

/**
 * Format a measurement for display according to unit
 * @param {number} valInCm - Measurement always stored internally in cm
 * @param {'cm'|'in'} unit - Target unit for display
 * @param {boolean} showUnit - Whether to append the unit suffix
 * @returns {string}
 */
export function formatMeasurement(valInCm, unit = 'cm', showUnit = true) {
  if (!valInCm || isNaN(valInCm)) return '-';
  if (unit === 'in') {
    const inches = cmToInch(valInCm);
    return `${inches}${showUnit ? ' in' : ''}`;
  }
  return `${Number(valInCm).toFixed(1)}${showUnit ? ' cm' : ''}`;
}

/**
 * Validate measurements against human plausibility bounds
 * @param {Object} measurements - { bust, waist, hips, shoulder, inseam, arm, height } in cm
 * @returns {Array<{field: string, message: string, severity: 'warning'|'error'}>}
 */
export function validateMeasurements(measurements) {
  const warnings = [];
  if (!measurements) return warnings;

  for (const [key, bounds] of Object.entries(MEASUREMENT_BOUNDS)) {
    const val = Number(measurements[key]);
    if (val && !isNaN(val)) {
      if (val < bounds.min) {
        warnings.push({
          field: key,
          label: bounds.label,
          message: `${bounds.label} (${val} cm) is below typical adult range (${bounds.min}–${bounds.max} cm). Double check your tape measure.`,
          severity: 'warning'
        });
      } else if (val > bounds.max) {
        warnings.push({
          field: key,
          label: bounds.label,
          message: `${bounds.label} (${val} cm) exceeds typical single-pattern range (${bounds.min}–${bounds.max} cm). Custom slash-and-spread may be needed.`,
          severity: 'warning'
        });
      }
    }
  }

  // Cross-check: waist is almost always smaller than hips in standard anthropometry
  if (measurements.waist && measurements.hips) {
    const waist = Number(measurements.waist);
    const hips = Number(measurements.hips);
    if (waist > hips) {
      warnings.push({
        field: 'waist',
        label: 'Waist vs Hips',
        message: 'Your waist measurement is larger than your hips. Verify you didn’t switch the two numbers.',
        severity: 'warning'
      });
    }
  }

  return warnings;
}

/**
 * Finds the closest matching size row for a single measurement value
 * @param {string} field - 'bust' | 'waist' | 'hips' | etc.
 * @param {number} valueCm - Measurement in cm
 * @returns {Object} size chart row
 */
export function findSizeForMeasurement(field, valueCm) {
  if (!valueCm || isNaN(valueCm)) return SIZE_CHART[2]; // Default S/M
  let closestRow = SIZE_CHART[0];
  let minDiff = Infinity;

  for (const row of SIZE_CHART) {
    const target = row[field];
    if (target !== undefined) {
      const diff = Math.abs(target - valueCm);
      if (diff < minDiff) {
        minDiff = diff;
        closestRow = row;
      }
    }
  }
  return closestRow;
}

/**
 * Determines overall recommended size, individual body part matches,
 * and detects size mismatches (e.g. Bust is M, Waist is S, Hips are L).
 * 
 * Formula rationale:
 * For tops/dresses/caftans, the bust measurement is given the highest weight (45%),
 * followed by hips (35%), and waist (20%).
 * 
 * @param {Object} measurements - { bust, waist, hips, shoulder, inseam, arm, height } in cm
 * @param {'fitted'|'regular'|'relaxed'} fitPreference - User fit choice
 * @returns {Object} { recommendedSize, breakdown, hasMismatch, mismatchNotes, adjustedMeasurements }
 */
export function determineRecommendedSize(measurements, fitPreference = 'regular') {
  const ease = FIT_PREFERENCES[fitPreference] || FIT_PREFERENCES.regular;

  // Internal calculations: calculate body + ease
  const adjusted = {
    bust: (Number(measurements.bust) || 90) + ease.bustEase,
    waist: (Number(measurements.waist) || 72) + ease.waistEase,
    hips: (Number(measurements.hips) || 98) + ease.hipsEase,
    shoulder: Number(measurements.shoulder) || 40,
    inseam: Number(measurements.inseam) || 78,
    arm: (Number(measurements.arm) || 58) + ease.armEase,
    height: Number(measurements.height) || 168
  };

  // Find individual matches
  const bustMatch = findSizeForMeasurement('bust', adjusted.bust);
  const waistMatch = findSizeForMeasurement('waist', adjusted.waist);
  const hipsMatch = findSizeForMeasurement('hips', adjusted.hips);

  const breakdown = {
    bust: { size: bustMatch.label, numericUS: bustMatch.numericUS, target: bustMatch.bust, value: adjusted.bust },
    waist: { size: waistMatch.label, numericUS: waistMatch.numericUS, target: waistMatch.waist, value: adjusted.waist },
    hips: { size: hipsMatch.label, numericUS: hipsMatch.numericUS, target: hipsMatch.hips, value: adjusted.hips }
  };

  // Determine overall closest size using weighted Euclidean distance
  let bestRow = SIZE_CHART[0];
  let lowestScore = Infinity;

  SIZE_CHART.forEach((row) => {
    // Weighted square difference
    const dBust = Math.pow((row.bust - adjusted.bust) * 0.45, 2);
    const dWaist = Math.pow((row.waist - adjusted.waist) * 0.20, 2);
    const dHips = Math.pow((row.hips - adjusted.hips) * 0.35, 2);
    const score = Math.sqrt(dBust + dWaist + dHips);

    if (score < lowestScore) {
      lowestScore = score;
      bestRow = row;
    }
  });

  // Check if body parts fall into different sizes
  const sizesFound = new Set([bustMatch.label, waistMatch.label, hipsMatch.label]);
  const hasMismatch = sizesFound.size > 1;

  let mismatchNotes = [];
  if (hasMismatch) {
    mismatchNotes.push(`Bust matches ${bustMatch.label} (US ${bustMatch.numericUS})`);
    mismatchNotes.push(`Waist matches ${waistMatch.label} (US ${waistMatch.numericUS})`);
    mismatchNotes.push(`Hips match ${hipsMatch.label} (US ${hipsMatch.numericUS})`);

    // Tailoring tip
    if (bustMatch.numericUS < hipsMatch.numericUS) {
      mismatchNotes.push(`Tailoring tip: Grade the side seams from size ${bustMatch.label} at the armscye down to size ${hipsMatch.label} over the hips for an exquisite silhouette.`);
    } else if (bustMatch.numericUS > hipsMatch.numericUS) {
      mismatchNotes.push(`Tailoring tip: Cut size ${bustMatch.label} for shoulder & chest, then taper gently inward to size ${hipsMatch.label} at the hip.`);
    }
  }

  return {
    recommendedSize: bestRow,
    breakdown,
    hasMismatch,
    mismatchNotes,
    adjustedMeasurements: adjusted,
    fitEase: ease
  };
}

/**
 * Fabric Yardage & Meters Estimator
 * Calculates fabric required based on garment type, size index, fabric bolt width,
 * and nap / directional print.
 * 
 * Formula:
 * Length needed = (Base garment length * cut count factor) + sleeves + facing/waistband + hem allowances + shrinkage (5%).
 * If fabric width is narrow (110cm vs 140/150cm), wider pieces (skirts, caftans, trousers) cannot fit side-by-side,
 * requiring an extra garment length (width factor: 1.35x to 1.5x).
 * Directional nap requires pieces to be laid out in the same direction, adding +15% yardage.
 * 
 * @param {Object} garment - Garment template object
 * @param {string} sizeLabel - e.g. 'M', 'L'
 * @param {number} fabricWidthCm - 110, 140, or 150
 * @param {boolean} hasNap - Whether fabric has directional print / velvet pile / corduroy nap
 * @param {string} hemOption - 'mini' | 'knee' | 'midi' | 'maxi'
 * @param {string} sleeveOption - 'none' | 'short' | 'threeQuarter' | 'long'
 * @returns {Object} { meters, yards, breakdown }
 */
export function calculateFabricRequirements(garment, sizeLabel, fabricWidthCm = 140, hasNap = false, hemOption = 'knee', sleeveOption = 'short') {
  if (!garment || !garment.baseLengthCm) {
    return { meters: 2.0, yards: 2.2, breakdown: [] };
  }

  // Hem length modifier in cm
  const hemAdjustments = {
    mini: -20,
    knee: 0,
    midi: +22,
    maxi: +45
  };
  const hemDelta = hemAdjustments[hemOption] || 0;

  // Sleeve modifier in cm
  const sleeveAdjustments = {
    none: -30,
    short: 0,
    threeQuarter: +20,
    long: +40
  };
  const sleeveDelta = garment.hasSleeves ? (sleeveAdjustments[sleeveOption] || 0) : 0;

  // Garment base length for chosen variation
  const effectiveLengthCm = Math.max(40, garment.baseLengthCm + hemDelta);

  // Size scaling factor: XS is 0.92, M is 1.0, 3XL is 1.25
  const sizeFactors = {
    'XS': 0.92, 'XS/S': 0.95, 'S': 0.97, 'S/M': 1.0,
    'M': 1.03, 'M/L': 1.06, 'L': 1.10, 'L/XL': 1.14,
    'XL': 1.18, '2XL': 1.23, '2XL/3XL': 1.28, '3XL': 1.33
  };
  const sizeFactor = sizeFactors[sizeLabel] || 1.0;

  // Base raw fabric consumption in cm based on cut pieces
  // E.g., Dress front + back = 2 lengths; Skirt = 2 lengths; Bag = 1 length + straps; Caftan = 2 full lengths + wide sleeves
  let baseRawCm = (effectiveLengthCm * garment.lengthMultiplier) + (garment.hasSleeves ? (50 + sleeveDelta) : 0);
  baseRawCm *= sizeFactor;

  // Add hem allowances and facings (approx 20cm total)
  baseRawCm += 20;

  // Width efficiency penalty:
  // Narrow fabric (110cm / 44") cannot nest wide pieces next to each other
  let widthMultiplier = 1.0;
  if (fabricWidthCm <= 115) {
    widthMultiplier = garment.isWideGarment ? 1.45 : 1.25;
  } else if (fabricWidthCm >= 150) {
    widthMultiplier = 0.92; // high yield nesting
  }

  let totalCm = baseRawCm * widthMultiplier;

  // Directional nap / print penalty (+15%)
  if (hasNap) {
    totalCm *= 1.15;
  }

  // Safety buffer + pre-wash shrinkage (6%)
  totalCm *= 1.06;

  // Convert to meters and yards, rounded up to nearest 0.1m / 1/8 yard
  const meters = Math.ceil((totalCm / 100) * 10) / 10;
  const yards = Math.ceil((meters * 1.09361) * 8) / 8;

  return {
    meters: Number(meters.toFixed(2)),
    yards: Number(yards.toFixed(2)),
    baseLengthCm: effectiveLengthCm,
    widthMultiplier,
    napAdded: hasNap
  };
}
