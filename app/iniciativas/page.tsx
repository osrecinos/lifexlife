'use client';
import Link from 'next/link';

const inits = [
  { slug:'spark', badge:'SPARK · 01', titleES:'Creative Arts for Emotional Well-Being', descES:'Teatro, música, muralismo y escritura creativa para el bienestar emocional de jóvenes y familias en la comunidad.' },
  { slug:'rooted', badge:'ROOTED · 02', titleES:'Nature-Based Wellness', descES:'Caminatas, huertos comunitarios, eco-arte y mindfulness al aire libre para una vida más equilibrada.' },
  { slug:'thrive', badge:'THRIVE · 03', titleES:'Non-Clinical Mental Health', descES:'Apoyo mutuo, primeros auxilios emocionales y reducción del estigma en salud mental comunitaria.' },
  { slug:'lead', badge:'LEAD · 04', titleES:'Purpose-Driven Leadership', descES:'Raíces y Caminos — ciclos de 12 semanas de liderazgo bilingüe para jóvenes de 18 a 35 años.' },
];

export default function Iniciativas() {
  return (
    <div>
      <div style={{padding:'80px 40px 60px',background:'var(--bg2)',textAlign:'center',borderBottom:'1px solid var(--bg4)'}}>
        <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'5px 18px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.12em',marginBottom:18}}>NUESTRAS INICIATIVAS / OUR INITIATIVES</span>
        <h1 style={{fontSize:'clamp(36px,5vw,60px)',marginBottom:16}} dangerouslySetInnerHTML={{__html:'Cuatro pilares,<br/><em style="color:var(--p);font-style:normal">una misión.</em>'}} />
        <p style={{fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.7,color:'var(--text2)'}}>Arte, naturaleza, salud mental y liderazgo — cuatro caminos hacia el mismo propósito.</p>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 40px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
          {inits.map(init => (
            <Link key={init.slug} href={'/'+init.slug} style={{background:'var(--bg2)',borderRadius:32,padding:'32px 28px',border:'1px solid var(--bg4)',display:'block',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',right:-24,bottom:-24,width:110,height:110,borderRadius:'50%',background:'var(--p)',opacity:0.06}} />
              <span style={{display:'inline-block',background:'var(--p-l)',color:'var(--p)',borderRadius:999,padding:'4px 14px',fontFamily:'DM Mono,monospace',fontSize:9,letterSpacing:'0.1em',fontWeight:500,marginBottom:14}}>{init.badge}</span>
              <h3 style={{fontSize:19,marginBottom:9,color:'var(--text)'}}>{init.titleES}</h3>
              <p style={{fontSize:13,lineHeight:1.65,color:'var(--text2)',marginBottom:18}}>{init.descES}</p>
              <span style={{fontSize:13,fontWeight:600,color:'var(--p)'}}>Explorar {init.badge.split(' ·')[0]} →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
