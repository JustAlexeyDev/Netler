// Import React Lins
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import axios from "axios";
// Import Components
import Comments from '../Components/Comments';
// Other
import backendIP from '../vars';
const Post = ({post, fetchPosts, setLikedPosts, likedPosts, fetchFiles}) => {
    const handleLikeClick = (postId) => {
        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter(id => id !== postId));
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
    };

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
            fetchPosts();
            fetchFiles();
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('Not authorized');
        }
      };

    return (
        <div key={post.id} className="Post-Container">
            <div className="Post-Header">
                <button className='Post-Header_Nav' onClick={() => window.location.href = `/Profile/${post.author}/`}>
                <span>
                    {post.avatar.startsWith('http') && (
                        <img src={post.avatar} alt="Avatar" />
                    )}
                    {!post.avatar.startsWith('http') && (
                        <img src={`${backendIP}${post.avatar}`} alt="Avatar" />
                    )}
                </span>
                <span>
                    {post.author_name}
                </span>                    
                </button>
            </div>
            <hr />
            {post.files.length > 0 && (
                <div className="Post-image">
                {post.files.map(file => (
                    <>
                    {file.file.startsWith('http') && (
                        <img src={file.file} alt="Photo" key={file.id} />
                    )}
                    {!file.file.startsWith('http') && (
                        <img src={`${backendIP}${file.file}`} alt="Photo" key={file.id} />
                    )}
                    </>
                ))}
                </div>
            )}
            <hr />
            <div className="Post-Nav">
                <div className="center">
                <button onClick={() => toggleLike(post.id)}>
                    <ThumbsUp />
                </button>
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
                <p>Лайки: {post.likes.length}</p>
                <span>{post.description}</span>
            </div>
            <div>
                <Comments post={post} fetchPosts={fetchPosts}/>
            </div>
        </div>
    )
}

export default Post 