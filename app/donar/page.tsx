'use client';
import { useState } from 'react';
export default function Donar() {
  const [amt, setAmt] = useState('50');
  const [selected, setSelected] = useState('50');
  const donate = () => {
    const a = amt || selected;
    const form = document.createElement('form');
    form.action='https://www.paypal.com/donate'; form.method='post'; form.target='_blank';
    const fields = {business:'info@lifexlife.org',item_name:'Donación a LifexLife Foundation',currency_code:'USD',amount:a};
    Object.entries(fields).forEach(([n,v]) => { const i=document.createElement('input'); i.type='hidden'; i.name=n; i.value=v as string; form.appendChild(i); });
    document.body.appendChild(form); form.submit(); document.body.removeChild(form);
  };
  return (
    <div>
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>DONAR / DONATE</span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16}} dangerouslySetInnerHTML={{__html:'Tu apoyo<br/><em style="color:var(--p);font-style:normal">transforma vidas.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>Cada donación es deducible de impuestos y va directamente a nuestros programas. EIN: 41-4788665 · 501(c)(3)</p>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px',display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:40}}>
        <div style={{background:'var(--bg2)',borderRadius:44,padding:'44px',border:'1px solid var(--bg4)',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',right:-60,top:-60,width:200,height:200,borderRadius:'50%',background:'var(--p-l)',opacity:0.7}} />
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>DONAR AHORA</div>
          <h2 style={{fontSize:28,marginBottom:8}} dangerouslySetInnerHTML={{__html:'Elige tu<br/><em style="color:var(--p);font-style:normal">impacto.</em>'}} />
          <p style={{fontSize:14,color:'var(--text2)',marginBottom:22}}>Selecciona un monto o escribe el tuyo. Todas las donaciones son deducibles de impuestos.</p>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:20}}>
            {['25','50','100','250'].map(a => (
              <button key={a} onClick={() => {setSelected(a);setAmt(a);}} style={{padding:'11px 22px',borderRadius:999,border:'2px solid',borderColor:selected===a?'var(--p)':'var(--bg4)',background:selected===a?'var(--p)':'transparent',fontSize:16,fontWeight:700,fontFamily:'Syne,sans-serif',cursor:'pointer',color:selected===a?'#fff':'var(--text)'}}>\${a}</button>
            ))}
          </div>
          <input type="number" value={amt} onChange={e=>{setAmt(e.target.value);setSelected('');}} placeholder="Monto personalizado" min="1" style={{width:'100%',padding:'14px 20px',background:'var(--bg3)',border:'1.5px solid var(--bg4)',borderRadius:16,fontSize:18,fontFamily:'Syne,sans-serif',fontWeight:800,color:'var(--text)',outline:'none',marginBottom:22}} />
          <button onClick={donate} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:10,background:'#0070ba',color:'#fff',border:'none',borderRadius:999,padding:'14px 32px',fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 16px rgba(0,112,186,0.32)'}}>
            <span style={{fontSize:18}}>💙</span> Donar con PayPal
          </button>
          <p style={{fontSize:11,color:'var(--text3)',marginTop:14,fontFamily:'DM Mono,monospace'}}>🔒 Pago seguro vía PayPal · EIN: 41-4788665 · 501(c)(3)</p>
        </div>
        <div>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>TU IMPACTO</div>
          <h3 style={{fontSize:22,marginBottom:16}} dangerouslySetInnerHTML={{__html:'¿Qué hace<br/><em style="color:var(--p);font-style:normal">tu donación?</em>'}} />
          <ul style={{listStyle:'none'}}>
            {[['25','Materiales de arte para un joven en SPARK durante un mes.'],['50','Una sesión completa de talleres de bienestar en ROOTED.'],['100','Capacitación de un maestro como facilitador THRIVE.'],['250','Una semana del programa LEAD Raíces y Caminos.']].map(([a,d]) => (
              <li key={a} style={{display:'flex',alignItems:'flex-start',gap:10,fontSize:14,color:'var(--text2)',padding:'10px 0',borderBottom:'1px solid var(--bg4)',lineHeight:1.5}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:'var(--p)',flexShrink:0,marginTop:5}} />
                <div><strong style={{color:'var(--text)'}}>${a}</strong> — {d}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}