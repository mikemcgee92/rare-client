import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getCurrentUserId } from '../../utils/data/AuthManager';
import { createComment, getComments } from '../../utils/data/commentData';

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); // Fetch comments for the given postId
  useEffect(() => {
    getComments(postId)
      .then(setComments)
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  // Handle submitting a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    // Get the current user ID from authentication data
    const currentUserId = getCurrentUserId();

    if (!currentUserId) {
      console.error('User must be logged in to comment');
      return;
    }

    const commentData = {
      post_id: postId,
      author_id: currentUserId, // Use the actual authenticated user ID
      content: newComment,
    };

    try {
      const createdComment = await createComment(commentData);
      setComments((prev) => [...prev, createdComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Comment Input Bubble */}
      <form onSubmit={handleCommentSubmit} style={{ marginBottom: '1rem' }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={{
            width: '100%',
            height: '80px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>{' '}
      {/* Comments List */}
      <div>
        <h3>Comments</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {comments.map((comment) => (
            <li
              key={comment.id}
              style={{
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            >
              <p style={{ margin: 0, fontWeight: 'bold' }}>{comment.author ? `${comment.author.first_name} ${comment.author.last_name}` : 'Anonymous'}</p>
              <p style={{ margin: '5px 0' }}>{comment.content}</p>
              <small style={{ color: '#888' }}>{comment.created_on ? new Date(comment.created_on).toLocaleString() : 'Unknown date'}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
CommentSection.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CommentSection;
