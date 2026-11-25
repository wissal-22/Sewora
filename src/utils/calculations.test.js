import { describe, it, expect } from 'vitest';
import { GARMENTS } from '../data/garments';
import {
  cmToInch,
  inchToCm,
  determineRecommendedSize,
  calculateFabricRequirements,
  validateMeasurements
} from './calculations';

const garment = (id) => GARMENTS.find((g) => g.id === id);

describe('unit conversion', () => {
  it('keeps quarter-inch input stable (inch -> cm -> inch)', () => {
    for (const inch of [28, 35.25, 36.5, 40.75]) {
      expect(cmToInch(inchToCm(inch))).toBe(inch);
    }
  });
  it('handles empty / invalid values', () => {
    expect(cmToInch('')).toBe(0);
    expect(inchToCm(undefined)).toBe(0);
    expect(cmToInch(NaN)).toBe(0);
  });
});

describe('fabric calculator', () => {
  it('uses the length declared on the hem option (pants)', () => {
    const pants = garment('pants');
    const full = calculateFabricRequirements(pants, 'M', 140, false, 'knee', 'none');
    const culottes = calculateFabricRequirements(pants, 'M', 140, false, 'midi', 'none');
    expect(culottes.meters).toBeLessThan(full.meters);
  });
  it('shorter hem never needs more fabric than a longer hem (skirt)', () => {
    const skirt = garment('a-line-skirt');
    const m = (h) => calculateFabricRequirements(skirt, 'M', 140, false, h, 'none').meters;
    expect(m('mini')).toBeLessThan(m('knee'));
    expect(m('knee')).toBeLessThan(m('midi'));
    expect(m('midi')).toBeLessThan(m('maxi'));
  });
  it('narrow fabric and nap both increase yardage', () => {
    const dress = garment('simple-dress');
    const base = calculateFabricRequirements(dress, 'M', 140, false, 'knee', 'short').meters;
    expect(calculateFabricRequirements(dress, 'M', 110, false, 'knee', 'short').meters).toBeGreaterThan(base);
    expect(calculateFabricRequirements(dress, 'M', 140, true, 'knee', 'short').meters).toBeGreaterThan(base);
  });
  it('every garment returns a positive amount for every hem option', () => {
    for (const g of GARMENTS) {
      for (const h of g.options.hem || []) {
        expect(calculateFabricRequirements(g, 'M', 140, false, h.id, 'short').meters).toBeGreaterThan(0);
      }
    }
  });
});

describe('garment data', () => {
  it('every hem option has lengthCm and exactly one default', () => {
    for (const g of GARMENTS) {
      const hems = g.options.hem || [];
      expect(hems.every((h) => typeof h.lengthCm === 'number')).toBe(true);
      expect(hems.filter((h) => h.default).length).toBe(1);
    }
  });
});

describe('size finder', () => {
  it('recommends a size and no mismatch for proportional measurements', () => {
    const r = determineRecommendedSize({ bust: 90, waist: 70, hips: 97 }, 'regular');
    expect(r.recommendedSize.label).toBeTruthy();
    expect(r.hasMismatch).toBe(false);
  });
  it('flags a real mismatch (small bust, large hips)', () => {
    expect(determineRecommendedSize({ bust: 84, waist: 70, hips: 120 }, 'fitted').hasMismatch).toBe(true);
  });
  it('reports missing and out-of-chart measurements', () => {
    const r = determineRecommendedSize({ bust: 200, waist: '', hips: 300 }, 'regular');
    expect(r.usedDefaults).toEqual(['waist']);
    expect(r.outOfChart).toEqual(['bust', 'hips']);
  });
});

describe('validation', () => {
  it('warns when waist is larger than hips', () => {
    const w = validateMeasurements({ waist: 110, hips: 95 });
    expect(w.some((x) => x.label === 'Waist vs Hips')).toBe(true);
  });
});
