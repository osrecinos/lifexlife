'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Lang = 'es'|'en';

const NAV_T = {
  es: { inicio:'Inicio', iniciativas:'Iniciativas', impacto:'Impacto', nosotros:'Nosotros', blog:'Blog', contacto:'Contacto', donar:'Donar →',
        spark:'🎨 SPARK — Arte Creativo', rooted:'🌿 ROOTED — Bienestar Natural', thrive:'🤝 THRIVE — Salud Mental', lead:'⭐ LEAD — Liderazgo' },
  en: { inicio:'Home', iniciativas:'Initiatives', impacto:'Impact', nosotros:'About Us', blog:'Blog', contacto:'Contact', donar:'Donate →',
        spark:'🎨 SPARK — Creative Arts', rooted:'🌿 ROOTED — Nature Wellness', thrive:'🤝 THRIVE — Mental Health', lead:'⭐ LEAD — Leadership' },
};

export default function Nav() {
  const [lang, setLang]     = useState<Lang>('es');
  const [dark, setDark]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [drop, setDrop]     = useState(false);
  const [initOpen, setInitOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lxl-lang');
    const br = navigator.language?.toLowerCase() || 'es';
    setLang((saved as Lang) || (br.startsWith('en') ? 'en' : 'es'));
    const th = localStorage.getItem('lxl-theme') || 'light';
    setDark(th === 'dark');
    document.documentElement.setAttribute('data-theme', th);
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es';
    setLang(next);
    localStorage.setItem('lxl-lang', next);
    window.dispatchEvent(new Event('langchange'));
  };

  const toggleDark = () => {
    const next = !dark; setDark(next);
    const th = next ? 'dark' : 'light';
    localStorage.setItem('lxl-theme', th);
    document.documentElement.setAttribute('data-theme', th);
  };

  const l = NAV_T[lang];

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          {/* LOGO — uses image with fallback to text */}
          <Link href="/" className="nav-logo">
            <Image src="/logo.png" alt="LifexLife Foundation" width={140} height={32} className="nav-logo-img" priority style={{objectFit:'contain'}} />
          </Link>

          <div className="nav-links">
            <div className="nav-item" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
              <button className="nav-link">{l.iniciativas} <span className="nav-arrow">▾</span></button>
              {drop && (
                <div className="nav-dropdown">
                  {([['spark','/spark'],['rooted','/rooted'],['thrive','/thrive'],['lead','/lead']] as [keyof typeof l, string][]).map(([k,href]) => (
                    <Link key={k} href={href} className="nav-dropdown-item" onClick={() => setDrop(false)}>{l[k]}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/impacto"  className="nav-link">{l.impacto}</Link>
            <Link href="/nosotros" className="nav-link">{l.nosotros}</Link>
            <Link href="/blog"     className="nav-link">{l.blog}</Link>
            <Link href="/contacto" className="nav-link">{l.contacto}</Link>
          </div>

          <div className="nav-right">
            <button className="lang-btn" onClick={toggleLang}>{lang==='es'?'EN':'ES'}</button>
            <label className="theme-switch" title="Modo oscuro">
              <input type="checkbox" checked={dark} onChange={toggleDark} />
              <span className="ts-track"><span className="ts-thumb"></span></span>
            </label>
            <Link href="/donar"><button className="nav-cta">{l.donar}</button></Link>
          </div>

          <div className="nav-mobile-actions">
            <Link href="/donar"><button className="nav-cta nav-cta-sm">{l.donar}</button></Link>
            <button className="nav-mobile-btn" id="navMobileBtn" onClick={() => setMobile(true)}>☰</button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${mobile ? ' open' : ''}`} id="mobileMenu">
        <button className="mobile-close" id="mobileClose" onClick={() => setMobile(false)}>✕</button>
        <Link href="/" onClick={() => setMobile(false)}>{l.inicio}</Link>
        <button className={`mobile-accordion-btn${initOpen?' open':''}`} id="mobileInitBtn" onClick={() => setInitOpen(!initOpen)}>
          {l.iniciativas} <span className="mobile-accordion-arrow">▾</span>
        </button>
        <div className={`mobile-sub-list${initOpen?' open':''}`} id="mobileInitList">
          {([['spark','/spark'],['rooted','/rooted'],['thrive','/thrive'],['lead','/lead']] as [keyof typeof l, string][]).map(([k,href]) => (
            <Link key={k} href={href} className="mobile-sub" onClick={() => { setMobile(false); setInitOpen(false); }}>↳ {l[k]}</Link>
          ))}
        </div>
        <Link href="/impacto"  onClick={() => setMobile(false)}>{l.impacto}</Link>
        <Link href="/nosotros" onClick={() => setMobile(false)}>{l.nosotros}</Link>
        <Link href="/blog"     onClick={() => setMobile(false)}>{l.blog}</Link>
        <Link href="/contacto" onClick={() => setMobile(false)}>{l.contacto}</Link>
        <div className="mobile-bottom">
          <Link href="/donar" className="mobile-donate" onClick={() => setMobile(false)}>{l.donar}</Link>
          <div className="mobile-footer-row">
            <button className="lang-btn" onClick={toggleLang}>{lang==='es'?'EN':'ES'}</button>
            <label className="theme-switch">
              <input type="checkbox" checked={dark} onChange={toggleDark} />
              <span className="ts-track"><span className="ts-thumb"></span></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
