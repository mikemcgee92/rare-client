import Icon from '@/components/Icon';
import { deleteCategory, getCategories, updateCategory } from '@/utils/data/categoryData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleUpdateCategory = async (categoryId, newLabel) => {
    if (newLabel.trim() === '') return;

    try {
      const updatedCategory = await updateCategory({ label: newLabel }, categoryId);
      setCategories((prevCategories) => prevCategories.map((category) => (category.id === categoryId ? { ...category, label: updatedCategory.label } : category)));
    } catch (updateError) {
      console.error('Error updating category:', updateError);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
    } catch (deleteError) {
      console.error('Error deleting category:', deleteError);
    }
  };

  if (loading) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading categories...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="posts-page">
      <Container>
        {/* Header */}
        <div className="posts-header">
          <Row className="align-items-center">
            <Col>
              <h1 className="page-title mb-0">
                <Icon name="categories" size={32} className="me-3" />
                Categories
              </h1>
              <p className="text-muted mb-0">Browse all post categories</p>
            </Col>
            <Col xs="auto">
              <Button className="btn-primary-usa" onClick={() => router.push('/categories/new')}>
                <Icon name="write" size={16} className="me-2" />
                New Category
              </Button>
            </Col>
          </Row>
        </div>

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

        {/* Categories Grid */}
        <Row>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Col key={category.id} md={6} lg={4} className="mb-4">
                <Card className="post-card h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <Icon name="categories" size={24} color="var(--usa-blue)" />
                      </div>
                      <div>
                        <h5 className="post-title mb-1">{category.label}</h5>
                        <Badge bg="primary">{category.post_count || 0} posts</Badge>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button variant="outline-primary" size="sm" onClick={() => router.push(`/posts?category=${category.id}`)}>
                        <Icon name="posts" size={14} className="me-1" />
                        View Posts
                      </Button>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleUpdateCategory(category.id, prompt('Enter new label:', category.label))} className="flex-fill">
                        Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCategory(category.id)} className="flex-fill">
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card className="empty-state text-center">
                <Card.Body>
                  <Icon name="categories" size={64} color="var(--usa-gray)" className="mb-3" />
                  <h4>No Categories Found</h4>
                  <p className="text-muted mb-4">There are no categories available at the moment.</p>
                  <Button className="btn-primary-usa" onClick={() => router.push('/categories/new')}>
                    <Icon name="write" size={16} className="me-2" />
                    Create First Category
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  );
}
