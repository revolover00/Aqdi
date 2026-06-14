import { ContractType } from '../types';

export const HOURLY_RATES_USD: Record<ContractType, { min: number; mid: number; max: number }> = {
  'web-development':    { min: 25, mid: 55,  max: 120 },
  'ui-design':          { min: 20, mid: 45,  max: 95  },
  'content-writing':    { min: 10, mid: 25,  max: 60  },
  'social-media':       { min: 8,  mid: 20,  max: 50  },
  'video-editing':      { min: 15, mid: 35,  max: 80  },
  'mobile-development': { min: 35, mid: 70,  max: 150 },
};

export const RATIONALE: Record<ContractType, string> = {
  'web-development':    'Based on global Upwork median rates for React/Next.js developers',
  'ui-design':          'Based on Figma-focused UI designers on Upwork and Toptal',
  'content-writing':    'Based on English/Arabic bilingual content writers',
  'social-media':       'Based on social media management packages in MENA region',
  'video-editing':      'Based on short-form and long-form video editors globally',
  'mobile-development': 'Based on React Native and Flutter developers on global platforms',
};

export const CONTRACT_TYPE_NAMES: Record<ContractType, { en: string; ar: string }> = {
  'web-development': { en: 'Web Development', ar: 'تطوير المواقع' },
  'ui-design': { en: 'UI/UX Design', ar: 'تصميم الواجهات UI/UX' },
  'content-writing': { en: 'Content Writing', ar: 'كتابة المحتوى' },
  'social-media': { en: 'Social Media Management', ar: 'إدارة التواصل الاجتماعي' },
  'video-editing': { en: 'Video Editing', ar: 'مونتاج الفيديو' },
  'mobile-development': { en: 'Mobile App Development', ar: 'تطوير تطبيقات الجوال' },
};

export const UI_TEXT = {
  en: {
    appName: 'Aqdi',
    tagline: 'Professional contracts in minutes',
    selectType: 'Select Contract Type',
    freelancerInfo: 'Freelancer Information',
    clientInfo: 'Client Information',
    scope: 'Project Scope',
    pricing: 'Pricing & Payment',
    generatePDF: 'Generate PDF',
    download: 'Download Contract',
    share: 'Share Link',
    dashboard: 'My Contracts',
    backToDashboard: 'Back to Dashboard',
    createContract: 'Create Contract',
    languageToggle: 'العربية',
    noContracts: 'No contracts saved yet. Go ahead and create your first one!',
    delete: 'Delete',
    preview: 'Preview',
    sign: 'Sign Contract',
    signBelow: 'Sign inside the white area below',
    clear: 'Clear',
    save: 'Save',
    draft: 'Draft',
    active: 'Active',
    completed: 'Completed',
    cancelled: 'Cancelled',
    next: 'Next Step',
    back: 'Back',
  },
  ar: {
    appName: 'عقدي',
    tagline: 'عقود احترافية في دقيقتين',
    selectType: 'اختر نوع العقد',
    freelancerInfo: 'بيانات المستقل (أنت)',
    clientInfo: 'بيانات العميل',
    scope: 'نطاق المشروع',
    pricing: 'السعر وشروط الدفع',
    generatePDF: 'توليد العقد',
    download: 'تحميل العقد',
    share: 'مشاركة الرابط',
    dashboard: 'عقودي',
    backToDashboard: 'العودة لعقودي',
    createContract: 'إنشاء عقد جديد',
    languageToggle: 'English',
    noContracts: 'مرحباً بك! لا توجد عقود محفوظة حالياً، يمكنك البدء بإنشاء أول عقد لك.',
    delete: 'حذف',
    preview: 'معاينة',
    sign: 'توقيع العقد',
    signBelow: 'وقع داخل المربع الأبيض في الأسفل',
    clear: 'مسح',
    save: 'حفظ',
    draft: 'مسودة',
    active: 'نشط',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    next: 'الخطوة التالية',
    back: 'رجوع',
  },
} as const;

export type Lang = keyof typeof UI_TEXT;
export type UITextKey = keyof typeof UI_TEXT['en'];
