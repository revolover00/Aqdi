'use client';

import React from 'react';
import { Contract } from '../../types';
import { formatCurrency, formatDate, truncateText } from '../../lib/formatters';
import { FileText, Calendar, DollarSign, Trash2, ArrowRight } from 'lucide-react';

interface ContractCardProps {
  contract: Contract;
  lang: 'ar' | 'en';
  onPreview: (id: string) => void;
  onDelete: (id: string) => void;
}

const STATUS_STYLING = {
  draft: 'bg-[#16213e] text-gray-400 border-gray-700',
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export function ContractCard({ contract, lang, onPreview, onDelete }: ContractCardProps) {
  const isAr = lang === 'ar';
  
  const formattedPrice = formatCurrency(
    contract.pricing.amount,
    contract.pricing.currency,
    lang
  );

  const formattedDate = formatDate(contract.dates.endDate, lang);

  return (
    <div
      className={`p-6 bg-[#16213e]/40 border border-[#2a2a4a] rounded-xl hover:border-[#e94560]/50 transition-all duration-300 relative group flex flex-col justify-between h-full ${
        isAr ? 'text-right' : 'text-left'
      }`}
      style={{ direction: isAr ? 'rtl' : 'ltr' }}
    >
      <div>
        {/* Status & Header Info */}
        <div className={`flex justify-between items-center mb-4 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLING[contract.status || 'draft']}`}>
            {isAr
              ? { draft: 'مسودة', active: 'نشط', completed: 'مكتمل', cancelled: 'ملغي' }[contract.status]
              : contract.status.toUpperCase()}
          </span>
          <span className="text-[10px] text-gray-500 font-mono">
            ID: {contract.id.substring(0,6)}
          </span>
        </div>

        {/* Contract Title */}
        <h3 className="text-base font-bold font-display text-white group-hover:text-[#e94560] transition-colors line-clamp-1 mb-2">
          {truncateText(contract.scope.title, 40)}
        </h3>

        {/* Client details */}
        <p className="text-xs text-[#8892a4] mb-4">
          {isAr ? `العميل: ${contract.client.name}` : `Client: ${contract.client.name}`}
        </p>

        {/* Core meta lines */}
        <div className="space-y-2 mt-2">
          <div className={`flex items-center gap-2 text-xs text-gray-400 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
            <DollarSign className="w-4 h-4 text-[#e94560]" />
            <span>{formattedPrice}</span>
          </div>

          <div className={`flex items-center gap-2 text-xs text-gray-400 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Button interface row */}
      <div className={`flex gap-3 mt-6 border-t border-[#2a2a4a]/40 pt-4 items-center ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
        <button
          onClick={() => onPreview(contract.id)}
          className={`flex-1 flex items-center justify-center gap-1 bg-[#16213e] hover:bg-[#e94560] hover:text-white text-xs text-[#eaeaea] font-semibold py-2.5 px-4 rounded-lg border border-[#2a2a4a] transition-all cursor-pointer ${
            isAr ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <span>{isAr ? 'عرض ومعاينة' : 'View Contract'}</span>
          <ArrowRight className={`w-3.5 h-3.5 transform ${isAr ? 'rotate-180' : ''}`} />
        </button>

        <button
          onClick={() => {
            if (confirm(isAr ? 'هل أنت متأكد من حذف هذا العقد نهائياً؟' : 'Are you sure you want to delete this contract?')) {
              onDelete(contract.id);
            }
          }}
          className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
