import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { registerUser } from '../utils/data/AuthManager';

function Home({ setToken }) {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const navigate = useRouter();
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors('');

    if (!firstName.current.value || !lastName.current.value || !email.current.value || !password.current.value || !verifyPassword.current.value) {
      setErrors('First name, last name, email, and password are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.current.value)) {
      setErrors('Please enter a valid email.');
      return;
    }

    if (password.current.value !== verifyPassword.current.value) {
      setErrors('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const newUser = {
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value || '', // Bio is optional
      };

      const res = await registerUser(newUser);
      if (res.valid) {
        setToken(res.token);
        navigate.push('/');
      } else {
        setErrors(res.errors ? 'Registration failed. Please check your information.' : 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrors('Server error. Please try later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5">
      {' '}
      <div className="auth-card register-card">
        <form onSubmit={handleRegister}>
          <div className="text-center mb-4">
            <h1 className="title-usa">🇺🇸 Rare Publishing</h1>
            <p className="subtitle-usa">Join our publishing community today!</p>
          </div>

          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              👤 First Name
            </label>
            <input id="firstName" className="form-control" type="text" ref={firstName} placeholder="Enter your first name" required />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              👤 Last Name
            </label>
            <input id="lastName" className="form-control" type="text" ref={lastName} placeholder="Enter your last name" required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              📧 Email Address
            </label>
            <input id="email" className="form-control" type="email" ref={email} placeholder="Enter your email address" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              🔒 Password
            </label>
            <input id="password" className="form-control" type="password" placeholder="Create a strong password" ref={password} required />
          </div>

          <div className="mb-3">
            <label htmlFor="verifyPassword" className="form-label">
              🔒 Confirm Password
            </label>
            <input id="verifyPassword" className="form-control" type="password" placeholder="Confirm your password" ref={verifyPassword} required />
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="form-label">
              📝 Bio (Optional)
            </label>
            <textarea id="bio" className="form-control" rows="3" placeholder="Tell us about yourself... (Optional)" ref={bio} />
          </div>

          <div className="d-grid gap-3 mb-4">
            <button className="btn-primary-usa" type="submit" disabled={loading}>
              {loading && <span className="loading-spinner" />}
              {loading ? 'Creating Account...' : '🚀 Create Account'}
            </button>
          </div>

          <div className="text-center">
            <p className="mb-0">
              Already have an account?{' '}
              <Link href="/login" className="btn-secondary-usa">
                Sign In Here
              </Link>
            </p>
          </div>

          {errors && (
            <div className="alert-danger mt-3">
              <strong>⚠️ Error:</strong> {errors}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

Home.propTypes = {
  setToken: PropTypes.func.isRequired,
};
export default Home;
