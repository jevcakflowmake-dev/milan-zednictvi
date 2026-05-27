import type { Metadata } from 'next';
import { Bricolage_Grotesque, Lora } from 'next/font/google';
import { LenisProvider } from '@/components/LenisProvider';
import { Cursor } from '@/components/Cursor';
import { GsapInit } from '@/components/GsapInit';
import './globals.css';

const displayFont = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Lora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Milan Zednictví s.r.o. — Spolehlivý zedník v Brně',
  description:
    'Profesionální zednické práce v Brně a okolí. Zdění, omítky, rekonstrukce a betonářské práce s 15letou praxí a stovkami spokojených klientů.',
  keywords: 'zedník, zednictví, Brno, rekonstrukce, omítky, zdění, betonáž',
  openGraph: {
    title: 'Milan Zednictví s.r.o.',
    description: 'Profesionální zednické práce v Brně a okolí.',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-bg text-ink font-body antialiased">
        <GsapInit />
        <LenisProvider>
          {children}
          <Cursor />
        </LenisProvider>
        <NoiseOverlay />
      </body>
    </html>
  );
}

function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
      }}
    />
  );
}
