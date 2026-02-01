export interface InheritanceInput {
  totalAssets: number;
  debtAmount: number;
  bequestsAmount: number;
  distributableEstate: number;
  financialLiabilities: number;
  genderDeceased: 'male' | 'female';
  parentsStatus: 'father' | 'mother' | 'both' | 'none';
  sons: number;
  daughters: number;
  brothers: number;
  sisters: number;
  hasSpouse: boolean;
}

export type HeirNameKey =
  | 'wife' | 'husband'
  | 'father' | 'mother'
  | { key: 'son'; index: number }
  | { key: 'daughter'; index: number }
  | { key: 'brother'; index: number }
  | { key: 'sister'; index: number };

export type RelationshipKey = 'spouse' | 'parent' | 'child' | 'sibling';

export type ShareKey =
  | string
  | '2x_residue' | '1x_residue'
  | 'residue'
  | 'sole_heir';

export interface Heir {
  nameKey: HeirNameKey;
  relationshipKey: RelationshipKey;
  shareKey: ShareKey;
  amount: number;
}

// ─── Coerce any value to a safe, finite number. ─────────────────────────────
// Handles: undefined, null, NaN, Infinity, empty-string, stray objects.
// Everything that isn't a finite number becomes 0.
function sanitizeNum(val: unknown): number {
  const n = Number(val);
  return isFinite(n) ? n : 0;
}

