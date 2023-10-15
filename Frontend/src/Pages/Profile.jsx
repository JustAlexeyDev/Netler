import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const userDataURL = 'http://127.0.0.1:8000/get_user/';
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(userDataURL, {
            headers: {
              Authorization: `Token ${token}`
            }
          });
          setUserData(response.data);
        } catch (error) {
          console.log('Error:', error);
        }
      } else {
        console.log('Not authorized');
      }
    };
    getUserData();
  }, [userDataURL]);

  return (
    <div className="ProfilePage">
      <div className="Profile-Banner">
        <img 
          className="Profile-Banner_image" 
          alt="banner" 
          src={userData.banner}
        />
      </div>
      <div className="Profile-Avatar">
        <img 
          className="Profile-Avatar_image" 
          alt="avatar" 
          src={userData.avatar}
        />
      </div>
      <div className="Profile-UserInfo">
        {userData.username}
      </div>
    </div>
  );
}

export default Profile;
