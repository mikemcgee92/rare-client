const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

const getCategories = async () => {
  const response = await fetch(`${dbUrl.databaseURL}/categories`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const categories = await response.json();
  return categories;
};

const createCategory = async (category) => {
  const response = await fetch(`${dbUrl.databaseURL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const newCategory = await response.json();
  return newCategory;
};

const updateCategory = async (category, id) => {
  const response = await fetch(`${dbUrl.databaseURL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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
  const response = await fetch(`${dbUrl.databaseURL}/categories/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const category = await response.json();
  return category;
};

const deleteCategory = async (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl.databaseURL}/categories/${id}`, {
    method: 'DELETE',
  })
    .then((res) => (res.ok ? resolve(true) : reject(new Error('Failed to delete category'))))
    .catch(reject);
});

export {
  getCategories, createCategory, updateCategory, getSingleCategory, deleteCategory,
};
