const API_URL = process.env.NEXT_PUBLIC_DATABASE_URL || 'http://localhost:8000';

export const loginUser = (user) =>
  fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      username: user.username, // This will be treated as email by Django
      password: user.password,
    }),
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      // Store user data in localStorage for easy access
      if (data.user) {
        localStorage.setItem('user_data', JSON.stringify(data.user));
      }
      return { valid: true, token: data.token, user: data.user };
    } else {
      return { valid: false };
    }
  });

export const registerUser = (newUser) =>
  fetch(`${API_URL}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newUser),
  }).then(async (res) => {
    if (res.ok) {
      const userData = await res.json();
      // After registration, get token by logging in
      const loginResult = await loginUser({ username: newUser.email, password: newUser.password });
      return loginResult;
    } else {
      const errorData = await res.json();
      return { valid: false, errors: errorData };
    }
  });

// Utility functions to get current user data
export const getCurrentUser = () => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

export const getCurrentUserId = () => {
  const user = getCurrentUser();
  return user ? user.id : null;
};

export const isUserLoggedIn = () => {
  const token = localStorage.getItem('auth_token');
  const user = getCurrentUser();
  return !!(token && user);
};

export const logoutUser = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
};

export const updateCurrentUser = async (userData) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to update profile: ${response.status} ${errorData}`);
  }

  const updatedUser = await response.json();

  // Update localStorage with the new user data
  localStorage.setItem('user_data', JSON.stringify(updatedUser));

  return { success: true, user: updatedUser };
};

export const fetchCurrentUser = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch current user data');
  }

  const userData = await response.json();

  // Update localStorage with the fresh user data
  localStorage.setItem('user_data', JSON.stringify(userData));

  return userData;
};
