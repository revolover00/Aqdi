'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContractForm } from '../../hooks/useContractForm';
import { useContractStorage } from '../../hooks/useContractStorage';
import { StepOne } from '../../components/form/StepOne';
import { StepTwo } from '../../components/form/StepTwo';
import { StepThree } from '../../components/form/StepThree';
import { StepFour } from '../../components/form/StepFour';
import { UI_TEXT } from '../../lib/constants';
import { ContractType, Party, ContractScope, PricingDetails, ContractDates, Contract } from '../../types';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

export default function NewContractForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = (searchParams.get('type') as ContractType) || 'web-development';

  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const { currentStep, formData, errors, goNext, goPrev, updateField, submitContract, clearDraft } = useContractForm(typeParam);
  const { saveContract } = useContractStorage();

  // Pick up language
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const s = localStorage.getItem('aqdi_lang') as 'ar' | 'en';
    if (s === 'ar' || s === 'en') setLang(s);
  }, []);

  const isAr = lang === 'ar';
  const text = UI_TEXT[lang];

  const handleFinalSubmit = () => {
    const finalForm = submitContract();
    if (!finalForm) return;

    try {
      const generatedId = crypto.randomUUID();
      const newContract: Contract = {
        id: generatedId,
        type: typeParam,
        language: lang,
        status: 'active',
        freelancer: finalForm.freelancer as Party,
        client: finalForm.client as Party,
        scope: finalForm.scope as ContractScope,
        pricing: finalForm.pricing as PricingDetails,
        dates: finalForm.dates as ContractDates,
        signatureDataUrl: finalForm.signatureDataUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveContract(newContract);
      clearDraft();
      router.push(`/preview?id=${generatedId}`);
    } catch (e) {
      console.error('[NewContractForm] Submission failed', e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      {/* progress banner */}
      <div className={`flex justify-between items-center mb-6 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
        <button
          onClick={() => router.push('/')}
          className="text-xs text-[#8892a4] hover:text-[#e94560] transition-colors"
        >
          {isAr ? '← إلغاء والعودة للرئيسية' : '← Cancel and go back'}
        </button>
        <span className="text-xs text-[#8892a4] font-medium">
          {isAr ? `الخطوة ${currentStep} من ٤` : `Step ${currentStep} of 4`}
        </span>
      </div>

      <div className="w-full bg-[#16213e] h-2 rounded-full mb-10 overflow-hidden">
        <div
          className="bg-[#e94560] h-full transition-all duration-550"
          style={{
            width: `${(currentStep / 4) * 100}%`,
            float: isAr ? 'right' : 'left',
          }}
        />
      </div>

      {/* Actual Form step loaded dynamically */}
      <div className="min-h-[400px] mb-8">
        {currentStep === 1 && (
          <StepOne formData={formData} errors={errors} updateField={updateField} lang={lang} />
        )}
        {currentStep === 2 && (
          <StepTwo formData={formData} errors={errors} updateField={updateField} lang={lang} />
        )}
        {currentStep === 3 && (
          <StepThree formData={formData} errors={errors} updateField={updateField} lang={lang} />
        )}
        {currentStep === 4 && (
          <StepFour formData={formData} errors={errors} updateField={updateField} lang={lang} />
        )}
      </div>

      {/* Wizard actions */}
      <div className={`flex justify-between items-center border-t border-[#2a2a4a] pt-6 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={goPrev}
            className={`flex items-center gap-1.5 px-5 py-3 hover:bg-[#16213e] border border-[#2a2a4a] text-sm text-[#eaeaea] font-semibold rounded-xl transition-all cursor-pointer ${
              isAr ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{text.back}</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={goNext}
            className={`flex items-center gap-1.5 bg-[#e94560] hover:bg-[#c73652] text-white px-6 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
              isAr ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <span>{text.next}</span>
            <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinalSubmit}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{text.generatePDF}</span>
          </button>
        )}
      </div>
    </div>
  );
}
