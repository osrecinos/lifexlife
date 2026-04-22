'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Lang = 'es'|'en';
const catEmoji: Record<string,string> = {spark:'🎨',rooted:'🌿',thrive:'🤝',lead:'⭐',general:'📰'};

const FALLBACK = [
  {id:1,cat:'spark', title:'Nuevos talleres de teatro comunitario en el Distrito Pacífico Sur',titleEN:'New community theater workshops in the South Pacific District',desc:'Más de 80 jóvenes participaron en el primer ciclo de primavera 2026.',descEN:'Over 80 youth participated in the first spring 2026 cycle.',body:'Más de 80 jóvenes de South Los Ángeles participaron en el primer ciclo de primavera 2026 del programa SPARK de LifexLife Foundation. Los talleres incluyeron teatro comunitario, improvisación y escritura creativa guiada por facilitadores locales. Los participantes reportaron mejoras en autoestima, comunicación y expresión emocional. El programa continuará con dos ciclos adicionales este año.',bodyEN:'Over 80 youth from South Los Angeles participated in the first spring 2026 cycle of LifexLife Foundation\'s SPARK program. Workshops included community theater, improvisation and creative writing guided by local facilitators. Participants reported improvements in self-esteem, communication and emotional expression. The program will continue with two additional cycles this year.',img:'',date:'2026-04-10'},
  {id:2,cat:'lead',  title:'Tercera generación de Raíces y Caminos completa su programa',titleEN:'Third generation of Roots & Pathways completes their program',desc:'24 jóvenes líderes graduados listos para multiplicar el impacto.',descEN:'24 graduated young leaders ready to multiply impact.',body:'24 jóvenes líderes de entre 18 y 35 años completaron la tercera generación de Raíces y Caminos, el programa insignia de LEAD. Durante 12 semanas desarrollaron habilidades de liderazgo, comunicación intercultural y servicio comunitario. Los graduados recibirán mentoría continua y forman parte de la red de alumni de LifexLife Foundation.',bodyEN:'24 young leaders ages 18–35 completed the third generation of Roots & Pathways, LEAD\'s flagship program. Over 12 weeks they developed leadership skills, intercultural communication and community service. Graduates receive ongoing mentorship and are part of the LifexLife Foundation alumni network.',img:'',date:'2026-03-28'},
  {id:3,cat:'rooted',title:'Huerto comunitario de Watts celebra su primer aniversario',titleEN:'Watts community garden celebrates its first anniversary',desc:'Más de 300 libras de vegetales frescos para familias locales.',descEN:'Over 300 pounds of fresh vegetables for local families.',body:'El huerto comunitario de Watts cumple su primer año produciendo más de 300 libras de vegetales frescos para familias locales. El espacio se ha convertido en un punto de encuentro para residentes de todas las edades, ofreciendo talleres de jardinería, mindfulness al aire libre y educación ambiental. En su segundo año, el huerto expandirá su capacidad con tres nuevas parcelas.',bodyEN:'The Watts community garden marks its first year producing over 300 pounds of fresh vegetables for local families. The space has become a gathering point for residents of all ages, offering gardening workshops, outdoor mindfulness and environmental education. In its second year, the garden will expand capacity with three new plots.',img:'',date:'2026-03-15'},
  {id:4,cat:'thrive',title:'Primeros auxilios emocionales llega a tres nuevas escuelas',titleEN:'Emotional first aid reaches three new schools',desc:'45 maestros capacitados como facilitadores de bienestar mental.',descEN:'45 teachers trained as mental wellness facilitators.',body:'El programa de primeros auxilios emocionales de THRIVE llegó a tres nuevas escuelas públicas de Los Ángeles, capacitando a 45 maestros como facilitadores de bienestar mental no clínico. Los docentes aprendieron técnicas de escucha activa, regulación emocional y cómo crear espacios seguros en el aula. El impacto estimado alcanza a más de 1,200 estudiantes.',bodyEN:'THRIVE\'s emotional first aid program reached three new Los Angeles public schools, training 45 teachers as non-clinical mental wellness facilitators. Teachers learned active listening, emotional regulation and how to create safe spaces in the classroom. The estimated impact reaches over 1,200 students.',img:'',date:'2026-02-22'},
];

