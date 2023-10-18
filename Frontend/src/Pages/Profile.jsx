import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import backendIP from '../vars';
import currentUserData, { userPosts } from '../scripts/functions'

const Profile = () => {
  // Consts
  const [userData, setUserData] = useState({});
  const [subscribers, setSubscribers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [currentUser, setCurrentUser] = useState('')
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const [posts, setPosts] = useState([])
  // Custom input
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const toggleSub = async () => {
    if (localStorage.getItem('token') !== null) {
      try {
        const response = await axios.post(
          `${backendIP}/users/${id}/subscribe/`,
          null,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`
            }
          }
        );
        console.log(response.data);
        getFriends();
        getSubscribers()
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Not authorized');
    }
  }

  // Get user data
  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendIP}/users/${id}/`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Get Friends
  const getFriends = async () => {
    try {
      const response = await axios.get(`${backendIP}/users/${id}/friends/`);
      setFriends(response.data);
    } catch (error) {
      console.log('Ошибка:', error);
    }
  };

  // Get Subs
  const getSubscribers = async () => {
    try {
      const response = await axios.get(`${backendIP}/users/${id}/subscribers/`);
      setSubscribers(response.data);
    } catch (error) {
      console.log('Ошибка:', error);
    }
  };

  useEffect(() => {  
    // Refresh
    getUserData();
    getFriends();
    getSubscribers();
    currentUserData().then((data) => setCurrentUser(data)).catch((error) => console.error(error))
    userPosts(id).then((data) => setPosts(data)).catch((error) => console.error(error))
  }, []);

  // Edits
  const handleFileChangeAvatar = (e) => {
    e.stopPropagation();
    const selectedAvatar = Array.from(e.target.files);
    setAvatar(selectedAvatar[0]);
  };

  const handleFileChangeBanner = (e) => {
    e.stopPropagation();
    const selectedBanner = Array.from(e.target.files);
    setBanner(selectedBanner[0]);
  };

  // Turn on Edit Mode
  const toggleEdit = () => {
    setEditMode(!editMode);
    console.log('Edit mode enabled');
  };

  // POST
  const handleEditProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('banner', banner);
    formData.append('avatar', avatar);
    try {
      const response = await axios.post(`${backendIP}/update_profile/`, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      window.location.href = `/Profile/${userData.id}`;
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const isSubscribed = subscribers.some(subscriber => subscriber.id === currentUser.id);

  return (
    <div className="ProfilePage-Container">
      <div className="Profile">
        <div className="ProfilePage_Banner-Container">
          <img src={userData.banner} alt="Изображение баннера" />
        </div>
        <div className="ProfilePage_Avatar-Container">
          <span className="ProfilePage_Avatar">
            <img src={userData.avatar} alt="Изображение аватара" />
          </span>
        </div>
        {(currentUser.id !== parseInt(id) && localStorage.getItem('token') !== null) && (
          <div className="Subscribe-btn_Container">
            {isSubscribed && (
              <button className="Subscribe-btn" onClick={() => toggleSub()}>Отписаться</button>
            )}
            {!isSubscribed && (
              <button className="Subscribe-btn" onClick={() => toggleSub()}>Подписаться</button>
            )}
          </div>
        )}
        <div className="ProfilePage_UserInfo-Container">
          <div>
            <p>Публикации</p>
            <p>{posts.length}</p>
          </div>
          <div>
            <p>Подписчики</p>
            <p>{subscribers.length}</p>
          </div>
          <div>
            <p>Друзья</p>
            <p>{friends.length}</p>
          </div>
        </div>
        <div>
          {userData && <button onClick={toggleEdit}>Edit</button>}
        </div>

        <div className="ProfilePosts">
          {posts.length > 0 && (
            <div className="Post-Box">
            {posts.map(post => (
              <div key={post.id} className="Post-Container">
                <div className="Post-Header">
                  <button className='Post-Header_Nav' onClick={() => window.location.href = `/Profile/${post.author}/`}>
                    <span>
                      <img src={`${backendIP}${post.avatar}`} alt="Avatar" />
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
                      <img src={`${backendIP}${file.file}`} alt="Photo" key={file.id} />
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
                  <div className="Comments">
                  <p className='Comments-header'>Комментарии:</p>
                  <form key={post.id} className="CommentForm" onSubmit={() => submitComment(post.id, 'no')}>
                    <input type="text" className='CommentInput' placeholder='Введите комментарий'/>
                    <button type='submit'>Отправить</button>
                  </form>
                    {post.comments.length > 0 && (
                      <>
                        {post.comments.map(comment => (
                          <Comment key={comment.id} author={comment.author} text={comment.text}  />
                          ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

            ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="ProfilePage-Container">
  //     {editMode ? (
  //       <form>
  //         <div>
  //           <div className="ProfilePage_Banner-Container">
  //             <img src={userData.banner} alt="Изображение баннера" />
  //           </div>
  //           <div className="ProfilePage_Avatar-Container">
  //             <span className="ProfilePage_Avatar">
  //               <img src={userData.avatar} alt="Изображение аватара" />
  //             </span>
  //           </div>
  //           <hr />
  //           <div className="ProfilePage_UserInfo-Container">
  //             <div>
  //               <p>Публикации</p>
  //               <p>0</p>
  //             </div>
  //             <div>
  //               <p>Подписчики</p>
  //               <p>{subscribers.length}</p>
  //             </div>
  //             <div>
  //               <p>Друзья</p>
  //               <p>{friends.length}</p>
  //             </div>
  //           </div>
  //           <div>
  //             <p>аватар</p>
  //             <input ref={fileInputRef} type="file" onChange={handleFileChangeAvatar} />
  //             <p>Банер</p>
  //             <input ref={fileInputRef} type="file" onChange={handleFileChangeBanner} />
  //           </div>
  //         </div>
  //         <div className="Profile-ApproveNav">
  //           <button id="discard" onClick={() => setEditMode(false)}>Отменить</button>
  //           <button id="save" onClick={handleEditProfile}>Сохранить</button>
  //         </div>
  //       </form>
  //     ) : (
  //       <div className="Profile">
  //         <div className="ProfilePage_Banner-Container">
  //           <img src={userData.banner} alt="Изображение баннера" />
  //         </div>
  //         <div className="ProfilePage_Avatar-Container">
  //           <span className="ProfilePage_Avatar">
  //             <img src={userData.avatar} alt="Изображение аватара" />
  //           </span>
  //         </div>
  //         {currentUser.id !== parseInt(id) && (
  //           <div className="Subscribe-btn_Container">
  //             <button className="Subscribe-btn" onClick={() => toggleSub()}>Подписаться</button>
  //           </div>
  //         )}
  //         <div className="ProfilePage_UserInfo-Container">
  //           <div>
  //             <p>Публикации</p>
  //             <p>0</p>
  //           </div>
  //           <div>
  //             <p>Подписчики</p>
  //             <p>{subscribers.length}</p>
  //           </div>
  //           <div>
  //             <p>Друзья</p>
  //             <p>{friends.length}</p>
  //           </div>
  //         </div>
  //         <div>
  //           {userData && <button onClick={toggleEdit}>Edit</button>}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Profile;
