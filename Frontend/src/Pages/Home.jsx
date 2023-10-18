import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import backendIP from '../vars';
import Post from '../Components/Post';

const postsURL = `${backendIP}/posts/?format=json`;
const imagesURL = `${backendIP}/posts_files/`;

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [files, setFiles] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [peoples, setPeoples] = useState([]);

  const peoplesListApi = async () => {
    const response = await fetch(`${backendIP}/users/?format=json`)
      .then((response) => response.json())
      .then(data => {
        setPeoples(data)
      });
    console.log(response);
    return response;
  };

  useEffect(() => {
    peoplesListApi();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get(postsURL);
    setPosts(response.data);
  };

  const fetchFiles = async () => {
    const response = await axios.get(imagesURL);
    setFiles(response.data);
  };
  
  useEffect(() => {
    fetchPosts();
    fetchFiles();
  }, []);

  if (!posts || !files) return null;
  if (!peoples) return null;

  return (
    <div className="Page">
      <div>
        {posts.length > 0 && (
          <div className="Post-Box">
            {posts.map(post => (
              <Post post={post} fetchPosts={fetchPosts} fetchFiles={fetchFiles} setLikedPosts={setLikedPosts} likedPosts={likedPosts}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
