'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Lang = 'es'|'en';

const SLIDES = [
  { bgClass:'bg-home',   emoji:'',   badgeES:'LIFEXLIFE FOUNDATION · 501(c)(3) · LOS ÁNGELES, CA', badgeEN:'LIFEXLIFE FOUNDATION · 501(c)(3) · LOS ANGELES, CA',
    titleES:'Juntos somos\nmejores.', titleEN:'Together we are\nbetter.',
    descES:'Transformando comunidades a través del arte, la naturaleza, la salud mental y el liderazgo — porque una vida vale otra vida.',
    descEN:'Transforming communities through art, nature, mental health and leadership — because one life is worth another life.',
    btn1ES:'Donar ahora', btn1EN:'Donate now', href1:'/donar', btn2ES:'Conocer más →', btn2EN:'Learn more →', href2:'/iniciativas' },
  { bgClass:'bg-spark',  emoji:'🎨', badgeES:'INICIATIVA 01 · SPARK',  badgeEN:'INITIATIVE 01 · SPARK',
    titleES:'Creative Arts for\nEmotional Well-Being.', titleEN:'Creative Arts for\nEmotional Well-Being.',
    descES:'Teatro, música, muralismo y escritura creativa para el bienestar emocional de jóvenes y familias.',
    descEN:'Theater, music, mural arts and creative writing for the emotional well-being of youth and families.',
    btn1ES:'Explorar SPARK', btn1EN:'Explore SPARK', href1:'/spark', btn2ES:'Apoyar →', btn2EN:'Support →', href2:'/donar' },
  { bgClass:'bg-rooted', emoji:'🌿', badgeES:'INICIATIVA 02 · ROOTED', badgeEN:'INITIATIVE 02 · ROOTED',
    titleES:'Nature-Based\nWellness.', titleEN:'Nature-Based\nWellness.',
    descES:'Caminatas, huertos comunitarios y mindfulness al aire libre para una vida más equilibrada.',
    descEN:'Hikes, community gardens and outdoor mindfulness for a more balanced and connected life.',
    btn1ES:'Explorar ROOTED', btn1EN:'Explore ROOTED', href1:'/rooted', btn2ES:'Apoyar →', btn2EN:'Support →', href2:'/donar' },
  { bgClass:'bg-thrive', emoji:'🤝', badgeES:'INICIATIVA 03 · THRIVE', badgeEN:'INITIATIVE 03 · THRIVE',
    titleES:'Non-Clinical\nMental Health.', titleEN:'Non-Clinical\nMental Health.',
    descES:'Apoyo mutuo, primeros auxilios emocionales y reducción del estigma en salud mental comunitaria.',
    descEN:'Peer support, emotional first aid and mental health stigma reduction in the community.',
    btn1ES:'Explorar THRIVE', btn1EN:'Explore THRIVE', href1:'/thrive', btn2ES:'Apoyar →', btn2EN:'Support →', href2:'/donar' },
  { bgClass:'bg-lead',   emoji:'⭐', badgeES:'INICIATIVA 04 · LEAD',   badgeEN:'INITIATIVE 04 · LEAD',
    titleES:'Purpose-Driven\nLeadership.', titleEN:'Purpose-Driven\nLeadership.',
    descES:'Raíces y Caminos — ciclos de 12 semanas de liderazgo bilingüe para jóvenes de 18 a 35 años.',
    descEN:'Roots & Pathways — 12-week bilingual leadership cycles for young adults ages 18–35.',
    btn1ES:'Explorar LEAD', btn1EN:'Explore LEAD', href1:'/lead', btn2ES:'Aplicar →', btn2EN:'Apply →', href2:'/lead' },
];

