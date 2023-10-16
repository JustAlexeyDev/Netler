import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import backendIP from '../vars';

const postsURL = `${backendIP}/posts/?format=json`;
const imagesURL = `${backendIP}/posts_files/`;

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [files, setFiles] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();
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

  const handleLikeClick = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(postsURL);
      setPosts(response.data);
    };

    const fetchFiles = async () => {
      const response = await axios.get(imagesURL);
      setFiles(response.data);
    };

    const interval = setInterval(() => {
      fetchPosts();
      fetchFiles();
    }, 500);

    fetchPosts();
    fetchFiles();

    return () => clearInterval(interval);
  }, []);

  const toggleLike = async (post_id) => {
    if (localStorage.getItem('token') !== null) {
      try {
        const response = await axios.post(
          `${backendIP}/posts/${parseInt(post_id)}/like/`,
          null,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`
            }
          }
        );
        console.log(response.data);
        handleLikeClick(post_id); // Toggle the like state for the specific post
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Not authorized');
    }
  };

  if (!posts || !files) return null;
  if (!peoples) return null;

  return (
    <div className="Page">
      <div>
        {posts.length > 0 && (
          <div className="Post-Box">
            {posts.map(post => (
              <div key={post.id} className="Post-Container">
                <div className="Post-Header">
                  <span>
                    <img src={post.avatar} alt="Avatar" />
                  </span>
                  <span onClick={() => window.location.href = `/Profile/${post.author}/`}>
                    {post.author_name}
                  </span>
                </div>
                <hr />
                {post.files.length > 0 && (
                  <div className="Post-image">
                    {post.files.map(file => (
                      <img src={file.file} alt="Photo" key={file.id} />
                    ))}
                  </div>
                )}
                <hr />
                <div className="Post-Nav">
                  <div className="center">
                    <button onClick={() => toggleLike(post.id)}>
                      <ThumbsUp fill={likedPosts.includes(post.id) ? '#fff' : ' '} />
                    </button>
                    {post.likes.length}
                  </div>
                  <div className="center">
                    <button>
                      <MessageSquare />
                    </button>
                  </div>
                  <div className="center">
                    <button>
                      <Share2 />
                    </button>
                  </div>
                </div>
                <div className="Post-Description">
                  <span>{post.description}</span>
                  {/* <span>{post.views} views</span> Перекинуть эту строчку в отдельный класс */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
