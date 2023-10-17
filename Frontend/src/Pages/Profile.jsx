import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import backendIP from '../vars'

const Profile = () => {
  // const userDataURL = `${backendIP}/get_user/';
  const [userData, setUserData] = useState({});
  const [subscribers, setSubscribers] = useState({});
  const [friends, setFriends] = useState({});
  const [editMode, setEditMode] = useState(false); // Track editing mode

  const { id } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${backendIP}/users/${id}/`);
        setUserData(response.data);
        // Add Window restart
      } catch (error) {
        console.error(error);
      }
    };

    const getFriends = async () => {
      try {
        const response = await axios.get(`${backendIP}/users/${id}/friends/`);
        setFriends(response.data);
      } catch (error) {
        console.log('Ошибка:', error);
      }
    };

    const getSubscribers = async () => {
      try {
        const response = await axios.get(`${backendIP}/users/${id}/subscribers/`);
        setSubscribers(response.data);
      } catch (error) {
        console.log('Ошибка:', error);
      }
    };

    getUserData();
    getFriends();
    getSubscribers();
  }, []);

  const avatar = userData.avatar;
  const banner = userData.banner;

  const handleEditProfile = () => {
    // Implement your logic for editing the profile here
    setEditMode(true);
  };

  return (
    <div className="ProfilePage-Container">
      <div className="ProfilePage_Banner-Container">
        <img src={banner} alt="Изображение баннера" />
      </div>
      {editMode ? (
        <div>
          {/* Render edit profile form here */}
          <button onClick={() => setEditMode(false)}>Cancel</button>
          <button>Save</button>
        </div>
      ) : (
        <div>
          <div className="ProfilePage_Avatar-Container">
            <span className="ProfilePage_Avatar">
              <img src={avatar} alt="Изображение аватара" />
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
            {userData && (
              <button onClick={handleEditProfile}>Edit Profile</button>
            )}            
          </div>

        </div>
      )}
    </div>
  );
};

export default Profile;
