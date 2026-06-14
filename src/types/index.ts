export type ContractType =
  | 'web-development'
  | 'ui-design'
  | 'content-writing'
  | 'social-media'
  | 'video-editing'
  | 'mobile-development';

export type ContractLanguage = 'ar' | 'en';

export type ContractStatus = 'draft' | 'active' | 'completed' | 'cancelled';

export type PaymentTerms =
  | 'full-upfront'
  | '50-50'
  | '30-70'
  | 'milestone-based'
  | 'upon-delivery';

export interface Party {
  name: string;
  email: string;
  phone: string;
  country: string;
}

export interface ContractScope {
  title: string;
  description: string;
  deliverables: string[];
  revisions: number;
}

export interface PricingDetails {
  amount: number;
  currency: 'USD' | 'EGP' | 'SAR' | 'AED';
  paymentTerms: PaymentTerms;
  latePenaltyPercent: number;
}

export interface ContractDates {
  startDate: string;       // ISO string
  endDate: string;         // ISO string
  signedAt?: string;       // ISO string
}

export interface Contract {
  id: string;              // generated
  type: ContractType;
  language: ContractLanguage;
  status: ContractStatus;
  freelancer: Party;
  client: Party;
  scope: ContractScope;
  pricing: PricingDetails;
  dates: ContractDates;
  signatureDataUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Form state (partial contract during creation)
export type ContractDraft = Partial<Contract> & { currentStep: number };

// Price suggestion from usePriceCalculator
export interface PriceSuggestion {
  min: number;
  recommended: number;
  max: number;
  currency: 'USD';
  rationale: string;
}
