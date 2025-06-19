import CommentSection from '@/components/comments/commentSection';
import Icon from '@/components/Icon';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function PostCard({ title, publicationDate, imageUrl, content, author, category, postId }) {
  // Format the publication date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Truncate content for preview
  const truncateContent = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <Card className="post-card h-100 shadow-sm">
      {imageUrl && (
        <div className="post-image-container">
          <Card.Img variant="top" src={imageUrl} alt={`Cover image for ${title}`} className="post-image" />
        </div>
      )}

      <Card.Body className="d-flex flex-column">
        <div className="post-meta mb-2">
          <small className="text-muted d-flex align-items-center">
            <Icon name="categories" size={14} className="me-1" />
            {category}
            {author && (
              <>
                <span className="mx-2">•</span>
                <Icon name="profile" size={14} className="me-1" />
                {author}
              </>
            )}
          </small>
        </div>

        <Card.Title className="post-title mb-3">{title}</Card.Title>

        <Card.Text className="post-content flex-grow-1">{truncateContent(content)}</Card.Text>

        <div className="post-footer mt-auto">
          <small className="text-muted d-flex align-items-center">
            <Icon name="recent" size={14} className="me-1" />
            Published on {formatDate(publicationDate)}
          </small>
        </div>
      </Card.Body>

      {/* Add CommentSection at the bottom */}
      <CommentSection postId={postId} />
    </Card>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  publicationDate: PropTypes.string,
  imageUrl: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  postId: PropTypes.number.isRequired,
};

PostCard.defaultProps = {
  publicationDate: '',
  imageUrl: '',
  content: '',
  author: 'Anonymous',
  category: 'Uncategorized',
};

export default PostCard;
