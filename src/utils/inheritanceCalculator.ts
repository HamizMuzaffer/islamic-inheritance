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

export interface Heir {
  name: string;
  relationship: string;
  share: string;
  amount: number;
}

export function calculateInheritance(input: InheritanceInput): Heir[] {
  const netEstate = input.totalAssets - input.financialLiabilities;
  const heirs: Heir[] = [];
  
  let remainingFractions = 1;
  const hasChildren = input.sons > 0 || input.daughters > 0;
  
  // Spouse share
  if (input.hasSpouse) {
    let spouseShare: number;
    if (hasChildren) {
      spouseShare = input.genderDeceased === 'male' ? 1/8 : 1/4;
    } else {
      spouseShare = input.genderDeceased === 'male' ? 1/4 : 1/2;
    }
    
    heirs.push({
      name: input.genderDeceased === 'male' ? 'Wife' : 'Husband',
      relationship: 'Spouse',
      share: formatFraction(spouseShare),
      amount: netEstate * spouseShare,
    });
    
    remainingFractions -= spouseShare;
  }
  
  // Parents shares
  if (input.parentsStatus !== 'none') {
    if (hasChildren) {
      // If there are children, each parent gets 1/6
      if (input.parentsStatus === 'both' || input.parentsStatus === 'father') {
        heirs.push({
          name: 'Father',
          relationship: 'Parent',
          share: '1/6',
          amount: netEstate * (1/6),
        });
        remainingFractions -= 1/6;
      }
      
      if (input.parentsStatus === 'both' || input.parentsStatus === 'mother') {
        heirs.push({
          name: 'Mother',
          relationship: 'Parent',
          share: '1/6',
          amount: netEstate * (1/6),
        });
        remainingFractions -= 1/6;
      }
    } else {
      // If no children
      if (input.parentsStatus === 'both' || input.parentsStatus === 'mother') {
        const motherShare = input.hasSpouse ? 1/6 : 1/3;
        heirs.push({
          name: 'Mother',
          relationship: 'Parent',
          share: formatFraction(motherShare),
          amount: netEstate * motherShare,
        });
        remainingFractions -= motherShare;
      }
      
      if (input.parentsStatus === 'both' || input.parentsStatus === 'father') {
        // Father gets the residue
        heirs.push({
          name: 'Father',
          relationship: 'Parent',
          share: 'Residue',
          amount: netEstate * remainingFractions,
        });
        remainingFractions = 0;
      }
    }
  }
  
  // Children shares
  if (hasChildren) {
    const totalShares = input.sons * 2 + input.daughters;
    const remainingAmount = netEstate * remainingFractions;
    const shareUnit = remainingAmount / totalShares;
    
    if (input.sons > 0) {
      const sonAmount = shareUnit * 2;
      for (let i = 1; i <= input.sons; i++) {
        heirs.push({
          name: `Son ${i}`,
          relationship: 'Child',
          share: '2x',
          amount: sonAmount,
        });
      }
    }
    
    if (input.daughters > 0) {
      const daughterAmount = shareUnit;
      for (let i = 1; i <= input.daughters; i++) {
        heirs.push({
          name: `Daughter ${i}`,
          relationship: 'Child',
          share: '1x',
          amount: daughterAmount,
        });
      }
    }
    
    remainingFractions = 0;
  }
  
  // Siblings (only if no children and no father)
  if (!hasChildren && input.parentsStatus !== 'father' && input.parentsStatus !== 'both') {
    const totalSiblingShares = input.brothers * 2 + input.sisters;
    if (totalSiblingShares > 0) {
      const remainingAmount = netEstate * remainingFractions;
      const shareUnit = remainingAmount / totalSiblingShares;
      
      if (input.brothers > 0) {
        const brotherAmount = shareUnit * 2;
        for (let i = 1; i <= input.brothers; i++) {
          heirs.push({
            name: `Brother ${i}`,
            relationship: 'Sibling',
            share: '2x',
            amount: brotherAmount,
          });
        }
      }
      
      if (input.sisters > 0) {
        const sisterAmount = shareUnit;
        for (let i = 1; i <= input.sisters; i++) {
          heirs.push({
            name: `Sister ${i}`,
            relationship: 'Sibling',
            share: '1x',
            amount: sisterAmount,
          });
        }
      }
    }
  }
  
  return heirs;
}

function formatFraction(decimal: number): string {
  const fractions: Record<number, string> = {
    0.125: '1/8',
    0.25: '1/4',
    0.333: '1/3',
    0.5: '1/2',
    0.166: '1/6',
    0.666: '2/3',
  };
  
  const rounded = Math.round(decimal * 1000) / 1000;
  return fractions[rounded] || `${(decimal * 100).toFixed(1)}%`;
}
