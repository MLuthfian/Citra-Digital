import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DisasterDetect — Klasifikasi Citra Bencana (Banjir & Kebakaran)',
    template: '%s — DisasterDetect',
  },
  description:
    'Sistem klasifikasi citra bencana alam (banjir dan kebakaran) berbasis deep learning. Perbandingan CNN Kustom, VGG16, dan ResNet50.',
  keywords: ['deep learning', 'CNN', 'ResNet50', 'VGG16', 'klasifikasi citra', 'deteksi bencana', 'banjir', 'kebakaran'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
        style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
      >
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
