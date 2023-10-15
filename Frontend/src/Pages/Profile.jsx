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
    <div className="ProfilePage-Container">
      <div className="ProfilePage_Banner-Container">
        <img src={userData.banner} alt="Banner_image"/>
      </div>
      <div className="ProfilePage_Avatar-Container">
        <img src={userData.avatar} alt="Avatar_image" />
      </div>  
      <div className="ProfilePage_UserInfo-Container">

      </div>
    </div>
  );
}

export default Profile;
