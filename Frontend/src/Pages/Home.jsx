
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const baseURL = 'http://127.0.0.1:8000/posts/?format=json';
const Home = () => {

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPosts(response.data);
    });
  }, []);

  console.log(posts);

  if (!posts) return null;

  return(
    <div className="Page">
      Посты
      <div>
        {posts.length > 0 && (
          <div>
            {posts.map(post => (
              <div className="Post-Container">
                <span>ID: {post.id}</span>
                <span>Likes: {post.likes}</span>
                <span>Author: {post.author}</span>
                <span>Desc: {post.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Home