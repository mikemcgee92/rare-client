import Icon from '@/components/Icon';
import { isUserLoggedIn } from '@/utils/data/AuthManager';
import { createCategory } from '@/utils/data/categoryData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

function NewCategory() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    label: '',
  });

  // Check authentication on component mount
  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear any previous errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.label.trim()) {
      setError('Category name is required');
      return false;
    }
    if (formData.label.trim().length < 2) {
      setError('Category name must be at least 2 characters long');
      return false;
    }
    if (formData.label.trim().length > 100) {
      setError('Category name must be less than 100 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');

      const categoryData = {
        label: formData.label.trim(),
      };

      await createCategory(categoryData);
      setSuccess('Category created successfully!');

      // Redirect to categories page after a short delay
      setTimeout(() => {
        router.push('/categories');
      }, 1500);
    } catch (err) {
      console.error('Error creating category:', err);

      // Handle different types of errors
      const errorMessage = err.message.toLowerCase();

      if (errorMessage.includes('unique') || errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
        setError('A category with this name already exists. Please choose a different name.');
      } else if (errorMessage.includes('401')) {
        setError('You are not logged in. Please log in and try again.');
      } else if (errorMessage.includes('403')) {
        setError('You are not authorized to create categories.');
      } else if (errorMessage.includes('400')) {
        setError('Invalid category data. Please check that the category name is valid and try again.');
      } else if (errorMessage.includes('500')) {
        setError('Server error occurred. Please try again later.');
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        setError('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        setError('Failed to create category. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/categories');
  };

  // Show loading if not authenticated
  if (!isUserLoggedIn()) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Checking authentication...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="new-post-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="page-header mb-4">
              <h1 className="page-title">
                <Icon name="categories" size={32} className="me-3" color="var(--usa-blue)" />
                Create New Category
              </h1>
              <p className="page-subtitle">Add a new category for organizing posts</p>
            </div>

            <Card className="shadow">
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit} noValidate>
                  {/* Success Message */}
                  {success && (
                    <Alert variant="success" className="mb-4">
                      <Icon name="featured" size={20} className="me-2" />
                      {success}
                    </Alert>
                  )}

                  {/* Error Message */}
                  {error && (
                    <Alert variant="danger" className="mb-4">
                      <Icon name="alert" size={20} className="me-2" />
                      {error}
                    </Alert>
                  )}

                  {/* Category Name */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      Category Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control type="text" name="label" value={formData.label} onChange={handleChange} placeholder="Enter category name (e.g., Technology, Sports, Politics)" isInvalid={error && error.includes('Category name')} disabled={loading} maxLength={100} />
                    <Form.Text className="text-muted">Choose a clear, descriptive name for your category (2-100 characters)</Form.Text>
                  </Form.Group>

                  {/* Form Actions */}
                  <div className="d-flex gap-3 pt-3">
                    <Button variant="outline-secondary" onClick={handleCancel} disabled={loading} className="flex-fill">
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-primary-usa flex-fill" disabled={loading || !formData.label.trim()}>
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Icon name="categories" size={16} className="me-2" />
                          Create Category
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Help Card */}
            <Card className="mt-4 bg-light">
              <Card.Body>
                <h6 className="fw-bold mb-3">
                  <Icon name="featured" size={20} className="me-2" />
                  Tips for Creating Categories
                </h6>
                <ul className="mb-0">
                  <li>Use clear, specific names that writers will understand</li>
                  <li>Avoid duplicate or very similar category names</li>
                  <li>Keep names concise but descriptive</li>
                  <li>Consider how the category will help organize content</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default NewCategory;
