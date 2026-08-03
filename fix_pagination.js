const fs = require('fs');

// ── 1. Fix Home.jsx - add pagination ──
let home = fs.readFileSync('src/views/Home.jsx', 'utf8');

// Add useState for pagination
home = home.replace(
  "import { usePosts } from \"../lib/usePosts\";",
  "import { usePosts } from \"../lib/usePosts\";\nimport { useState as usePageState } from \"react\";"
);

// Add page state after existing state
home = home.replace(
  "const { articles: fetched, loading } = usePosts(prefetchedArticles ? 0 : 20);",
  "const { articles: fetched, loading } = usePosts(20);\n  const [currentPage, setCurrentPage] = usePageState(1);\n  const ARTICLES_PER_PAGE = 12;"
);

// Fix gridArticles to use pagination
home = home.replace(
  "const gridArticles = articles && featured ? articles.filter(a => a.id !== featured.id) : [];",
  `const allGridArticles = articles && featured ? articles.filter(a => a.id !== featured.id) : [];
  const totalPages = Math.ceil(allGridArticles.length / ARTICLES_PER_PAGE);
  const gridArticles = allGridArticles.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);`
);

// Add pagination UI after the articles grid
home = home.replace(
  "gridArticles.map((a,i) => <ArticleCard key={a.id} article={a} index={i} />)",
  "gridArticles.map((a,i) => <ArticleCard key={a.id} article={a} index={i} />)"
);

// Find the closing of articles grid and add pagination after it
home = home.replace(
  "</div>\n        </div>\n        <div className=\"home-convictions",
  `</div>
          {totalPages > 1 && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:40, flexWrap:"wrap" }}>
              <button
                onClick={() => { setCurrentPage(p => Math.max(1,p-1)); window.scrollTo({top:0,behavior:"smooth"}); }}
                disabled={currentPage === 1}
                style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.1em", padding:"8px 14px", border:"1px solid rgba(0,0,0,0.15)", background:"transparent", color:"#64748B", cursor:currentPage===1?"not-allowed":"pointer", opacity:currentPage===1?0.4:1 }}>
                ← PREV
              </button>
              {Array.from({length:totalPages},(_,i)=>i+1).map(p => (
                <button key={p}
                  onClick={() => { setCurrentPage(p); window.scrollTo({top:0,behavior:"smooth"}); }}
                  style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.1em", padding:"8px 14px", border:"1px solid rgba(0,0,0,0.15)", background:currentPage===p?"#0F172A":"transparent", color:currentPage===p?"#FAFBFC":"#64748B", cursor:"pointer" }}>
                  {p}
                </button>
              ))}
              <button
                onClick={() => { setCurrentPage(p => Math.min(totalPages,p+1)); window.scrollTo({top:0,behavior:"smooth"}); }}
                disabled={currentPage === totalPages}
                style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.1em", padding:"8px 14px", border:"1px solid rgba(0,0,0,0.15)", background:"transparent", color:"#64748B", cursor:currentPage===totalPages?"not-allowed":"pointer", opacity:currentPage===totalPages?0.4:1 }}>
                NEXT →
              </button>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#94A3B8", letterSpacing:"0.08em", marginLeft:8 }}>
                PAGE {currentPage} OF {totalPages} · {allGridArticles.length} ARTICLES
              </span>
            </div>
          )}
        </div>
        <div className="home-convictions`
);

fs.writeFileSync('src/views/Home.jsx', home, 'utf8');
console.log('1. Home.jsx - pagination added');

// ── 2. Fix Sidebar - get real total count from WordPress ──
let sidebar = fs.readFileSync('src/components/Sidebar.jsx', 'utf8');

// Change usePosts(100) to usePosts(1000) to get all articles for accurate count
sidebar = sidebar.replace(
  'const { articles, loading } = usePosts(100);',
  'const { articles, loading } = usePosts(1000);'
);

// Fix stats display
sidebar = sidebar.replace(
  '{ label:"ARTICLES PUBLISHED", value:String(totalArticles || articles.length || 0), sub:"Live from CRM Daily"},',
  '{ label:"ARTICLES PUBLISHED", value:totalArticles > 0 ? totalArticles+"+" : "...", sub:"Live from CRM Daily"},'
);

sidebar = sidebar.replace(
  '{ label:"TOOLS REVIEWED",     value:String(toolsCount || 0),    sub:"Tool reviews & comparisons" },',
  '{ label:"TOOLS REVIEWED",     value:toolsCount > 0 ? String(toolsCount) : "...", sub:"Tool reviews & comparisons" },'
);

fs.writeFileSync('src/components/Sidebar.jsx', sidebar, 'utf8');
console.log('2. Sidebar - usePosts(1000) for accurate stats');

console.log('\nDone! Push to GitHub.');