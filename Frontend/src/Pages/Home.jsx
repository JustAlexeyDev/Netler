import {ThumbsUp, MessageSquare, Share2 } from 'lucide-react'

// Import React Libs
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
// Vars
const postsURL = 'http://127.0.0.1:8000/posts/?format=json';
const imagesURL = 'http://127.0.0.1:8000/posts_files/'
// Render
const Home = () => {
  const [posts, setPosts] = useState(null);
  const [files, setFiles] = useState(null);
  useEffect(() => {
    axios.get(postsURL).then((response) => {
      setPosts(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(imagesURL).then((response) => {
      setFiles(response.data);
    });
  }, []);
  console.log(posts);
  if (!posts) return null;
  if (!files) return null;

  const toggleLike = async (post_id) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/users/" + post_id + "/like");
      // Обработка успешной регистрации
      console.log(response.data);
    } catch (error) {
      // Обработка ошибок регистрации
      console.error(error);
    }
  }

  // Page
  return(
    <div className="Page">
      <div>
        {posts.length > 0 && (
          <div className="Post-Box">
            {posts.map(post => (
              <div id={post.id} className="Post-Container">
                <div className="Post-Header">
                  <span><img src={post.avatar}/></span>
                  <span>{post.author_name}</span>
                </div>
                <hr />
                {post.files.length > 0 && (
                  <div className='Post-image'>
                    {post.files.map(file => (
                      <img src={file.file} alt='Photo'/>
                    ))}
                  </div>
                )}
                <hr />
                <div className="Post-Nav">
                  <span className='center'>
                    <div className='center'>
                      <button>
                        <ThumbsUp onClick={() => toggleLike(post.id)}/>                      
                      </button>
                      {post.likes.length}                      
                    </div>
                    <div className='center'>
                      <button>
                        <MessageSquare />
                      </button>
                    </div>
                    <div className='center'>
                      <button>
                        <Share2 />                        
                      </button>
                    </div>
                  </span>
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