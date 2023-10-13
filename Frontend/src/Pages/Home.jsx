import {ThumbsUp, MessageSquare, Share2 } from 'lucide-react'

// Import React Libs
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
// Vars
const postsURL = 'http://127.0.0.1:8000/posts/?format=json';
// Render
const Home = () => {
  const [posts, setPosts] = useState(null);
  const [files, setFiles] = useState(null);
  useEffect(() => {
    axios.get(postsURL).then((response) => {
      setPosts(response.data);
      setFiles(response.data);
    });
  }, []);
  console.log(posts);
  if (!posts) return null;
  if (!files) return null;
  // Page
  return(
    <div className="Page">
      <div>
        {posts.length > 0 && (
          <div className="Post-Box">
            {posts.map(post => (
              <div className="Post-Container">
                <div className="Post-Header">
                  <span><img src={post.avatar}/></span>
                  <span>{post.author_name}</span>
                </div>
                {files.length > 0 && (
                  <div>
                    {files.map(file => (
                      <div>
                        <img src={file.file} />
                      </div>
                    ))}
                  </div>
                )}
                <div className="Post-Nav">
                  <span className='center'>
                    <div className='center'>
                      <button>
                        <ThumbsUp />                      
                      </button>
                      {post.likes}                      
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