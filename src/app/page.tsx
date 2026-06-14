'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContractType } from '../types';
import { ContractTypeCard } from '../components/contract/ContractTypeCard';
import { UI_TEXT } from '../lib/constants';
import { Briefcase, FolderKanban } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [selectedType, setSelectedType] = useState<ContractType>('web-development');

  // Load language preference from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('aqdi_lang') as 'ar' | 'en';
    if (saved === 'ar' || saved === 'en') {
      setLang(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    localStorage.setItem('aqdi_lang', nextLang);
  };

  const isAr = lang === 'ar';
  const text = UI_TEXT[lang];

  const handleCreate = () => {
    router.push(`/new?type=${selectedType}`);
  };

  return (
    <div 
      className="min-h-screen py-10 px-4 md:px-12 flex flex-col justify-between"
      style={{ direction: isAr ? 'rtl' : 'ltr' }}
    >
      {/* Header bar */}
      <header className={`max-w-6xl w-full mx-auto flex justify-between items-center mb-10 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="bg-[#e94560] text-white p-2 rounded-lg">
            <Briefcase className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xl font-bold font-display text-white tracking-wide">
            {text.appName}
          </span>
        </div>

        <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
          <button
            onClick={() => router.push('/dashboard')}
            className={`flex items-center gap-1.5 text-sm bg-[#16213e] hover:bg-[#16213e]/80 text-[#eaeaea] px-4 py-2 rounded-lg border border-[#2a2a4a] transition-all cursor-pointer ${
              isAr ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-[#e94560]" />
            <span>{text.dashboard}</span>
          </button>

          <button
            onClick={toggleLanguage}
            className="text-xs font-semibold px-3 py-1.5 border border-[#2a2a4a] bg-[#1a1a2e] hover:bg-[#2a2a4a] rounded-lg transition-all text-[#eaeaea]"
          >
            {text.languageToggle}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl w-full mx-auto flex-1 flex flex-col justify-center items-center text-center my-6">
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-white mb-4 tracking-tight leading-tight max-w-2xl">
          {isAr ? 'أنشئ عقوداً قانونية تحميك في دقيقتين' : 'Secure Freelance Contracts in Under 2 Minutes'}
        </h1>
        <p className="text-base text-[#8892a4] mb-8 max-w-lg leading-relaxed">
          {isAr
            ? 'منصة خصوصية كاملة تعمل بالكامل في متصفحك لإنشاء وتوقيع عقود العمل الحر (باللغة العربية والإنجليزية) وحفظها محلياً.'
            : 'A completely offline, browser-based, privacy-first tool to generate and execute standard freelance project contracts.'}
        </p>

        {/* Contract type title section */}
        <div className="w-full text-start mb-6">
          <h2 className={`text-lg font-bold font-display text-white border-b border-[#2a2a4a] pb-2 ${isAr ? 'text-right' : 'text-left'}`}>
            {text.selectType}
          </h2>
        </div>

        {/* Contract Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10">
          {(['web-development', 'ui-design', 'content-writing', 'social-media', 'video-editing', 'mobile-development'] as ContractType[]).map((type) => (
            <ContractTypeCard
              key={type}
              type={type}
              isSelected={selectedType === type}
              lang={lang}
              onClick={() => setSelectedType(type)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCreate}
          className="bg-[#e94560] hover:bg-[#c73652] text-white font-bold text-base px-10 py-4 rounded-xl shadow-lg shadow-[#e94560]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          {text.createContract}
        </button>
      </main>

      {/* Footer copyright */}
      <footer className="text-center text-xs text-gray-500 mt-10">
        <p>© 2026 {text.appName} — {text.tagline}</p>
      </footer>
    </div>
  );
}
