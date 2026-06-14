'use client';

import React from 'react';
import { Contract } from '../../types';
import { CONTRACT_TEMPLATES } from '../../lib/pdf/templates';
import { formatCurrency, formatDate } from '../../lib/formatters';
import { CONTRACT_TYPE_NAMES } from '../../lib/constants';

interface ContractPreviewProps {
  contract: Partial<Contract>;
  lang: 'ar' | 'en';
}

export function ContractPreview({ contract, lang }: ContractPreviewProps) {
  const isRtl = lang === 'ar';
  
  const type = contract.type || 'web-development';
  const nameOfContract = CONTRACT_TYPE_NAMES[type][lang];
  const template = CONTRACT_TEMPLATES[type][lang];
  
  const freelancer = contract.freelancer || { name: '', email: '', phone: '', country: '' };
  const client = contract.client || { name: '', email: '', phone: '', country: '' };
  const scope = contract.scope || { title: '', description: '', deliverables: [], revisions: 3 };
  const pricing = contract.pricing || { amount: 0, currency: 'USD', paymentTerms: '50-50', latePenaltyPercent: 0 };
  const dates = contract.dates || { startDate: '', endDate: '' };

  const styleDir = isRtl ? { direction: 'rtl' as const } : { direction: 'ltr' as const };

  return (
    <div 
      className="w-full bg-white text-[#1a1a2e] rounded-xl shadow-2xl p-8 md:p-12 font-sans overflow-hidden border border-gray-200"
      style={styleDir}
    >
      {/* Brand Watermark / Stamp */}
      <div className={`flex justify-between items-center border-b pb-6 mb-8 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <div>
          <span className="text-xs uppercase tracking-widest text-[#e94560] font-bold">Aqdi / عقدي</span>
          <h1 className="text-xl md:text-2xl font-bold font-display mt-1 text-[#16213e]">
            {template?.title || nameOfContract}
          </h1>
        </div>
        <div className="text-right">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold uppercase bg-gray-100 text-gray-800">
            {contract.status || 'draft'}
          </span>
        </div>
      </div>

      {/* Parties Block */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm ${isRtl ? 'text-right' : 'text-left'}`}>
        <div className="border p-4 rounded-lg bg-gray-50/70 border-gray-100">
          <h3 className="font-bold text-[#16213e] uppercase tracking-wider mb-2 text-xs">
            {isRtl ? 'الطرف الأول (المستقل):' : 'Party A (Freelancer):'}
          </h3>
          <p className="font-semibold text-base">{freelancer.name || '---'}</p>
          <p className="text-gray-500">{freelancer.email || '---'}</p>
          <p className="text-gray-500">{freelancer.phone || '---'}</p>
          <p className="text-gray-500">{freelancer.country || '---'}</p>
        </div>

        <div className="border p-4 rounded-lg bg-gray-50/70 border-gray-100">
          <h3 className="font-bold text-[#16213e] uppercase tracking-wider mb-2 text-xs">
            {isRtl ? 'الطرف الثاني (العميل):' : 'Party B (Client):'}
          </h3>
          <p className="font-semibold text-base">{client.name || '---'}</p>
          <p className="text-gray-500">{client.email || '---'}</p>
          <p className="text-gray-500">{client.phone || '---'}</p>
          <p className="text-gray-500">{client.country || '---'}</p>
        </div>
      </div>

      {/* Scope Block */}
      <div className="mb-8">
        <h3 className="font-bold text-[#16213e] text-sm uppercase tracking-wider border-b pb-1 mb-3">
          {isRtl ? '1. نطاق العمل والمسؤوليات' : '1. Scope of Work & Deliverables'}
        </h3>
        <p className="font-semibold text-[#1a1a2e] mb-2">{scope.title || '---'}</p>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{scope.description || '---'}</p>
        
        {scope.deliverables && scope.deliverables.length > 0 && (
          <ul className={`list-disc list-inside text-sm text-gray-700 spacing-y-1 ${isRtl ? 'pr-4' : 'pl-4'}`}>
            {scope.deliverables.filter(Boolean).map((del, idx) => (
              <li key={idx}>{del}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Pricing & Payments */}
      <div className="mb-8">
        <h3 className="font-bold text-[#16213e] text-sm uppercase tracking-wider border-b pb-1 mb-3">
          {isRtl ? '2. المستحقات والجدول المالي' : '2. Fees & Payment Milestones'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-3">
          <p>
            <strong className="text-gray-600">{isRtl ? 'قيمة المشروع الإجمالية:' : 'Total Project Value:'}</strong>{' '}
            <span className="font-bold text-[#e94560] text-lg">
              {formatCurrency(pricing.amount || 0, pricing.currency || 'USD', lang)}
            </span>
          </p>
          <p>
            <strong className="text-gray-600">{isRtl ? 'هيكل الدفع المتفق عليه:' : 'Milestone/Payment Structure:'}</strong>{' '}
            <span className="font-semibold uppercase">{pricing.paymentTerms || '---'}</span>
          </p>
          <p>
            <strong className="text-gray-600">{isRtl ? 'غرامة التأخير اليومية:' : 'Late Payment Daily Fee:'}</strong>{' '}
            {pricing.latePenaltyPercent || 0}%
          </p>
          <p>
            <strong className="text-gray-600">{isRtl ? 'عدد جلسات المراجعة المتاحة:' : 'Included Revisions count:'}</strong>{' '}
            {scope.revisions || 0}
          </p>
        </div>
      </div>

      {/* SLA / Dates & Clauses */}
      <div className="mb-10 text-sm">
        <h3 className="font-bold text-[#16213e] text-sm uppercase tracking-wider border-b pb-1 mb-3">
          {isRtl ? '3. مدة العمل والشروط القانونية' : '3. Dates & Legal Clauses'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <p>
            <strong className="text-gray-600">{isRtl ? 'تاريخ بداية العقد:' : 'Commencement Date:'}</strong>{' '}
            {dates.startDate ? formatDate(dates.startDate, lang) : '---'}
          </p>
          <p>
            <strong className="text-gray-600">{isRtl ? 'تاريخ التسليم النهائي:' : 'Delivery Due Date:'}</strong>{' '}
            {dates.endDate ? formatDate(dates.endDate, lang) : '---'}
          </p>
        </div>
        
        {template?.clauses && (
          <ol className="list-decimal list-inside text-xs text-gray-500 space-y-2 mt-4 pt-4 border-t border-dashed">
            {template.clauses.map((clause, idx) => (
              <li key={idx} className="leading-relaxed">{clause}</li>
            ))}
          </ol>
        )}
      </div>

      {/* Signature Render */}
      {contract.signatureDataUrl && (
        <div className={`mt-10 pt-6 border-t border-gray-100 flex flex-col ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
          <p className="text-xs font-bold uppercase text-[#16213e] tracking-wider mb-2">
            {isRtl ? 'توقيع المستقل والعميل:' : 'Signee Signature:'}
          </p>
          <img 
            src={contract.signatureDataUrl} 
            alt="Signature" 
            className="h-16 w-auto border border-gray-200 rounded object-contain bg-gray-50"
          />
          {contract.dates?.signedAt && (
            <p className="text-[10px] text-gray-400 mt-1">
              {isRtl ? 'تم التوقيع إلكترونياً بالتاريخ:' : 'Electronically Signed on:'}{' '}
              {formatDate(contract.dates.signedAt, lang)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
