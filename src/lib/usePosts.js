import { useEffect, useState } from 'react';
import { getPosts } from './wordpress';

// All posts
export function usePosts(count = 20) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts(count)
      .then(setArticles)
      .finally(() => setLoading(false));
  }, [count]);

  return { articles, loading };
}

// Filter by category names array
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

// Filter by URL search param ?category=HubSpot — used by News/Guides/Tools pages
export function usePostsFiltered(count = 50) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(window.location.search);
  const categoryFilter = params.get('category') || '';

  useEffect(() => {
    getPosts(count).then(all => {
      if (!categoryFilter) {
        setArticles(all);
      } else {
        setArticles(all.filter(a =>
          a.category.toLowerCase() === categoryFilter.toLowerCase() ||
          a.title.toLowerCase().includes(categoryFilter.toLowerCase())
        ));
      }
    }).finally(() => setLoading(false));
  }, [count, categoryFilter]);

  return { articles, loading, categoryFilter };
}