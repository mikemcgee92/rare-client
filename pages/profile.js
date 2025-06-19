import Icon from '@/components/Icon';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export default function Profile() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd fetch user data from an API
    // For now, we'll use mock data
    setUser({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      bio: 'Passionate writer and technology enthusiast. Love sharing insights about web development and modern design trends.',
    });
  }, []);

  const handleSave = () => {
    // In a real app, you'd save to an API
    setIsEditing(false);
    // Show success message
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
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
                  <Button variant="outline-secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button className="btn-primary-usa" onClick={handleSave}>
                    <Icon name="write" size={16} className="me-2" />
                    Save Changes
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
                </div>

                <Form>
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
