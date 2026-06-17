import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryBadge from "./CategoryBadge";

const images = {
  blue:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  purple: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  green:  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  amber:  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
  red:    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
};

export default function ArticleCard({ article, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: "easeOut" }}
      onClick={() => navigate(`/article/${article.id}`)}
      className="card-lift"
      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer", overflow: "hidden" }}>

      {/* Image */}
      <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
        <img src={images[article.color] || images.blue} alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.82)", transition: "transform 0.5s ease, filter 0.3s ease" }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.filter = "brightness(0.95)"; }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.filter = "brightness(0.82)"; }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.7)", padding: "3px 10px" }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#fff", letterSpacing: "0.1em" }}>{article.readTime.toUpperCase()}</span>
        </div>
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <CategoryBadge label={article.category} color={article.color} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "22px 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#9B958F", letterSpacing: "0.08em" }}>{article.date.toUpperCase()}</span>
          <span style={{ width: 1, height: 10, background: "rgba(0,0,0,0.1)" }} />
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#9B958F", letterSpacing: "0.08em" }}>CRMDAILY TEAM</span>
        </div>

        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: "#0F0E0D", lineHeight: 1.3, marginBottom: 12, transition: "color 0.2s" }}
          onMouseEnter={e => e.target.style.color = "#E8521A"}
          onMouseLeave={e => e.target.style.color = "#0F0E0D"}>
          {article.title}
        </h2>

        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "#6B6560", lineHeight: 1.75, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {article.excerpt}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 20, height: 20, background: "#E8521A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>CD</span>
            </div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#9B958F", letterSpacing: "0.06em" }}>CRM DAILY</span>
          </div>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#E8521A", fontWeight: 700, letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 4, transition: "gap 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.gap = "8px"}
            onMouseLeave={e => e.currentTarget.style.gap = "4px"}>
            READ →
          </span>
        </div>
      </div>
    </motion.article>
  );
}