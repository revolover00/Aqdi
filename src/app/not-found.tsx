'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f23] text-white p-4 text-center">
      <h2 className="text-4xl font-bold text-[#e94560] mb-4">404 - {typeof window !== 'undefined' && localStorage.getItem('aqdi_lang') === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}</h2>
      <p className="text-[#8892a4] mb-8 max-w-md">
        {typeof window !== 'undefined' && localStorage.getItem('aqdi_lang') === 'ar'
          ? 'المعذرة، الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.'
          : 'The page you are looking for does not exist or has been moved.'}
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-[#e94560] hover:bg-[#c73652] text-white font-semibold rounded-lg transition-all shadow-md shadow-[#e94560]/10 cursor-pointer"
      >
        {typeof window !== 'undefined' && localStorage.getItem('aqdi_lang') === 'ar' ? 'العودة للرئيسية' : 'Go Home'}
      </Link>
    </div>
  );
}
