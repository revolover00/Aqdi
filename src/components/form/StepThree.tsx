'use client';

import React, { useState } from 'react';
import { ContractDraft } from '../../types';
import { usePriceCalculator } from '../../hooks/usePriceCalculator';
import { Sparkles } from 'lucide-react';

interface StepProps {
  formData: ContractDraft;
  errors: Record<string, string>;
  updateField: (path: string[], value: any) => void;
  lang: 'ar' | 'en';
}

export function StepThree({ formData, errors, updateField, lang }: StepProps) {
  const isAr = lang === 'ar';
  const p = formData.pricing || { amount: 0, currency: 'USD', paymentTerms: '50-50', latePenaltyPercent: 0 };
  const type = formData.type || 'web-development';

  // Hours control for usePriceCalculator
  const [estHours, setEstHours] = useState<number>(10);
  const suggestion = usePriceCalculator(type, estHours);

  const inputClass = "w-full bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-[#eaeaea] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e94560] transition-colors mt-1.5";
  const labelClass = "text-xs font-semibold text-[#8892a4] block";

  return (
    <div className="space-y-6" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      {/* Dynamic Price Suggestion Helper */}
      <div className="bg-[#16213e]/80 p-5 rounded-xl border border-[#e94560]/30 shadow-[#e94560]/5 shadow-inner">
        <div className={`flex items-center gap-2 mb-3 text-[#e94560] ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
          <Sparkles className="w-5 h-5 animate-pulse" />
          <h3 className="text-sm font-bold font-display uppercase tracking-wider">
            {isAr ? 'مستشار التسعير الذكي (عقدي)' : 'Aqdi Intelligent pricing assistant'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className={labelClass}>
              {isAr ? 'أدخل الساعات المقدرة للمشروع:' : 'Estimated project workload (hours):'}
            </label>
            <input
              type="number"
              min="1"
              max="500"
              className={inputClass}
              value={estHours}
              onChange={(e) => setEstHours(Math.max(1, Number(e.target.value)))}
            />
          </div>
          <div className="bg-[#0f0f23]/60 p-4 rounded-lg border border-[#2a2a4a]/40 text-xs text-[#eaeaea] space-y-1.5">
            <p className="text-[#8892a4] font-medium">{suggestion.rationale}</p>
            <div className={`flex gap-3 pt-1 border-t border-[#2a2a4a]/40 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
              <p>
                <strong>{isAr ? 'الأدنى:' : 'Min:'}</strong> ${suggestion.min}
              </p>
              <p className="text-[#e94560]">
                <strong>{isAr ? 'المقترح:' : 'Rec:'}</strong> ${suggestion.recommended}
              </p>
              <p>
                <strong>{isAr ? 'الأعلى:' : 'Max:'}</strong> ${suggestion.max}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actual Price block */}
      <div className="bg-[#16213e]/50 p-6 rounded-xl border border-[#2a2a4a]">
        <h2 className="text-lg font-bold font-display text-white mb-4">
          {isAr ? 'شروط وقيمة التكلفة المالية' : 'Fees & Payment Matrix'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{isAr ? 'قيمة المشروع الأساسية' : 'Total Price'}</label>
            <input
              type="number"
              min="1"
              className={inputClass}
              value={p.amount || ''}
              onChange={(e) => updateField(['pricing', 'amount'], Number(e.target.value))}
              placeholder="500"
            />
            {errors['pricing.amount'] && <p className="text-xs text-[#e94560] mt-1">{errors['pricing.amount']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'العملة الرقمية/الوطنية' : 'Currency'}</label>
            <select
              className={inputClass}
              value={p.currency}
              onChange={(e) => updateField(['pricing', 'currency'], e.target.value)}
            >
              <option value="USD">USD ($)</option>
              <option value="EGP">EGP (ج.م)</option>
              <option value="SAR">SAR (ر.س)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'جدول وهيكل الدفعات' : 'Payment Terms Structure'}</label>
            <select
              className={inputClass}
              value={p.paymentTerms}
              onChange={(e) => updateField(['pricing', 'paymentTerms'], e.target.value)}
            >
              <option value="full-upfront">{isAr ? 'مقدم كامل ١٠٠٪' : '100% Upfront Payment'}</option>
              <option value="50-50">{isAr ? '٥٠٪ مقدم و ٥٠٪ عند الاستلام' : '50% Upfront, 50% Upon Delivery'}</option>
              <option value="30-70">{isAr ? '٣٠٪ مقدم و ٧٠٪ عند التسليم' : '30% Deposit, 70% Final handover'}</option>
              <option value="milestone-based">{isAr ? 'دفعات مرحلية (أقساط معينة)' : 'Milestone-based split payments'}</option>
              <option value="upon-delivery">{isAr ? 'سداد بالكامل عند الاستلام الفعلي' : '100% post-delivery settlement'}</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'غرامة دفع متأخر يومياً (نسبة 0-10%)' : 'Late Daily penalty (%)'}</label>
            <input
              type="number"
              min="0"
              max="10"
              className={inputClass}
              value={p.latePenaltyPercent}
              onChange={(e) => updateField(['pricing', 'latePenaltyPercent'], Number(e.target.value))}
            />
            {errors['pricing.latePenaltyPercent'] && <p className="text-xs text-[#e94560] mt-1">{errors['pricing.latePenaltyPercent']}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
