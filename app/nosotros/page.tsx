'use client';
import { useState, useEffect } from 'react';
type Lang='es'|'en';
export default function Nosotros() {
  const [lang,setLang]=useState<Lang>('es');
  useEffect(()=>{
    const upd=()=>{const s=localStorage.getItem('lxl-lang');if(s)setLang(s as Lang);};
    upd();window.addEventListener('langchange',upd);window.addEventListener('storage',upd);
    return()=>{window.removeEventListener('langchange',upd);window.removeEventListener('storage',upd);};
  },[]);
  const EN=lang==='en';
  const legal=[['Estatus Legal / Status','501(c)(3) Nonprofit'],['EIN','41-4788665'],['Estado / State','California'],['Email','Info@lifexlife.org'],['Sede / HQ','Los Ángeles, CA']];
  const team=[{icon:'👤',name:'Oscar Recinos',role:EN?'FOUNDER & EXECUTIVE DIRECTOR':'FUNDADOR Y DIRECTOR EJECUTIVO',bio:EN?'Visionary behind LifexLife Foundation, committed to transforming communities through art, nature and leadership.':'Visionario detrás de LifexLife Foundation, comprometido con transformar comunidades a través del arte, la naturaleza y el liderazgo.'},{icon:'👥',name:EN?'Board of Directors':'Junta Directiva',role:'BOARD OF DIRECTORS',bio:EN?'Community leaders committed to LifexLife\'s mission and organizational transparency.':'Líderes comunitarios comprometidos con la misión de LifexLife y la transparencia organizacional.'},{icon:'🙌',name:EN?'Key Volunteers':'Voluntarios Clave',role:EN?'COMMUNITY VOLUNTEERS':'VOLUNTARIOS CLAVE',bio:EN?'Network of facilitators, mentors and community artists who make every program possible.':'Red de facilitadores, mentores y artistas comunitarios que hacen posible cada programa.'}];
  return (
    <div>
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>{EN?'OUR STORY':'NUESTRA HISTORIA'}</span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16,fontFamily:'var(--display,sans-serif)'}} dangerouslySetInnerHTML={{__html:EN?'One life is worth<br/><em style="color:var(--p);font-style:normal">another life.</em>':'Una vida vale<br/><em style="color:var(--p);font-style:normal">otra vida.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>{EN?'Meet the people behind LifexLife Foundation and why we exist.':'Conoce a las personas detrás de LifexLife Foundation y por qué existimos.'}</p>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:36,marginBottom:56}}>
          <div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>{EN?'MISSION & VISION':'MISIÓN Y VISIÓN'}</div>
            <h2 style={{fontSize:28,marginBottom:12,fontFamily:'var(--display,sans-serif)'}} dangerouslySetInnerHTML={{__html:EN?'Why do<br/><em style="color:var(--p);font-style:normal">we exist?</em>':'¿Por qué<br/><em style="color:var(--p);font-style:normal">existimos?</em>'}} />
            <p style={{fontSize:15,lineHeight:1.75,marginBottom:14,color:'var(--text2)'}}>{EN?'LifexLife Foundation was born from a simple yet profound belief:':'LifexLife Foundation nació de una creencia simple y profunda:'} <strong style={{color:'var(--text)'}}>{EN?'one life can transform another life.':'una vida puede transformar otra vida.'}</strong></p>
            <p style={{fontSize:15,lineHeight:1.75,color:'var(--text2)'}}>{EN?'We work in Los Angeles, CA, with youth, families and community leaders who deserve tools to thrive — not just survive.':'Trabajamos en Los Ángeles, CA, con jóvenes, familias y líderes comunitarios que merecen herramientas para florecer — no solo sobrevivir.'}</p>
          </div>
          <div style={{background:'var(--bg2)',borderRadius:32,padding:36,border:'1px solid var(--bg4)'}}>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:12}}>{EN?'LEGAL INFORMATION':'INFORMACIÓN LEGAL'}</div>
            {legal.map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--bg4)',fontSize:13}}>
                <span style={{color:'var(--text2)',fontWeight:600}}>{k}</span>
                <span style={{fontFamily:'DM Mono,monospace',color:'var(--p)'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>{EN?'THE TEAM':'EL EQUIPO'}</div>
        <h2 style={{fontSize:28,marginBottom:24,fontFamily:'var(--display,sans-serif)'}} dangerouslySetInnerHTML={{__html:EN?'The people<br/><em style="color:var(--p);font-style:normal">behind the change.</em>':'Las personas<br/><em style="color:var(--p);font-style:normal">detrás del cambio.</em>'}} />
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:48}}>
          {team.map(m=>(
            <div key={m.name} style={{background:'var(--bg2)',borderRadius:24,padding:'28px 24px',border:'1px solid var(--bg4)',textAlign:'center'}}>
              <div style={{width:72,height:72,borderRadius:'50%',background:'var(--p-l)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',fontSize:28}}>{m.icon}</div>
              <h4 style={{fontSize:16,marginBottom:4}}>{m.name}</h4>
              <p style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--p)',letterSpacing:'0.06em',marginBottom:8}}>{m.role}</p>
              <p style={{fontSize:12,color:'var(--text2)',lineHeight:1.6}}>{m.bio}</p>
            </div>
          ))}
        </div>
        <div id="transparencia">
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>{EN?'PARTNERSHIPS':'ALIANZAS'}</div>
          <h2 style={{fontSize:28,marginBottom:20,fontFamily:'var(--display,sans-serif)'}} dangerouslySetInnerHTML={{__html:EN?'Together we are<br/><em style="color:var(--p);font-style:normal">stronger.</em>':'Juntos somos<br/><em style="color:var(--p);font-style:normal">más fuertes.</em>'}} />
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            {['Distrito Pacífico Sur','Goodstack','Google for Nonprofits','PayPal Giving Fund'].map(p=>(
              <div key={p} style={{background:'var(--bg2)',border:'1.5px solid var(--bg4)',borderRadius:999,padding:'8px 20px',fontSize:13,fontWeight:600,color:'var(--text)'}}>{p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
