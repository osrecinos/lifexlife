'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { T, Lang } from '@/lib/i18n';

const SLIDES = [
  { bg:'linear-gradient(145deg,#020B14,#0C1F2E,#0369A1)', emoji:'×', badgeK:'badge', titleK:'title', descK:'desc', btn1:'btnDonar', btn1h:'/donar', btn2:'btnMas', btn2h:'/iniciativas' },
  { bg:'linear-gradient(145deg,#020B14,#0C1F2E,#0369A1)', emoji:'🎨', badgeK:'s1_badge', titleK:'s1_title', descK:'s1_desc', btn1:'s1_badge', btn1h:'/spark', btn2:'apoyar', btn2h:'/donar', btn1Text:'Explorar SPARK', btn1TextEN:'Explore SPARK' },
  { bg:'linear-gradient(145deg,#020B14,#071822,#0C4A58)', emoji:'🌿', badgeK:'s2_badge', titleK:'s2_title', descK:'s2_desc', btn1:'s2_badge', btn1h:'/rooted', btn2:'apoyar', btn2h:'/donar', btn1Text:'Explorar ROOTED', btn1TextEN:'Explore ROOTED' },
  { bg:'linear-gradient(145deg,#020B14,#0A1E2A,#0E6B82)', emoji:'🤝', badgeK:'s3_badge', titleK:'s3_title', descK:'s3_desc', btn1:'s3_badge', btn1h:'/thrive', btn2:'apoyar', btn2h:'/donar', btn1Text:'Explorar THRIVE', btn1TextEN:'Explore THRIVE' },
  { bg:'linear-gradient(145deg,#020B14,#081828,#155E75)', emoji:'⭐', badgeK:'s4_badge', titleK:'s4_title', descK:'s4_desc', btn1:'s4_badge', btn1h:'/lead', btn2:'aplicar', btn2h:'/lead', btn1Text:'Explorar LEAD', btn1TextEN:'Explore LEAD' },
];

const FALLBACK_NEWS = [
  {id:1,cat:'spark', title:'Nuevos talleres de teatro comunitario en el Distrito Pacífico Sur',titleEN:'New community theater workshops in the South Pacific District',desc:'Más de 80 jóvenes participaron en el primer ciclo de primavera 2026.',img:'',date:'2026-04-10'},
  {id:2,cat:'lead',  title:'Tercera generación de Raíces y Caminos completa su programa',     titleEN:'Third generation of Roots & Pathways completes their program',desc:'24 jóvenes líderes graduados listos para multiplicar el impacto.',img:'',date:'2026-03-28'},
  {id:3,cat:'rooted',title:'Huerto comunitario de Watts celebra su primer aniversario',        titleEN:'Watts community garden celebrates its first anniversary',desc:'Más de 300 libras de vegetales frescos para familias locales.',img:'',date:'2026-03-15'},
  {id:4,cat:'thrive',title:'Primeros auxilios emocionales llega a tres nuevas escuelas',       titleEN:'Emotional first aid reaches three new schools',desc:'45 maestros capacitados como facilitadores de bienestar mental.',img:'',date:'2026-02-22'},
  {id:5,cat:'spark', title:'Mural "Raíces Vivas" inaugurado en South LA',                     titleEN:'Mural "Living Roots" inaugurated in South LA',desc:'30 jóvenes artistas crearon un mural de 80 pies de largo.',img:'',date:'2026-01-30'},
  {id:6,cat:'lead',  title:'LifexLife recibe grant de Google for Nonprofits',                 titleEN:'LifexLife receives Google for Nonprofits grant',desc:'El reconocimiento permitirá expandir LEAD a dos nuevas comunidades.',img:'',date:'2026-01-15'},
];

const CAT_EMOJI: Record<string,string> = {spark:'🎨',rooted:'🌿',thrive:'🤝',lead:'⭐',general:'📰'};

