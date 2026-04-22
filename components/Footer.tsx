'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Lang = 'es'|'en';

const FT = {
  es: { desc:'Transformando comunidades a través del arte, la naturaleza, la salud mental y el liderazgo con propósito.', org:'ORGANIZACIÓN', contacto:'CONTACTO', nosotros:'Nosotros', impacto:'Impacto', trans:'Transparencia', prensa:'Prensa', donar:'Donar', voluntariado:'Voluntariado', tagline:'JUNTOS SOMOS MEJORES · TOGETHER WE ARE BETTER' },
  en: { desc:'Transforming communities through art, nature, mental health and purpose-driven leadership.', org:'ORGANIZATION', contacto:'CONTACT', nosotros:'About Us', impacto:'Impact', trans:'Transparency', prensa:'Press', donar:'Donate', voluntariado:'Volunteer', tagline:'TOGETHER WE ARE BETTER · JUNTOS SOMOS MEJORES' },
};

export default function Footer() {
  const [lang, setLang] = useState<Lang>('es');
  useEffect(() => {
    const update = () => { const s=localStorage.getItem('lxl-lang'); if(s) setLang(s as Lang); };
    update();
    window.addEventListener('langchange', update);
    window.addEventListener('storage', update);
    return () => { window.removeEventListener('langchange', update); window.removeEventListener('storage', update); };
  }, []);
  const f = FT[lang];
  return (
    <div className="footer-wrap">
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Lifex<em>Life</em></div>
            <div className="footer-found">FOUNDATION</div>
            <p className="footer-desc">{f.desc}</p>
          </div>
          <div className="footer-col">
            <h5>INICIATIVAS</h5>
            {[['SPARK','/spark'],['ROOTED','/rooted'],['THRIVE','/thrive'],['LEAD','/lead']].map(([l,h]) => <Link key={h} href={h}>{l}</Link>)}
          </div>
          <div className="footer-col">
            <h5>{f.org}</h5>
            <Link href="/nosotros">{f.nosotros}</Link>
            <Link href="/impacto">{f.impacto}</Link>
            <Link href="/nosotros">{f.trans}</Link>
            <Link href="/nosotros">{f.prensa}</Link>
          </div>
          <div className="footer-col">
            <h5>{f.contacto}</h5>
            <a href="mailto:Info@lifexlife.org">Info@lifexlife.org</a>
            <span>Los Ángeles, CA</span>
            <Link href="/donar">{f.donar}</Link>
            <Link href="/contacto">{f.voluntariado}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 LIFEXLIFE FOUNDATION · <span className="footer-ein">EIN: 41-4788665</span> · 501(c)(3)</p>
          <p>{f.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
