'use client';
import { useState, useEffect } from 'react';
type Lang='es'|'en';
export default function Impacto() {
  const [lang,setLang]=useState<Lang>('es');
  useEffect(()=>{
    const upd=()=>{const s=localStorage.getItem('lxl-lang');if(s)setLang(s as Lang);};
    upd();window.addEventListener('langchange',upd);window.addEventListener('storage',upd);
    return()=>{window.removeEventListener('langchange',upd);window.removeEventListener('storage',upd);};
  },[]);
  const EN=lang==='en';
  const metrics=[['2,400+',EN?'PEOPLE IMPACTED':'PERSONAS IMPACTADAS'],[4,EN?'ACTIVE PROGRAMS':'PROGRAMAS ACTIVOS'],[12,EN?'COMMUNITIES':'COMUNIDADES']];
  const cards=[['320+',EN?'Youth in SPARK':'Jóvenes en SPARK'],['300 lbs',EN?'Vegetables in ROOTED':'Vegetales en ROOTED'],['45+',EN?'Teachers in THRIVE':'Maestros en THRIVE'],['72+',EN?'Leaders in LEAD':'Líderes en LEAD']];
  const testimonials=[
    {icon:'🎨',quote:EN?'The SPARK program helped me find my voice through theater. For the first time I felt able to express what I felt without fear.':'El programa SPARK me ayudó a encontrar mi voz a través del teatro. Por primera vez me sentí capaz de expresar lo que sentía sin miedo.',name:EN?'SPARK Participant':'Participante SPARK',place:'SOUTH LOS ÁNGELES, CA'},
    {icon:'⭐',quote:EN?'LEAD gave me tools to be the leader my community needed. The 12 weeks completely changed my perspective.':'LEAD me dio las herramientas para ser el líder que mi comunidad necesitaba. Las 12 semanas cambiaron completamente mi perspectiva.',name:EN?'LEAD Graduate — Roots & Pathways':'Graduado LEAD — Raíces y Caminos',place:'LOS ÁNGELES, CA'},
    {icon:'🌿',quote:EN?'The ROOTED community garden gave us more than fresh vegetables — it gave us community, connection to the earth and pride.':'El huerto comunitario de ROOTED no solo nos dio vegetales frescos — nos dio comunidad, conexión con la tierra y orgullo.',name:EN?'ROOTED Participant':'Participante ROOTED',place:'WATTS, LOS ÁNGELES'},
    {icon:'🤝',quote:EN?'THRIVE gave me practical tools to support my students\' emotional well-being without being a therapist.':'THRIVE me dio herramientas prácticas para apoyar el bienestar emocional de mis estudiantes sin ser terapeuta.',name:EN?'Trained Teacher — THRIVE':'Maestra Capacitada — THRIVE',place:EN?'PUBLIC SCHOOL, LA':'ESCUELA PÚBLICA, LA'},
  ];
  return (
    <div>
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>{EN?'OUR IMPACT':'NUESTRO IMPACTO'}</span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16,fontFamily:'var(--display,sans-serif)'}} dangerouslySetInnerHTML={{__html:EN?'Numbers that<br/><em style="color:var(--p);font-style:normal">matter.</em>':'Números que<br/><em style="color:var(--p);font-style:normal">importan.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>{EN?'Every number represents a person, a family, a community transformed.':'Cada número representa una persona, una familia, una comunidad transformada.'}</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',background:'var(--p)'}}>
        {metrics.map(([n,l])=>(
          <div key={l as string} style={{padding:'24px 20px',textAlign:'center',borderRight:'1px solid rgba(255,255,255,0.18)'}}>
            <div style={{fontFamily:'var(--display,sans-serif)',fontSize:34,fontWeight:800,color:'#fff',marginBottom:4}}>{n}</div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'rgba(255,255,255,0.7)',letterSpacing:'0.07em'}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px'}}>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>{EN?'IMPACT METRICS':'MÉTRICAS DE IMPACTO'}</div>
        <h2 style={{fontSize:28,marginBottom:28,fontFamily:'var(--display,sans-serif)'}} dangerouslySetInnerHTML={{__html:EN?'Real<br/><em style="color:var(--p);font-style:normal">results.</em>':'Resultados<br/><em style="color:var(--p);font-style:normal">reales.</em>'}} />
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:56}}>
          {cards.map(([n,l])=>(
            <div key={l} style={{background:'var(--bg2)',borderRadius:24,padding:'28px 20px',textAlign:'center',border:'1px solid var(--bg4)'}}>
              <div style={{fontFamily:'var(--display,sans-serif)',fontSize:36,fontWeight:800,color:'var(--p)',marginBottom:6}}>{n}</div>
              <div style={{fontSize:13,color:'var(--text2)'}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>{EN?'TESTIMONIALS':'TESTIMONIOS'}</div>
        <h2 style={{fontSize:28,marginBottom:24,fontFamily:'var(--display,sans-serif)'}} dangerouslySetInnerHTML={{__html:EN?'Voices from<br/><em style="color:var(--p);font-style:normal">our community.</em>':'Voces de<br/><em style="color:var(--p);font-style:normal">nuestra comunidad.</em>'}} />
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
          {testimonials.map(t=>(
            <div key={t.name} style={{background:'var(--bg2)',borderRadius:24,padding:28,border:'1px solid var(--bg4)'}}>
              <blockquote style={{fontSize:15,lineHeight:1.72,color:'var(--text)',fontStyle:'italic',marginBottom:16}}>"{t.quote}"</blockquote>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'var(--p-l)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>{t.icon}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{t.name}</div>
                  <div style={{fontSize:11,color:'var(--text3)',fontFamily:'DM Mono,monospace'}}>{t.place}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
