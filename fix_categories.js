const fs = require('fs');
let c = fs.readFileSync('src/app/glossary/page.jsx', 'utf8');

const oldPanel = c.slice(c.indexOf('{/* Right - Categories redesigned */}'), c.indexOf('{/* Sticky toolbar */}'));

const newPanel = `{/* Right - Categories */}
          <div style={{ border:'2px solid #0F172A', padding:32 }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:'#E85D3A', letterSpacing:'0.25em', textTransform:'uppercase' }}>// Sections</div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize:24, fontWeight:700, margin:'8px 0 24px' }}>Six beats, one book.</h2>
            {GLOSSARY_CATEGORIES.map(c=>(
              <button key={c} onClick={()=>setCat(cat===c?'All':c)}
                style={{ display:'flex', width:'100%', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid '+(cat===c?'#E85D3A':'rgba(15,23,42,0.1)'), background:'none', cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderBottomColor='#E85D3A'; e.currentTarget.style.paddingLeft='8px';}}
                onMouseLeave={e=>{e.currentTarget.style.borderBottomColor=cat===c?'#E85D3A':'rgba(15,23,42,0.1)'; e.currentTarget.style.paddingLeft='0';}}>
                <span style={{ display:'flex', gap:12, alignItems:'baseline' }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:cat===c?'#E85D3A':'rgba(15,23,42,0.4)', fontWeight:700 }}>{CATEGORY_META[c].code}</span>
                  <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontWeight:700, color:cat===c?'#E85D3A':'#0F172A' }}>{c}</span>
                  <span style={{ fontSize:12, color:'rgba(15,23,42,0.5)' }}>{CATEGORY_META[c].hint}</span>
                </span>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, fontWeight:700, color:cat===c?'#E85D3A':'rgba(15,23,42,0.5)' }}>{String(categoryCounts[c]).padStart(3,'0')}</span>
              </button>
            ))}
          </div>

      `;

c = c.replace(oldPanel, newPanel);
fs.writeFileSync('src/app/glossary/page.jsx', c, 'utf8');
console.log('Done! Old panel length:', oldPanel.length);
console.log('Has Six beats:', c.includes('Six beats'));