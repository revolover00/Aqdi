'use client';

import { useMemo } from 'react';
import { ContractType, PriceSuggestion } from '../types';
import { HOURLY_RATES_USD, RATIONALE } from '../lib/constants';

export function usePriceCalculator(type: ContractType | undefined, estimatedHours: number): PriceSuggestion {
  return useMemo(() => {
    if (!type || estimatedHours <= 0) {
      return {
        min: 0,
        recommended: 0,
        max: 0,
        currency: 'USD',
        rationale: 'Enter contract type and estimated hours to see suggestions',
      };
    }

    const rates = HOURLY_RATES_USD[type];
    const rationaleText = RATIONALE[type] || 'Based on market research in tech and freelancing platforms';

    return {
      min: rates.min * estimatedHours,
      recommended: rates.mid * estimatedHours,
      max: rates.max * estimatedHours,
      currency: 'USD',
      rationale: rationaleText,
    };
  }, [type, estimatedHours]);
}
