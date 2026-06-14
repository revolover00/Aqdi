'use client';

import React from 'react';
import { ContractType } from '../../types';
import { CONTRACT_TYPE_NAMES } from '../../lib/constants';
import * as Icons from 'lucide-react';

interface ContractTypeCardProps {
  type: ContractType;
  isSelected: boolean;
  lang: 'ar' | 'en';
  onClick: () => void;
}

const TYPE_ICONS: Record<ContractType, React.ComponentType<{ className?: string }>> = {
  'web-development': Icons.Code2,
  'ui-design': Icons.Palette,
  'content-writing': Icons.PenTool,
  'social-media': Icons.Share2,
  'video-editing': Icons.Video,
  'mobile-development': Icons.Smartphone,
};

const TYPE_DESCRIPTIONS: Record<ContractType, { en: string; ar: string }> = {
  'web-development': {
    en: 'Next.js, React, backend setup, or general web applications.',
    ar: 'مواقع الويب، وتطبيقات لوحات التحكم، والمتاجر الإلكترونية.',
  },
  'ui-design': {
    en: 'Figma files, mockups, design systems, and UX workflows.',
    ar: 'ملفات وتصميمات فيجما، وتصميم تجارب واجهات المستخدم.',
  },
  'content-writing': {
    en: 'SEO-optimized articles, translation, copy, and blog contents.',
    ar: 'المقالات المتوافقة مع السيو، الترجمة، ومراجعة النصوص وكتابتها.',
  },
  'social-media': {
    en: 'Posting plans, graphic designs, weekly calendars, and analysis.',
    ar: 'إنشاء خطط المنشورات، التصاميم، وإدارة وتحليل شبكات التواصل.',
  },
  'video-editing': {
    en: 'Clips cutting, grading, color correction, SFX, and subtitles.',
    ar: 'مونتاج وقص الفيديوهات، تصحيح الألوان، إضافة المؤثرات والترجمات.',
  },
  'mobile-development': {
    en: 'iOS & Android native or Flutter/React Native software application.',
    ar: 'تطبيقات الجوال لنظامي أندرويد وآي أو إس وفلاتر ورياكت نيتف.',
  },
};

export function ContractTypeCard({ type, isSelected, lang, onClick }: ContractTypeCardProps) {
  const Icon = TYPE_ICONS[type] || Icons.FileText;
  const name = CONTRACT_TYPE_NAMES[type][lang];
  const desc = TYPE_DESCRIPTIONS[type][lang];
  const isRtl = lang === 'ar';

  return (
    <button
      onClick={onClick}
      className={`relative w-full p-6 text-left rounded-xl border transition-all duration-300 group hover:scale-[1.01] ${
        isSelected
          ? 'bg-[#16213e] border-[#e94560] shadow-lg shadow-[#e94560]/10'
          : 'bg-[#16213e]/45 border-[#2a2a4a] hover:border-[#e94560]/40'
      } ${isRtl ? 'text-right' : 'text-left'}`}
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <div className={`flex items-start gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <div
          className={`flex items-center justify-center p-3 rounded-lg transition-colors ${
            isSelected ? 'bg-[#e94560] text-white' : 'bg-[#1a1a2e] text-[#8892a4] group-hover:text-white'
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold font-display text-[#eaeaea] group-hover:text-white mb-2">
            {name}
          </h3>
          <p className="text-sm text-[#8892a4] group-hover:text-[#eaeaea] leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
}
