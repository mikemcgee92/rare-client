import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PostCard from '../../components/post/PostCard';
import { getPosts } from '../../api/postData';

function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  return (
    <article className="posts">
      <h1>All Posts</h1>
      <Button onClick={() => { router.push('posts/new'); }}>
        Create a new post
      </Button>
      {posts.map((post) => (
        <section key={`post--${post.id}`} className="post">
          <PostCard title={post.title} publicationDate={post.publication_date} imageUrl={post.image_url} content={post.content} />
          <Button onClick={() => { router.push(`posts/edit/${post.id}`); }}>Edit</Button>
          <Button onClick={() => { router.push(`posts/${post.id}`); }}>View</Button>
        </section>
      ))}
    </article>
  );
}

export default Home;
