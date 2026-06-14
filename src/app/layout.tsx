import type { Metadata } from 'next';
import { Sora, DM_Sans, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Aqdi | عقدي - Freelance Contract Generator',
  description: 'Generate legally structured freelance contracts in under 2 minutes completely offline.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} ${notoArabic.variable}`}>
      <body suppressHydrationWarning className="bg-[#0f0f23] text-[#eaeaea] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
