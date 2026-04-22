import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LifexLife Foundation — Juntos Somos Mejores / Together We Are Better',
  description: 'LifexLife Foundation transforma comunidades a través del arte, la naturaleza, la salud mental y el liderazgo. 501(c)(3) · EIN: 41-4788665',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Nav />
        <main style={{ paddingTop: 68 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
