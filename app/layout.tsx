import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LifexLife Foundation — Juntos Somos Mejores / Together We Are Better',
  description: 'LifexLife Foundation transforma comunidades a través del arte, la naturaleza, la salud mental y el liderazgo. 501(c)(3) · EIN: 41-4788665',
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
