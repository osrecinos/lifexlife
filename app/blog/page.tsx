'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const fallback = [
  { id:1, cat:'spark', title:'Nuevos talleres de teatro comunitario en el Distrito Pacífico Sur', desc:'Más de 80 jóvenes participaron en el primer ciclo de primavera 2026.', img:'', date:'2026-04-10' },
  { id:2, cat:'lead', title:'Tercera generación de Raíces y Caminos completa su programa', desc:'24 jóvenes líderes graduados listos para multiplicar el impacto.', img:'', date:'2026-03-28' },
  { id:3, cat:'rooted', title:'Huerto comunitario de Watts celebra su primer aniversario', desc:'Más de 300 libras de vegetales frescos para familias locales.', img:'', date:'2026-03-15' },
  { id:4, cat:'thrive', title:'Primeros auxilios emocionales llega a tres nuevas escuelas', desc:'45 maestros capacitados como facilitadores de bienestar mental.', img:'', date:'2026-02-22' },
];
const catEmoji: Record<string,string> = {spark:'🎨',rooted:'🌿',thrive:'🤝',lead:'⭐',general:'📰'};

export default function Blog() {
  const [posts, setPosts] = useState(fallback as any[]);
  const [filter, setFilter] = useState('all');
  const [lang, setLang] = useState<'es'|'en'>('es');
  useEffect(() => {
    const saved = localStorage.getItem('lxl-lang');
    setLang((saved as any) || (navigator.language?.startsWith('en') ? 'en' : 'es'));
    const stored = JSON.parse(localStorage.getItem('lxl_blog_posts') || '[]');
    if (stored.length) setPosts(stored);
  }, []);
  const EN = lang === 'en';
  const filtered = filter === 'all' ? posts : posts.filter((p:any) => p.cat === filter);
  const fmt = (d: string) => new Date(d+'T12:00:00').toLocaleDateString(EN?'en-US':'es-MX',{year:'numeric',month:'short',day:'numeric'}).toUpperCase();
  return (
    <div>
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>{EN?'NEWS & STORIES':'NOTICIAS E HISTORIAS'}</span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16}} dangerouslySetInnerHTML={{__html:EN?'What is<br/><em style="color:var(--p);font-style:normal">happening.</em>':'Lo que está<br/><em style="color:var(--p);font-style:normal">pasando.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>{EN?'Impact stories from the LifexLife community.':'Historias de impacto de la comunidad LifexLife.'}</p>
      </div>
      <div style={{background:'var(--p-l)',borderBottom:'1px solid var(--bg4)',padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--p)',letterSpacing:'0.08em'}}>📝 {EN?'ADD NEWS →':'AGREGAR NOTICIA →'}</span>
        <Link href='/admin' style={{fontFamily:'DM Mono,monospace',fontSize:10,background:'var(--p)',color:'#fff',borderRadius:999,padding:'5px 16px'}}>{EN?'Admin Panel →':'Panel Admin →'}</Link>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'40px'}}>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:32}}>
          {([['all',EN?'ALL':'TODAS'],['spark','🎨 SPARK'],['rooted','🌿 ROOTED'],['thrive','🤝 THRIVE'],['lead','⭐ LEAD']] as [string,string][]).map(([cat,label]) => (
            <button key={cat} onClick={() => setFilter(cat)} style={{borderRadius:999,padding:'7px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.1em',border:'1.5px solid',borderColor:filter===cat?'var(--p)':'var(--bg4)',background:filter===cat?'var(--p-l)':'transparent',color:filter===cat?'var(--p)':'var(--text2)',cursor:'pointer'}}>{label}</button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {filtered.map((p:any) => (
            <div key={p.id} style={{background:'var(--bg2)',borderRadius:32,overflow:'hidden',border:'1px solid var(--bg4)'}}>
              <div style={{height:180,display:'flex',alignItems:'center',justifyContent:'center',fontSize:48,background:'var(--p-l)',position:'relative'}}>
                {p.img ? <img src={p.img} alt={p.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} /> : catEmoji[p.cat]||'📰'}
                <span style={{position:'absolute',top:12,left:12,background:'var(--p)',color:'#fff',borderRadius:999,padding:'3px 11px',fontFamily:'DM Mono,monospace',fontSize:9,fontWeight:500}}>{p.cat?.toUpperCase()}</span>
              </div>
              <div style={{padding:'20px'}}>
                <h3 style={{fontSize:16,marginBottom:8,lineHeight:1.3,color:'var(--text)'}}>{p.title}</h3>
                <p style={{fontSize:12,lineHeight:1.6,marginBottom:14,color:'var(--text2)'}}>{p.desc||p.description}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--text3)'}}>{fmt(p.date)}</span>
                  <span style={{fontSize:12,fontWeight:600,color:'var(--p)'}}>{EN?'Read more →':'Leer más →'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}