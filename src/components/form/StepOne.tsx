'use client';

import React from 'react';
import { ContractDraft } from '../../types';

interface StepProps {
  formData: ContractDraft;
  errors: Record<string, string>;
  updateField: (path: string[], value: any) => void;
  lang: 'ar' | 'en';
}

export function StepOne({ formData, errors, updateField, lang }: StepProps) {
  const isAr = lang === 'ar';
  const f = formData.freelancer || { name: '', email: '', phone: '', country: '' };
  const c = formData.client || { name: '', email: '', phone: '', country: '' };

  const inputClass = "w-full bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-[#eaeaea] rounded-lg px-4 py-3 focus:outline-none focus:border-[#e94560] transition-colors mt-1.5";
  const labelClass = "text-xs font-semibold text-[#8892a4] block";

  return (
    <div className="space-y-8" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      {/* Freelancer block */}
      <div className="bg-[#16213e]/50 p-6 rounded-xl border border-[#2a2a4a]/80">
        <h2 className="text-lg font-bold font-display text-white mb-4">
          {isAr ? '1. بياناتك المصلحية (المستقل)' : '1. Your Details (Freelancer)'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{isAr ? 'الاسم بالكامل' : 'Full Name'}</label>
            <input
              type="text"
              className={inputClass}
              value={f.name}
              onChange={(e) => updateField(['freelancer', 'name'], e.target.value)}
              placeholder={isAr ? 'أحمد محمد' : 'John Doe'}
            />
            {errors['freelancer.name'] && <p className="text-xs text-[#e94560] mt-1">{errors['freelancer.name']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
            <input
              type="email"
              className={inputClass}
              value={f.email}
              onChange={(e) => updateField(['freelancer', 'email'], e.target.value)}
              placeholder="mail@example.com"
            />
            {errors['freelancer.email'] && <p className="text-xs text-[#e94560] mt-1">{errors['freelancer.email']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
            <input
              type="tel"
              className={inputClass}
              value={f.phone}
              onChange={(e) => updateField(['freelancer', 'phone'], e.target.value)}
              placeholder="+966 5000 0000"
            />
            {errors['freelancer.phone'] && <p className="text-xs text-[#e94560] mt-1">{errors['freelancer.phone']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'الدولة / المنطقة' : 'Country'}</label>
            <input
              type="text"
              className={inputClass}
              value={f.country}
              onChange={(e) => updateField(['freelancer', 'country'], e.target.value)}
              placeholder={isAr ? 'السعودية' : 'Egypt'}
            />
            {errors['freelancer.country'] && <p className="text-xs text-[#e94560] mt-1">{errors['freelancer.country']}</p>}
          </div>
        </div>
      </div>

      {/* Client block */}
      <div className="bg-[#16213e]/50 p-6 rounded-xl border border-[#2a2a4a]/80">
        <h2 className="text-lg font-bold font-display text-white mb-4">
          {isAr ? '2. بيانات العميل (صاحب المشروع)' : '2. Client Details'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{isAr ? 'اسم العميل / الشركة' : 'Client / Company Name'}</label>
            <input
              type="text"
              className={inputClass}
              value={c.name}
              onChange={(e) => updateField(['client', 'name'], e.target.value)}
              placeholder={isAr ? 'شركة الحلول المتقدمة' : 'Acme Corp'}
            />
            {errors['client.name'] && <p className="text-xs text-[#e94560] mt-1">{errors['client.name']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'بريد العميل الإلكتروني' : 'Client Email Address'}</label>
            <input
              type="email"
              className={inputClass}
              value={c.email}
              onChange={(e) => updateField(['client', 'email'], e.target.value)}
              placeholder="client@company.com"
            />
            {errors['client.email'] && <p className="text-xs text-[#e94560] mt-1">{errors['client.email']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'رقم هاتف العميل' : 'Client Phone'}</label>
            <input
              type="tel"
              className={inputClass}
              value={c.phone}
              onChange={(e) => updateField(['client', 'phone'], e.target.value)}
              placeholder="+966 5000 1111"
            />
            {errors['client.phone'] && <p className="text-xs text-[#e94560] mt-1">{errors['client.phone']}</p>}
          </div>

          <div>
            <label className={labelClass}>{isAr ? 'دولة العميل' : 'Client Country'}</label>
            <input
              type="text"
              className={inputClass}
              value={c.country}
              onChange={(e) => updateField(['client', 'country'], e.target.value)}
              placeholder={isAr ? 'الإمارات' : 'Saudi Arabia'}
            />
            {errors['client.country'] && <p className="text-xs text-[#e94560] mt-1">{errors['client.country']}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
