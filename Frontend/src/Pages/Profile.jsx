import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Profile = () => {
  // const userDataURL = 'http://127.0.0.1:8000/get_user/';
  const [userData, setUserData] = useState({});
  const [subscribers, setSubscribers] = useState({});
  const [friends, setFriends] = useState({});
  
  const {id} = useParams();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/${id}/`,
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      };
    };

    const getFriends = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/${id}/friends/`);
        setFriends(response.data);
      } catch (error) {
        console.log('Ошибка:', error);
      }
    };

    const getSubscribers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/${id}/subscribers/`);
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

  return (
    <div className="ProfilePage-Container">
      <div className="ProfilePage_Banner-Container">
        <img src={banner} alt="Изображение баннера"/>
      </div>
      <div className="ProfilePage_Avatar-Container">
        <span className="ProfilePage_Avatar">
          <img src={avatar} alt="Изображение аватара" />          
        </span>
      </div>
        <div className="ProfilePage_UserInfo-Container">
          <div>
            <p>Публикации</p>
            <p></p>
          </div>
          <div>
            <p>Подписчики</p>
            <p>{subscribers.length}</p>
          </div>
          <div>
            <p>Подписки</p>
            <p></p>
          </div>
          <div>
            <p>Друзья</p>
            <p>{friends.length}</p>
          </div>
        </div>
      </div>  
  );
}

export default Profile;
