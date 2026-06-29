'use client';
const cls = { blue:"cat-news", purple:"cat-revops", green:"cat-tools", amber:"cat-gtm", red:"cat-guide" };
export default function CategoryBadge({ label, color="blue" }) {
  return <span className={`cat-badge ${cls[color]||"cat-default"}`}>{label}</span>;
}
