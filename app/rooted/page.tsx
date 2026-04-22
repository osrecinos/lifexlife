'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Lang = 'es'|'en';

const DATA: Record<string, any> = {
  spark:  {
    color:'#4338CA', emoji:'🎨',
    titleES:'Creative Arts for Emotional Well-Being', titleEN:'Creative Arts for Emotional Well-Being',
    descES:'Teatro, música, muralismo y escritura creativa para el bienestar emocional de jóvenes y familias en la comunidad.',
    descEN:'Theater, music, mural arts and creative writing for the emotional well-being of youth and families in the community.',
    progsES:['Teatro comunitario','Talleres de música','Muralismo urbano','Escritura creativa','Artes visuales'],
    progsEN:['Community theater','Music workshops','Urban muralism','Creative writing','Visual arts'],
    impactES:'Más de 320 jóvenes participaron en actividades SPARK en 2025.',
    impactEN:'Over 320 youth participated in SPARK activities in 2025.',
  },
  rooted: {
    color:'#166534', emoji:'🌿',
    titleES:'Nature-Based Wellness', titleEN:'Nature-Based Wellness',
    descES:'Caminatas, huertos comunitarios, eco-arte y mindfulness al aire libre para una vida más equilibrada y conectada.',
    descEN:'Hikes, community gardens, eco-art and outdoor mindfulness for a more balanced and connected life.',
    progsES:['Caminatas guiadas','Huertos comunitarios','Eco-arte','Mindfulness al aire libre','Educación ambiental'],
    progsEN:['Guided hikes','Community gardens','Eco-art','Outdoor mindfulness','Environmental education'],
    impactES:'El huerto de Watts produjo más de 300 libras de vegetales frescos en su primer año.',
    impactEN:'The Watts garden produced over 300 pounds of fresh vegetables in its first year.',
  },
  thrive: {
    color:'#0E7490', emoji:'🤝',
    titleES:'Non-Clinical Mental Health', titleEN:'Non-Clinical Mental Health',
    descES:'Apoyo mutuo, primeros auxilios emocionales y reducción del estigma en salud mental comunitaria.',
    descEN:'Peer support, emotional first aid and mental health stigma reduction in the community.',
    progsES:['Primeros auxilios emocionales','Grupos de apoyo mutuo','Talleres de reducción del estigma','Capacitación de facilitadores','Círculos de bienestar'],
    progsEN:['Emotional first aid','Peer support groups','Stigma reduction workshops','Facilitator training','Wellness circles'],
    impactES:'45 maestros capacitados como facilitadores de bienestar mental en 3 escuelas públicas.',
    impactEN:'45 teachers trained as mental wellness facilitators in 3 public schools.',
  },
  lead:   {
    color:'#92400E', emoji:'⭐',
    titleES:'Purpose-Driven Leadership', titleEN:'Purpose-Driven Leadership',
    descES:'Raíces y Caminos — ciclos de 12 semanas de liderazgo bilingüe para jóvenes de 18 a 35 años.',
    descEN:'Roots & Pathways — 12-week bilingual leadership cycles for young adults ages 18 to 35.',
    progsES:['Raíces y Caminos (12 semanas)','Mentoría individual','Red de alumni','Proyectos comunitarios','Talleres de liderazgo'],
    progsEN:['Roots & Pathways (12 weeks)','Individual mentorship','Alumni network','Community projects','Leadership workshops'],
    impactES:'72 jóvenes líderes graduados en 3 generaciones del programa Raíces y Caminos.',
    impactEN:'72 young leaders graduated across 3 generations of the Roots & Pathways program.',
  },
};

