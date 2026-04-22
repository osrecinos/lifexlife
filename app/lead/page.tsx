'use client';
import Link from 'next/link';

const data: Record<string, any> = {
  spark:  { color:'#0E7490', emoji:'🎨', title:'Creative Arts for Emotional Well-Being', desc:'Teatro, música, muralismo y escritura creativa para el bienestar emocional de jóvenes y familias en la comunidad.' },
  rooted: { color:'#0C4A58', emoji:'🌿', title:'Nature-Based Wellness', desc:'Caminatas, huertos comunitarios, eco-arte y mindfulness al aire libre para una vida más equilibrada.' },
  thrive: { color:'#0E6B82', emoji:'🤝', title:'Non-Clinical Mental Health', desc:'Apoyo mutuo, primeros auxilios emocionales y reducción del estigma en salud mental comunitaria.' },
  lead:   { color:'#155E75', emoji:'⭐', title:'Purpose-Driven Leadership', desc:'Raíces y Caminos — ciclos de 12 semanas de liderazgo bilingüe para jóvenes de 18 a 35 años.' },
};

export default function Page({ params }: any) {
  const slug = 'lead';
  const d = data[slug];
  return (
    <div>
      <div style={{position:'relative',minHeight:380,display:'flex',alignItems:'flex-end',padding:'0 56px 56px',overflow:'hidden',background:'linear-gradient(145deg,#020B14,#0C1F2E,'+d.color+')'}}>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(3,14,14,0.88) 0%,transparent 70%)'}} />
        <span style={{position:'absolute',right:60,top:'50%',transform:'translateY(-50%)',fontSize:200,opacity:0.08,userSelect:'none'}}>{d.emoji}</span>
        <div style={{position:'relative',zIndex:2,maxWidth:620}}>
          <span style={{display:'inline-block',background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',color:'#fff',marginBottom:16}}>{slug.toUpperCase()}</span>
          <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,54px)',color:'#fff',marginBottom:14,lineHeight:1.02}}>{d.title}.</h1>
          <p style={{fontSize:15,color:'rgba(255,255,255,0.78)',maxWidth:520,lineHeight:1.7,marginBottom:24}}>{d.desc}</p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <Link href="/donar"><button style={{background:'#fff',color:'#0E7490',border:'none',borderRadius:999,padding:'12px 26px',fontSize:14,fontWeight:700,cursor:'pointer'}}>Apoyar {slug.toUpperCase()}</button></Link>
            <Link href="/contacto"><button style={{background:'rgba(255,255,255,0.16)',border:'1px solid rgba(255,255,255,0.32)',color:'#fff',borderRadius:999,padding:'12px 26px',fontSize:14,fontWeight:600,cursor:'pointer'}}>Participar →</button></Link>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:36,alignItems:'start',marginBottom:56}}>
          <div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>QUÉ ES {slug.toUpperCase()}</div>
            <h2 style={{fontSize:28,marginBottom:12,lineHeight:1.05}}>Descripción<br/><em style={{color:'var(--p)',fontStyle:'normal'}}>del programa.</em></h2>
            <p style={{fontSize:15,lineHeight:1.75,marginBottom:16,color:'var(--text2)'}}>{d.desc}</p>
            <p style={{fontSize:14,lineHeight:1.75,color:'var(--text2)'}}>Este programa es parte integral de la misión de LifexLife Foundation de transformar comunidades desde adentro, con un enfoque culturalmente relevante y bilingüe.</p>
          </div>
          <div style={{background:'var(--bg2)',borderRadius:32,padding:36,border:'1px solid var(--bg4)'}}>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>PROGRAMAS Y ACTIVIDADES</div>
            <p style={{fontSize:14,lineHeight:1.7,color:'var(--text2)',marginBottom:20}}>Actividades estructuradas diseñadas para el bienestar integral, culturalmente relevantes y accesibles para toda la comunidad de Los Ángeles.</p>
            <Link href="/donar"><button style={{background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'10px 24px',fontSize:13,fontWeight:700,cursor:'pointer'}}>Apoyar este programa →</button></Link>
          </div>
        </div>
      </div>
      <div style={{margin:'0 32px 48px',background:'var(--bg2)',borderRadius:44,padding:'44px',border:'1px solid var(--bg4)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:-60,top:-60,width:200,height:200,borderRadius:'50%',background:'var(--p-l)',opacity:0.8}} />
        <div style={{fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.18em',color:'var(--p)',marginBottom:10}}>INVOLÚCRATE</div>
        <h2 style={{fontSize:'clamp(22px,3vw,32px)',marginBottom:8,lineHeight:1.1}}>Sé parte de<br/><em style={{color:'var(--p)',fontStyle:'normal'}}>{slug.toUpperCase()}.</em></h2>
        <p style={{fontSize:14,color:'var(--text2)',lineHeight:1.7,marginBottom:22,maxWidth:400}}>¿Quieres participar, ser voluntario o apoyar este programa? Escríbenos directamente.</p>
        <Link href="/contacto"><button style={{background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'12px 28px',fontSize:14,fontWeight:700,cursor:'pointer'}}>Contáctanos →</button></Link>
      </div>
    </div>
  );
}