export function calculateInheritance(input: InheritanceInput): Heir[] {
  // Sanitize every numeric field once, up front.
  // This is the single guard that prevents NaN from entering any calculation.
  // Without it: undefined - 0 → NaN, Math.max(0, NaN) → NaN, NaN * fraction → NaN.
  const totalAssets          = sanitizeNum(input.totalAssets);
  const financialLiabilities = sanitizeNum(input.financialLiabilities);
  const debtAmount           = sanitizeNum(input.debtAmount);
  const bequestsAmount       = sanitizeNum(input.bequestsAmount);
  const distributableEstate  = sanitizeNum(input.distributableEstate);
  const sons                 = sanitizeNum(input.sons);
  const daughters            = sanitizeNum(input.daughters);
  const brothers             = sanitizeNum(input.brothers);
  const sisters              = sanitizeNum(input.sisters);

  const netEstate =
    distributableEstate > 0
      ? distributableEstate
      : Math.max(0, totalAssets - financialLiabilities - debtAmount - bequestsAmount);

  const heirs: Heir[] = [];
  const hasChildren = sons > 0 || daughters > 0;
  const hasSons     = sons > 0;

  // ─── STEP 1: Collect all FIXED shares (فرض) ─────────────────────────────
  interface FixedShare {
    nameKey: HeirNameKey;
    relationshipKey: RelationshipKey;
    fraction: number;
    count?: number;
  }

  const fixedShares: FixedShare[] = [];

  // Spouse
  if (input.hasSpouse) {
    let spouseFraction: number;
    if (hasChildren) {
      spouseFraction = input.genderDeceased === 'male' ? 1 / 8 : 1 / 4;
    } else {
      spouseFraction = input.genderDeceased === 'male' ? 1 / 4 : 1 / 2;
    }
    fixedShares.push({
      nameKey: input.genderDeceased === 'male' ? 'wife' : 'husband',
      relationshipKey: 'spouse',
      fraction: spouseFraction,
    });
  }

  // Parents
  if (input.parentsStatus !== 'none') {
    if (hasChildren) {
      if (input.parentsStatus === 'both' || input.parentsStatus === 'father') {
        fixedShares.push({ nameKey: 'father', relationshipKey: 'parent', fraction: 1 / 6 });
      }
      if (input.parentsStatus === 'both' || input.parentsStatus === 'mother') {
        fixedShares.push({ nameKey: 'mother', relationshipKey: 'parent', fraction: 1 / 6 });
      }
    } else {
      if (input.parentsStatus === 'both' || input.parentsStatus === 'mother') {
        const motherFraction = input.hasSpouse ? 1 / 6 : 1 / 3;
        fixedShares.push({ nameKey: 'mother', relationshipKey: 'parent', fraction: motherFraction });
      }
      // Father gets residue — handled in Step 4
    }
  }

  // Daughters-only fixed share (no sons present)
  if (hasChildren && !hasSons) {
    const daughtersTotalFraction = daughters === 1 ? 1 / 2 : 2 / 3;
    fixedShares.push({
      nameKey: { key: 'daughter', index: 0 }, // placeholder, expanded below
      relationshipKey: 'child',
      fraction: daughtersTotalFraction,
      count: daughters,
    });
  }

  // ─── STEP 2: Awl (عول) ──────────────────────────────────────────────────
  const totalFixed = fixedShares.reduce((sum, s) => sum + s.fraction, 0);
  const awlDivisor = totalFixed > 1 ? totalFixed : 1;

  // ─── STEP 3: Build heir list from fixed shares ──────────────────────────
  for (const s of fixedShares) {
    if (s.count && s.count > 0 && typeof s.nameKey === 'object' && s.nameKey.key === 'daughter') {
      const eachFraction = s.fraction / s.count;
      for (let i = 1; i <= s.count; i++) {
        heirs.push({
          nameKey: { key: 'daughter', index: i },
          relationshipKey: 'child',
          shareKey: formatFraction(eachFraction / awlDivisor),
          amount: netEstate * (eachFraction / awlDivisor),
        });
      }
    } else {
      heirs.push({
        nameKey: s.nameKey,
        relationshipKey: s.relationshipKey,
        shareKey: formatFraction(s.fraction / awlDivisor),
        amount: netEstate * (s.fraction / awlDivisor),
      });
    }
  }

  // ─── STEP 4: Residue (عصبة) ────────────────────────────────────────────
  const distributedAmount = heirs.reduce((sum, h) => sum + h.amount, 0);
  let remainingAmount = netEstate - distributedAmount;

  if (hasSons) {
    const totalChildShares = sons * 2 + daughters;
    const shareUnit = remainingAmount / totalChildShares;

    for (let i = 1; i <= sons; i++) {
      heirs.push({
        nameKey: { key: 'son', index: i },
        relationshipKey: 'child',
        shareKey: '2x_residue',
        amount: shareUnit * 2,
      });
    }
    for (let i = 1; i <= daughters; i++) {
      heirs.push({
        nameKey: { key: 'daughter', index: i },
        relationshipKey: 'child',
        shareKey: '1x_residue',
        amount: shareUnit,
      });
    }
    remainingAmount = 0;
  } else if (!hasChildren) {
    if (input.parentsStatus === 'father' || input.parentsStatus === 'both') {
      heirs.push({
        nameKey: 'father',
        relationshipKey: 'parent',
        shareKey: 'residue',
        amount: remainingAmount,
      });
      remainingAmount = 0;
    } else {
      const totalSiblingShares = brothers * 2 + sisters;
      if (totalSiblingShares > 0) {
        const shareUnit = remainingAmount / totalSiblingShares;
        for (let i = 1; i <= brothers; i++) {
          heirs.push({
            nameKey: { key: 'brother', index: i },
            relationshipKey: 'sibling',
            shareKey: '2x_residue',
            amount: shareUnit * 2,
          });
        }
        for (let i = 1; i <= sisters; i++) {
          heirs.push({
            nameKey: { key: 'sister', index: i },
            relationshipKey: 'sibling',
            shareKey: '1x_residue',
            amount: shareUnit,
          });
        }
        remainingAmount = 0;
      } else {
        // No asaba at all — remainder returns to mother, then spouse
        const motherHeir = heirs.find((h) => h.nameKey === 'mother');
        if (motherHeir) {
          motherHeir.amount += remainingAmount;
          motherHeir.shareKey = 'residue';
          remainingAmount = 0;
        } else {
          const spouseHeir = heirs.find((h) => h.relationshipKey === 'spouse');
          if (spouseHeir) {
            spouseHeir.amount += remainingAmount;
            spouseHeir.shareKey = 'sole_heir';
            remainingAmount = 0;
          }
        }
      }
    }
  }

  return heirs;
}

function formatFraction(decimal: number): string {
  const fractions: [number, string][] = [
    [1 / 8, '1/8'],
    [1 / 6, '1/6'],
    [1 / 4, '1/4'],
    [1 / 3, '1/3'],
    [1 / 2, '1/2'],
    [2 / 3, '2/3'],
  ];

  for (const [value, label] of fractions) {
    if (Math.abs(decimal - value) < 0.0001) return label;
  }
  return `${(decimal * 100).toFixed(1)}%`;
}