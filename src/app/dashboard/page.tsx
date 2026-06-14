'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContractStorage } from '../../hooks/useContractStorage';
import { useDeadlineNotifier } from '../../hooks/useDeadlineNotifier';
import { ContractCard } from '../../components/dashboard/ContractCard';
import { UI_TEXT } from '../../lib/constants';
import { Briefcase, Plus, AlertCircle, Home } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aqdi_lang') as 'ar' | 'en';
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar';
  });
  const { contracts, deleteContract } = useContractStorage();

  // Deadline notifications within 3 days
  const { approachingContracts } = useDeadlineNotifier(contracts);

  const isAr = lang === 'ar';
  const text = UI_TEXT[lang];

  // Stats calculation
  const totalCount = contracts.length;
  const activeCount = contracts.filter((c) => c.status === 'active').length;
  const draftCount = contracts.filter((c) => c.status === 'draft').length;

  return (
    <div className="min-h-screen py-10 px-4 md:px-12" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header toolbar */}
        <header className={`flex justify-between items-center ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-2 cursor-pointer ${isAr ? 'flex-row-reverse' : 'flex-row'}`} onClick={() => router.push('/')}>
            <div className="bg-[#e94560] text-white p-2 rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-display text-white tracking-wide">
              {text.appName}
            </span>
          </div>

          <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              onClick={() => router.push('/')}
              className={`flex items-center gap-1.5 text-xs bg-[#16213e] hover:bg-[#16213e]/80 border border-[#2a2a4a] text-[#eaeaea] py-2 px-3 rounded-lg cursor-pointer ${isAr ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Home className="w-4 h-4" />
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>

            <button
              onClick={() => router.push('/')}
              className={`flex items-center gap-1.5 bg-[#e94560] hover:bg-[#c73652] text-xs text-white font-bold py-2 px-4 rounded-lg shadow-md cursor-pointer ${isAr ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Plus className="w-4 h-4" />
              <span>{text.createContract}</span>
            </button>
          </div>
        </header>

        {/* approaching deadline banners */}
        {approachingContracts.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold">
                {isAr ? 'تنبيه تاريخ انتهاء قريب!' : 'Approaching Contract Deadlines!'}
              </p>
              <p className="text-xs mt-1 text-amber-400/80">
                {isAr
                  ? `العقد "${approachingContracts[0].scope.title}" لديه موعد تسليم يقترب في أقل من ٣ أيام.`
                  : `Contract "${approachingContracts[0].scope.title}" is due in less than 3 days.`}
              </p>
            </div>
          </div>
        )}

        {/* Stats segment */}
        <section className={`grid grid-cols-3 gap-4 ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="bg-[#16213e]/40 border border-[#2a2a4a] p-5 rounded-xl">
            <p className="text-xs text-[#8892a4] font-semibold">{isAr ? 'إجمالي العقود' : 'Total Contracts'}</p>
            <p className="text-2xl font-bold font-display text-white mt-1">{totalCount}</p>
          </div>
          <div className="bg-[#16213e]/40 border border-[#2a2a4a] p-5 rounded-xl">
            <p className="text-xs text-[#8892a4] font-semibold">{isAr ? 'العقود النشطة' : 'Active contracts'}</p>
            <p className="text-2xl font-bold font-display text-emerald-400 mt-1">{activeCount}</p>
          </div>
          <div className="bg-[#16213e]/40 border border-[#2a2a4a] p-5 rounded-xl">
            <p className="text-xs text-[#8892a4] font-semibold">{isAr ? 'المسودات' : 'Drafts count'}</p>
            <p className="text-2xl font-bold font-display text-gray-400 mt-1">{draftCount}</p>
          </div>
        </section>

        {/* Contracts grid */}
        <section className="space-y-4">
          <h2 className={`text-lg font-bold font-display text-white ${isAr ? 'text-right' : 'text-left'}`}>
            {isAr ? 'مستندات عقودي الأخيرة' : 'All Recent Agreements'}
          </h2>

          {contracts.length === 0 ? (
            <div className="text-center py-20 bg-[#16213e]/10 rounded-xl border border-[#2a2a4a]/50 p-6">
              <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-3" />
              <p className="text-[#8892a4] text-sm leading-relaxed max-w-sm mx-auto">{text.noContracts}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contracts.map((c) => (
                <ContractCard
                  key={c.id}
                  contract={c}
                  lang={lang}
                  onPreview={(idStr) => router.push(`/preview?id=${idStr}`)}
                  onDelete={deleteContract}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
