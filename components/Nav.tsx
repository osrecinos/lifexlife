'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { T, Lang } from '@/lib/i18n';

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
    setLang(next); localStorage.setItem('lxl-lang', next);
  };

  const toggleDark = () => {
    const next = !dark; setDark(next);
    const th = next ? 'dark' : 'light';
    localStorage.setItem('lxl-theme', th);
    document.documentElement.setAttribute('data-theme', th);
  };

  const g = T.global; const n = T.nav;

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <Image src="/logo.png" alt="LifexLife Foundation" width={148} height={42} className="nav-logo-img" priority style={{objectFit:'contain'}} />
          </Link>

          <div className="nav-links">
            <div className="nav-item" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
              <button className="nav-link">{lang==='es'?g.iniciativas.es:g.iniciativas.en} <span className="nav-arrow">▾</span></button>
              {drop && (
                <div className="nav-dropdown">
                  <Link href="/spark"  className="nav-dropdown-item">{lang==='es'?n.spark.es:n.spark.en}</Link>
                  <Link href="/rooted" className="nav-dropdown-item">{lang==='es'?n.rooted.es:n.rooted.en}</Link>
                  <Link href="/thrive" className="nav-dropdown-item">{lang==='es'?n.thrive.es:n.thrive.en}</Link>
                  <Link href="/lead"   className="nav-dropdown-item">{lang==='es'?n.lead.es:n.lead.en}</Link>
                </div>
              )}
            </div>
            <Link href="/impacto"  className="nav-link">{lang==='es'?g.impacto.es:g.impacto.en}</Link>
            <Link href="/nosotros" className="nav-link">{lang==='es'?g.nosotros.es:g.nosotros.en}</Link>
            <Link href="/blog"     className="nav-link">{lang==='es'?g.blog.es:g.blog.en}</Link>
            <Link href="/contacto" className="nav-link">{lang==='es'?g.contacto.es:g.contacto.en}</Link>
          </div>

          <div className="nav-right">
            <button className="lang-btn" onClick={toggleLang}>{lang==='es'?'EN':'ES'}</button>
            <label className="theme-switch" title="Modo oscuro">
              <input type="checkbox" checked={dark} onChange={toggleDark} />
              <span className="ts-track"><span className="ts-thumb"></span></span>
            </label>
            <Link href="/donar"><button className="nav-cta">{lang==='es'?g.donar.es:g.donar.en}</button></Link>
          </div>

          <div className="nav-mobile-actions">
            <Link href="/donar"><button className="nav-cta nav-cta-sm">{lang==='es'?g.donar.es:g.donar.en}</button></Link>
            <button className="nav-mobile-btn" onClick={() => setMobile(true)}>☰</button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${mobile ? ' open' : ''}`} id="mobileMenu">
        <button className="mobile-close" onClick={() => setMobile(false)}>✕</button>
        <Link href="/" onClick={() => setMobile(false)}>{lang==='es'?g.inicio.es:g.inicio.en}</Link>
        <button className={`mobile-accordion-btn${initOpen?' open':''}`} onClick={() => setInitOpen(!initOpen)}>
          {lang==='es'?g.iniciativas.es:g.iniciativas.en} <span className="mobile-accordion-arrow">▾</span>
        </button>
        <div className={`mobile-sub-list${initOpen?' open':''}`}>
          {([['spark','🎨 SPARK'],['rooted','🌿 ROOTED'],['thrive','🤝 THRIVE'],['lead','⭐ LEAD']] as [string,string][]).map(([s,l]) => (
            <Link key={s} href={`/${s}`} className="mobile-sub" onClick={() => setMobile(false)}>↳ {l}</Link>
          ))}
        </div>
        <Link href="/impacto"  onClick={() => setMobile(false)}>{lang==='es'?g.impacto.es:g.impacto.en}</Link>
        <Link href="/nosotros" onClick={() => setMobile(false)}>{lang==='es'?g.nosotros.es:g.nosotros.en}</Link>
        <Link href="/blog"     onClick={() => setMobile(false)}>{lang==='es'?g.blog.es:g.blog.en}</Link>
        <Link href="/contacto" onClick={() => setMobile(false)}>{lang==='es'?g.contacto.es:g.contacto.en}</Link>
        <div className="mobile-bottom">
          <Link href="/donar" className="mobile-donate" onClick={() => setMobile(false)}>{lang==='es'?g.donar.es:g.donar.en}</Link>
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
