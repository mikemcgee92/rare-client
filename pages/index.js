import Icon from '@/components/Icon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Home({ token }) {
  const router = useRouter();
  const [userStats] = useState({
    totalPosts: 0,
    totalUsers: 1247,
    totalCategories: 12,
    activeWriters: 89,
  });

  useEffect(() => {
    // If no token, redirect to login
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  // Function to handle navigation
  const handleNavigation = (path) => {
    router.push(path);
  };
  // If no token, show loading while redirecting
  if (!token) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="title-usa mb-3">Rare Publishing</div>{' '}
          <div className="subtitle-usa">
            <span className="loading-spinner" />
            Redirecting to login...
          </div>
        </div>
      </div>
    );
  } // Main authenticated home page content
  return (
    <div className="home-dashboard">
      {/* Hero Section - Full Height */}
      <section className="hero-section">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-lg-11 col-xl-10">
              {' '}
              <div className="hero-content">
                <div className="text-center mb-5">
                  <h1 className="title-usa mb-4">
                    <Icon name="flag" size={40} className="me-3" />
                    Welcome to Rare Publishing
                  </h1>
                  <p className="subtitle-usa">Your premier platform for sharing stories, ideas, and connecting with fellow writers across America</p>
                </div>
                {/* Stats Cards */}
                <div className="row g-4 mb-5">
                  <div className="col-lg-3 col-md-6">
                    <div className="stats-card">
                      <div className="stats-icon">
                        <Icon name="users" size={40} color="var(--usa-blue)" />
                      </div>
                      <div className="stats-number">{userStats.totalUsers.toLocaleString()}</div>
                      <div className="stats-label">Total Writers</div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="stats-card">
                      <div className="stats-icon">
                        <Icon name="activeUsers" size={40} color="var(--usa-red)" />
                      </div>
                      <div className="stats-number">{userStats.activeWriters}</div>
                      <div className="stats-label">Active Today</div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="stats-card">
                      <div className="stats-icon">
                        <Icon name="posts" size={40} color="var(--usa-blue)" />
                      </div>
                      <div className="stats-number">2,847</div>
                      <div className="stats-label">Published Posts</div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="stats-card">
                      <div className="stats-icon">
                        <Icon name="categories" size={40} color="var(--usa-red)" />
                      </div>{' '}
                      <div className="stats-number">{userStats.totalCategories}</div>
                      <div className="stats-label">Categories</div>
                    </div>
                  </div>
                </div>
                {/* Feature Cards */}
                <div className="row g-4 mb-5">
                  <div className="col-md-4">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <Icon name="write" size={48} color="var(--usa-blue)" />
                      </div>
                      <h4>Write Stories</h4>
                      <p>Share your unique voice and stories with our community of passionate writers</p>
                      <Link href="/posts/create" className="btn-secondary-usa btn-sm mt-3">
                        Start Writing
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <Icon name="connect" size={48} color="var(--usa-red)" />
                      </div>
                      <h4>Connect</h4>
                      <p>Engage with writers and readers from across the nation and build your network</p>
                      <Link href="/users" className="btn-secondary-usa btn-sm mt-3">
                        Find Writers
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <Icon name="publish" size={48} color="var(--usa-blue)" />
                      </div>
                      <h4>Publish</h4>
                      <p>Get your content featured and build your audience with our publishing tools</p>
                      <Link href="/posts" className="btn-secondary-usa btn-sm mt-3">
                        Browse Posts
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="text-center">
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    {' '}
                    <button type="button" className="btn-primary-usa" onClick={() => handleNavigation('/posts')}>
                      <Icon name="posts" size={20} className="me-2" />
                      View All Posts
                    </button>
                    <button type="button" className="btn-secondary-usa" onClick={() => handleNavigation('/posts/create')}>
                      <Icon name="write" size={20} className="me-2" />
                      Create New Post
                    </button>
                    <button type="button" className="btn-secondary-usa" onClick={() => handleNavigation('/categories')}>
                      <Icon name="categories" size={20} className="me-2" />
                      Browse Categories
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section - Full Width */}
      <section className="quick-actions-section">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-11 col-xl-10">
              <div className="section-content">
                {' '}
                <h2 className="text-center mb-5 section-title">
                  <Icon name="trending" size={32} className="me-3" color="var(--usa-blue)" />
                  Quick Actions
                </h2>
                <div className="row g-4">
                  {' '}
                  <div className="col-md-6 col-lg-3">
                    <div className="quick-action-card" onClick={() => handleNavigation('/posts/trending')} onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/posts/trending')} role="button" tabIndex={0}>
                      <div className="quick-icon">
                        <Icon name="trending" size={32} color="var(--usa-red)" />
                      </div>
                      <h5>Trending Posts</h5>
                      <p>See what&apos;s popular right now</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className="quick-action-card" onClick={() => handleNavigation('/posts/recent')} onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/posts/recent')} role="button" tabIndex={0}>
                      <div className="quick-icon">
                        <Icon name="recent" size={32} color="var(--usa-blue)" />
                      </div>
                      <h5>Latest Posts</h5>
                      <p>Discover fresh content</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className="quick-action-card" onClick={() => handleNavigation('/profile')} onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/profile')} role="button" tabIndex={0}>
                      <div className="quick-icon">
                        <Icon name="profile" size={32} color="var(--usa-red)" />
                      </div>
                      <h5>My Profile</h5>
                      <p>Manage your account</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3">
                    <div className="quick-action-card" onClick={() => handleNavigation('/settings')} onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/settings')} role="button" tabIndex={0}>
                      <div className="quick-icon">
                        <Icon name="settings" size={32} color="var(--usa-blue)" />
                      </div>
                      <h5>Settings</h5>
                      <p>Customize your experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Section - Full Width */}
      <section className="activity-section">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-11 col-xl-10">
              <div className="section-content">
                {' '}
                <h2 className="text-center mb-5 section-title">
                  <Icon name="trending" size={32} className="me-3" color="var(--usa-blue)" />
                  Platform Activity
                </h2>
                <div className="row g-4 text-center">
                  <div className="col-md-4">
                    <div className="activity-item">
                      <div className="activity-icon">
                        <Icon name="newPost" size={24} color="var(--usa-blue)" />
                      </div>
                      <h6>New Post Published</h6>
                      <p className="text-muted small">&quot;The Future of American Literature&quot; by Sarah Johnson</p>
                      <span className="badge bg-primary">2 minutes ago</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="activity-item">
                      <div className="activity-icon">
                        <Icon name="newUser" size={24} color="var(--usa-red)" />
                      </div>
                      <h6>New Writer Joined</h6>
                      <p className="text-muted small">Michael Chen from California just joined our community</p>
                      <span className="badge bg-success">5 minutes ago</span>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="activity-item">
                      <div className="activity-icon">
                        <Icon name="featured" size={24} color="var(--usa-blue)" />
                      </div>
                      <h6>Featured Post</h6>
                      <p className="text-muted small">&quot;Stories from the Heartland&quot; is now featured</p>
                      <span className="badge bg-warning">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Home.propTypes = {
  token: PropTypes.string,
};

Home.defaultProps = {
  token: '',
};

export default Home;