const FALLBACK = [
  {id:1,cat:'spark', title:'Nuevos talleres de teatro comunitario en el Distrito Pacífico Sur',desc:'Más de 80 jóvenes participaron en el primer ciclo de primavera 2026.',img:'',date:'2026-04-10'},
  {id:2,cat:'lead',  title:'Tercera generación de Raíces y Caminos completa su programa',     desc:'24 jóvenes líderes graduados listos para multiplicar el impacto.',img:'',date:'2026-03-28'},
  {id:3,cat:'rooted',title:'Huerto comunitario de Watts celebra su primer aniversario',        desc:'Más de 300 libras de vegetales frescos para familias locales.',img:'',date:'2026-03-15'},
  {id:4,cat:'thrive',title:'Primeros auxilios emocionales llega a tres nuevas escuelas',       desc:'45 maestros capacitados como facilitadores de bienestar mental.',img:'',date:'2026-02-22'},
  {id:5,cat:'spark', title:'Mural "Raíces Vivas" inaugurado en South LA',                     desc:'30 jóvenes artistas crearon un mural de 80 pies de largo.',img:'',date:'2026-01-30'},
  {id:6,cat:'lead',  title:'LifexLife recibe grant de Google for Nonprofits',                 desc:'El reconocimiento permitirá expandir LEAD a dos nuevas comunidades.',img:'',date:'2026-01-15'},
];

const CAT_E: Record<string,string> = {spark:'🎨',rooted:'🌿',thrive:'🤝',lead:'⭐',general:'📰'};
const CAT_L: Record<string,string> = {spark:'SPARK',rooted:'ROOTED',thrive:'THRIVE',lead:'LEAD',general:'GENERAL'};

const INITS = [
  {slug:'spark', badge:'SPARK · 01', tES:'Arte Creativo',    tEN:'Creative Arts',  dES:'Teatro, música, muralismo y escritura creativa para el bienestar emocional de jóvenes y familias.', dEN:'Theater, music, mural arts and creative writing for the emotional well-being of youth and families.'},
  {slug:'rooted',badge:'ROOTED · 02',tES:'Bienestar Natural',tEN:'Nature Wellness',dES:'Caminatas, huertos comunitarios y mindfulness en la naturaleza para una vida más equilibrada.',dEN:'Hikes, community gardens and nature mindfulness for a more balanced and purposeful life.'},
  {slug:'thrive',badge:'THRIVE · 03',tES:'Salud Mental',     tEN:'Mental Health',  dES:'Apoyo mutuo, primeros auxilios emocionales y reducción del estigma en salud mental no clínica.',dEN:'Peer support, emotional first aid and non-clinical mental health stigma reduction.'},
  {slug:'lead',  badge:'LEAD · 04',  tES:'Liderazgo',        tEN:'Leadership',     dES:'Raíces y Caminos — 12 semanas de liderazgo con propósito para jóvenes de 18 a 35 años.',dEN:'Roots & Pathways — 12 weeks of purpose-driven leadership for youth ages 18–35.'},
];

