import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

function PostCard({
  title,
  publicationDate,
  imageUrl,
  content,
}) {
  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Img src={imageUrl} />
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Posted on {publicationDate}</Card.Footer>
    </Card>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PostCard;
