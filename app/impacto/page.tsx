'use client';
export default function Impacto() {
  const metrics = [['2,400+','PERSONAS IMPACTADAS'],['4','PROGRAMAS ACTIVOS'],['12','COMUNIDADES']];
  const cards = [['320+','Jóvenes en SPARK'],['300 lbs','Vegetales en ROOTED'],['45+','Maestros en THRIVE'],['72+','Líderes en LEAD']];
  const testimonials = [
    { icon:'🎨', quote:'El programa SPARK me ayudó a encontrar mi voz a través del teatro. Por primera vez me sentí capaz de expresar lo que sentía sin miedo.', name:'Participante SPARK', place:'SOUTH LOS ÁNGELES, CA' },
    { icon:'⭐', quote:'LEAD me dio las herramientas para ser el líder que mi comunidad necesitaba. Las 12 semanas cambiaron completamente mi perspectiva.', name:'Graduado LEAD — Raíces y Caminos', place:'LOS ÁNGELES, CA' },
    { icon:'🌿', quote:'El huerto comunitario de ROOTED no solo nos dio vegetales frescos — nos dio comunidad, conexión con la tierra y orgullo por nuestro vecindario.', name:'Participante ROOTED', place:'WATTS, LOS ÁNGELES' },
    { icon:'🤝', quote:'THRIVE me dio herramientas prácticas para apoyar el bienestar emocional de mis estudiantes sin ser terapeuta. Es exactamente lo que necesitábamos.', name:'Maestra Capacitada — THRIVE', place:'ESCUELA PÚBLICA, LA' },
  ];
  return (
    <div>
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>NUESTRO IMPACTO / OUR IMPACT</span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16}} dangerouslySetInnerHTML={{__html:'Números que<br/><em style="color:var(--p);font-style:normal">importan.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>Cada número representa una persona, una familia, una comunidad transformada.</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',background:'var(--p)'}}>
        {metrics.map(([n,l]) => (
          <div key={l} style={{padding:'24px 20px',textAlign:'center',borderRight:'1px solid rgba(255,255,255,0.18)'}}>
            <div style={{fontFamily:'Syne,sans-serif',fontSize:34,fontWeight:800,color:'#fff',marginBottom:4}}>{n}</div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'rgba(255,255,255,0.7)',letterSpacing:'0.07em'}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px'}}>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>MÉTRICAS DE IMPACTO</div>
        <h2 style={{fontSize:28,marginBottom:28}} dangerouslySetInnerHTML={{__html:'Resultados<br/><em style="color:var(--p);font-style:normal">reales.</em>'}} />
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:56}}>
          {cards.map(([n,l]) => (
            <div key={l} style={{background:'var(--bg2)',borderRadius:24,padding:'28px 20px',textAlign:'center',border:'1px solid var(--bg4)'}}>
              <div style={{fontFamily:'Syne,sans-serif',fontSize:36,fontWeight:800,color:'var(--p)',marginBottom:6}}>{n}</div>
              <div style={{fontSize:13,color:'var(--text2)'}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>TESTIMONIOS</div>
        <h2 style={{fontSize:28,marginBottom:24}} dangerouslySetInnerHTML={{__html:'Voces de<br/><em style="color:var(--p);font-style:normal">nuestra comunidad.</em>'}} />
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20}}>
          {testimonials.map(t => (
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
