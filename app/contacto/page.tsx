'use client';
import { useState } from 'react';
export default function Contacto() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>CONTACTO / CONTACT</span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16}} dangerouslySetInnerHTML={{__html:'Hablemos<br/><em style="color:var(--p);font-style:normal">juntos.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>¿Tienes preguntas, quieres ser voluntario o explorar una alianza? Escríbenos.</p>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:40}}>
        <div>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>ENVÍANOS UN MENSAJE</div>
          <h2 style={{fontSize:26,marginBottom:24}} dangerouslySetInnerHTML={{__html:'¿Cómo podemos<br/><em style="color:var(--p);font-style:normal">ayudarte?</em>'}} />
          {sent ? (
            <div style={{background:'var(--p-l)',borderRadius:16,padding:'20px',marginBottom:16}}>
              <p style={{fontSize:15,fontWeight:600,color:'var(--text)'}}>✓ ¡Mensaje enviado! Te responderemos dentro de 48 horas.</p>
            </div>
          ) : (
            <form onSubmit={e=>{e.preventDefault();setSent(true);}}>
              {[['NOMBRE COMPLETO','text','Tu nombre'],['CORREO ELECTRÓNICO','email','tu@correo.com'],['MENSAJE','textarea','Cuéntanos cómo podemos ayudarte...']].map(([label,type,placeholder]) => (
                <div key={label as string} style={{marginBottom:20}}>
                  <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>{label as string}</label>
                  {type==='textarea' ? <textarea placeholder={placeholder as string} required rows={5} style={{width:'100%',padding:'13px 18px',background:'var(--bg3)',border:'1.5px solid var(--bg4)',borderRadius:16,fontSize:14,color:'var(--text)',fontFamily:'DM Sans,sans-serif',outline:'none',resize:'vertical'}} /> : <input type={type as string} placeholder={placeholder as string} required style={{width:'100%',padding:'13px 18px',background:'var(--bg3)',border:'1.5px solid var(--bg4)',borderRadius:16,fontSize:14,color:'var(--text)',fontFamily:'DM Sans,sans-serif',outline:'none'}} />}
                </div>
              ))}
              <button type="submit" style={{background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'14px 32px',fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 16px rgba(6,182,212,0.28)'}}>Enviar mensaje →</button>
            </form>
          )}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          {[['📧','Email General','Info@lifexlife.org'],['📍','Ubicación','Los Ángeles, California'],['🤝','Voluntariado','Únete como facilitador o mentor'],['🤲','Alianzas','Exploramos colaboraciones con organizaciones alineadas'],['📰','Prensa','Para entrevistas y notas de prensa']].map(([icon,title,desc]) => (
            <div key={title as string} style={{background:'var(--bg2)',borderRadius:24,padding:'24px',border:'1px solid var(--bg4)',display:'flex',alignItems:'flex-start',gap:16}}>
              <div style={{width:44,height:44,borderRadius:14,background:'var(--p-l)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{icon as string}</div>
              <div><h4 style={{fontSize:14,marginBottom:4}}>{title as string}</h4><p style={{fontSize:13,color:'var(--text2)'}}>{desc as string}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}