'use client';

import React from 'react';
import { ContractDraft } from '../../types';
import { Plus, Trash } from 'lucide-react';

interface StepProps {
  formData: ContractDraft;
  errors: Record<string, string>;
  updateField: (path: string[], value: any) => void;
  lang: 'ar' | 'en';
}

export function StepTwo({ formData, errors, updateField, lang }: StepProps) {
  const isAr = lang === 'ar';
  const s = formData.scope || { title: '', description: '', deliverables: [''], revisions: 3 };
  const dels = s.deliverables && s.deliverables.length > 0 ? s.deliverables : [''];

  const addDeliverable = () => {
    updateField(['scope', 'deliverables'], [...dels, '']);
  };

  const removeDeliverable = (index: number) => {
    if (dels.length <= 1) return;
    const next = dels.filter((_, idx) => idx !== index);
    updateField(['scope', 'deliverables'], next);
  };

  const onDelChange = (index: number, val: string) => {
    const next = [...dels];
    next[index] = val;
    updateField(['scope', 'deliverables'], next);
  };

  const inputClass = "w-full bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-[#eaeaea] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e94560] transition-colors mt-1.5";
  const labelClass = "text-xs font-semibold text-[#8892a4] block";

  return (
    <div className="space-y-6" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      <div className="bg-[#16213e]/50 p-6 rounded-xl border border-[#2a2a4a]/85">
        <h2 className="text-lg font-bold font-display text-white mb-4">
          {isAr ? 'نطاق وتفاصيل العمل المطلوبة' : 'Project Scope & Deliverables'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>{isAr ? 'عنوان المشروع الرئيسي' : 'Project Title'}</label>
            <input
              type="text"
              className={inputClass}
              value={s.title}
              onChange={(e) => updateField(['scope', 'title'], e.target.value)}
              placeholder={isAr ? 'برمجة وتصميم متجر جوالات' : 'E-commerce App React'}
            />
            {errors['scope.title'] && <p className="text-xs text-[#e94560] mt-1">{errors['scope.title']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'وصف تفصيلي للخدمات (حد أدنى ٢٠ حرف)' : 'Detailed Description (min 20 chars)'}</label>
            <textarea
              className={`${inputClass} h-28 resize-none`}
              value={s.description}
              onChange={(e) => updateField(['scope', 'description'], e.target.value)}
              placeholder={isAr ? 'توفير كود مصدري نظيف ومصمم خصيصاً للتطبيق لتسهيل تشغيل تجربة التسوق...' : 'Provide complete customized React frontend with shopping cart interface, state managers, and Stripe checkout page.'}
            />
            {errors['scope.description'] && <p className="text-xs text-[#e94560] mt-1">{errors['scope.description']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'عدد جلسات التعديل والمراجعة المسموحة' : 'Allowed Revisions'}</label>
            <input
              type="number"
              min="0"
              max="10"
              className={inputClass}
              value={s.revisions}
              onChange={(e) => updateField(['scope', 'revisions'], Number(e.target.value))}
            />
          </div>

          <div>
            <label className={`${labelClass} mb-2`}>{isAr ? 'بنود تسليمات المخرجات (التسليمات)' : 'Deliverables (Outcomes)'}</label>
            <div className="space-y-2">
              {dels.map((del, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required
                    className={`${inputClass} mt-0 flex-1`}
                    value={del}
                    onChange={(e) => onDelChange(index, e.target.value)}
                    placeholder={isAr ? `مثال: ملفات التصميم الأساسية Fg` : `e.g. Figma Source Files`}
                  />
                  {dels.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDeliverable(index)}
                      className="p-3 bg-[#1a1a2e] hover:bg-[#e94560]/10 hover:text-[#e94560] border border-[#2a2a4a] text-gray-400 rounded-lg transition-all"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {errors['scope.deliverables'] && <p className="text-xs text-[#e94560] mt-1">{errors['scope.deliverables']}</p>}

            <button
              type="button"
              onClick={addDeliverable}
              className={`flex items-center gap-2 text-xs font-semibold text-[#e94560] hover:text-[#c73652] transition-colors mt-3 ${isAr ? 'mr-auto' : 'ml-auto'}`}
            >
              <Plus className="w-4 h-4" />
              {isAr ? 'إضافة مخرج تسليم جديد' : 'Add New Deliverable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
