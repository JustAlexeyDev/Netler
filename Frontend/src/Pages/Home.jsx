
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const baseURL = 'http://127.0.0.1:8000/posts/?format=json';
const Home = () => {

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return(
    <div className="Page">
      Посты
      <div>
        {post.description}
      </div>
    </div>
  );
}
export default Home