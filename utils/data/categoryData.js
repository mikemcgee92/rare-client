import clientCredentials from '../../clientCredentials';
import { getAuthToken } from './commentData'; // Import getAuthToken

const getCategories = async () => {
  const response = await fetch(`${clientCredentials.databaseURL}/categories`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const categories = await response.json();
  return categories;
};

const createCategory = async (category) => {
  console.log('Creating category with payload:', category); // Log payload
  const token = getAuthToken(); // Use getAuthToken
  const response = await fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`, // Include Authorization header
    },
    body: JSON.stringify(category),
  });

  console.log('Response status:', response.status); // Log response status
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('Error details:', errorDetails); // Log error details
    throw new Error('Network response was not ok');
  }

  const newCategory = await response.json();
  return newCategory;
};

const updateCategory = async (category, id) => {
  const token = getAuthToken(); // Use getAuthToken
  const response = await fetch(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`, // Include Authorization header
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
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
  const token = getAuthToken(); // Use getAuthToken
  return new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`, // Include Authorization header
      },
    })
      .then((res) => (res.ok ? resolve(true) : reject(new Error('Failed to delete category'))))
      .catch(reject);
  });
};

export { createCategory, deleteCategory, getCategories, getSingleCategory, updateCategory };