export default function InitiativePage() {
  const [lang, setLang] = useState<Lang>('es');
  const slug = 'rooted';
  const d = DATA[slug];

  useEffect(() => {
    const upd = () => { const s=localStorage.getItem('lxl-lang'); if(s) setLang(s as Lang); };
    upd();
    window.addEventListener('langchange', upd);
    window.addEventListener('storage', upd);
    return () => { window.removeEventListener('langchange', upd); window.removeEventListener('storage', upd); };
  }, []);

  const EN = lang === 'en';

  return (
    <div>
      {/* HERO */}
      <div style={{position:'relative',minHeight:400,display:'flex',alignItems:'flex-end',padding:'0 56px 56px',overflow:'hidden',background:'linear-gradient(150deg,#020617 0%,#0C1445 45%,'+d.color+' 100%)'}}>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(2,6,23,0.88) 0%,transparent 70%)'}} />
        <span style={{position:'absolute',right:60,top:'50%',transform:'translateY(-50%)',fontSize:200,opacity:0.07,userSelect:'none' as const}}>{d.emoji}</span>
        <div style={{position:'relative',zIndex:2,maxWidth:680}}>
          <span style={{display:'inline-block',background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',color:'#fff',marginBottom:16,textTransform:'uppercase' as const}}>
            {EN ? 'Initiative' : 'Iniciativa'} · {slug.toUpperCase()}
          </span>
          <h1 style={{fontFamily:'var(--display,sans-serif)',fontSize:'clamp(32px,5vw,54px)',color:'#fff',marginBottom:14,lineHeight:1.02}}>
            {EN ? d.titleEN : d.titleES}.
          </h1>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.78)',maxWidth:520,lineHeight:1.7,marginBottom:26}}>
            {EN ? d.descEN : d.descES}
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap' as const}}>
            <Link href="/donar"><button style={{background:'#fff',color:'#0369A1',border:'none',borderRadius:999,padding:'12px 26px',fontSize:14,fontWeight:700,cursor:'pointer'}}>
              {EN ? 'Support' : 'Apoyar'} {slug.toUpperCase()} →
            </button></Link>
            <Link href="/contacto"><button style={{background:'rgba(255,255,255,0.16)',border:'1px solid rgba(255,255,255,0.32)',color:'#fff',borderRadius:999,padding:'12px 26px',fontSize:14,fontWeight:600,cursor:'pointer'}}>
              {EN ? 'Participate →' : 'Participar →'}
            </button></Link>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,marginBottom:56}}>
          <div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>
              {EN ? 'ABOUT' : 'ACERCA DE'} {slug.toUpperCase()}
            </div>
            <h2 style={{fontSize:28,marginBottom:12,lineHeight:1.05,fontFamily:'var(--display,sans-serif)'}}>
              {EN ? 'Program ' : 'Descripción '}<em style={{color:'var(--p)',fontStyle:'normal'}}>{EN ? 'overview.' : 'del programa.'}</em>
            </h2>
            <p style={{fontSize:15,lineHeight:1.75,marginBottom:16,color:'var(--text2)'}}>{EN ? d.descEN : d.descES}</p>
            <p style={{fontSize:15,lineHeight:1.75,color:'var(--text2)'}}>
              {EN
                ? 'This program is an integral part of LifexLife Foundation\'s mission to transform communities from within, with a culturally relevant and bilingual approach.'
                : 'Este programa es parte integral de la misión de LifexLife Foundation de transformar comunidades desde adentro, con un enfoque culturalmente relevante y bilingüe.'}
            </p>
            <div style={{marginTop:20,background:'var(--p-l)',borderRadius:16,padding:'16px 20px',border:'1px solid var(--bg4)'}}>
              <div style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--p)',marginBottom:6,letterSpacing:'0.08em'}}>📊 {EN ? 'IMPACT' : 'IMPACTO'}</div>
              <p style={{fontSize:14,color:'var(--text)',fontWeight:600}}>{EN ? d.impactEN : d.impactES}</p>
            </div>
          </div>
          <div style={{background:'var(--bg2)',borderRadius:32,padding:36,border:'1px solid var(--bg4)'}}>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:14}}>
              {EN ? 'PROGRAMS & ACTIVITIES' : 'PROGRAMAS Y ACTIVIDADES'}
            </div>
            <ul style={{listStyle:'none'}}>
              {(EN ? d.progsEN : d.progsES).map((prog: string) => (
                <li key={prog} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid var(--bg4)',fontSize:14,color:'var(--text2)'}}>
                  <div style={{width:7,height:7,borderRadius:'50%',background:'var(--p)',flexShrink:0}} />
                  {prog}
                </li>
              ))}
            </ul>
            <Link href="/donar" style={{display:'block',marginTop:20}}>
              <button style={{width:'100%',background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'11px 24px',fontSize:13,fontWeight:700,cursor:'pointer'}}>
                {EN ? 'Support this program →' : 'Apoyar este programa →'}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{margin:'0 32px 48px',background:'var(--bg2)',borderRadius:44,padding:'44px',border:'1px solid var(--bg4)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:-60,top:-60,width:200,height:200,borderRadius:'50%',background:'var(--p-l)',opacity:0.8}} />
        <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>
          {EN ? 'GET INVOLVED' : 'INVOLÚCRATE'}
        </div>
        <h2 style={{fontSize:'clamp(22px,3vw,32px)',marginBottom:8,lineHeight:1.1,fontFamily:'var(--display,sans-serif)'}}>
          {EN ? 'Be part of ' : 'Sé parte de '}<em style={{color:'var(--p)',fontStyle:'normal'}}>{slug.toUpperCase()}.</em>
        </h2>
        <p style={{fontSize:14,color:'var(--text2)',lineHeight:1.7,marginBottom:22,maxWidth:400}}>
          {EN
            ? 'Want to participate, volunteer, or support this program? Write to us directly.'
            : '¿Quieres participar, ser voluntario o apoyar este programa? Escríbenos directamente.'}
        </p>
        <Link href="/contacto">
          <button style={{background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'12px 28px',fontSize:14,fontWeight:700,cursor:'pointer'}}>
            {EN ? 'Contact us →' : 'Contáctanos →'}
          </button>
        </Link>
      </div>
    </div>
  );
}
