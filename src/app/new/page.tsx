import { Suspense } from 'react';
import NewContractForm from './NewContractForm';

export const metadata = {
  title: 'Aqdi | Create New Contract',
  description: 'Step-by-step freelance agreement generator wizard.',
};

export default function NewContractPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen bg-[#0f0f23]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#e94560] mx-auto mb-4"></div>
          <p className="text-[#8892a4] text-sm font-medium">Preparing contract wizard...</p>
        </div>
      </div>
    }>
      <NewContractForm />
    </Suspense>
  );
}
