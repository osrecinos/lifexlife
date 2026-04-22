'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Lang, T } from '@/lib/i18n';

export default function Footer() {
  const [lang, setLang] = useState<Lang>('es');
  useEffect(() => {
    const saved = localStorage.getItem('lxl-lang');
    setLang((saved as Lang) || (navigator.language?.startsWith('en') ? 'en' : 'es'));
  }, []);
  const h = T.home;
  return (
    <div className="footer-wrap">
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <Image src="/logo.png" alt="LifexLife Foundation" width={160} height={45} style={{objectFit:'contain', marginBottom:12}} />
            <p className="footer-desc">{lang==='es'?h.fDesc.es:h.fDesc.en}</p>
          </div>
          <div className="footer-col">
            <h5>INICIATIVAS</h5>
            {[['SPARK','/spark'],['ROOTED','/rooted'],['THRIVE','/thrive'],['LEAD','/lead']].map(([l,h]) => <Link key={h} href={h}>{l}</Link>)}
          </div>
          <div className="footer-col">
            <h5>{lang==='es'?'ORGANIZACIÓN':'ORGANIZATION'}</h5>
            {[[lang==='es'?'Nosotros':'About Us','/nosotros'],[lang==='es'?'Impacto':'Impact','/impacto'],[lang==='es'?'Transparencia':'Transparency','/nosotros'],[lang==='es'?'Prensa':'Press','/nosotros']].map(([l,h]) => <Link key={h+l} href={h}>{l}</Link>)}
          </div>
          <div className="footer-col">
            <h5>{lang==='es'?'CONTACTO':'CONTACT'}</h5>
            <a href="mailto:Info@lifexlife.org">Info@lifexlife.org</a>
            <span>Los Ángeles, CA</span>
            <Link href="/donar">{lang==='es'?'Donar':'Donate'}</Link>
            <Link href="/contacto">{lang==='es'?'Voluntariado':'Volunteer'}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 LIFEXLIFE FOUNDATION · <span className="footer-ein">EIN: 41-4788665</span> · 501(c)(3)</p>
          <p>{lang==='es'?h.fTagline.es:h.fTagline.en}</p>
        </div>
      </footer>
    </div>
  );
}
