import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { loginUser } from '../utils/data/AuthManager';

function Login({ setToken }) {
  const navigate = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors('');
    if (!formData.username || !formData.password) {
      setErrors('Both email and password are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser(formData);
      if (res.valid) {
        setToken(res.token);
        navigate.push('/');
      } else {
        setErrors('Email or password not valid');
      }
    } catch (err) {
      setErrors('Unable to reach server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5">
      {' '}
      <div className="auth-card login-card">
        <form onSubmit={handleLogin}>
          <div className="text-center mb-4">
            <h1 className="title-usa">🇺🇸 Rare Publishing</h1>
            <p className="subtitle-usa">Welcome back! Please sign in to continue</p>
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="username">
              📧 Email Address
            </label>
            <input id="username" name="username" className="form-control" type="email" value={formData.username} onChange={handleChange} autoComplete="email" placeholder="Enter your email address" required />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              🔒 Password
            </label>
            <input id="password" name="password" className="form-control" type="password" value={formData.password} onChange={handleChange} autoComplete="current-password" placeholder="Enter your password" required />
          </div>

          <div className="d-grid gap-3 mb-4">
            <button className="btn-primary-usa" type="submit" disabled={loading}>
              {loading && <span className="loading-spinner" />}
              {loading ? 'Signing In...' : '🚀 Sign In'}
            </button>
          </div>

          <div className="text-center">
            <p className="mb-0">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="btn-secondary-usa">
                Create Account Here
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
export default Login;
