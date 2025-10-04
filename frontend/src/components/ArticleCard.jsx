import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {article.title}
      </h2>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {article.content}
      </p>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <p>By {article.user?.username || 'Unknown'}</p>
          <p>{formatDate(article.createdAt)}</p>
        </div>

        <Link
          to={`/article/${article._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;