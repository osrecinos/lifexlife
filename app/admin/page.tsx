'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'lxl_blog_posts';
const catEmoji: Record<string,string> = {spark:'🎨',rooted:'🌿',thrive:'🤝',lead:'⭐',general:'📰'};

export default function Admin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [tab, setTab] = useState<'new'|'list'>('new');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState('spark');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [img, setImg] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [saved, setSaved] = useState(false);
  const [editId, setEditId] = useState<number|null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setPosts(stored);
  }, []);

  const save = () => {
    if (!title || !desc) return;
    const post = { id: editId || Date.now(), title, desc, cat, date, img };
    const updated = editId ? posts.map(p => p.id === editId ? post : p) : [post, ...posts];
    setPosts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setTitle(''); setDesc(''); setImg(''); setImgPreview(''); setEditId(null); setCat('spark');
    setDate(new Date().toISOString().slice(0,10));
  };

  const del = (id: number) => {
    if (!confirm('¿Eliminar esta noticia?')) return;
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const edit = (p: any) => {
    setEditId(p.id); setTitle(p.title); setDesc(p.desc||p.description||'');
    setCat(p.cat); setDate(p.date); setImg(p.img||''); setImgPreview(p.img||'');
    setTab('new');
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setImg(ev.target?.result as string); setImgPreview(ev.target?.result as string); };
    reader.readAsDataURL(file);
  };

  const inputStyle = {width:'100%',padding:'13px 18px',background:'var(--bg3)',border:'1.5px solid var(--bg4)',borderRadius:16,fontSize:14,color:'var(--text)',fontFamily:'DM Sans,sans-serif',outline:'none'};
  const labelStyle = {display:'block' as const,fontSize:12,fontWeight:600 as const,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'};

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',padding:'40px'}}>
      <div style={{maxWidth:720,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
          <div>
            <h1 style={{fontSize:24,marginBottom:4}}>Panel de Blog</h1>
            <p style={{fontSize:13,color:'var(--text2)'}}>Publica y administra las noticias de LifexLife</p>
          </div>
          <Link href="/blog" style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--p)',border:'1px solid var(--p)',borderRadius:999,padding:'6px 16px'}}>← Ver blog</Link>
        </div>

        <div style={{display:'flex',gap:8,marginBottom:28}}>
          {(['new','list'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{padding:'9px 20px',borderRadius:999,border:'1.5px solid',borderColor:tab===t?'var(--p)':'var(--bg4)',background:tab===t?'var(--p)':'transparent',color:tab===t?'#fff':'var(--text2)',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>
              {t==='new' ? (editId ? '✏️ Editar' : '✏️ Nueva Noticia') : `📋 Mis Noticias (${posts.length})`}
            </button>
          ))}
        </div>

        {tab === 'new' && (
          <div style={{background:'var(--bg2)',borderRadius:32,padding:36,border:'1px solid var(--bg4)',boxShadow:'0 8px 32px rgba(6,182,212,0.08)'}}>
            <div style={{marginBottom:20}}>
              <label style={labelStyle}>TÍTULO *</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Escribe el título de la noticia..." maxLength={120} style={inputStyle} />
              <div style={{fontSize:11,color:'var(--text3)',fontFamily:'DM Mono,monospace',marginTop:4}}>{title.length}/120</div>
            </div>

            <div style={{marginBottom:20}}>
              <label style={labelStyle}>CATEGORÍA *</label>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
                {[['spark','🎨 SPARK'],['rooted','🌿 ROOTED'],['thrive','🤝 THRIVE'],['lead','⭐ LEAD'],['general','📰 GENERAL']].map(([c,l]) => (
                  <button key={c} onClick={() => setCat(c)} style={{borderRadius:999,padding:'6px 16px',fontFamily:'DM Mono,monospace',fontSize:10,letterSpacing:'0.1em',border:'1.5px solid',borderColor:cat===c?'var(--p)':'var(--bg4)',background:cat===c?'var(--p)':'transparent',color:cat===c?'#fff':'var(--text2)',cursor:'pointer'}}>{l}</button>
                ))}
              </div>
            </div>

            <div style={{marginBottom:20}}>
              <label style={labelStyle}>IMAGEN DE PORTADA</label>
              <div onClick={() => document.getElementById('imgInput')?.click()} style={{width:'100%',height:180,borderRadius:16,border:'2px dashed var(--bg4)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,cursor:'pointer',background:'var(--bg3)',overflow:'hidden',position:'relative'}}>
                {imgPreview ? <img src={imgPreview} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} /> : <><div style={{fontSize:32}}>📸</div><div style={{fontSize:13,color:'var(--text3)'}}>Haz clic para subir una foto</div></>}
                <input id="imgInput" type="file" accept="image/*" onChange={handleImg} style={{display:'none'}} />
              </div>
            </div>

            <div style={{marginBottom:20}}>
              <label style={labelStyle}>DESCRIPCIÓN CORTA *</label>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Escribe un resumen de 1-2 oraciones..." rows={3} maxLength={280} style={{...inputStyle,resize:'vertical'}} />
              <div style={{fontSize:11,color:'var(--text3)',fontFamily:'DM Mono,monospace',marginTop:4}}>{desc.length}/280</div>
            </div>

            <div style={{marginBottom:28}}>
              <label style={labelStyle}>FECHA DE PUBLICACIÓN</label>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={inputStyle} />
            </div>

            <button onClick={save} style={{width:'100%',background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'14px 32px',fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 16px rgba(6,182,212,0.28)'}}>
              {editId ? 'Guardar cambios →' : 'Publicar Noticia →'}
            </button>

            {saved && <div style={{background:'var(--p-l)',borderRadius:14,padding:'12px 18px',marginTop:14}}><p style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>✓ Noticia publicada. Aparece en el blog.</p></div>}
          </div>
        )}

        {tab === 'list' && (
          <div>
            {posts.length === 0 ? (
              <div style={{textAlign:'center',padding:'60px 20px',color:'var(--text3)'}}>
                <p style={{fontSize:15}}>No tienes noticias publicadas aún.</p>
              </div>
            ) : (
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
                {posts.map(p => (
                  <div key={p.id} style={{background:'var(--bg2)',borderRadius:20,overflow:'hidden',border:'1px solid var(--bg4)'}}>
                    <div style={{height:120,display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,background:'var(--p-l)'}}>
                      {p.img ? <img src={p.img} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : catEmoji[p.cat]||'📰'}
                    </div>
                    <div style={{padding:'14px'}}>
                      <div style={{fontFamily:'DM Mono,monospace',fontSize:9,color:'var(--p)',letterSpacing:'0.1em',marginBottom:4}}>{p.cat?.toUpperCase()}</div>
                      <h4 style={{fontSize:14,marginBottom:4,lineHeight:1.3}}>{p.title}</h4>
                      <p style={{fontSize:11,color:'var(--text3)',fontFamily:'DM Mono,monospace',marginBottom:12}}>{p.date}</p>
                      <div style={{display:'flex',gap:8}}>
                        <button onClick={() => edit(p)} style={{flex:1,background:'var(--p-l)',color:'var(--p)',border:'none',borderRadius:999,padding:'6px 12px',fontSize:11,fontWeight:700,cursor:'pointer'}}>✏️ Editar</button>
                        <button onClick={() => del(p.id)} style={{background:'transparent',border:'1px solid rgba(204,42,42,0.3)',color:'#CC2A2A',borderRadius:999,padding:'5px 14px',fontSize:11,cursor:'pointer'}}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