// Full post modal
function PostModal({ post, lang, onClose }: { post: any; lang: Lang; onClose: () => void }) {
  const EN = lang === 'en';
  const title = EN && post.titleEN ? post.titleEN : post.title;
  const body  = EN && post.bodyEN  ? post.bodyEN  : (post.body || post.desc || post.description);
  const fmt   = (d: string) => { try { return new Date(d+'T12:00:00').toLocaleDateString(EN?'en-US':'es-MX',{year:'numeric',month:'long',day:'numeric'}); } catch { return d; } };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:2000,background:'rgba(0,0,0,0.7)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'var(--bg2)',borderRadius:32,maxWidth:680,width:'100%',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 80px rgba(0,0,0,0.35)'}}>
        {/* Image */}
        <div style={{height:240,display:'flex',alignItems:'center',justifyContent:'center',fontSize:72,background:'var(--p-l)',position:'relative',borderRadius:'32px 32px 0 0',overflow:'hidden'}}>
          {post.img ? <img src={post.img} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} /> : catEmoji[post.cat]||'📰'}
          <span style={{position:'absolute',top:16,left:16,background:'var(--p)',color:'#fff',borderRadius:999,padding:'4px 14px',fontFamily:'DM Mono,monospace',fontSize:10,fontWeight:600}}>{post.cat?.toUpperCase()}</span>
          <button onClick={onClose} style={{position:'absolute',top:16,right:16,width:36,height:36,borderRadius:'50%',background:'rgba(0,0,0,0.5)',border:'none',color:'#fff',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        </div>
        {/* Content */}
        <div style={{padding:'32px 36px 40px'}}>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--text3)',marginBottom:12}}>{fmt(post.date)}</div>
          <h2 style={{fontSize:24,lineHeight:1.2,marginBottom:16,fontFamily:'var(--display,sans-serif)'}}>{title}</h2>
          <div style={{fontSize:15,lineHeight:1.8,color:'var(--text2)',whiteSpace:'pre-wrap'}}>{body}</div>
          <button onClick={onClose} style={{marginTop:28,background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'10px 24px',fontSize:13,fontWeight:700,cursor:'pointer'}}>
            {EN ? '← Back to blog' : '← Volver al blog'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [lang, setLang]   = useState<Lang>('es');
  const [posts, setPosts] = useState(FALLBACK as any[]);
  const [filter, setFilter] = useState('all');
  const [reading, setReading] = useState<any|null>(null);

  useEffect(() => {
    const upd = () => { const s=localStorage.getItem('lxl-lang'); if(s) setLang(s as Lang); };
    upd();
    window.addEventListener('langchange', upd);
    window.addEventListener('storage', upd);
    const stored = JSON.parse(localStorage.getItem('lxl_blog_posts') || '[]');
    if (stored.length) setPosts(stored);
    return () => { window.removeEventListener('langchange', upd); window.removeEventListener('storage', upd); };
  }, []);

  const EN = lang === 'en';
  const filtered = filter === 'all' ? posts : posts.filter(p => p.cat === filter);
  const fmt = (d: string) => { try { return new Date(d+'T12:00:00').toLocaleDateString(EN?'en-US':'es-MX',{month:'short',day:'numeric',year:'numeric'}).toUpperCase(); } catch { return d; } };

  return (
    <div>
      {reading && <PostModal post={reading} lang={lang} onClose={() => setReading(null)} />}

      {/* HERO */}
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>
          {EN ? 'NEWS & STORIES' : 'NOTICIAS E HISTORIAS'}
        </span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16,fontFamily:'var(--display,sans-serif)'}}
          dangerouslySetInnerHTML={{__html: EN
            ? 'What is<br/><em style="color:var(--p);font-style:normal">happening.</em>'
            : 'Lo que está<br/><em style="color:var(--p);font-style:normal">pasando.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>
          {EN ? 'Impact stories, program updates and news from the LifexLife community.'
               : 'Historias de impacto, actualizaciones de programas y noticias de la comunidad LifexLife.'}
        </p>
      </div>

      {/* ADMIN BAR */}
      <div style={{background:'var(--p-l)',borderBottom:'1px solid var(--bg4)',padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--p)',letterSpacing:'0.08em'}}>
          📝 {EN ? 'POST NEWS →' : 'PUBLICAR NOTICIAS →'}
        </span>
        <Link href="/admin" style={{fontFamily:'DM Mono,monospace',fontSize:10,background:'var(--p)',color:'#fff',borderRadius:999,padding:'5px 16px'}}>
          {EN ? 'Add Post →' : 'Agregar Noticia →'}
        </Link>
      </div>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'40px'}}>
        {/* FILTERS */}
        <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:32}}>
          {[['all',EN?'ALL':'TODAS'],['spark','🎨 SPARK'],['rooted','🌿 ROOTED'],['thrive','🤝 THRIVE'],['lead','⭐ LEAD']].map(([cat,label]) => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{borderRadius:999,padding:'7px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.1em',
                border:'1.5px solid',borderColor:filter===cat?'var(--p)':'var(--bg4)',
                background:filter===cat?'var(--p-l)':'transparent',color:filter===cat?'var(--p)':'var(--text2)',cursor:'pointer'}}>
              {label}
            </button>
          ))}
        </div>

        {/* GRID — responsive 3 cols desktop, 1 col mobile */}
        <style>{`
          .blog-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
          @media (max-width: 900px) { .blog-grid { grid-template-columns: 1fr; } }
          @media (min-width: 901px) and (max-width: 1100px) { .blog-grid { grid-template-columns: repeat(2,1fr); } }
          .news-read-btn:hover { text-decoration: underline; }
        `}</style>

        {filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px 20px',color:'var(--text3)'}}>
            <p style={{fontSize:15,marginBottom:8}}>{EN ? 'No posts published yet.' : 'Aún no hay noticias publicadas.'}</p>
            <Link href="/admin" style={{color:'var(--p)',fontWeight:600}}>{EN ? 'Publish your first post →' : 'Publica tu primera noticia →'}</Link>
          </div>
        ) : (
          <div className="blog-grid">
            {filtered.map((p: any) => {
              const title = EN && p.titleEN ? p.titleEN : p.title;
              const desc  = EN && p.descEN  ? p.descEN  : (p.desc || p.description);
              return (
                <div key={p.id} style={{background:'var(--bg2)',borderRadius:24,overflow:'hidden',border:'1px solid var(--bg4)',display:'flex',flexDirection:'column'}}>
                  {/* Card image */}
                  <div style={{height:200,display:'flex',alignItems:'center',justifyContent:'center',fontSize:56,background:'var(--p-l)',position:'relative',flexShrink:0}}>
                    {p.img
                      ? <img src={p.img} alt={title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
                      : catEmoji[p.cat]||'📰'}
                    <span style={{position:'absolute',top:12,left:12,background:'var(--p)',color:'#fff',borderRadius:999,padding:'3px 11px',fontFamily:'DM Mono,monospace',fontSize:9,fontWeight:500}}>
                      {p.cat?.toUpperCase()}
                    </span>
                  </div>
                  {/* Card body */}
                  <div style={{padding:'20px',display:'flex',flexDirection:'column',flex:1}}>
                    <h3 style={{fontSize:16,marginBottom:8,lineHeight:1.35,color:'var(--text)',fontFamily:'var(--display,sans-serif)'}}>{title}</h3>
                    <p style={{fontSize:13,lineHeight:1.65,marginBottom:16,color:'var(--text2)',flex:1}}>{desc}</p>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'auto'}}>
                      <span style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--text3)'}}>{fmt(p.date)}</span>
                      <button onClick={() => setReading(p)} className="news-read-btn"
                        style={{fontSize:13,fontWeight:700,color:'var(--p)',background:'none',border:'none',cursor:'pointer',padding:0}}>
                        {EN ? 'Read more →' : 'Leer más →'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
