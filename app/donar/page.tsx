'use client';
import { useState, useEffect } from 'react';

type Lang = 'es'|'en';
const AMOUNTS = [25, 50, 100, 250];
const PAYPAL_FEE = (amt: number) => Math.round((amt * 1.0299 + 0.49) * 100) / 100;

export default function Donar() {
  const [lang, setLang]       = useState<Lang>('es');
  const [selected, setSelected] = useState(50);
  const [custom, setCustom]   = useState('');
  const [coverFee, setCoverFee] = useState(false);

  useEffect(() => {
    const upd = () => { const s=localStorage.getItem('lxl-lang'); if(s) setLang(s as Lang); };
    upd();
    window.addEventListener('langchange', upd);
    window.addEventListener('storage', upd);
    return () => { window.removeEventListener('langchange', upd); window.removeEventListener('storage', upd); };
  }, []);

  const EN = lang === 'en';
  const baseAmt = custom ? parseFloat(custom) || 0 : selected;
  const finalAmt = coverFee ? PAYPAL_FEE(baseAmt) : baseAmt;

  const donate = () => {
    if (finalAmt < 1) return;
    const form = document.createElement('form');
    form.action = 'https://www.paypal.com/donate';
    form.method = 'post';
    form.target = '_blank';
    const fields: Record<string,string> = {
      business: 'info@lifexlife.org',
      item_name: EN ? 'Donation to LifexLife Foundation' : 'Donación a LifexLife Foundation',
      currency_code: 'USD',
      amount: finalAmt.toFixed(2),
    };
    Object.entries(fields).forEach(([n,v]) => {
      const i = document.createElement('input'); i.type='hidden'; i.name=n; i.value=v; form.appendChild(i);
    });
    document.body.appendChild(form); form.submit(); document.body.removeChild(form);
  };

  const inp: React.CSSProperties = {width:'100%',padding:'14px 20px',background:'var(--bg3)',border:'1.5px solid var(--bg4)',borderRadius:16,fontSize:18,fontFamily:'inherit',fontWeight:800,color:'var(--text)',outline:'none'};

  const impacts: [number,string,string][] = [
    [25, 'Materiales de arte para un joven en SPARK durante un mes.','Art supplies for one youth in SPARK for a full month.'],
    [50, 'Una sesión completa de talleres de bienestar en ROOTED.','One complete wellness workshop session in ROOTED.'],
    [100,'Capacitación de un maestro como facilitador THRIVE.','Training one teacher as a THRIVE wellness facilitator.'],
    [250,'Una semana del programa LEAD Raíces y Caminos.','One week of the LEAD Roots & Pathways program.'],
  ];

  return (
    <div>
      {/* HERO */}
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>
          {EN ? 'DONATE' : 'DONAR'}
        </span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16,fontFamily:'var(--display,sans-serif)'}}
          dangerouslySetInnerHTML={{__html: EN
            ? 'Your support<br/><em style="color:var(--p);font-style:normal">transforms lives.</em>'
            : 'Tu apoyo<br/><em style="color:var(--p);font-style:normal">transforma vidas.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>
          {EN ? 'Every donation is tax-deductible and goes directly to our programs. EIN: 41-4788665 · 501(c)(3)'
               : 'Cada donación es deducible de impuestos y va directamente a nuestros programas. EIN: 41-4788665 · 501(c)(3)'}
        </p>
      </div>

      {/* MAIN GRID */}
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px',display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:40}}>

        {/* DONATION FORM */}
        <div style={{background:'var(--bg2)',borderRadius:44,padding:'44px',border:'1px solid var(--bg4)',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',right:-60,top:-60,width:200,height:200,borderRadius:'50%',background:'var(--p-l)',opacity:0.7}} />
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>
            {EN ? 'DONATE NOW' : 'DONAR AHORA'}
          </div>
          <h2 style={{fontSize:28,marginBottom:8,fontFamily:'var(--display,sans-serif)'}}
            dangerouslySetInnerHTML={{__html: EN
              ? 'Choose your<br/><em style="color:var(--p);font-style:normal">impact.</em>'
              : 'Elige tu<br/><em style="color:var(--p);font-style:normal">impacto.</em>'}} />
          <p style={{fontSize:14,color:'var(--text2)',marginBottom:22}}>
            {EN ? 'Select an amount or enter your own. All donations are tax-deductible.'
                : 'Selecciona un monto o escribe el tuyo. Todas las donaciones son deducibles de impuestos.'}
          </p>

          {/* AMOUNT BUTTONS — fixed: no slash before $ */}
          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:16}}>
            {AMOUNTS.map(a => (
              <button key={a}
                onClick={() => { setSelected(a); setCustom(''); }}
                style={{padding:'11px 22px',borderRadius:999,border:'2px solid',
                  borderColor: !custom && selected===a ? 'var(--p)' : 'var(--bg4)',
                  background:  !custom && selected===a ? 'var(--p)' : 'transparent',
                  fontSize:16, fontWeight:700, cursor:'pointer',
                  color: !custom && selected===a ? '#fff' : 'var(--text)'}}>
                ${a}
              </button>
            ))}
          </div>

          {/* CUSTOM AMOUNT */}
          <div style={{position:'relative',marginBottom:16}}>
            <span style={{position:'absolute',left:20,top:'50%',transform:'translateY(-50%)',fontSize:18,fontWeight:800,color:'var(--text2)'}}>$</span>
            <input type="number" min="1" value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(0); }}
              placeholder={EN ? 'Custom amount' : 'Monto personalizado'}
              style={{...inp, paddingLeft:42}} />
          </div>

          {/* COVER PAYPAL FEES */}
          <label style={{display:'flex',alignItems:'flex-start',gap:12,background:'var(--bg3)',borderRadius:14,padding:'14px 16px',cursor:'pointer',marginBottom:20,border:`1.5px solid ${coverFee?'var(--p)':'var(--bg4)'}`}}>
            <input type="checkbox" checked={coverFee} onChange={e => setCoverFee(e.target.checked)}
              style={{width:18,height:18,marginTop:2,accentColor:'var(--p)',flexShrink:0,cursor:'pointer'}} />
            <div>
              <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:2}}>
                {EN ? 'Cover PayPal processing fees' : 'Cubrir las comisiones de PayPal'}
              </div>
              <div style={{fontSize:12,color:'var(--text2)',lineHeight:1.5}}>
                {EN
                  ? `Add $${(PAYPAL_FEE(baseAmt) - baseAmt).toFixed(2)} so 100% of $${baseAmt.toFixed(2)} reaches LifexLife.`
                  : `Agrega $${(PAYPAL_FEE(baseAmt) - baseAmt).toFixed(2)} para que el 100% de $${baseAmt.toFixed(2)} llegue a LifexLife.`}
              </div>
            </div>
          </label>

          {/* TOTAL */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',marginBottom:20,borderTop:'1px solid var(--bg4)',borderBottom:'1px solid var(--bg4)'}}>
            <span style={{fontSize:14,fontWeight:600,color:'var(--text2)'}}>{EN ? 'Total to charge:' : 'Total a cobrar:'}</span>
            <span style={{fontSize:22,fontWeight:800,color:'var(--p)',fontFamily:'var(--display,sans-serif)'}}>${finalAmt.toFixed(2)}</span>
          </div>

          {/* PAYPAL BUTTON */}
          <button onClick={donate}
            style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:10,
              background:'#0070ba',color:'#fff',border:'none',borderRadius:999,
              padding:'14px 32px',fontSize:15,fontWeight:700,cursor:'pointer',
              boxShadow:'0 4px 16px rgba(0,112,186,0.32)'}}>
            <span style={{fontSize:18}}>💙</span>
            {EN ? 'Donate with PayPal' : 'Donar con PayPal'}
          </button>
          <p style={{fontSize:11,color:'var(--text3)',marginTop:14,fontFamily:'DM Mono,monospace',textAlign:'center'}}>
            🔒 {EN ? 'Secure payment via PayPal · EIN: 41-4788665 · 501(c)(3)' : 'Pago seguro vía PayPal · EIN: 41-4788665 · 501(c)(3)'}
          </p>
        </div>

        {/* IMPACT SIDE */}
        <div>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>
            {EN ? 'YOUR IMPACT' : 'TU IMPACTO'}
          </div>
          <h3 style={{fontSize:22,marginBottom:16,fontFamily:'var(--display,sans-serif)'}}
            dangerouslySetInnerHTML={{__html: EN
              ? '¿Qué hace<br/><em style="color:var(--p);font-style:normal">tu donación?</em>'
              : '¿Qué hace<br/><em style="color:var(--p);font-style:normal">tu donación?</em>'}} />
          <ul style={{listStyle:'none'}}>
            {impacts.map(([a, descES, descEN]) => (
              <li key={a} style={{display:'flex',alignItems:'flex-start',gap:10,fontSize:14,color:'var(--text2)',padding:'12px 0',borderBottom:'1px solid var(--bg4)',lineHeight:1.5}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:'var(--p)',flexShrink:0,marginTop:5}} />
                <div><strong style={{color:'var(--text)'}}>${a}</strong> — {EN ? descEN : descES}</div>
              </li>
            ))}
          </ul>

          {/* OTHER WAYS */}
          <div style={{marginTop:32}}>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:14}}>
              {EN ? 'OTHER WAYS TO HELP' : 'OTRAS FORMAS DE AYUDAR'}
            </div>
            {[[EN?'Volunteering':'Voluntariado',EN?'Join as a facilitator or mentor':'Únete como facilitador o mentor','🤝'],
              [EN?'Corporate Partnerships':'Alianzas Corporativas',EN?'Grants and sponsorships':'Grants y patrocinios','🤲'],
              [EN?'Spread the mission':'Difundir la misión',EN?'Share on social media':'Comparte en redes sociales','📢']].map(([title,sub,icon]) => (
              <div key={title} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'12px 0',borderBottom:'1px solid var(--bg4)'}}>
                <span style={{fontSize:18,flexShrink:0}}>{icon}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:2}}>{title}</div>
                  <div style={{fontSize:12,color:'var(--text2)'}}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