export default function Home() {
  const [lang, setLang] = useState<Lang>('es');
  const [cur,  setCur]  = useState(0);
  const [ci,   setCi]   = useState(0);
  const [news, setNews] = useState(FALLBACK as any[]);
  const [nlDone, setNlDone] = useState(false);
  const timerRef = useRef<NodeJS.Timeout|null>(null);
  const pbarRef  = useRef<HTMLDivElement>(null);
  const EN = lang === 'en';

  useEffect(() => {
    const upd = () => { const s=localStorage.getItem('lxl-lang'); if(s) setLang(s as Lang); };
    upd();
    window.addEventListener('langchange', upd);
    window.addEventListener('storage', upd);
    const stored = JSON.parse(localStorage.getItem('lxl_blog_posts') || '[]');
    if (stored.length) setNews(stored.slice(0,6));
    return () => { window.removeEventListener('langchange', upd); window.removeEventListener('storage', upd); };
  }, []);

  const startTimer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (pbarRef.current) {
      pbarRef.current.style.transition = 'none'; pbarRef.current.style.width = '0';
      requestAnimationFrame(() => { setTimeout(() => { if(pbarRef.current){pbarRef.current.style.transition='width 5.2s linear'; pbarRef.current.style.width='100%';} }, 20); });
    }
    timerRef.current = setInterval(() => { const n=(idx+1)%SLIDES.length; setCur(n); startTimer(n); }, 5200);
  };
  useEffect(() => { startTimer(0); return () => { if(timerRef.current) clearInterval(timerRef.current); }; }, []);

  const goSlide = (i: number) => { setCur(i); startTimer(i); };
  const s = SLIDES[cur];
  const fmtDate = (d: string) => { try { return new Date(d+'T12:00:00').toLocaleDateString(EN?'en-US':'es-MX',{month:'short',day:'numeric',year:'numeric'}).toUpperCase(); } catch { return d; } };

  return (
    <>
      {/* HERO SLIDESHOW */}
      <section className="hero">
        {SLIDES.map((sl, i) => (
          <div key={i} id={`slide-${i}`} className={`slide${i===cur?' active':''}`}>
            <div className={`slide-bg ${sl.bgClass}`} />
            <div className="slide-overlay" />
            {sl.emoji && <span className="slide-emoji">{sl.emoji}</span>}
            <div className="slide-content">
              <span className="slide-badge">{EN?sl.badgeEN:sl.badgeES}</span>
              <h1 className="slide-title" style={{whiteSpace:'pre-line'}}>{EN?sl.titleEN:sl.titleES}</h1>
              <p className="slide-desc">{EN?sl.descEN:sl.descES}</p>
              <div className="slide-btns">
                <Link href={sl.href1}><button className="btn-solid-white">{EN?sl.btn1EN:sl.btn1ES}</button></Link>
                <Link href={sl.href2}><button className="btn-glass">{EN?sl.btn2EN:sl.btn2ES}</button></Link>
              </div>
            </div>
          </div>
        ))}
        <div className="slide-arrows">
          <button className="s-arr" data-dir="prev" onClick={() => goSlide((cur-1+SLIDES.length)%SLIDES.length)}>‹</button>
          <button className="s-arr" data-dir="next" onClick={() => goSlide((cur+1)%SLIDES.length)}>›</button>
        </div>
        <div className="slide-dots">
          {SLIDES.map((_,i) => <button key={i} className={`s-dot${i===cur?' active':''}`} onClick={() => goSlide(i)} />)}
        </div>
        <div className="progress-bar" ref={pbarRef} />
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {['SPARK','CREATIVE ARTS · ARTE CREATIVO','ROOTED','NATURE WELLNESS · BIENESTAR NATURAL','THRIVE','MENTAL HEALTH · SALUD MENTAL','LEAD','LEADERSHIP · LIDERAZGO',
            'SPARK','CREATIVE ARTS · ARTE CREATIVO','ROOTED','NATURE WELLNESS · BIENESTAR NATURAL','THRIVE','MENTAL HEALTH · SALUD MENTAL','LEAD','LEADERSHIP · LIDERAZGO'].map((item,i) => (
            <span key={i} className="ticker-item">{item}{i%2===0&&<span className="ticker-sep"> × </span>}</span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        {[[2400,'PERSONAS IMPACTADAS','PEOPLE IMPACTED','+'],[4,'PROGRAMAS ACTIVOS','ACTIVE PROGRAMS',''],[12,'COMUNIDADES','COMMUNITIES','']].map(([n,les,len,suf]) => (
          <div key={les as string} className="stat">
            <div className="stat-num">{n}{suf}</div>
            <div className="stat-label">{EN?len:les}</div>
          </div>
        ))}
      </div>

      {/* INITIATIVES */}
      <div className="section-alt-bg">
        <div className="section">
          <div className="eyebrow">{EN?'OUR INITIATIVES':'NUESTRAS INICIATIVAS'}</div>
          <h2 className="section-title">{EN?'Four pillars, ':'Cuatro pilares, '}<em>{EN?'one mission.':'una misión.'}</em></h2>
          <div className="init-grid">
            {INITS.map(init => (
              <Link key={init.slug} href={`/${init.slug}`} className="init-card">
                <div className="init-card-corner" />
                <span className="init-badge">{init.badge}</span>
                <h3>{EN?init.tEN:init.tES}</h3>
                <p>{EN?init.dEN:init.dES}</p>
                <span className="init-link">{EN?`Explore ${init.badge.split(' ·')[0]} →`:`Explorar ${init.badge.split(' ·')[0]} →`}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* NEWS CAROUSEL */}
      <section className="news-section">
        <div className="news-header">
          <div>
            <div className="eyebrow">{EN?'LATEST NEWS':'ÚLTIMAS NOTICIAS'}</div>
            <h2 className="section-title">{EN?'What is ':'Lo que está '}<em>{EN?'happening.':'pasando.'}</em></h2>
          </div>
          <Link href="/blog" className="see-all">{EN?'View all →':'Ver todas →'}</Link>
        </div>
        <div className="carousel-outer">
          <div className="carousel-track" id="newsTrack">
            {news.map((p: any) => (
              <div key={p.id} className="news-card">
                <div className="news-img">
                  <span className="news-tag">{CAT_L[p.cat]||p.cat?.toUpperCase()}</span>
                  {p.img ? <img src={p.img} alt={p.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} /> : <span style={{fontSize:44}}>{CAT_E[p.cat]||'📰'}</span>}
                </div>
                <div className="news-body">
                  <h4>{p.title}</h4>
                  <p>{p.desc||p.description}</p>
                  <div className="news-meta">
                    <span className="news-date">{fmtDate(p.date)}</span>
                    <Link href="/blog" className="news-read">{EN?'Read more →':'Leer más →'}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-controls">
          <button className="c-arr" id="cPrev" disabled={ci===0} onClick={() => setCi(Math.max(0,ci-1))}>‹</button>
          <div className="c-dots" id="cDots">
            {Array.from({length:Math.max(1,news.length-2)},(_,i) => (
              <button key={i} className={`c-dot${i===ci?' active':''}`} onClick={() => setCi(i)} />
            ))}
          </div>
          <button className="c-arr" id="cNext" disabled={ci>=Math.max(0,news.length-3)} onClick={() => setCi(Math.min(Math.max(0,news.length-3),ci+1))}>›</button>
        </div>
      </section>

      {/* NEWSLETTER */}
      <div className="newsletter">
        <div className="nl-blob" />
        <div className="eyebrow">{EN?'STAY CONNECTED':'MANTENTE CONECTADO'}</div>
        <h2 className="nl-title">{EN?'News that ':'Noticias que '}<em>{EN?'transforms.':'transforman.'}</em></h2>
        <p className="nl-sub">{EN?'Receive impact stories, program updates and opportunities to get involved — straight to your inbox.':'Recibe historias de impacto, actualizaciones de programas y oportunidades para involucrarte.'}</p>
        {!nlDone ? (
          <form className="nl-form" onSubmit={e=>{e.preventDefault();const i=(e.target as HTMLFormElement).querySelector('input') as HTMLInputElement;if(i?.value.includes('@'))setNlDone(true);}}>
            <input type="email" placeholder={EN?'you@email.com':'tu@correo.com'} required />
            <button type="submit">{EN?'Subscribe →':'Suscribirme →'}</button>
          </form>
        ) : null}
        <p className="nl-note">{EN?'No spam. Real impact only. Unsubscribe anytime.':'Sin spam. Solo impacto real. Cancela cuando quieras.'}</p>
        <div className="nl-perks">
          {(EN?[['Monthly impact stories'],['Events and programs'],['Volunteer opportunities']]:[['Historias de impacto mensual'],['Eventos y programas'],['Oportunidades de voluntariado']]).map(([t]) => (
            <div key={t} className="nl-perk"><div className="nl-perk-dot" /><span>{t}</span></div>
          ))}
        </div>
        {nlDone && (
          <div className="nl-success show">
            <span style={{fontSize:20,color:'var(--p)'}}>✓</span>
            <div><p>{EN?'Welcome to the LifexLife family!':'¡Bienvenido a la familia LifexLife!'}</p></div>
          </div>
        )}
      </div>
    </>
  );
}
