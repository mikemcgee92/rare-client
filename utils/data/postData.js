const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL || 'http://localhost:8000';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('auth_token') || '';
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

const getPosts = async () => {
  try {
    const response = await makeAuthenticatedRequest(`${dbUrl}/posts`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch posts');
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

const getSinglePost = async (id) => {
  try {
    const response = await makeAuthenticatedRequest(`${dbUrl}/posts/${id}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch post');
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

const createPost = async (postObj) => {
  try {
    const response = await makeAuthenticatedRequest(`${dbUrl}/posts`, {
      method: 'POST',
      body: JSON.stringify(postObj),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to create post');
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

const updatePost = async (id, postObj) => {
  try {
    const response = await makeAuthenticatedRequest(`${dbUrl}/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postObj),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to update post');
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

const deletePost = async (id) => {
  try {
    const response = await makeAuthenticatedRequest(`${dbUrl}/posts/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return true;
    }
    throw new Error('Failed to delete post');
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export { createPost, deletePost, getPosts, getSinglePost, updatePost };
