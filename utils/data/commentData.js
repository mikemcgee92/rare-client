import clientCredentials from '../../clientCredentials';

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

const getComments = async (postId) => {
  try {
    const response = await makeAuthenticatedRequest(`${clientCredentials.databaseURL}/comments?post_id=${postId}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch comments');
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

const createComment = async (comment) => {
  try {
    const response = await makeAuthenticatedRequest(`${clientCredentials.databaseURL}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
    });

    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to create comment');
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

const updateComment = async (comment, id) => {
  try {
    const response = await makeAuthenticatedRequest(`${clientCredentials.databaseURL}/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(comment),
    });

    if (response.ok) {
      // Handle potential 204 No Content response
      if (response.status === 204) {
        return { success: true };
      }
      const text = await response.text();
      return text ? JSON.parse(text) : { success: true };
    }
    throw new Error('Failed to update comment');
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

const getSingleComment = async (id) => {
  try {
    const response = await makeAuthenticatedRequest(`${clientCredentials.databaseURL}/comments/${id}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch comment');
  } catch (error) {
    console.error('Error fetching comment:', error);
    throw error;
  }
};
const deleteComment = async (id) => {
  try {
    const response = await makeAuthenticatedRequest(`${clientCredentials.databaseURL}/comments/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return true;
    }
    throw new Error('Failed to delete comment');
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export { createComment, deleteComment, getComments, getSingleComment, updateComment };
