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
          console.log('Ошибка:', error);
        }
      } else {
        console.log('Не авторизован');
      }
    };
    getUserData();
  }, [userDataURL]);
  const avatar = 'http://127.0.0.1:8000' + userData.avatar;

  return (
    <div className="ProfilePage-Container">
      <div className="ProfilePage_Banner-Container">
        <img src={userData.banner} alt="Изображение баннера"/>
      </div>
      <div className="ProfilePage_Avatar-Container">
        <span className="ProfilePage_Avatar">
          <img src={avatar} alt="Изображение аватара" />          
        </span>
        <div className="ProfilePage_UserInfo-Container">
          <p>{userData.username}</p>
        </div>
      </div>  
    </div>
  );
}

export default Profile;
