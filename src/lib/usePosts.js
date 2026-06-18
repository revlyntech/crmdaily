import { useEffect, useState } from 'react';
import { getPosts } from './wordpress';
import { articles as staticArticles } from '../data/articles';

// ─── Main hook — shows static articles INSTANTLY
// then swaps to WordPress data when it arrives
export function usePosts(count = 20) {
  // Start with static articles so UI renders immediately
  const [articles, setArticles] = useState(staticArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts(count)
      .then(posts => {
        if (posts.length > 0) setArticles(posts);
      })
      .finally(() => setLoading(false));
  }, [count]);

  return { articles, loading };
}

// ─── Category filter hook
export function usePostsByCategory(categories = [], count = 50) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts(count).then(all => {
      if (!categories.length) {
        setArticles(all);
      } else {
        const lower = categories.map(c => c.toLowerCase());
        setArticles(all.filter(a => lower.includes(a.category.toLowerCase())));
      }
    }).finally(() => setLoading(false));
  }, [count]);

  return { articles, loading };
}

// ─── URL-based filter hook — reads ?category= from URL
export function usePostsFiltered(count = 100) {
  const [articles, setArticles] = useState(staticArticles);
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(window.location.search);
  const categoryFilter = params.get('category') || '';

  useEffect(() => {
    getPosts(count).then(all => {
      if (!categoryFilter) {
        setArticles(all.length > 0 ? all : staticArticles);
      } else {
        const filtered = all.filter(a =>
          a.category.toLowerCase() === categoryFilter.toLowerCase() ||
          a.title.toLowerCase().includes(categoryFilter.toLowerCase())
        );
        setArticles(filtered);
      }
    }).finally(() => setLoading(false));
  }, [count, categoryFilter]);

  return { articles, loading, categoryFilter };
}