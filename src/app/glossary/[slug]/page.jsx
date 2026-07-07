'use client';
import { use } from 'react';
import Link from 'next/link';
import { getTerm, GLOSSARY_TERMS } from '../../../lib/glossary';


export default function TermPage({ params }) {
  const { slug } = use(params);
  const term = getTerm(slug);
  const related = (term?.related || []).map(s => GLOSSARY_TERMS.find(t => t.slug === s)).filter(Boolean);

  if (!term) return (
    <div style={{ minHeight:'100vh', background:'#FAFBFC', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:96, fontWeight:700, color:'rgba(232,93,58,0.2)' }}>404</div>
      <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:48, fontWeight:700, color:'#0F172A' }}>Term not found.</h1>
      <Link href="/glossary" style={{ marginTop:32, border:'2px solid #0F172A', padding:'12px 24px', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', color:'#0F172A', textDecoration:'none' }}>Back to Glossary</Link>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'#FAFBFC', color:'#0F172A', fontFamily:"'Inter',sans-serif" }}>
      <style>{`.hover-ember:hover{color:#E85D3A!important}`}</style>
      <div style={{ background:'#0F172A', color:'#FAFBFC' }}>
        <div style={{ maxWidth:900, margin:'0 auto', padding:'12px 32px', display:'flex', justifyContent:'space-between' }}>
          <Link href="/glossary" style={{ color:'#FAFBFC', textDecoration:'none', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>← Glossary</Link>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(250,251,252,0.5)', letterSpacing:'0.2em', textTransform:'uppercase' }}>CRM 101 · {term.category}</span>
        </div>
      </div>
      <article style={{ maxWidth:900, margin:'0 auto', padding:'64px 32px' }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:900, color:'#E85D3A', letterSpacing:'0.25em', textTransform:'uppercase' }}>// {term.category}</div>
        <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:80, fontWeight:700, lineHeight:1, margin:'12px 0', color:'#0F172A' }}>{term.term}</h1>
        {term.aliases && term.aliases.length > 0 && (
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:'rgba(15,23,42,0.5)' }}>Also known as {term.aliases.join(' · ')}</p>
        )}
        <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, fontWeight:500, lineHeight:1.5, borderLeft:'4px solid #E85D3A', paddingLeft:24, margin:'40px 0' }}>{term.short}</p>
        <section style={{ marginTop:48, borderTop:'2px solid #0F172A', paddingTop:32 }}>
          <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:16 }}>In depth</h2>
          <p style={{ fontSize:18, lineHeight:1.8, color:'rgba(15,23,42,0.8)' }}>{term.long}</p>
        </section>
        {term.formula && (
          <section style={{ marginTop:48, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:16 }}>Formula</h2>
            <div style={{ border:'2px solid #0F172A', padding:24 }}>
              <pre style={{ fontFamily:"'Space Mono',monospace", fontSize:16, fontWeight:700 }}>{term.formula.expression}</pre>
              {term.formula.note && <p style={{ fontSize:14, color:'rgba(15,23,42,0.65)', marginTop:12 }}>{term.formula.note}</p>}
            </div>
          </section>
        )}
        {term.whyItMatters && term.whyItMatters.length > 0 && (
          <section style={{ marginTop:48, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:16 }}>Why it matters</h2>
            {term.whyItMatters.map((p,i) => (
              <div key={i} style={{ display:'flex', gap:16, marginBottom:16, fontSize:17, lineHeight:1.7, color:'rgba(15,23,42,0.8)' }}>
                <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, fontWeight:700, color:'#E85D3A', flexShrink:0 }}>{String(i+1).padStart(2,'0')}</span>
                <span>{p}</span>
              </div>
            ))}
          </section>
        )}
        {term.pitfalls && term.pitfalls.length > 0 && (
          <section style={{ marginTop:48, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:16 }}>Common pitfalls</h2>
            {term.pitfalls.map(p => (
              <div key={p.title} style={{ borderLeft:'2px solid #E85D3A', paddingLeft:20, marginBottom:20 }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, marginBottom:4 }}>{p.title}</div>
                <div style={{ fontSize:15, color:'rgba(15,23,42,0.7)' }}>{p.detail}</div>
              </div>
            ))}
          </section>
        )}
        {term.faq && term.faq.length > 0 && (
          <section style={{ marginTop:48, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:16 }}>FAQ</h2>
            {term.faq.map(f => (
              <div key={f.q} style={{ borderTop:'1px solid #CBD5E1', paddingTop:16, marginBottom:20 }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, marginBottom:8 }}>{f.q}</div>
                <div style={{ fontSize:15, lineHeight:1.8, color:'rgba(15,23,42,0.75)' }}>{f.a}</div>
              </div>
            ))}
          </section>
        )}
        {related.length > 0 && (
          <section style={{ marginTop:48, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:16 }}>Related terms</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
              {related.map(r => (
                <Link key={r.slug} href={"/glossary/"+r.slug} style={{ borderTop:'1px solid #CBD5E1', paddingTop:12, textDecoration:'none', color:'#0F172A', display:'block' }}>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, fontWeight:700, marginBottom:4 }}>{r.term}</div>
                  <div style={{ fontSize:13, color:'rgba(15,23,42,0.65)' }}>{r.short}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
        <div style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
          <Link href="/glossary" style={{ display:'inline-block', border:'2px solid #0F172A', padding:'12px 24px', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', color:'#0F172A', textDecoration:'none' }}>
            ← Back to full A-Z
          </Link>
        </div>
      </article>
    </div>
  );
}