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
      return { valid: true, token: data.token };
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
