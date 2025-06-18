const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

// TODO: add auth tokens to calls

const getPosts = async () => {
  const get = await fetch(`${dbUrl}posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = get.json();
  return response;
};

const getSinglePost = async (id) => {
  const get = await fetch(`${dbUrl}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = get.json();
  return response;
};

const createPost = async (postObj) => {
  const post = await fetch(`${dbUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postObj),
  });
  const response = post.json();
  return response;
};

const updatePost = async (id, postObj) => {
  await fetch(`${dbUrl}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postObj),
  });
  // backend returns 204 status code - no content
};

const deletePost = async (id) => {
  await fetch(`${dbUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // backend returns 204 status code - no content
};

export {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
