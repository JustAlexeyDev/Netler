import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { w3cwebsocket as WebSocket } from 'websocket';

// WebSocket connection
const ws = new WebSocket('ws://127.0.0.1:8000/ws/');

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // WebSocket message handler
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);

      // Check if the WebSocket message type is for like update
      if (data.type === 'like_update') {
        const updatedPosts = posts.map(post => {
          if (post.id === data.post_id) {
            // Update the likes count for the specific post
            return { ...post, likes: data.likes_count };
          }
          return post;
        });

        setPosts(updatedPosts);
      }
    };
  }, [posts]); // Update the effect when posts change

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/posts/?format=json').then((response) => {
      setPosts(response.data);
    });
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

        // Send WebSocket message for like update
        ws.send(JSON.stringify({ type: 'like_update', post_id }));

      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Not authorized');
    }
  };

  if (!posts) return null;


  return(
    <div className="Page">
      <div>
        {posts.length > 0 && (
          <div className="Post-Box">
            {posts.map(post => (
              <div key={post.id} className="Post-Container">
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
                    <button onClick={() => toggleLike(post.id)}>
                      <ThumbsUp />
                      {post.likes}
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
                   <span>{post.description}</span>
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