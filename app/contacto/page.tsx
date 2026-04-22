'use client';
import { useState, useEffect } from 'react';
type Lang='es'|'en';
export default function Contacto() {
  const [lang,setLang]=useState<Lang>('es');
  const [sent,setSent]=useState(false);
  useEffect(()=>{
    const upd=()=>{const s=localStorage.getItem('lxl-lang');if(s)setLang(s as Lang);};
    upd();window.addEventListener('langchange',upd);window.addEventListener('storage',upd);
    return()=>{window.removeEventListener('langchange',upd);window.removeEventListener('storage',upd);};
  },[]);
  const EN=lang==='en';
  const inp:React.CSSProperties={width:'100%',padding:'13px 18px',background:'var(--bg3)',border:'1.5px solid var(--bg4)',borderRadius:16,fontSize:14,color:'var(--text)',fontFamily:'inherit',outline:'none'};
  return (
    <div>
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>{EN?'CONTACT':'CONTACTO'}</span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16,fontFamily:'var(--display,sans-serif)'}} dangerouslySetInnerHTML={{__html:EN?"Let's talk<br/><em style=\"color:var(--p);font-style:normal\">together.</em>":'Hablemos<br/><em style="color:var(--p);font-style:normal">juntos.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>{EN?'Have questions about our programs, want to volunteer, or explore a partnership?':'¿Tienes preguntas sobre nuestros programas, quieres ser voluntario o explorar una alianza?'}</p>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:40}}>
        <div>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>{EN?'SEND US A MESSAGE':'ENVÍANOS UN MENSAJE'}</div>
          <h2 style={{fontSize:26,marginBottom:24,fontFamily:'var(--display,sans-serif)'}} dangerouslySetInnerHTML={{__html:EN?'How can we<br/><em style="color:var(--p);font-style:normal">help you?</em>':'¿Cómo podemos<br/><em style="color:var(--p);font-style:normal">ayudarte?</em>'}} />
          {sent ? (
            <div style={{background:'var(--p-l)',borderRadius:16,padding:'20px'}}>
              <p style={{fontSize:15,fontWeight:600,color:'var(--text)'}}>✓ {EN?'Message sent! We\'ll respond within 48 hours.':'¡Mensaje enviado! Te responderemos dentro de 48 horas.'}</p>
            </div>
          ) : (
            <form onSubmit={e=>{e.preventDefault();setSent(true);}}>
              {[{l:EN?'FULL NAME':'NOMBRE COMPLETO',t:'text',p:EN?'Your name':'Tu nombre'},{l:EN?'EMAIL ADDRESS':'CORREO ELECTRÓNICO',t:'email',p:EN?'you@email.com':'tu@correo.com'}].map(({l,t,p})=>(
                <div key={l} style={{marginBottom:20}}>
                  <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>{l}</label>
                  <input type={t} placeholder={p} required style={inp} />
                </div>
              ))}
              <div style={{marginBottom:20}}>
                <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>{EN?'SUBJECT':'ASUNTO'}</label>
                <select required style={{...inp}}>
                  <option value="">{EN?'Select a topic':'Selecciona un tema'}</option>
                  {[[EN?'Program information':'Información sobre programas'],[EN?'Volunteering':'Voluntariado'],[EN?'Partnerships and grants':'Alianzas y grants'],[EN?'Donations':'Donaciones'],[EN?'Press and media':'Prensa y medios'],[EN?'Other':'Otro']].map(([o])=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={{marginBottom:28}}>
                <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>{EN?'MESSAGE':'MENSAJE'}</label>
                <textarea placeholder={EN?'Tell us how we can help you...':'Cuéntanos cómo podemos ayudarte...'} required rows={5} style={{...inp,resize:'vertical'}} />
              </div>
              <button type="submit" style={{background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'14px 32px',fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 16px rgba(14,165,233,0.28)'}}>
                {EN?'Send message →':'Enviar mensaje →'}
              </button>
            </form>
          )}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {[['📧',EN?'General Email':'Email General','Info@lifexlife.org'],['📍',EN?'Location':'Ubicación','Los Ángeles, California'],['🤝',EN?'Volunteering':'Voluntariado',EN?'Join as a facilitator or mentor':'Únete como facilitador o mentor'],['🤲',EN?'Partnerships':'Alianzas',EN?'Grants and sponsorships':'Grants y patrocinios'],['📰',EN?'Press':'Prensa',EN?'For interviews and press notes':'Para entrevistas y notas de prensa']].map(([icon,title,desc])=>(
            <div key={title as string} style={{background:'var(--bg2)',borderRadius:24,padding:'22px',border:'1px solid var(--bg4)',display:'flex',alignItems:'flex-start',gap:16}}>
              <div style={{width:44,height:44,borderRadius:14,background:'var(--p-l)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{icon}</div>
              <div><h4 style={{fontSize:14,marginBottom:4}}>{title as string}</h4><p style={{fontSize:13,color:'var(--text2)'}}>{desc as string}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
