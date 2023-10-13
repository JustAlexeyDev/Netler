// Import React Libs
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
// Vars
const postsURL = 'http://127.0.0.1:8000/posts/?format=json';
// Render
const Home = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    axios.get(postsURL).then((response) => {
      setPosts(response.data);
    });
  }, []);
  console.log(posts);
  if (!posts) return null;
  // Page
  return(
    <div className="Page">
      <div>
        {posts.length > 0 && (
          <div className="Post-Box">
            {posts.map(post => (
              <div className="Post-Container">
                <div className="Post-Header">
                  <span>Avatar: </span>
                  <span>Author: {post.author_name}</span>
                </div>
                <div className="Post-Image">
                  <img src="" alt="" />
                </div>
                <div className="Post-Nav">
                  <span>Likes: {post.likes}</span>
                </div>
                <div className="Post-Description">
                   <span>Desc: {post.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Home