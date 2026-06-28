import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryBadge from "./CategoryBadge";

const fallbackImages = {
  blue:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  purple: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  green:  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  amber:  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
  red:    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
};

export default function ArticleCard({ article, index = 0 }) {
  const navigate = useNavigate();
  const image = article.featuredImage || fallbackImages[article.color] || fallbackImages.blue;

  return (
    <>
      <style>{`
        .article-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); cursor: pointer; overflow: hidden; }
        .article-card-img { height: 200px; overflow: hidden; position: relative; background: #E8E3DC; }
        .article-card-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.82); transition: transform 0.5s ease, filter 0.3s ease; }
        .article-card-img img:hover { transform: scale(1.05); filter: brightness(0.95); }
        .article-card-body { padding: 22px 24px 24px; }
        .article-card-title { font-family: 'DM Serif Display',serif; font-size: 22px; font-weight: 400; color: #0F0E0D; line-height: 1.3; margin-bottom: 12px; transition: color 0.2s; }
        @media (max-width: 640px) {
          .article-card { display: flex; flex-direction: row; align-items: stretch; }
          .article-card-img { width: 120px !important; height: auto !important; min-height: 120px; flex-shrink: 0; }
          .article-card-body { padding: 14px 16px !important; flex: 1; min-width: 0; }
          .article-card-title { font-size: 15px !important; margin-bottom: 6px !important; -webkit-line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }
          .article-card-excerpt { display: none !important; }
          .article-card-footer { padding-top: 10px !important; }
        }
      `}</style>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
        onClick={() => navigate(`/article/${article.slug}`)}
        className="card-lift article-card">

        <div className="article-card-img">
          <img src={image} alt={article.title} loading="lazy" decoding="async" />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />
          <div style={{ position:"absolute", bottom:12, right:12, background:"rgba(0,0,0,0.7)", padding:"3px 10px" }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#fff", letterSpacing:"0.1em" }}>{article.readTime.toUpperCase()}</span>
          </div>
          <div style={{ position:"absolute", top:12, left:12 }}>
            <CategoryBadge label={article.category} color={article.color} />
          </div>
        </div>

        <div className="article-card-body">
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#9B958F", letterSpacing:"0.08em" }}>{article.date.toUpperCase()}</span>
          </div>

          <h2 className="article-card-title">{article.title}</h2>

          <p className="article-card-excerpt" style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:"#6B6560", lineHeight:1.75, marginBottom:20, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
            {article.excerpt}
          </p>

          <div className="article-card-footer" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:16, borderTop:"1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:20, height:20, background:"#E8521A", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#fff", fontSize:9, fontWeight:700 }}>CD</span>
              </div>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#9B958F", letterSpacing:"0.06em" }}>CRM DAILY</span>
            </div>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#E8521A", fontWeight:700, letterSpacing:"0.1em" }}>READ →</span>
          </div>
        </div>
      </motion.article>
    </>
  );
}