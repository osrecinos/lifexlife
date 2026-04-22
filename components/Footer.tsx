'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Lang = 'es'|'en';

export default function Footer() {
  const [lang, setLang] = useState<Lang>('es');
  useEffect(() => {
    const upd = () => { const s=localStorage.getItem('lxl-lang'); if(s) setLang(s as Lang); };
    upd();
    window.addEventListener('langchange', upd);
    window.addEventListener('storage', upd);
    return () => { window.removeEventListener('langchange', upd); window.removeEventListener('storage', upd); };
  }, []);
  const EN = lang === 'en';

  return (
    <div className="footer-wrap">
      <footer className="footer">
        <div className="footer-grid">
          <div>
            {/* LOGO IMAGE in footer — inverted white */}
            <Image
              src="/logo.png"
              alt="LifexLife Foundation"
              width={160}
              height={45}
              className="footer-logo-img"
              style={{objectFit:'contain', marginBottom:8}}
            />
            <div className="footer-found">FOUNDATION</div>
            <p className="footer-desc">
              {EN
                ? 'Transforming communities through art, nature, mental health and purpose-driven leadership.'
                : 'Transformando comunidades a través del arte, la naturaleza, la salud mental y el liderazgo con propósito.'}
            </p>
          </div>
          <div className="footer-col">
            <h5>INICIATIVAS</h5>
            {[['SPARK','/spark'],['ROOTED','/rooted'],['THRIVE','/thrive'],['LEAD','/lead']].map(([l,h]) => (
              <Link key={h} href={h}>{l}</Link>
            ))}
          </div>
          <div className="footer-col">
            <h5>{EN ? 'ORGANIZATION' : 'ORGANIZACIÓN'}</h5>
            <Link href="/nosotros">{EN ? 'About Us' : 'Nosotros'}</Link>
            <Link href="/impacto">{EN ? 'Impact' : 'Impacto'}</Link>
            <Link href="/nosotros">{EN ? 'Transparency' : 'Transparencia'}</Link>
            <Link href="/nosotros">{EN ? 'Press' : 'Prensa'}</Link>
          </div>
          <div className="footer-col">
            <h5>{EN ? 'CONTACT' : 'CONTACTO'}</h5>
            <a href="mailto:Info@lifexlife.org">Info@lifexlife.org</a>
            <span>Los Ángeles, CA</span>
            <Link href="/donar">{EN ? 'Donate' : 'Donar'}</Link>
            <Link href="/contacto">{EN ? 'Volunteer' : 'Voluntariado'}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 LIFEXLIFE FOUNDATION · <span className="footer-ein">EIN: 41-4788665</span> · 501(c)(3)</p>
          <p>{EN ? 'TOGETHER WE ARE BETTER · JUNTOS SOMOS MEJORES' : 'JUNTOS SOMOS MEJORES · TOGETHER WE ARE BETTER'}</p>
        </div>
      </footer>
    </div>
  );
}
