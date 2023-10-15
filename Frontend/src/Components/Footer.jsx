// Import Icons
import HomeIcon from '../Assets/Icons/homeIcon.svg';
import FriendsIcon from '../Assets/Icons/friendsIcon.svg';
import AddPost from '../Assets/Icons/addPostIcon.svg';
import NotificationIcon from '../Assets/Icons/notificationIcon.svg';
// Import React Libs
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Footer = () => {
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

  return(
    <div className="Footer">
      <div className='Footer_Container'>
        <Link to='/Home'><img src={HomeIcon} alt='icon'/></Link>
        <Link to='/PeopleList'><img src={FriendsIcon} alt='icon'/></Link>
        <Link to='/AddPost'><img src={AddPost} alt='icon'/></Link>
        <Link to='/Notifications'><img src={NotificationIcon} alt='icon'/></Link>    
        
        <Link to='/Profile' className='Footer_Avatar'>
          <img src={avatar} alt="profile" /> 
        </Link>
      </div>
    </div>
  );
}
export default Footer