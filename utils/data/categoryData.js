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

const getCategories = async () => {
  const response = await fetch(`${clientCredentials.databaseURL}/categories`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const categories = await response.json();
  return categories;
};

const createCategory = async (category) => {
  const response = await makeAuthenticatedRequest(`${clientCredentials.databaseURL}/categories`, {
    method: 'POST',
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Network response was not ok: ${response.status} ${errorData}`);
  }

  const newCategory = await response.json();
  return newCategory;
};

const updateCategory = async (category, id) => {
  const response = await makeAuthenticatedRequest(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Network response was not ok: ${response.status} ${errorData}`);
  }

  const updatedCategory = await response.json();
  return updatedCategory;
};

const getSingleCategory = async (id) => {
  const response = await fetch(`${clientCredentials.databaseURL}/categories/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const category = await response.json();
  return category;
};

const deleteCategory = async (id) => {
  const response = await makeAuthenticatedRequest(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Network response was not ok: ${response.status} ${errorData}`);
  }

  return true;
};

export { createCategory, deleteCategory, getCategories, getSingleCategory, updateCategory };
