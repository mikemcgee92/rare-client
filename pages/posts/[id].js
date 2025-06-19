import Icon from '@/components/Icon';
import { deletePost, getSinglePost } from '@/utils/data/postData';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';

export default function ViewPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getSinglePost(id);
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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

  const handleEdit = () => {
    router.push(`/posts/edit/${post.id}`);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deletePost(post.id);
      router.push('/posts');
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
      setDeleting(false);
    }
  };

  const handleBackToPosts = () => {
    router.push('/posts');
  };

  if (loading) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading post...</p>
        </div>
      </Container>
    );
  }

  if (error && !post.id) {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Alert variant="danger">
              <Icon name="alert" size={20} className="me-2" />
              {error}
            </Alert>
            <Button onClick={handleBackToPosts} className="btn-primary-usa">
              <Icon name="posts" size={20} className="me-2" />
              Back to Posts
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="view-post-page">
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <Button variant="outline-secondary" onClick={handleBackToPosts} className="mb-3">
              <Icon name="trending" size={16} className="me-2" />
              Back to Posts
            </Button>
          </Col>
        </Row>

        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger">
                <Icon name="alert" size={20} className="me-2" />
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="post-detail-card shadow">
              {/* Post Header */}
              <Card.Header className="post-header bg-transparent border-0 p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <Badge bg="primary" className="mb-2">
                      <Icon name="categories" size={14} className="me-1" />
                      {post.category?.label || 'Uncategorized'}
                    </Badge>
                    <h1 className="post-title mb-2">{post.title}</h1>
                  </div>
                </div>

                <div className="post-meta d-flex flex-wrap gap-3 text-muted">
                  <div className="d-flex align-items-center">
                    <Icon name="profile" size={16} className="me-1" />
                    <small>By {post.rare_user?.first_name && post.rare_user?.last_name ? `${post.rare_user.first_name} ${post.rare_user.last_name}` : 'Anonymous'}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <Icon name="recent" size={16} className="me-1" />
                    <small>Published on {formatDate(post.publication_date)}</small>
                  </div>
                </div>
              </Card.Header>{' '}
              {/* Post Image */}
              {post.image_url && (
                <div className="post-image-container">
                  <Image src={post.image_url} alt={`Cover image for ${post.title}`} width={800} height={400} className="post-detail-image" style={{ objectFit: 'cover', width: '100%', height: 'auto' }} unoptimized />
                </div>
              )}
              {/* Post Content */}
              <Card.Body className="p-4">
                <div className="post-content">
                  {' '}
                  {post.content ? (
                    post.content.split('\n').map((paragraph) => (
                      <p key={`para-${paragraph.slice(0, 50).replace(/[^a-zA-Z0-9]/g, '')}-${paragraph.length}`} className="mb-3">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-muted">No content available</p>
                  )}
                </div>
              </Card.Body>
              {/* Post Actions */}
              <Card.Footer className="bg-transparent border-0 p-4">
                <div className="d-flex gap-3">
                  <Button variant="primary" onClick={handleEdit} disabled={deleting}>
                    <Icon name="write" size={16} className="me-2" />
                    Edit Post
                  </Button>
                  <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)} disabled={deleting}>
                    <Icon name="alert" size={16} className="me-2" />
                    Delete Post
                  </Button>
                </div>
              </Card.Footer>
            </Card>

            {/* TODO: Comments section can be added here */}
            <Card className="mt-4 shadow-sm">
              <Card.Body className="text-center py-5">
                <Icon name="connect" size={48} color="var(--usa-gray)" className="mb-3" />
                <h5 className="text-muted">Comments Coming Soon</h5>
                <p className="text-muted">We&apos;re working on adding a comments section to enable discussions around posts.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Icon name="alert" size={20} className="me-2" />
              Delete Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this post?</p>
            <p className="text-muted">
              <strong>&quot;{post.title}&quot;</strong>
            </p>
            <p className="text-danger">
              <small>This action cannot be undone.</small>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Icon name="alert" size={16} className="me-2" />
                  Delete Post
                </>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}
