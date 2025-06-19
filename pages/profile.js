import Icon from '@/components/Icon';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { fetchCurrentUser, getCurrentUser, updateCurrentUser } from '../utils/data/AuthManager';

export default function Profile() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  useEffect(() => {
    // Load user data from authentication context or fetch fresh data
    const loadUserData = async () => {
      try {
        // First try to get from localStorage
        let currentUser = getCurrentUser();

        // If we have a user but want fresh data, or if no user data, fetch from server
        if (!currentUser) {
          currentUser = await fetchCurrentUser();
        }

        if (currentUser) {
          setUser({
            first_name: currentUser.first_name || '',
            last_name: currentUser.last_name || '',
            email: currentUser.email || '',
            bio: currentUser.bio || '',
          });
        }
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load profile data');
      }
    };

    loadUserData();
  }, []);
  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validate required fields
      if (!user.first_name?.trim() || !user.last_name?.trim() || !user.email?.trim()) {
        setError('First name, last name, and email are required');
        return;
      }

      // Update user profile on server
      const result = await updateCurrentUser({
        first_name: user.first_name.trim(),
        last_name: user.last_name.trim(),
        email: user.email.trim(),
        bio: user.bio?.trim() || '',
      });

      setSuccess('Profile updated successfully!');
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);

      if (err.message.includes('400')) {
        setError('Invalid profile data. Please check your input and try again.');
      } else if (err.message.includes('401')) {
        setError('You are not logged in. Please log in and try again.');
      } else if (err.message.includes('403')) {
        setError('You are not authorized to update this profile.');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    // Clear any previous messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  return (
    <Container fluid className="posts-page">
      <Container>
        {/* Header */}
        <div className="posts-header">
          <Row className="align-items-center">
            <Col>
              <h1 className="page-title mb-0">
                <Icon name="profile" size={32} className="me-3" />
                My Profile
              </h1>
              <p className="text-muted mb-0">Manage your account information</p>
            </Col>
            <Col xs="auto">
              {isEditing ? (
                <div className="d-flex gap-2">
                  {' '}
                  <Button variant="outline-secondary" onClick={() => setIsEditing(false)} disabled={loading}>
                    Cancel
                  </Button>
                  <Button className="btn-primary-usa" onClick={handleSave} disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Icon name="write" size={16} className="me-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <Button className="btn-primary-usa" onClick={() => setIsEditing(true)}>
                  <Icon name="write" size={16} className="me-2" />
                  Edit Profile
                </Button>
              )}
            </Col>
          </Row>
        </div>

        {/* Profile Content */}
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="post-detail-card shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'var(--usa-blue)',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {user.first_name.charAt(0)}
                    {user.last_name.charAt(0)}
                  </div>
                  <h3>
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-muted">{user.email}</p>
                </div>{' '}
                <Form>
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

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first_name" value={user.first_name} onChange={handleInputChange} disabled={!isEditing} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={user.last_name} onChange={handleInputChange} disabled={!isEditing} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} disabled={!isEditing} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as="textarea" rows={4} name="bio" value={user.bio} onChange={handleInputChange} disabled={!isEditing} placeholder="Tell us about yourself..." />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            {/* Additional Profile Sections */}
            <Card className="mt-4 shadow-sm">
              <Card.Body>
                <h5 className="mb-3">
                  <Icon name="posts" size={20} className="me-2" />
                  Quick Actions
                </h5>
                <Row>
                  <Col md={6} className="mb-3">
                    <Button variant="outline-primary" className="w-100" onClick={() => router.push('/posts')}>
                      <Icon name="posts" size={16} className="me-2" />
                      View My Posts
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button variant="outline-success" className="w-100" onClick={() => router.push('/posts/new')}>
                      <Icon name="write" size={16} className="me-2" />
                      Create New Post
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
