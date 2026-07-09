const fs = require('fs');

// Fix all three views
['src/views/News.jsx', 'src/views/Guides.jsx', 'src/views/Tools.jsx'].forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  
  // Replace the usePosts line to use a different variable name
  c = c.replace(
    /const \{ articles: fetched, loading[^}]*\} = usePosts\(prefetchedArticles \? 0 : 100\);/,
    "const { articles: fetched, loading: fetchLoading } = usePosts(prefetchedArticles ? 0 : 100);"
  );
  
  // Fix the all variable to prioritize prefetchedArticles
  c = c.replace(
    /const all = \(prefetchedArticles && prefetchedArticles\.length > 0\) \? prefetchedArticles : fetched;/,
    "const all = (prefetchedArticles != null && prefetchedArticles.length > 0) ? prefetchedArticles : fetched;"
  );
  
  // Fix isLoading
  c = c.replace(
    /const isLoading = \(prefetchedArticles && prefetchedArticles\.length > 0\) \? false : loading;/,
    "const isLoading = (prefetchedArticles != null && prefetchedArticles.length > 0) ? false : fetchLoading;"
  );
  
  // Also fix the fallback case where prefetchedArticles || fetched was used
  c = c.replace(
    /const all = prefetchedArticles \|\| fetched;/,
    "const all = (prefetchedArticles != null && prefetchedArticles.length > 0) ? prefetchedArticles : fetched;"
  );
  
  c = c.replace(
    /const isLoading = prefetchedArticles \? false : loading;/,
    "const isLoading = (prefetchedArticles != null && prefetchedArticles.length > 0) ? false : fetchLoading;"
  );

  fs.writeFileSync(f, c, 'utf8');
  
  // Verify
  const has = c.includes('prefetchedArticles != null');
  console.log(f, '- fixed:', has);
});