import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const postsURL = 'http://127.0.0.1:8000/posts/?format=json';
const imagesURL = 'http://127.0.0.1:8000/posts_files/';

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [files, setFiles] = useState(null);

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
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
          `http://127.0.0.1:8000/posts/${parseInt(post_id)}/like/`,
          null,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`
            }
          }
        );
        console.log(response.data);
        var toggleLikeIcon = document.getElementById('likeIcon');
        toggleLikeIcon.setAttribute('fill', '#fff')
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Not authorized');
    }
  };

  if (!posts || !files) return null;

  return (
    <div className="Page">
      <div>
        {posts.length > 0 && (
          <div className="Post-Box">
            {posts.map(post => (
              <div key={post.id} className="Post-Container">
                <div className="Post-Header">
                  <span><img src={post.avatar} alt="Avatar" /></span>
                  <span>{post.author_name}</span>
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
                        <ThumbsUp         
                          style={{ fill: isLiked ? 'white' : '' }}
                          onClick={handleLikeClick}
                        />
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
