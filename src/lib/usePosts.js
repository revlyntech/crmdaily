import { useEffect, useState } from 'react';
import { getPosts } from './wordpress';

// Drop-in hook — replaces wherever you imported { articles } from "../data/articles"
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