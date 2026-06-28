import { useEffect, useState } from 'react';
import { getPosts } from '../lib/wordpress';
import ArticleCard from '../components/ArticleCard';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts(20)
      .then(setPosts)
      .catch(() => setError('Failed to load articles.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="blog-loading">Loading articles...</div>;
  if (error) return <div className="blog-error">{error}</div>;

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Latest CRM News</h1>
        <p>Daily insights, comparisons, and updates from the CRM world.</p>
      </div>
      <div className="blog-grid">
        {posts.length === 0 ? (
          <p>No articles yet. Check back soon!</p>
        ) : (
          posts.map(post => <ArticleCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}