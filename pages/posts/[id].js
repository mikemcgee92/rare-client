import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSinglePost, deletePost } from '../../api/postData';

export default function ViewPost() {
  const [post, setPost] = useState({});
  const router = useRouter();

  const id = window.location.href.split('posts/')[1];

  useEffect(() => {
    getSinglePost(id).then(setPost);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <h2>{post.title}</h2>
        <h3>By {post.rare_user_id /* FIXME: get the user's name */}</h3>
        <h3>Posted in {post.category_id /* FIXME: get category's label */}</h3>
        <Image src={post.image_url} alt={`img for ${post.title}`} />
        <h3>on {post.publication_date}</h3>
        <h4>{post.content}</h4>
        <Button onClick={() => {
          deletePost(post.id);
          router.push('/posts');
        }}
        >
          Delete Post
        </Button>
      </div>
    </div>
  );
}

// TODO: add comments to post
