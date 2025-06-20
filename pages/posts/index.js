import Icon from '@/components/Icon';
import { getPosts } from '@/utils/data/postData';
import { getCurrentUserId } from '@/utils/data/AuthManager';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap';

function PostsHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const categoryId = router.query.category; // Get category ID from query params
        const data = await getPosts(categoryId ? { categoryId } : {}); // Pass categoryId if available
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts. Please try again.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [router.query.category]); // Re-fetch posts when category changes

  const handleCreatePost = () => {
    router.push('/posts/new');
  };

  const handleEditPost = (postId) => {
    router.push(`/posts/edit/${postId}`);
  };

  const handleViewPost = (postId) => {
    router.push(`/posts/${postId}`);
  };

  if (loading) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading posts...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="posts-page">
      <div className="posts-header mb-5">
        <Container>
          <Row className="align-items-center">
            <Col>
              <h1 className="page-title">
                <Icon name="posts" size={32} className="me-3" color="var(--usa-blue)" />
                All Posts
              </h1>
              <p className="page-subtitle">Discover stories and articles from our community of writers</p>
            </Col>
            <Col xs="auto">
              <Button className="btn-primary-usa" onClick={handleCreatePost} size="lg">
                <Icon name="write" size={20} className="me-2" />
                Create New Post
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {error && (
          <Alert variant="danger" className="mb-4">
            <Icon name="alert" size={20} className="me-2" />
            {error}
          </Alert>
        )}

        {posts.length === 0 ? (
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <div className="empty-state">
                <Icon name="posts" size={64} color="var(--usa-gray)" className="mb-3" />
                <h3>No posts yet</h3>
                <p className="text-muted mb-4">Be the first to share your story with the community!</p>
                <Button className="btn-primary-usa" onClick={handleCreatePost}>
                  <Icon name="write" size={20} className="me-2" />
                  Create Your First Post
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            {posts.map((post) => (
              <Col key={`post--${post.id}`} lg={4} md={6} className="mb-4">
                <div className="post-wrapper">
                  <div
                    className="post-card"
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '1rem',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {' '}
                    {post.image_url && (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        width={400}
                        height={200}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          marginBottom: '1rem',
                        }}
                        unoptimized
                      />
                    )}
                    <h5 style={{ marginBottom: '0.5rem' }}>{post.title}</h5>{' '}
                    <p
                      style={{
                        color: '#666',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      By {post.rare_user_id?.first_name && post.rare_user_id?.last_name ? `${post.rare_user_id.first_name} ${post.rare_user_id.last_name}` : 'Anonymous'}
                      {post.category_id?.label && ` • ${post.category_id.label}`}
                    </p>
                    <p
                      style={{
                        color: '#888',
                        fontSize: '0.8rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {post.publication_date && new Date(post.publication_date).toLocaleDateString()}
                    </p>
                    <p
                      style={{
                        flex: 1,
                        marginBottom: '1rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {post.content}
                    </p>
                  </div>
                  <div className="post-actions mt-3 d-flex gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => handleViewPost(post.id)} className="flex-fill">
                      <Icon name="trending" size={16} className="me-1" />
                      View
                    </Button>
                    {console.warn('current user id:', getCurrentUserId(), ' post.rare_user_id:', post.rare_user_id.id)}
                    {getCurrentUserId() === post.rare_user_id.id ? (
                      <Button variant="outline-secondary" size="sm" onClick={() => handleEditPost(post.id)} className="flex-fill">
                        <Icon name="write" size={16} className="me-1" />
                        Edit
                      </Button>
                    ) : ''}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {posts.length > 0 && (
          <Row className="mt-5">
            <Col className="text-center">
              <p className="text-muted">
                Showing {posts.length} post{posts.length !== 1 ? 's' : ''}
              </p>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default PostsHome;
