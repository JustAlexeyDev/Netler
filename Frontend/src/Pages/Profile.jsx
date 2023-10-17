import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import backendIP from '../vars';

const Profile = () => {
  // Consts
  const [userData, setUserData] = useState({});
  const [subscribers, setSubscribers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const { id } = useParams();

  // Get user data
  useEffect(() => {
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

    // Refresh
    getUserData();
    getFriends();
    getSubscribers();
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

  return (
    <div className="ProfilePage-Container">
      {editMode ? (
        <form>
          <div>
          <div className="ProfilePage_Banner-Container">
            <img src={userData.banner} alt="Изображение баннера" />
          </div>
            <div className="ProfilePage_Avatar-Container">
              <span className="ProfilePage_Avatar">
                <img src={userData.avatar} alt="Изображение аватара" />
              </span>
            </div>
            <hr />
            <div className="ProfilePage_UserInfo-Container">
              <div>
                <p>Публикации</p>
                <p>0</p>
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
              <p>аватар</p>
              <input 
                ref={fileInputRef} 
                type="file" 
                onChange={handleFileChangeAvatar} 
              />
              <p>Банер</p>
              <input 
                ref={fileInputRef}
                type="file"
                onChange={handleFileChangeBanner}
              />
            </div>
          </div>
          <button onClick={() => setEditMode(false)}>Cancel</button>
          <button onClick={handleEditProfile}>Save</button>
        </form>
      ) : (
        <div>
          <div className="ProfilePage_Banner-Container">
            <img src={userData.banner} alt="Изображение баннера" />
          </div>
          <div className="ProfilePage_Avatar-Container">
            <span className="ProfilePage_Avatar">
              <img src={userData.avatar} alt="Изображение аватара" />
            </span>
          </div>
          <hr />
          <div className="ProfilePage_UserInfo-Container">
            <div>
              <p>Публикации</p>
              <p>0</p>
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
        </div>
      )}
    </div>
  );
};

export default Profile;
