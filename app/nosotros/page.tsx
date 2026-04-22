'use client';
export default function Nosotros() {
  const team = [
    { icon:'👤', name:'Oscar Recinos', role:'FUNDADOR Y DIRECTOR EJECUTIVO', bio:'Visionario detrás de LifexLife Foundation, comprometido con transformar comunidades a través del arte, la naturaleza y el liderazgo.' },
    { icon:'👥', name:'Junta Directiva', role:'BOARD OF DIRECTORS', bio:'Líderes comunitarios comprometidos con la misión de LifexLife y la transparencia organizacional.' },
    { icon:'🙌', name:'Voluntarios Clave', role:'COMMUNITY VOLUNTEERS', bio:'Red de facilitadores, mentores y artistas comunitarios que hacen posible cada programa.' },
  ];
  const legal = [['Estatus Legal','501(c)(3) Nonprofit'],['EIN','41-4788665'],['Estado','California'],['Fundación','2023'],['Email','Info@lifexlife.org'],['Sede','Los Ángeles, CA']];
  return (
    <div>
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>NUESTRA HISTORIA / OUR STORY</span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16}} dangerouslySetInnerHTML={{__html:'Una vida vale<br/><em style="color:var(--p);font-style:normal">otra vida.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>Conoce a las personas detrás de LifexLife Foundation y por qué existimos.</p>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:36,marginBottom:56}}>
          <div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>MISIÓN Y VISIÓN</div>
            <h2 style={{fontSize:28,marginBottom:12}} dangerouslySetInnerHTML={{__html:'¿Por qué<br/><em style="color:var(--p);font-style:normal">existimos?</em>'}} />
            <p style={{fontSize:15,lineHeight:1.75,marginBottom:16,color:'var(--text2)'}}>LifexLife Foundation nació de una creencia simple y profunda: <strong style={{color:'var(--text)'}}>una vida puede transformar otra vida.</strong></p>
            <p style={{fontSize:15,lineHeight:1.75,color:'var(--text2)'}}>Trabajamos en Los Ángeles, CA, con jóvenes, familias y líderes comunitarios que merecen herramientas para florecer.</p>
          </div>
          <div style={{background:'var(--bg2)',borderRadius:32,padding:36,border:'1px solid var(--bg4)'}}>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:12}}>INFORMACIÓN LEGAL</div>
            {legal.map(([k,v]) => (
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--bg4)',fontSize:13}}>
                <span style={{color:'var(--text2)',fontWeight:600}}>{k}</span>
                <span style={{fontFamily:'DM Mono,monospace',color:'var(--p)'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>EL EQUIPO</div>
        <h2 style={{fontSize:28,marginBottom:24}} dangerouslySetInnerHTML={{__html:'Las personas<br/><em style="color:var(--p);font-style:normal">detrás del cambio.</em>'}} />
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:56}}>
          {team.map(m => (
            <div key={m.name} style={{background:'var(--bg2)',borderRadius:24,padding:'28px 24px',border:'1px solid var(--bg4)',textAlign:'center'}}>
              <div style={{width:72,height:72,borderRadius:'50%',background:'var(--p-l)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',fontSize:28}}>{m.icon}</div>
              <h4 style={{fontSize:16,marginBottom:4}}>{m.name}</h4>
              <p style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--p)',letterSpacing:'0.06em',marginBottom:8}}>{m.role}</p>
              <p style={{fontSize:12,color:'var(--text2)',lineHeight:1.6}}>{m.bio}</p>
            </div>
          ))}
        </div>
        <div id="transparencia">
          <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>ALIANZAS</div>
          <h2 style={{fontSize:28,marginBottom:20}} dangerouslySetInnerHTML={{__html:'Juntos somos<br/><em style="color:var(--p);font-style:normal">más fuertes.</em>'}} />
          <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
            {['Distrito Pacífico Sur','Goodstack','Google for Nonprofits','PayPal Giving Fund'].map(p => (
              <div key={p} style={{background:'var(--bg2)',border:'1.5px solid var(--bg4)',borderRadius:999,padding:'8px 20px',fontSize:13,fontWeight:600,color:'var(--text)'}}>{p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
