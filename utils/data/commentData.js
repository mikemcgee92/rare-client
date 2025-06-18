const dbUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
import clientCredentials from '../../clientCredentials';

const getComments = async (postId) => {
  const response = await fetch(`${dbUrl.databaseURL}/comments?postId=${postId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const comments = await response.json();
  return comments;
}

const createComment = async (comment) => {
  const response = await fetch(`${dbUrl.databaseURL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const newComment = await response.json();
  return newComment;
};

const updateComment = async (comment, id) => {
  const response = await fetch(`${dbUrl.databaseURL}/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const updatedComment = await response.json();
  return updatedComment;
};

const getSingleComment = async (id) => {
  const response = await fetch(`${dbUrl.databaseURL}/comments/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const comment = await response.json();
  return comment;
};
const deleteComment = async (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${dbUrl.databaseURL}/comments/${id}`, {
      method: 'DELETE',
    })
      .then((res) => (res.ok ? resolve(true) : reject(new Error('Failed to delete comment'))))
      .catch(reject);
  });
};

export { createComment, deleteComment, getComments, getSingleComment, updateComment };
