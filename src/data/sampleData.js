/**
 * Realistic Sample Data for SEWORA
 * Provides rich defaults on initial load for measurement profiles and project tracker.
 */

export const INITIAL_PROFILES = [
  {
    id: 'profile-me',
    name: 'Me (Amina)',
    relation: 'Self',
    unit: 'cm',
    measurements: {
      bust: 92,
      waist: 74,
      hips: 101,
      shoulder: 39.5,
      inseam: 78,
      arm: 58,
      height: 168
    },
    notes: 'Standard fit for dresses; prefer slightly roomier hips (+2 cm) for evening kaftans.'
  },
  {
    id: 'profile-mom',
    name: 'Mom (Fatima)',
    relation: 'Family',
    unit: 'cm',
    measurements: {
      bust: 108,
      waist: 94,
      hips: 118,
      shoulder: 43,
      inseam: 74,
      arm: 57,
      height: 162
    },
    notes: 'Loves relaxed A-line silhouettes and traditional Moroccan Djellabas with room for movement.'
  },
  {
    id: 'profile-kid',
    name: 'Layla (Kid)',
    relation: 'Daughter',
    unit: 'cm',
    measurements: {
      bust: 70,
      waist: 58,
      hips: 74,
      shoulder: 32,
      inseam: 60,
      arm: 46,
      height: 138
    },
    notes: 'Simple holiday dress or tote bags for school crafts.'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Emerald Moroccan Kaftan with Gold Sfifa',
    garmentId: 'moroccan-kaftan',
    profileId: 'profile-me',
    profileName: 'Me (Amina)',
    fabricName: 'Emerald Jewel Silk Velvet & Gold Sfifa',
    paletteId: 'emerald-velvet',
    size: 'M',
    fit: 'relaxed',
    options: {
      neckline: 'moroccan-sfifa',
      sleeves: 'long',
      hem: 'maxi',
      pockets: 'side-slit'
    },
    seamAllowanceCm: 1.5,
    fabricWidthCm: 140,
    hasNap: true,
    estimatedMeters: 4.2,
    costEstimate: 85.00,
    dueDate: '2026-12-15',
    status: 'Sewing',
    progress: 60,
    notes: 'Special gala kaftan. Finished center front Kitane piping; currently hand-stitching the 45 Aakad buttons along the chest.'
  },
  {
    id: 'proj-2',
    title: 'Sand Linen Everyday A-Line Skirt',
    garmentId: 'a-line-skirt',
    profileId: 'profile-me',
    profileName: 'Me (Amina)',
    fabricName: 'European Washed Linen (Oatmeal)',
    paletteId: 'linen-natural',
    size: 'M',
    fit: 'regular',
    options: {
      hem: 'knee',
      pockets: 'patch'
    },
    seamAllowanceCm: 1.5,
    fabricWidthCm: 140,
    hasNap: false,
    estimatedMeters: 1.6,
    costEstimate: 34.50,
    dueDate: '2026-11-28',
    status: 'Cutting',
    progress: 30,
    notes: 'Interfacing fused to waistband; pattern pieces pinned to folded linen ready to cut.'
  },
  {
    id: 'proj-3',
    title: 'Breton Striped Weekend Canvas Tote',
    garmentId: 'tote-bag',
    profileId: 'profile-me',
    profileName: 'Me (Amina)',
    fabricName: 'Heavy 12oz Striped Cotton Canvas & Navy Lining',
    paletteId: 'stripes',
    size: 'M',
    fit: 'regular',
    options: {
      hem: 'knee',
      pockets: 'inner'
    },
    seamAllowanceCm: 1.2,
    fabricWidthCm: 110,
    hasNap: true,
    estimatedMeters: 1.1,
    costEstimate: 18.00,
    dueDate: '2026-11-22',
    status: 'Finished',
    progress: 100,
    notes: 'Reinforced box corners with double stitching. Turned out beautifully sturdy!'
  }
];
