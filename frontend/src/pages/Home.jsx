import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/articles`);
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Latest Articles</h1>

      {articles.length === 0 ? (
        <p className="text-gray-600">No articles yet. Be the first to create one!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;