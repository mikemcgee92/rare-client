import Icon from '@/components/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Logo from './rare.jpeg';

function AppNavBar({ token, setToken }) {
  const navigate = useRouter();

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('auth_token');
    navigate.push('/login');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
          <Image src={Logo} height={40} width={40} alt="Rare Logo" className="me-2" />
          <span className="navbar-brand">Rare Publishing</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <>
                <Nav.Link as={Link} href="/">
                  <Icon name="posts" size={16} className="me-1" /> Posts
                </Nav.Link>
                <Nav.Link as={Link} href="/posts">
                  <Icon name="posts" size={16} className="me-1" /> All Posts
                </Nav.Link>
                <Nav.Link as={Link} href="/categories">
                  <Icon name="categories" size={16} className="me-1" /> Categories
                </Nav.Link>
                <Nav.Link as={Link} href="/profile">
                  <Icon name="profile" size={16} className="me-1" /> Profile
                </Nav.Link>{' '}
              </>
            )}
          </Nav>
          <Nav>
            {token ? (
              <button type="button" className="btn-logout" onClick={handleLogout}>
                <Icon name="logout" size={16} className="me-1" /> Logout
              </button>
            ) : (
              <div className="d-flex gap-2">
                <Nav.Link as={Link} href="/login">
                  <Icon name="login" size={16} className="me-1" /> Login
                </Nav.Link>
                <Nav.Link as={Link} href="/register">
                  <Icon name="register" size={16} className="me-1" /> Register
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

AppNavBar.propTypes = {
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};
export default AppNavBar;
