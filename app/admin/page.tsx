'use client';
import { useEffect } from 'react';

export default function Admin() {
  useEffect(() => {
    // Admin logic loaded from inline script below
  }, []);

  return (
    <div suppressHydrationWarning>
      <AdminContent />
    </div>
  );
}

function AdminContent() {
  return <AdminApp />;
}

// Full admin app as React component
function AdminApp() {
  const [mounted, setMounted] = [false, () => {}];
  
  // Redirect to the standalone admin HTML for full functionality
  if (typeof window !== 'undefined') {
    // The admin uses complex vanilla JS - serve via iframe for reliability
  }

  return <AdminUI />;
}

import { useState } from 'react';

const STORAGE_KEY = 'lxl_blog_posts';
const PASS_KEY    = 'lxl_admin_auth';
const CAT_EMOJI: Record<string,string> = {spark:'🎨',rooted:'🌿',thrive:'🤝',lead:'⭐',general:'📰'};

function AdminUI() {
  const [auth,    setAuth]    = useState(false);
  const [pass,    setPass]    = useState('');
  const [passErr, setPassErr] = useState(false);
  const [posts,   setPosts]   = useState<any[]>([]);
  const [tab,     setTab]     = useState<'new'|'list'>('new');
  const [title,   setTitle]   = useState('');
  const [desc,    setDesc]    = useState('');
  const [cat,     setCat]     = useState('spark');
  const [date,    setDate]    = useState(new Date().toISOString().slice(0,10));
  const [img,     setImg]     = useState('');
  const [imgPrev, setImgPrev] = useState('');
  const [saved,   setSaved]   = useState(false);
  const [editId,  setEditId]  = useState<number|null>(null);

  const checkAuth = () => {
    if (typeof window === 'undefined') return;
    const ok = sessionStorage.getItem(PASS_KEY) === '1';
    setAuth(ok);
    if (ok) loadPosts();
  };

  const loadPosts = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setPosts(stored);
  };

  const CORRECT_PASS = 'LifexLife2026';

  const doLogin = () => {
    if (pass === CORRECT_PASS) {
      sessionStorage.setItem(PASS_KEY, '1');
      setAuth(true); setPassErr(false); loadPosts();
    } else { setPassErr(true); }
  };

  const save = () => {
    if (!title.trim() || !desc.trim()) return;
    const post = { id: editId || Date.now(), title: title.trim(), desc: desc.trim(), cat, date, img };
    const updated = editId ? posts.map(p => p.id === editId ? post : p) : [post, ...posts];
    setPosts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(true); setTimeout(() => setSaved(false), 3000);
    setTitle(''); setDesc(''); setImg(''); setImgPrev(''); setEditId(null); setCat('spark');
    setDate(new Date().toISOString().slice(0,10));
  };

  const del = (id: number) => {
    if (!confirm('¿Eliminar esta noticia?')) return;
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated); localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const edit = (p: any) => {
    setEditId(p.id); setTitle(p.title); setDesc(p.desc||''); setCat(p.cat||'spark');
    setDate(p.date); setImg(p.img||''); setImgPrev(p.img||''); setTab('new');
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (file.size > 5*1024*1024) { alert('Imagen debe ser menor de 5MB'); return; }
    const r = new FileReader();
    r.onload = ev => { setImg(ev.target?.result as string); setImgPrev(ev.target?.result as string); };
    r.readAsDataURL(file);
  };

  // Check auth on mount
  if (typeof window !== 'undefined' && !auth) {
    const ok = sessionStorage.getItem(PASS_KEY) === '1';
    if (ok && !auth) { setAuth(true); loadPosts(); }
  }

  const inp: React.CSSProperties = {width:'100%',padding:'12px 16px',background:'var(--bg3)',border:'1.5px solid var(--bg4)',borderRadius:12,fontSize:14,color:'var(--text)',fontFamily:'inherit',outline:'none'};

  if (!auth) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)'}}>
      <div style={{background:'var(--bg2)',border:'1px solid var(--bg4)',borderRadius:24,padding:'48px 40px',width:'100%',maxWidth:380,boxShadow:'0 20px 56px rgba(0,0,0,0.10)',display:'flex',flexDirection:'column',alignItems:'center',gap:16,textAlign:'center'}}>
        <div style={{fontFamily:'var(--display,sans-serif)',fontSize:22,fontWeight:800,letterSpacing:'-0.03em'}}>Lifex<em style={{color:'var(--p)',fontStyle:'normal'}}>Life</em></div>
        <h2 style={{fontSize:20,margin:0}}>Panel de Admin</h2>
        <p style={{fontSize:13,color:'var(--text2)',margin:0}}>Acceso exclusivo para el equipo</p>
        <input type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&doLogin()} style={{...inp,textAlign:'center',fontSize:16}} />
        {passErr && <p style={{color:'#ef4444',fontSize:13,margin:0}}>Contraseña incorrecta</p>}
        <button onClick={doLogin} style={{width:'100%',background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'12px',fontSize:14,fontWeight:700,cursor:'pointer'}}>Entrar →</button>
        <p style={{fontSize:11,color:'var(--text3)',margin:0}}>La contraseña es: <code>LifexLife2026</code></p>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',padding:'40px'}}>
      <div style={{maxWidth:720,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
          <div>
            <h1 style={{fontSize:24,marginBottom:4}}>Panel de Blog</h1>
            <p style={{fontSize:13,color:'var(--text2)'}}>Publica y administra noticias de LifexLife</p>
          </div>
          <a href="/blog" style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--p)',border:'1px solid var(--p)',borderRadius:999,padding:'6px 16px'}}>← Ver blog</a>
        </div>

        <div style={{display:'flex',gap:8,marginBottom:28}}>
          {(['new','list'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); if(t==='list') loadPosts(); }} style={{padding:'9px 20px',borderRadius:999,border:'1.5px solid',borderColor:tab===t?'var(--p)':'var(--bg4)',background:tab===t?'var(--p)':'transparent',color:tab===t?'#fff':'var(--text2)',fontSize:13,fontWeight:600,cursor:'pointer'}}>
              {t==='new'?(editId?'✏️ Editar':'✏️ Nueva Noticia'):`📋 Mis Noticias (${posts.length})`}
            </button>
          ))}
        </div>

        {tab==='new' && (
          <div style={{background:'var(--bg2)',borderRadius:24,padding:36,border:'1px solid var(--bg4)'}}>
            <div style={{marginBottom:20}}>
              <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>TÍTULO *</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Escribe el título..." maxLength={120} style={inp} />
              <div style={{fontSize:11,color:'var(--text3)',fontFamily:'DM Mono,monospace',marginTop:4}}>{title.length}/120</div>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>CATEGORÍA *</label>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {[['spark','🎨 SPARK'],['rooted','🌿 ROOTED'],['thrive','🤝 THRIVE'],['lead','⭐ LEAD'],['general','📰 GENERAL']].map(([c,l]) => (
                  <button key={c} onClick={()=>setCat(c)} style={{borderRadius:999,padding:'6px 16px',fontFamily:'DM Mono,monospace',fontSize:10,border:'1.5px solid',borderColor:cat===c?'var(--p)':'var(--bg4)',background:cat===c?'var(--p)':'transparent',color:cat===c?'#fff':'var(--text2)',cursor:'pointer'}}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>IMAGEN DE PORTADA</label>
              <div onClick={()=>document.getElementById('imgInput')?.click()} style={{width:'100%',height:180,borderRadius:16,border:'2px dashed var(--bg4)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,cursor:'pointer',background:'var(--bg3)',overflow:'hidden',position:'relative'}}>
                {imgPrev ? <img src={imgPrev} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} /> : <><div style={{fontSize:32}}>📸</div><div style={{fontSize:13,color:'var(--text3)'}}>Haz clic para subir una foto</div><div style={{fontSize:11,color:'var(--text3)'}}>JPG, PNG, WebP — máx 5MB</div></>}
                <input id="imgInput" type="file" accept="image/*" onChange={handleImg} style={{display:'none'}} />
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>DESCRIPCIÓN *</label>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Resumen de 1-2 oraciones..." rows={3} maxLength={280} style={{...inp,resize:'vertical'}} />
              <div style={{fontSize:11,color:'var(--text3)',fontFamily:'DM Mono,monospace',marginTop:4}}>{desc.length}/280</div>
            </div>
            <div style={{marginBottom:28}}>
              <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:7,fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>FECHA</label>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={inp} />
            </div>
            <button onClick={save} style={{width:'100%',background:'var(--p)',color:'#fff',border:'none',borderRadius:999,padding:'14px',fontSize:15,fontWeight:700,cursor:'pointer'}}>
              {editId?'Guardar cambios →':'Publicar Noticia →'}
            </button>
            {saved && <div style={{background:'var(--p-l)',borderRadius:12,padding:'12px 16px',marginTop:14}}><p style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>✓ Noticia publicada. Aparece en el blog.</p></div>}
          </div>
        )}

        {tab==='list' && (
          posts.length===0 ? (
            <div style={{textAlign:'center',padding:'60px 20px',color:'var(--text3)'}}>
              <p style={{fontSize:15}}>No hay noticias publicadas aún.</p>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14}}>
              {posts.map((p:any) => (
                <div key={p.id} style={{background:'var(--bg2)',borderRadius:20,overflow:'hidden',border:'1px solid var(--bg4)'}}>
                  <div style={{height:120,display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,background:'var(--p-l)',position:'relative'}}>
                    {p.img ? <img src={p.img} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} /> : CAT_EMOJI[p.cat]||'📰'}
                  </div>
                  <div style={{padding:14}}>
                    <div style={{fontFamily:'DM Mono,monospace',fontSize:9,color:'var(--p)',letterSpacing:'0.1em',marginBottom:4}}>{p.cat?.toUpperCase()}</div>
                    <h4 style={{fontSize:14,marginBottom:4,lineHeight:1.3}}>{p.title}</h4>
                    <p style={{fontSize:11,color:'var(--text3)',fontFamily:'DM Mono,monospace',marginBottom:12}}>{p.date}</p>
                    <div style={{display:'flex',gap:8}}>
                      <button onClick={()=>edit(p)} style={{flex:1,background:'var(--p-l)',color:'var(--p)',border:'none',borderRadius:999,padding:'6px 12px',fontSize:11,fontWeight:700,cursor:'pointer'}}>✏️ Editar</button>
                      <button onClick={()=>del(p.id)} style={{background:'transparent',border:'1px solid rgba(239,68,68,0.3)',color:'#ef4444',borderRadius:999,padding:'5px 14px',fontSize:11,cursor:'pointer'}}>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
