'use client';

import React from 'react';
import { ContractDraft } from '../../types';
import { SignaturePad } from '../contract/SignaturePad';

interface StepProps {
  formData: ContractDraft;
  errors: Record<string, string>;
  updateField: (path: string[], value: any) => void;
  lang: 'ar' | 'en';
}

export function StepFour({ formData, errors, updateField, lang }: StepProps) {
  const isAr = lang === 'ar';
  const d = formData.dates || { startDate: '', endDate: '' };

  const onSignatureSave = (dataUrl: string) => {
    updateField(['signatureDataUrl'], dataUrl);
    updateField(['dates', 'signedAt'], new Date().toISOString());
  };

  const onSignatureClear = () => {
    updateField(['signatureDataUrl'], undefined);
    updateField(['dates', 'signedAt'], undefined);
  };

  const inputClass = "w-full bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-[#eaeaea] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e94560] transition-colors mt-1.5";
  const labelClass = "text-xs font-semibold text-[#8892a4] block";

  return (
    <div className="space-y-6" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      <div className="bg-[#16213e]/50 p-6 rounded-xl border border-[#2a2a4a]">
        <h2 className="text-lg font-bold font-display text-white mb-4">
          {isAr ? 'التواريخ الأساسية وتوقيع العقد' : 'Deadlines & Authorization'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className={labelClass}>{isAr ? 'تاريخ البدء في تنفيذ المشروع' : 'Start Date'}</label>
            <input
              type="date"
              className={inputClass}
              value={d.startDate}
              onChange={(e) => updateField(['dates', 'startDate'], e.target.value)}
            />
            {errors['dates.startDate'] && <p className="text-xs text-[#e94560] mt-1">{errors['dates.startDate']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'تاريخ التسليم النهائي والانتهاء' : 'End Date (Deadline)'}</label>
            <input
              type="date"
              className={inputClass}
              value={d.endDate}
              onChange={(e) => updateField(['dates', 'endDate'], e.target.value)}
            />
            {errors['dates.endDate'] && <p className="text-xs text-[#e94560] mt-1">{errors['dates.endDate']}</p>}
          </div>
        </div>

        {/* Signature Pad */}
        <div className="pt-4 border-t border-[#2a2a4a]/80">
          <label className={`${labelClass} mb-3 text-sm`}>
            {isAr ? 'التوقيع الإلكتروني للتأكيد على بنود العقد:' : 'Handwritten Electronic Signature:'}
          </label>
          <SignaturePad
            onSave={onSignatureSave}
            onClear={onSignatureClear}
            lang={lang}
          />
          {formData.signatureDataUrl && (
            <div className={`mt-3 p-3 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-500/20 text-center`}>
              {isAr ? '✓ تم حفظ التوقيع بنجاح داخل العقد الإلكتروني' : '✓ Signature saved and locked into contract'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
