const fs = require('fs');

const content = `'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from '../../lib/glossary';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const CATEGORY_META = {
  Sales:     { code: '01', hint: 'Deal motion & methodology', color: '#E85D3A' },
  RevOps:    { code: '02', hint: 'Systems, pipeline, forecast', color: '#0F172A' },
  GTM:       { code: '03', hint: 'Motion, fit, category', color: '#E85D3A' },
  Metrics:   { code: '04', hint: 'Numbers the board sees', color: '#0F172A' },
  AI:        { code: '05', hint: 'Agents, copilots, RAG', color: '#E85D3A' },
  Marketing: { code: '06', hint: 'Demand, brand, content', color: '#0F172A' },
};

export default function GlossaryPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GLOSSARY_TERMS
      .filter(t => cat === 'All' ? true : t.category === cat)
      .filter(t => {
        if (!needle) return true;
        return t.term.toLowerCase().includes(needle) ||
          t.short.toLowerCase().includes(needle) ||
          (t.aliases || []).some(a => a.toLowerCase().includes(needle));
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [q, cat]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const t of filtered) {
      const letter = t.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter).push(t);
    }
    return map;
  }, [filtered]);

  const availableLetters = new Set(grouped.keys());
  const categoryCounts = useMemo(() => {
    const m = { All: GLOSSARY_TERMS.length };
    for (const c of GLOSSARY_CATEGORIES) m[c] = GLOSSARY_TERMS.filter(t => t.category === c).length;
    return m;
  }, []);

  let idx = 0;

  return (
    <div style={{ minHeight:'100vh', background:'#FAFBFC', color:'#0F172A', fontFamily:"'Inter',sans-serif" }}>
      <style>{\`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .gmarquee { display:inline-flex; animation:marquee 40s linear infinite; }
        .gterm-card { transition:transform 0.2s,box-shadow 0.2s; border:2px solid #0F172A; background:#FAFBFC; padding:20px; display:block; text-decoration:none; color:#0F172A; }
        .gterm-card:hover { transform:translateY(-2px); box-shadow:4px 4px 0 0 #E85D3A; }
        .gletter:hover { background:#E85D3A; color:#fff; }
        .gcat-btn { transition: all 0.15s; }
        .gcat-btn:hover { border-color:#E85D3A !important; }
        @media (max-width: 768px) {
          .ghero-grid { grid-template-columns: 1fr !important; }
          .gstats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .gterms-grid { grid-template-columns: 1fr !important; }
          .gcta-grid { grid-template-columns: 1fr !important; }
          .ghero-title { font-size: 64px !important; }
          .gletter-nav { display: none !important; }
          .gtoolbar-inner { flex-direction: column !important; align-items: stretch !important; }
          .gletter-heading { font-size: 72px !important; }
        }
        @media (max-width: 480px) {
          .ghero-title { font-size: 48px !important; }
          .ghero-pad { padding: 40px 16px !important; }
          .gtoolbar-pad { padding: 12px 16px !important; }
          .gterms-pad { padding: 32px 16px !important; }
          .gcta-pad { padding: 48px 16px !important; }
        }
      \`}</style>

      {/* Top bar - just back link, no subtitle */}
      <div style={{ background:'#0F172A', color:'#FAFBFC' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', padding:'12px 24px', display:'flex', alignItems:'center' }}>
          <Link href="/" style={{ color:'#FAFBFC', textDecoration:'none', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>← CRM Daily</Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{ borderBottom:'2px solid #0F172A' }}>
        <div className="ghero-grid ghero-pad" style={{ maxWidth:1400, margin:'0 auto', padding:'64px 24px', display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:40, alignItems:'start' }}>
          {/* Left */}
          <div>
            <h1 className="ghero-title" style={{ fontFamily:"'DM Serif Display',serif", fontSize:96, fontWeight:700, lineHeight:0.95, color:'#0F172A', margin:'0 0 16px' }}>
              The<br/>Glossary<span style={{ color:'#E85D3A' }}>.</span>
            </h1>
            <p style={{ fontSize:17, lineHeight:1.7, color:'rgba(15,23,42,0.7)', maxWidth:480, marginBottom:32 }}>
              <strong>{GLOSSARY_TERMS.length} terms</strong> every CRM, RevOps and GTM operator should know. Written by the desk, updated weekly.
            </p>
            <div className="gstats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, borderTop:'2px solid #0F172A', borderBottom:'2px solid #0F172A', padding:'20px 0' }}>
              {[{l:'Terms',v:String(GLOSSARY_TERMS.length)},{l:'Categories',v:'6'},{l:'Letters',v:availableLetters.size+'/26'},{l:'Updated',v:'Jul 2026'}].map(s=>(
                <div key={s.l}>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:'rgba(15,23,42,0.5)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:4 }}>{s.l}</div>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, fontWeight:700 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Categories redesigned */}
          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(15,23,42,0.5)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>Browse by category</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {GLOSSARY_CATEGORIES.map(c => {
                const active = cat === c;
                const cm = CATEGORY_META[c];
                return (
                  <button key={c} className="gcat-btn" onClick={() => setCat(active ? 'All' : c)}
                    style={{ border:'2px solid', borderColor: active ? '#E85D3A' : '#E8ECF1', background: active ? '#E85D3A' : '#fff', padding:'14px 16px', textAlign:'left', cursor:'pointer', borderRadius:0 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, fontWeight:700, color: active ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.4)', letterSpacing:'0.2em', textTransform:'uppercase' }}>{cm.code}</span>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, color: active ? '#fff' : 'rgba(15,23,42,0.5)' }}>{String(categoryCounts[c]).padStart(3,'0')}</span>
                    </div>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, color: active ? '#fff' : '#0F172A', marginBottom:4 }}>{c}</div>
                    <div style={{ fontSize:11, color: active ? 'rgba(255,255,255,0.8)' : 'rgba(15,23,42,0.5)', lineHeight:1.4 }}>{cm.hint}</div>
                  </button>
                );
              })}
            </div>
            {cat !== 'All' && (
              <button onClick={() => setCat('All')} style={{ marginTop:10, width:'100%', border:'1px solid #CBD5E1', background:'none', padding:'8px', fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(15,23,42,0.5)', cursor:'pointer' }}>
                Clear filter ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sticky toolbar */}
      <div style={{ position:'sticky', top:0, zIndex:30, borderBottom:'2px solid #0F172A', background:'rgba(250,251,252,0.97)' }}>
        <div className="gtoolbar-pad" style={{ maxWidth:1400, margin:'0 auto', padding:'16px 24px' }}>
          <div style={{ display:'flex', gap:10 }}>
            <div style={{ position:'relative', flex:1 }}>
              <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontFamily:"'Space Mono',monospace", fontSize:12, color:'#E85D3A', fontWeight:700 }}>&gt;_</span>
              <input type="search" value={q} onChange={e=>setQ(e.target.value)}
                placeholder={"Search "+GLOSSARY_TERMS.length+" terms..."}
                style={{ width:'100%', border:'2px solid #0F172A', background:'#FAFBFC', padding:'12px 100px 12px 40px', fontFamily:"'DM Serif Display',serif", fontSize:16, outline:'none', boxSizing:'border-box' }}/>
              <span style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', fontFamily:"'Space Mono',monospace", fontSize:10, color:'rgba(15,23,42,0.5)', fontWeight:700 }}>
                {String(filtered.length).padStart(3,'0')}/{String(GLOSSARY_TERMS.length).padStart(3,'0')}
              </span>
            </div>
            {(q||cat!=='All')&&(
              <button onClick={()=>{setQ('');setCat('All');}} style={{ border:'2px solid #0F172A', background:'#0F172A', color:'#FAFBFC', padding:'10px 14px', fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, textTransform:'uppercase', cursor:'pointer', whiteSpace:'nowrap' }}>Clear ×</button>
            )}
          </div>
          <div className="gtoolbar-inner" style={{ marginTop:12, display:'flex', flexWrap:'wrap', alignItems:'center', gap:6, justifyContent:'space-between' }}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {['All',...GLOSSARY_CATEGORIES].map(c=>(
                <button key={c} onClick={()=>setCat(c)}
                  style={{ border:'2px solid', borderColor:cat===c?'#E85D3A':'#CBD5E1', background:cat===c?'#E85D3A':'#FAFBFC', color:cat===c?'#fff':'rgba(15,23,42,0.7)', padding:'5px 10px', fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, textTransform:'uppercase', cursor:'pointer', display:'inline-flex', gap:5 }}>
                  {c} <span style={{ opacity:0.7 }}>{categoryCounts[c]||GLOSSARY_TERMS.length}</span>
                </button>
              ))}
            </div>
            <nav className="gletter-nav" style={{ display:'flex', flexWrap:'wrap', gap:1 }}>
              {LETTERS.map(L=>{
                const has=availableLetters.has(L);
                return(
                  <a key={L} href={has?"#letter-"+L:undefined} className={has?'gletter':''}
                    style={{ width:24, padding:'3px 0', textAlign:'center', fontFamily:"'DM Serif Display',serif", fontSize:13, fontWeight:700, color:has?'#0F172A':'rgba(15,23,42,0.2)', cursor:has?'pointer':'default', textDecoration:'none', display:'inline-block' }}>
                    {L}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="gterms-pad" style={{ maxWidth:1400, margin:'0 auto', padding:'48px 24px' }}>
        {filtered.length===0&&(
          <div style={{ textAlign:'center', padding:'64px 0' }}>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:80, fontWeight:700, color:'rgba(232,93,58,0.15)' }}>404</div>
            <p style={{ fontSize:17, color:'rgba(15,23,42,0.6)', marginTop:12 }}>No terms match "{q}"</p>
            <button onClick={()=>{setQ('');setCat('All');}} style={{ marginTop:20, border:'2px solid #0F172A', background:'none', padding:'10px 24px', fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, textTransform:'uppercase', cursor:'pointer' }}>Reset</button>
          </div>
        )}
        {[...grouped.entries()].map(([letter,terms])=>(
          <div key={letter} id={"letter-"+letter} style={{ marginBottom:64, scrollMarginTop:130 }}>
            <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', alignItems:'end', gap:16, borderBottom:'2px solid #0F172A', paddingBottom:12, marginBottom:24 }}>
              <span className="gletter-heading" style={{ fontFamily:"'DM Serif Display',serif", fontSize:96, fontWeight:700, lineHeight:0.85, color:'#0F172A' }}>{letter}</span>
              <div style={{ textAlign:'right', paddingBottom:8 }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, color:'rgba(15,23,42,0.5)', textTransform:'uppercase', letterSpacing:'0.15em' }}>
                  {String(terms.length).padStart(2,'0')} {terms.length===1?'term':'terms'}
                </span>
                <div style={{ marginTop:4, height:3, width:64, background:'#E85D3A', marginLeft:'auto' }}/>
              </div>
            </div>
            <div className="gterms-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
              {terms.map(t=>{
                idx+=1;
                const cm=CATEGORY_META[t.category];
                return(
                  <Link key={t.slug} href={"/glossary/"+t.slug} className="gterm-card">
                    <div style={{ display:'flex', justifyContent:'space-between', gap:8, marginBottom:10 }}>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, fontWeight:700, color:'rgba(15,23,42,0.4)' }}>No {String(idx).padStart(3,'0')}</span>
                      <span style={{ border:'1px solid #E8ECF1', padding:'2px 7px', fontFamily:"'Space Mono',monospace", fontSize:9, fontWeight:700, textTransform:'uppercase', color:'rgba(15,23,42,0.5)' }}>{cm.code} {t.category}</span>
                    </div>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, fontWeight:700, marginBottom:4, lineHeight:1.2 }}>{t.term}</div>
                    {t.aliases&&t.aliases.length>0&&(
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(15,23,42,0.4)', marginBottom:6 }}>
                        aka {t.aliases.slice(0,2).join(' · ')}
                      </div>
                    )}
                    <div style={{ fontSize:13, lineHeight:1.6, color:'rgba(15,23,42,0.65)', display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{t.short}</div>
                    <div style={{ marginTop:14, paddingTop:10, borderTop:'1px solid #E8ECF1', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(15,23,42,0.4)' }}>Read definition</span>
                      <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:'rgba(15,23,42,0.4)' }}>→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ borderTop:'2px solid #0F172A', background:'#0F172A', color:'#FAFBFC' }}>
        <div className="gcta-grid gcta-pad" style={{ maxWidth:1400, margin:'0 auto', padding:'64px 24px', display:'grid', gridTemplateColumns:'2fr 1fr', gap:32, alignItems:'end' }}>
          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:900, color:'#E85D3A', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:12 }}>Suggest a term</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:48, fontWeight:700, margin:'0 0 12px', lineHeight:1.1 }}>Missing a term<span style={{ color:'#E85D3A' }}>?</span></h2>
            <p style={{ fontSize:16, color:'rgba(250,251,252,0.7)', maxWidth:480, lineHeight:1.7, margin:0 }}>
              If it's in a deal review, a board deck or an AE Slack thread and it's not here yet, the desk wants to know.
            </p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <a href="mailto:hello@crmdaily.co?subject=Glossary%20suggestion"
              style={{ display:'flex', justifyContent:'space-between', alignItems:'center', border:'2px solid #FAFBFC', background:'#E85D3A', padding:'14px 20px', fontFamily:"'Space Mono',monospace", fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#fff', textDecoration:'none' }}>
              Email the desk <span>→</span>
            </a>
            <Link href="/"
              style={{ display:'flex', justifyContent:'space-between', alignItems:'center', border:'2px solid rgba(250,251,252,0.2)', padding:'14px 20px', fontFamily:"'Space Mono',monospace", fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(250,251,252,0.6)', textDecoration:'none' }}>
              ← Back to CRM Daily
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/app/glossary/page.jsx', content, 'utf8');
console.log('Done! Lines:', content.split('\n').length);
console.log('Has mobile CSS:', content.includes('@media'));
console.log('Has category grid:', content.includes('gcat-btn'));