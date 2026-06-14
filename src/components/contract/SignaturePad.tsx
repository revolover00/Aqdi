'use client';

import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  onClear?: () => void;
  lang: 'ar' | 'en';
}

export function SignaturePad({ onSave, onClear, lang }: SignaturePadProps) {
  const isAr = lang === 'ar';
  const sigRef = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    sigRef.current?.clear();
    if (onClear) onClear();
  };

  const handleSave = () => {
    if (sigRef.current?.isEmpty()) return;
    const dataUrl = sigRef.current?.getTrimmedCanvas().toDataURL('image/png');
    if (dataUrl) {
      onSave(dataUrl);
    }
  };

  return (
    <div className="w-full bg-[#16213e] p-4 rounded-xl border border-[#2a2a4a] flex flex-col gap-4">
      <div className={`flex justify-between items-center ${isAr ? 'flex-row-reverse' : 'flex-row'}`}>
        <span className="text-xs font-semibold text-[#8892a4]">
          {isAr ? 'وقع بخط يدك داخل المساحة وسجل:' : 'Draw signature with mouse/touch:'}
        </span>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs text-[#e94560] hover:underline"
        >
          {isAr ? 'مسح' : 'Clear'}
        </button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden border border-gray-300">
        <SignatureCanvas
          ref={sigRef}
          penColor="#16213e"
          canvasProps={{
            className: 'w-full h-40 cursor-crosshair bg-white',
          }}
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="w-full bg-[#e94560] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#c73652] active:scale-[0.98] transition-all"
      >
        {isAr ? 'تأكيد وحفظ التوقيع للاتفاقية' : 'Confirm & Save Signature'}
      </button>
    </div>
  );
}
