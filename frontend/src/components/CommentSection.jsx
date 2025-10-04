import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/comments/${articleId}`);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/comments`,
        { articleId, text: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments([data, ...comments]);
      setNewComment('');
    } catch (error) {
      alert('Error adding comment');
    }
    setLoading(false);
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await axios.delete(`${API_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (error) {
      alert('Error deleting comment');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comments ({comments.length})</h3>

      {token && (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">
                    {comment.userId?.username || 'Unknown User'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                {token && comment.userId?._id === localStorage.getItem('userId') && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-600 text-sm hover:text-red-800"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="mt-2 text-gray-700">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;