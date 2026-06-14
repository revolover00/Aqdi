'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { ContractDraft, ContractType } from '../types';
import { partySchema, scopeSchema, pricingSchema, datesSchema } from '../lib/validators';

interface FormState {
  currentStep: number;
  formData: ContractDraft;
  errors: Record<string, string>;
}

type FormAction =
  | { type: 'RESTORE_DRAFT'; payload: ContractDraft }
  | { type: 'UPDATE_FIELD'; path: string[]; value: any }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'GO_NEXT' }
  | { type: 'GO_PREV' }
  | { type: 'SET_STEP'; step: number }
  | { type: 'CLEAR_DRAFT'; payload: ContractDraft };

const initialDraft = (type?: ContractType): ContractDraft => ({
  type: type || 'web-development',
  language: 'en',
  status: 'draft',
  freelancer: { name: '', email: '', phone: '', country: '' },
  client: { name: '', email: '', phone: '', country: '' },
  scope: { title: '', description: '', deliverables: [''], revisions: 3 },
  pricing: { amount: 0, currency: 'USD', paymentTerms: '50-50', latePenaltyPercent: 0 },
  dates: { startDate: '', endDate: '' },
  currentStep: 1,
});

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'RESTORE_DRAFT':
      return {
        ...state,
        formData: action.payload,
        currentStep: action.payload.currentStep || 1,
        errors: {},
      };
    case 'UPDATE_FIELD': {
      const newFormData = { ...state.formData };
      let current: any = newFormData;
      for (let i = 0; i < action.path.length - 1; i++) {
        const key = action.path[i];
        current[key] = { ...current[key] };
        current = current[key];
      }
      current[action.path[action.path.length - 1]] = action.value;
      
      return {
        ...state,
        formData: newFormData,
        errors: {}, // Clear error on change
      };
    }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'GO_NEXT':
      return { ...state, currentStep: Math.min(state.currentStep + 1, 4), errors: {} };
    case 'GO_PREV':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1), errors: {} };
    case 'SET_STEP':
      return { ...state, currentStep: action.step, errors: {} };
    case 'CLEAR_DRAFT':
      return {
        currentStep: 1,
        formData: action.payload,
        errors: {},
      };
    default:
      return state;
  }
}

export function useContractForm(initialType?: ContractType) {
  const [state, dispatch] = useReducer(formReducer, {
    currentStep: 1,
    formData: initialDraft(initialType),
    errors: {},
  });

  const { currentStep, formData, errors } = state;

  // Restore draft from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('aqdi_draft_contract');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          dispatch({ type: 'RESTORE_DRAFT', payload: parsed });
        }
      }
    } catch (e) {
      console.error('[useContractForm] Failed to restore draft', e);
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const toSave = { ...formData, currentStep };
      localStorage.setItem('aqdi_draft_contract', JSON.stringify(toSave));
    } catch (e) {
      console.error('[useContractForm] Failed to save draft', e);
    }
  }, [formData, currentStep]);

  const updateField = useCallback((path: string[], value: any) => {
    dispatch({ type: 'UPDATE_FIELD', path, value });
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      const freeParse = partySchema.safeParse(formData.freelancer);
      if (!freeParse.success) {
        freeParse.error.issues.forEach((issue) => {
          stepErrors[`freelancer.${issue.path.join('.')}`] = issue.message;
        });
      }
      const clientParse = partySchema.safeParse(formData.client);
      if (!clientParse.success) {
        clientParse.error.issues.forEach((issue) => {
          stepErrors[`client.${issue.path.join('.')}`] = issue.message;
        });
      }
    } else if (step === 2) {
      const scopeParse = scopeSchema.safeParse(formData.scope);
      if (!scopeParse.success) {
        scopeParse.error.issues.forEach((issue) => {
          stepErrors[`scope.${issue.path.join('.')}`] = issue.message;
        });
      }
    } else if (step === 3) {
      const pricingParse = pricingSchema.safeParse(formData.pricing);
      if (!pricingParse.success) {
        pricingParse.error.issues.forEach((issue) => {
          stepErrors[`pricing.${issue.path.join('.')}`] = issue.message;
        });
      }
    } else if (step === 4) {
      const datesParse = datesSchema.safeParse(formData.dates);
      if (!datesParse.success) {
        datesParse.error.issues.forEach((issue) => {
          stepErrors[`dates.${issue.path.join('.')}`] = issue.message;
        });
      }
    }

    if (Object.keys(stepErrors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors: stepErrors });
      return false;
    }
    
    return true;
  }, [formData]);

  const goNext = useCallback(() => {
    if (validateStep(currentStep)) {
      dispatch({ type: 'GO_NEXT' });
    }
  }, [currentStep, validateStep]);

  const goPrev = useCallback(() => {
    dispatch({ type: 'GO_PREV' });
  }, []);

  const clearDraft = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aqdi_draft_contract');
    }
    dispatch({ type: 'CLEAR_DRAFT', payload: initialDraft(initialType) });
  }, [initialType]);

  const submitContract = useCallback((): any | null => {
    for (const step of [1, 2, 3, 4]) {
      if (!validateStep(step)) {
        dispatch({ type: 'SET_STEP', step });
        return null;
      }
    }
    return formData;
  }, [formData, validateStep]);

  return {
    currentStep,
    formData,
    errors,
    goNext,
    goPrev,
    updateField,
    submitContract,
    clearDraft,
  };
}
