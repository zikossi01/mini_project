import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/CommentSection';

const API_URL = import.meta.env.VITE_API_URL;

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null); 
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/articles/${id}`);
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      await axios.delete(`${API_URL}/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/');
    } catch (error) {
      alert('Error deleting article');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Article not found</p>
      </div>
    );
  }

  const isAuthor = currentUserId === article.user?._id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold text-gray-800">{article.title}</h1>
          {isAuthor && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>

        <div className="text-sm text-gray-500 mb-6">
          <p>By {article.user?.username || 'Unknown'}</p>
          <p>{formatDate(article.createdAt)}</p>
        </div>

        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {article.content}
        </div>
      </div>

      <CommentSection articleId={id} />
    </div>
  );
}

export default ArticleDetail;