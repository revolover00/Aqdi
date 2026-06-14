import { Suspense } from 'react';
import PreviewShell from './PreviewShell';

export const metadata = {
  title: 'Aqdi | Preview Contract',
  description: 'Review, sign, download, and share your contract 100% locally and privately.',
};

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen bg-[#0f0f23]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#e94560] mx-auto mb-4"></div>
          <p className="text-[#8892a4] text-sm font-medium">Loading contract preview...</p>
        </div>
      </div>
    }>
      <PreviewShell />
    </Suspense>
  );
}