export default function Home() {
  const [lang, setLang] = useState<Lang>('es');
  const [cur,  setCur]  = useState(0);
  const [ci,   setCi]   = useState(0);
  const [news, setNews] = useState(FALLBACK_NEWS as any[]);
  const timerRef = useRef<NodeJS.Timeout|null>(null);
  const pbarRef  = useRef<HTMLDivElement>(null);
  const h = T.home; const g = T.global;
  const EN = lang === 'en';

  useEffect(() => {
    const saved = localStorage.getItem('lxl-lang');
    setLang((saved as Lang) || (navigator.language?.startsWith('en') ? 'en' : 'es'));
    const stored = JSON.parse(localStorage.getItem('lxl_blog_posts') || '[]');
    if (stored.length) setNews(stored.slice(0,6));
    const onStorage = () => { const s=localStorage.getItem('lxl-lang'); if(s) setLang(s as Lang); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const startTimer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (pbarRef.current) {
      pbarRef.current.style.transition='none'; pbarRef.current.style.width='0';
      setTimeout(() => { if(pbarRef.current){pbarRef.current.style.transition='width 5.2s linear'; pbarRef.current.style.width='100%';} }, 20);
    }
    timerRef.current = setInterval(() => { setCur(p => { const n=(p+1)%SLIDES.length; startTimer(n); return n; }); }, 5200);
  };
  useEffect(() => { startTimer(0); return () => { if(timerRef.current) clearInterval(timerRef.current); }; }, []);

  const goSlide = (i: number) => { setCur(i); startTimer(i); };
  const s = SLIDES[cur];

  const fmtDate = (d: string) => { try { return new Date(d+'T12:00:00').toLocaleDateString(EN?'en-US':'es-MX',{month:'short',day:'numeric',year:'numeric'}).toUpperCase(); } catch { return d; } };

  return (
    <>
      {/* ── HERO SLIDESHOW ── */}
      <section className="hero">
        {SLIDES.map((sl, i) => (
          <div key={i} className={`slide${i===cur?' active':''}`}>
            <div className="slide-bg" style={{background:sl.bg}} />
            <div className="slide-overlay" />
            {i>0 && <span className="slide-emoji">{sl.emoji}</span>}
            <div className="slide-content">
              <span className="slide-badge">{EN?(h as any)[sl.badgeK]?.en:(h as any)[sl.badgeK]?.es}</span>
              <h1 className="slide-title" style={{whiteSpace:'pre-line'}}>{EN?(h as any)[sl.titleK]?.en:(h as any)[sl.titleK]?.es}</h1>
              <p className="slide-desc">{EN?(h as any)[sl.descK]?.en:(h as any)[sl.descK]?.es}</p>
              <div className="slide-btns">
                <Link href={sl.btn1h}><button className="btn-solid-white">{i===0?(EN?h.btnDonar.en:h.btnDonar.es):(EN?sl.btn1TextEN:sl.btn1Text)}</button></Link>
                <Link href={sl.btn2h}><button className="btn-glass">{i===0?(EN?h.btnMas.en:h.btnMas.es):(EN?g.apoyar.en:g.apoyar.es)}</button></Link>
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

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-inner">
          {['SPARK','CREATIVE ARTS · ARTE CREATIVO','ROOTED','NATURE WELLNESS · BIENESTAR NATURAL','THRIVE','MENTAL HEALTH · SALUD MENTAL','LEAD','LEADERSHIP · LIDERAZGO',
            'SPARK','CREATIVE ARTS · ARTE CREATIVO','ROOTED','NATURE WELLNESS · BIENESTAR NATURAL','THRIVE','MENTAL HEALTH · SALUD MENTAL','LEAD','LEADERSHIP · LIDERAZGO'].map((item,i) => (
            <span key={i} className="ticker-item">{item}{i%2===0?<span className="ticker-sep"> × </span>:null}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats">
        {[[2400,'PERSONAS IMPACTADAS','PEOPLE IMPACTED','+'],[4,'PROGRAMAS ACTIVOS','ACTIVE PROGRAMS',''],[12,'COMUNIDADES','COMMUNITIES','']].map(([n,les,len,suf]) => (
          <div key={les as string} className="stat">
            <div className="stat-num count-up" data-target={n} data-suffix={suf}>{n}{suf}</div>
            <div className="stat-label">{EN?len:les}</div>
          </div>
        ))}
      </div>

      {/* ── INITIATIVES ── */}
      <div className="section-alt-bg">
        <div className="section">
          <div className="eyebrow">{EN?h.initEy.en:h.initEy.es}</div>
          <h2 className="section-title" dangerouslySetInnerHTML={{__html:(EN?h.initTitle.en:h.initTitle.es).replace('\n','<br/><em style="color:var(--p);font-style:normal">').replace('.',i=>i+'</em>')+'.'}} />
          <div className="init-grid">
            {[
              {slug:'spark', badge:'SPARK · 01', titleES:'Arte Creativo', titleEN:'Creative Arts', descES:'Teatro, música, muralismo y escritura creativa para el bienestar emocional de jóvenes y familias.', descEN:'Theater, music, mural arts and creative writing for the emotional well-being of youth and families.'},
              {slug:'rooted',badge:'ROOTED · 02',titleES:'Bienestar Natural',titleEN:'Nature Wellness',descES:'Caminatas, huertos comunitarios y mindfulness en la naturaleza para una vida más equilibrada.',descEN:'Hikes, community gardens and nature mindfulness for a more balanced life.'},
              {slug:'thrive',badge:'THRIVE · 03',titleES:'Salud Mental',    titleEN:'Mental Health', descES:'Apoyo mutuo, primeros auxilios emocionales y reducción del estigma en salud mental no clínica.',descEN:'Peer support, emotional first aid and non-clinical mental health stigma reduction.'},
              {slug:'lead',  badge:'LEAD · 04',  titleES:'Liderazgo',       titleEN:'Leadership',   descES:'Raíces y Caminos — 12 semanas de liderazgo con propósito para jóvenes de 18 a 35 años.',descEN:'Roots & Pathways — 12 weeks of purpose-driven leadership for youth ages 18–35.'},
            ].map(init => (
              <Link key={init.slug} href={`/${init.slug}`} className="init-card">
                <div className="init-card-corner" />
                <span className="init-badge">{init.badge}</span>
                <h3>{EN?init.titleEN:init.titleES}</h3>
                <p>{EN?init.descEN:init.descES}</p>
                <span className="init-link">{EN?`Explore ${init.badge.split(' ·')[0]} →`:`Explorar ${init.badge.split(' ·')[0]} →`}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEWS ── */}
      <section className="news-section">
        <div className="news-header">
          <div>
            <div className="eyebrow">{EN?h.newsEy.en:h.newsEy.es}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{__html:(EN?h.newsTitle.en:h.newsTitle.es).replace('\n','<br/><em style="color:var(--p);font-style:normal">').replace('.','.</em>')}} />
          </div>
          <Link href="/blog" className="see-all">{EN?g.verTodos.en:g.verTodos.es}</Link>
        </div>
        <div className="carousel-outer">
          <div className="carousel-track" id="newsTrack" style={{transform:`translateX(-${ci*(100/3+0.5)}%)`}}>
            {news.map((p: any) => (
              <div key={p.id} className="news-card">
                <div className="news-img">
                  <span className="news-tag">{(p.cat||'general').toUpperCase()}</span>
                  {p.img ? <img src={p.img} alt={p.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} /> : <span style={{fontSize:44}}>{CAT_EMOJI[p.cat]||'📰'}</span>}
                </div>
                <div className="news-body">
                  <h4>{EN&&p.titleEN?p.titleEN:p.title}</h4>
                  <p>{p.desc||p.description}</p>
                  <div className="news-meta">
                    <span className="news-date">{fmtDate(p.date)}</span>
                    <Link href="/blog" className="news-read">{EN?g.leerMas.en:g.leerMas.es}</Link>
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
          <button className="c-arr" id="cNext" disabled={ci>=news.length-3} onClick={() => setCi(Math.min(news.length-3,ci+1))}>›</button>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <div className="newsletter">
        <div className="nl-blob" />
        <div className="eyebrow">{EN?h.nlEy.en:h.nlEy.es}</div>
        <h2 className="nl-title" dangerouslySetInnerHTML={{__html:(EN?h.nlTitle.en:h.nlTitle.es).replace('\n','<br/><em style="color:var(--p);font-style:normal">').replace('.','.</em>')}} />
        <p className="nl-sub">{EN?h.nlSub.en:h.nlSub.es}</p>
        <form className="nl-form" onSubmit={e=>{e.preventDefault();const f=e.target as HTMLFormElement;f.style.opacity='0.4';f.style.pointerEvents='none';(f.closest('.newsletter') as HTMLElement)?.querySelector<HTMLElement>('.nl-success')?.classList.add('show');}}>
          <input type="email" placeholder={EN?'you@email.com':'tu@correo.com'} required />
          <button type="submit">{EN?h.nlBtn.en:h.nlBtn.es}</button>
        </form>
        <p className="nl-note">{EN?h.nlNote.en:h.nlNote.es}</p>
        <div className="nl-perks">
          {[['nlP1','nlP2','nlP3'] as const].flat().map(k => (
            <div key={k} className="nl-perk"><div className="nl-perk-dot" /><span>{EN?(h as any)[k]?.en:(h as any)[k]?.es}</span></div>
          ))}
        </div>
        <div className="nl-success"><span style={{fontSize:20,color:'var(--p)'}}>✓</span><div><p>{EN?h.nlOk.en:h.nlOk.es}</p></div></div>
      </div>
    </>
  );
}
