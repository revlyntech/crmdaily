const fs = require('fs');
const path = require('path');

const slugPagePath = path.join('src', 'app', 'glossary', '[slug]', 'page.jsx');

const content = `'use client';
import Link from 'next/link';
import { getTerm, GLOSSARY_TERMS } from '../../../lib/glossary';
import { useParams } from 'next/navigation';

export default function TermPage() {
  const { slug } = useParams();
  const term = getTerm(slug);
  const related = (term?.related || []).map(s => GLOSSARY_TERMS.find(t => t.slug === s)).filter(Boolean);

  if (!term) return (
    <div style={{ minHeight:'100vh', background:'#FAFBFC', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:"'Inter',sans-serif" }}>
      <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:96, fontWeight:700, color:'rgba(232,93,58,0.2)' }}>404</div>
      <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:48, fontWeight:700, color:'#0F172A' }}>Term not found.</h1>
      <Link href="/glossary" style={{ marginTop:32, border:'2px solid #0F172A', padding:'12px 24px', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#0F172A', textDecoration:'none' }}>Back to Glossary</Link>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'#FAFBFC', color:'#0F172A', fontFamily:"'Inter',sans-serif" }}>
      <style>{\`
        .hover-ember:hover { color: #E85D3A !important; }
        .related-card:hover { border-color: #E85D3A !important; }
      \`}</style>

      <div style={{ background:'#0F172A', color:'#FAFBFC', borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', padding:'12px 32px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Link href="/glossary" style={{ color:'#FAFBFC', textDecoration:'none', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>← Glossary</Link>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'rgba(250,251,252,0.5)', letterSpacing:'0.2em', textTransform:'uppercase' }}>CRM 101 · {term.category}</span>
        </div>
      </div>

      <article style={{ maxWidth:900, margin:'0 auto', padding:'64px 32px' }}>
        <nav style={{ display:'flex', alignItems:'center', gap:8, fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(15,23,42,0.5)', marginBottom:32 }}>
          <Link href="/" className="hover-ember" style={{ color:'rgba(15,23,42,0.5)', textDecoration:'none' }}>CRM Daily</Link>
          <span>/</span>
          <Link href="/glossary" className="hover-ember" style={{ color:'rgba(15,23,42,0.5)', textDecoration:'none' }}>Glossary</Link>
          <span>/</span>
          <span style={{ color:'#0F172A' }}>{term.term}</span>
        </nav>

        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:900, color:'#E85D3A', letterSpacing:'0.25em', textTransform:'uppercase' }}>// {term.category}</div>

        <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:80, fontWeight:700, lineHeight:1, letterSpacing:'-0.02em', margin:'12px 0', color:'#0F172A' }}>{term.term}</h1>

        {term.aliases && term.aliases.length > 0 && (
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:'rgba(15,23,42,0.5)', marginBottom:8 }}>
            <span style={{ fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em' }}>Also known as </span>
            {term.aliases.join(' · ')}
          </p>
        )}

        {(term.pronunciation || term.firstUsed || term.updated) && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, borderTop:'1px solid #CBD5E1', borderBottom:'1px solid #CBD5E1', padding:'16px 0', margin:'24px 0', fontFamily:"'Space Mono',monospace", fontSize:11 }}>
            {term.pronunciation && <div><div style={{ color:'rgba(15,23,42,0.4)', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:4 }}>Pronunciation</div><div>{term.pronunciation}</div></div>}
            {term.firstUsed && <div><div style={{ color:'rgba(15,23,42,0.4)', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:4 }}>First used</div><div style={{ fontWeight:700 }}>{term.firstUsed}</div></div>}
            {term.updated && <div><div style={{ color:'rgba(15,23,42,0.4)', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:4 }}>Updated</div><div style={{ fontWeight:700 }}>{term.updated}</div></div>}
          </div>
        )}

        <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, fontWeight:500, lineHeight:1.5, borderLeft:'4px solid #E85D3A', paddingLeft:24, margin:'40px 0', color:'#0F172A' }}>{term.short}</p>

        <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
          <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:16 }}>In depth</h2>
          <p style={{ fontSize:18, lineHeight:1.8, color:'rgba(15,23,42,0.8)' }}>{term.long}</p>
        </section>

        {term.notToBeConfusedWith && term.notToBeConfusedWith.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Not to be confused with</h2>
            {term.notToBeConfusedWith.map(c => (
              <div key={c.term} style={{ borderLeft:'2px solid #E85D3A', paddingLeft:20, marginBottom:20 }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, fontWeight:700, marginBottom:4 }}>
                  {c.slug ? <Link href={"/glossary/"+c.slug} className="hover-ember" style={{ color:'#0F172A', textDecoration:'none' }}>{c.term}</Link> : c.term}
                </div>
                <div style={{ fontSize:15, color:'rgba(15,23,42,0.7)' }}>{c.note}</div>
              </div>
            ))}
          </section>
        )}

        {term.formula && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Formula</h2>
            <div style={{ border:'2px solid #0F172A', padding:24 }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, fontWeight:900, color:'#E85D3A', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12 }}>{term.formula.label}</div>
              <pre style={{ fontFamily:"'Space Mono',monospace", fontSize:16, fontWeight:700, color:'#0F172A', overflowX:'auto', margin:'0 0 16px' }}>{term.formula.expression}</pre>
              {term.formula.note && <p style={{ fontSize:14, color:'rgba(15,23,42,0.65)' }}>{term.formula.note}</p>}
            </div>
            {term.inputs && term.inputs.length > 0 && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginTop:24 }}>
                {term.inputs.map(inp => (
                  <div key={inp.name} style={{ borderTop:'1px solid #CBD5E1', paddingTop:12 }}>
                    <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, marginBottom:4 }}>{inp.name}</div>
                    <div style={{ fontSize:14, color:'rgba(15,23,42,0.65)' }}>{inp.description}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {term.worked && term.worked.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Worked example</h2>
            {term.worked.map(w => (
              <div key={w.title} style={{ border:'1px solid #CBD5E1', padding:24, marginBottom:16 }}>
                <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, fontWeight:700, marginBottom:16 }}>{w.title}</h3>
                <table style={{ width:'100%', fontSize:14, borderCollapse:'collapse' }}>
                  <tbody>
                    {w.steps.map(s => (
                      <tr key={s.label} style={{ borderTop:'1px solid #E8ECF1' }}>
                        <th style={{ padding:'8px 16px 8px 0', textAlign:'left', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', color:'rgba(15,23,42,0.5)' }}>{s.label}</th>
                        <td style={{ padding:'8px 0', fontFamily:"'Space Mono',monospace", color:'rgba(15,23,42,0.8)' }}>{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ marginTop:16, paddingTop:16, borderTop:'2px solid #0F172A', fontFamily:"'DM Serif Display',serif", fontSize:16, fontWeight:500 }}>{w.result}</p>
              </div>
            ))}
          </section>
        )}

        {term.whyItMatters && term.whyItMatters.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Why it matters</h2>
            {term.whyItMatters.map((p, i) => (
              <div key={i} style={{ display:'flex', gap:16, marginBottom:20, fontSize:17, lineHeight:1.7, color:'rgba(15,23,42,0.8)' }}>
                <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, fontWeight:700, color:'#E85D3A', flexShrink:0 }}>{String(i+1).padStart(2,'0')}</span>
                <span>{p}</span>
              </div>
            ))}
          </section>
        )}

        {term.howToUse && term.howToUse.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>How to use it</h2>
            {term.howToUse.map(h => (
              <div key={h.step} style={{ borderTop:'1px solid #CBD5E1', paddingTop:16, marginBottom:20 }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, marginBottom:6 }}>{h.step}</div>
                <div style={{ fontSize:15, color:'rgba(15,23,42,0.7)', lineHeight:1.7 }}>{h.detail}</div>
              </div>
            ))}
          </section>
        )}

        {term.benchmarks && term.benchmarks.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Benchmarks</h2>
            <table style={{ width:'100%', fontSize:14, borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ borderBottom:'2px solid #0F172A', textAlign:'left', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(15,23,42,0.5)' }}>
                  <th style={{ padding:'8px 16px 8px 0' }}>Segment</th>
                  <th style={{ padding:'8px 16px 8px 0' }}>Target</th>
                  <th style={{ padding:'8px 0' }}>Note</th>
                </tr>
              </thead>
              <tbody>
                {term.benchmarks.map(b => (
                  <tr key={b.segment} style={{ borderBottom:'1px solid #E8ECF1', verticalAlign:'top' }}>
                    <td style={{ padding:'12px 16px 12px 0', fontFamily:"'DM Serif Display',serif", fontWeight:700 }}>{b.segment}</td>
                    <td style={{ padding:'12px 16px 12px 0', fontFamily:"'Space Mono',monospace", fontSize:13 }}>{b.value}</td>
                    <td style={{ padding:'12px 0', color:'rgba(15,23,42,0.6)', fontSize:13 }}>{b.note||''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {term.pitfalls && term.pitfalls.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Common pitfalls</h2>
            {term.pitfalls.map(p => (
              <div key={p.title} style={{ borderLeft:'2px solid #E85D3A', paddingLeft:20, marginBottom:20 }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, marginBottom:4 }}>{p.title}</div>
                <div style={{ fontSize:15, color:'rgba(15,23,42,0.7)', lineHeight:1.7 }}>{p.detail}</div>
              </div>
            ))}
          </section>
        )}

        {term.tooling && term.tooling.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Tooling</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
              {term.tooling.map(t => (
                <div key={t.name} style={{ borderTop:'1px solid #CBD5E1', paddingTop:12 }}>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, marginBottom:4 }}>{t.name}</div>
                  <div style={{ fontSize:14, color:'rgba(15,23,42,0.65)' }}>{t.note}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {term.faq && term.faq.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>FAQ</h2>
            {term.faq.map(f => (
              <div key={f.q} style={{ borderTop:'1px solid #CBD5E1', paddingTop:16, marginBottom:24 }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, marginBottom:8 }}>{f.q}</div>
                <div style={{ fontSize:15, lineHeight:1.8, color:'rgba(15,23,42,0.75)' }}>{f.a}</div>
              </div>
            ))}
          </section>
        )}

        {term.furtherReading && term.furtherReading.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Further reading</h2>
            {term.furtherReading.map(r => (
              <div key={r.title} style={{ borderTop:'1px solid #CBD5E1', paddingTop:12, marginBottom:16 }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, marginBottom:4 }}>
                  {r.url ? <a href={r.url} target="_blank" rel="noreferrer" className="hover-ember" style={{ color:'#0F172A', textDecoration:'none' }}>{r.title}</a> : r.title}
                </div>
                <div style={{ fontSize:14, color:'rgba(15,23,42,0.65)' }}>{r.source}</div>
              </div>
            ))}
          </section>
        )}

        {related.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Related terms</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
              {related.map(r => (
                <Link key={r.slug} href={"/glossary/"+r.slug} className="related-card"
                  style={{ borderTop:'1px solid #CBD5E1', paddingTop:12, textDecoration:'none', color:'#0F172A', display:'block' }}>
                  <div className="hover-ember" style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, fontWeight:700, marginBottom:4 }}>{r.term}</div>
                  <div style={{ fontSize:13, color:'rgba(15,23,42,0.65)', lineHeight:1.6 }}>{r.short}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {term.seenIn && term.seenIn.length > 0 && (
          <section style={{ marginTop:64, borderTop:'2px solid #0F172A', paddingTop:32 }}>
            <h2 style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em', color:'rgba(15,23,42,0.5)', marginBottom:24 }}>Seen in the desk</h2>
            {term.seenIn.map(s => (
              <div key={s.title} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:24, borderBottom:'1px solid #E8ECF1', paddingBottom:12, marginBottom:12 }}>
                <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, fontWeight:500 }}>{s.title}</span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(15,23,42,0.5)', whiteSpace:'nowrap' }}>{s.date}</span>
              </div>
            ))}
          </section>
        )}

        <div style={{ marginTop:80, borderTop:'2px solid #0F172A', paddingTop:32 }}>
          <Link href="/glossary" style={{ display:'inline-block', border:'2px solid #0F172A', padding:'12px 24px', fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#0F172A', textDecoration:'none' }}>
            ← Back to full A-Z
          </Link>
        </div>
      </article>
    </div>
  );
}
`;

fs.writeFileSync(slugPagePath, content, 'utf8');
console.log('Done! Slug page written:', slugPagePath);
console.log('Size:', content.length, 'chars');