'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContractStorage } from '../../hooks/useContractStorage';
import { useShareableLink } from '../../hooks/useShareableLink';
import { usePDFGenerator } from '../../hooks/usePDFGenerator';
import { ContractPreview } from '../../components/contract/ContractPreview';
import { UI_TEXT } from '../../lib/constants';
import { SignaturePad } from '../../components/contract/SignaturePad';
import { Contract } from '../../types';
import { Download, Share2, ArrowLeft, PenTool, CheckCircle } from 'lucide-react';

export default function PreviewShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const cParam = searchParams.get('c');

  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aqdi_lang') as 'ar' | 'en';
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar';
  });
  const [contract, setContract] = useState<Contract | null>(null);
  const [copied, setCopied] = useState(false);
  const [signingActive, setSigningActive] = useState(false);

  const { getContract, saveContract } = useContractStorage();
  const { parseFromUrl, generateLink } = useShareableLink();
  const { generatePDF, isGenerating } = usePDFGenerator();

  const isAr = lang === 'ar';
  const text = UI_TEXT[lang];

  // Resolve contract from URL or localStorage
  useEffect(() => {
    const resolve = () => {
      if (cParam) {
        const decoded = parseFromUrl();
        if (decoded) {
          setContract(decoded);
          return;
        }
      }
      if (id) {
        const saved = getContract(id);
        if (saved) {
          setContract(saved);
          return;
        }
      }
    };
    setTimeout(resolve, 0);
  }, [id, cParam, getContract, parseFromUrl]);

  const handleDownload = async () => {
    if (!contract) return;
    try {
      const bytes = await generatePDF(contract);
      const blob = new Blob([bytes as any], { type: 'application/pdf' });
      const dlLink = document.createElement('a');
      dlLink.href = URL.createObjectURL(blob);
      dlLink.download = `${contract.scope.title || 'contract'}.pdf`;
      dlLink.click();
    } catch (e) {
      alert(isAr ? 'عذراً، فشل توليد ملف PDF.' : 'Error generating PDF.');
    }
  };

  const handleShare = () => {
    if (!contract) return;
    const url = generateLink(contract);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSignSave = (dataUrl: string) => {
    if (!contract) return;
    const updated: Contract = {
      ...contract,
      signatureDataUrl: dataUrl,
      dates: { ...contract.dates, signedAt: new Date().toISOString() },
      updatedAt: new Date().toISOString(),
    };
    saveContract(updated);
    setContract(updated);
    setSigningActive(false);
  };

  if (!contract) {
    return (
      <div className="text-center py-24 text-gray-400">
        <p>{isAr ? 'لم نتمكن من العثور على العقد المطلوب.' : 'Contract not found.'}</p>
        <button onClick={() => router.push('/')} className="mt-4 text-[#e94560] underline">
          {isAr ? 'العودة للرئيسية' : 'Go back home'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      {/* action header bar */}
      <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-8 ${isAr ? 'md:flex-row-reverse' : ''}`}>
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-1.5 text-xs text-[#8892a4] hover:text-white transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          {text.backToDashboard}
        </button>

        <div className={`flex flex-wrap gap-2 justify-center ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
          {!contract.signatureDataUrl && (
            <button
              onClick={() => setSigningActive(!signingActive)}
              className="flex items-center gap-1.5 bg-[#16213e] hover:bg-[#16213e]/80 border border-[#2a2a4a] text-xs text-[#eaeaea] font-semibold py-2 px-4 rounded-lg cursor-pointer"
            >
              <PenTool className="w-4 h-4 text-[#e94560]" />
              <span>{text.sign}</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-[#16213e] hover:bg-[#16213e]/80 border border-[#2a2a4a] text-xs text-[#eaeaea] font-semibold py-2 px-4 rounded-lg cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#e94560]" />
            <span>{copied ? (isAr ? '✓ تم النسخ!' : '✓ Link Copied!') : text.share}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-1.5 bg-[#e94560] hover:bg-[#c73652] text-xs text-white font-bold py-2 px-4 rounded-lg shadow-md shadow-[#e94560]/10 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? (isAr ? 'جاري التوليد...' : 'Rendering...') : text.download}</span>
          </button>
        </div>
      </div>

      {signingActive && (
        <div className="mb-8 p-6 bg-[#16213e]/80 border border-[#e94560]/30 rounded-xl">
          <SignaturePad onSave={handleSignSave} lang={lang} />
          <button
            onClick={() => setSigningActive(false)}
            className="text-xs text-[#8892a4] underline mt-3 block text-center"
          >
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
        </div>
      )}

      {/* Contract display sheet */}
      <ContractPreview contract={contract} lang={lang} />
    </div>
  );
}
