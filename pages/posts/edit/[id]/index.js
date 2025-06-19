import Icon from '@/components/Icon';
import { getCategories } from '@/utils/data/categoryData';
import { getSinglePost, updatePost } from '@/utils/data/postData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    category_id: '',
    publication_date: '',
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setPageLoading(true);

        // Fetch post and categories in parallel
        const [postData, categoriesData] = await Promise.all([getSinglePost(id), getCategories()]);

        // Set post data
        setFormData({
          title: postData.title || '',
          content: postData.content || '',
          image_url: postData.image_url || '',
          category_id: postData.category_id ? String(postData.category_id) : '',
          publication_date: postData.publication_date ? new Date(postData.publication_date).toISOString().split('T')[0] : '',
        });

        // Set categories
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load post data');
      } finally {
        setPageLoading(false);
        setCategoriesLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear any previous messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return false;
    }
    if (!formData.category_id) {
      setError('Please select a category');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');

      const postData = {
        ...formData,
        category_id: parseInt(formData.category_id, 10),
        approved: true, // Keep posts approved for now
      };

      await updatePost(id, postData);
      setSuccess('Post updated successfully!');

      // Redirect to the post view after a short delay
      setTimeout(() => {
        router.push(`/posts/${id}`);
      }, 1500);
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/posts/${id}`);
  };

  if (pageLoading) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading post...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="edit-post-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="page-header mb-4">
              <Button variant="outline-secondary" onClick={() => router.push(`/posts/${id}`)} className="mb-3">
                <Icon name="trending" size={16} className="me-2" />
                Back to Post
              </Button>

              <h1 className="page-title">
                <Icon name="write" size={32} className="me-3" color="var(--usa-blue)" />
                Edit Post
              </h1>
              <p className="page-subtitle">Update your story</p>
            </div>

            <Card className="auth-card shadow">
              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger" className="mb-4">
                    <Icon name="alert" size={20} className="me-2" />
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="mb-4">
                    <Icon name="featured" size={20} className="me-2" />
                    {success}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="title" className="form-label">
                          <Icon name="posts" size={16} className="me-1" />
                          Title *
                        </Form.Label>
                        <Form.Control id="title" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter your post title" required className="form-control" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="category_id" className="form-label">
                          <Icon name="categories" size={16} className="me-1" />
                          Category *
                        </Form.Label>
                        {categoriesLoading ? (
                          <div className="d-flex align-items-center">
                            <Spinner animation="border" size="sm" className="me-2" />
                            Loading categories...
                          </div>
                        ) : (
                          <Form.Select id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required className="form-control">
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.label}
                              </option>
                            ))}
                          </Form.Select>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="publication_date" className="form-label">
                          <Icon name="recent" size={16} className="me-1" />
                          Publication Date
                        </Form.Label>
                        <Form.Control id="publication_date" type="date" name="publication_date" value={formData.publication_date} onChange={handleChange} className="form-control" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="image_url" className="form-label">
                      <Icon name="featured" size={16} className="me-1" />
                      Cover Image URL
                    </Form.Label>
                    <Form.Control id="image_url" type="url" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://example.com/image.jpg" className="form-control" />
                    <Form.Text className="text-muted">Optional: Add a cover image URL for your post</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="content" className="form-label">
                      <Icon name="write" size={16} className="me-1" />
                      Content *
                    </Form.Label>
                    <Form.Control id="content" as="textarea" rows={8} name="content" value={formData.content} onChange={handleChange} placeholder="Write your post content here..." required className="form-control" />
                  </Form.Group>

                  <div className="d-flex gap-3">
                    <Button type="submit" className="btn-primary-usa flex-fill" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Updating Post...
                        </>
                      ) : (
                        <>
                          <Icon name="featured" size={20} className="me-2" />
                          Update Post
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline-secondary" onClick={handleCancel} disabled={loading} className="flex-fill">
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default EditPost;
