/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '../components/nav/NavBar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [token, setTokenState] = useState(null);
  const router = useRouter();
  useEffect(() => {
    // Set token from localStorage, default to empty string if not found
    const storedToken = localStorage.getItem('auth_token') || '';
    setTokenState(storedToken);
  }, []);

  useEffect(() => {
    // Only run routing logic if token state has been initialized
    if (token !== null) {
      const publicRoutes = ['/login', '/register'];
      const isPublicRoute = publicRoutes.includes(router.route);

      // If no token and trying to access protected route, redirect to login
      if (!token && !isPublicRoute) {
        router.push('/login');
      }

      // If has token and on login/register, redirect to home
      if (token && isPublicRoute) {
        router.push('/');
      }
    }
  }, [router, token]);

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken);
    setTokenState(newToken);
  };

  const newPageProps = { ...pageProps, token, setToken };
  if (token === null) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="title-usa mb-3">🇺🇸 Rare Publishing</div>
          <div className="subtitle-usa">
            <span className="loading-spinner" />
            Loading your experience...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <Component {...newPageProps} />
    </>
  );
}

export default MyApp;
