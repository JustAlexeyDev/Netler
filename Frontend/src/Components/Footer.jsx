// Import Icons
import HomeIcon from '../Assets/Icons/homeIcon.svg';
import FriendsIcon from '../Assets/Icons/friendsIcon.svg';
import AddPost from '../Assets/Icons/addPostIcon.svg';
import NotificationIcon from '../Assets/Icons/notificationIcon.svg';
// Import React Libs
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import {Home, Users2, Plus, Bell} from 'lucide-react';
const userDataURL = 'http://127.0.0.1:8000/get_user/';
const Footer = () => {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        const response = await axios.get(userDataURL, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data);
      } else {
        console.log('Not authorized')
      }
    };
    getUserData();
  }, []);

  return(
    <div className="Footer">
      <div className='Footer_Container'>
        <Link to='/Home'><img src={HomeIcon} alt='icon'/></Link>
        <Link to='/PeopleList'><img src={FriendsIcon} alt='icon'/></Link>
        <Link to='/AddPost'><img src={AddPost} alt='icon'/></Link>
        <Link to='/Notifications'><img src={NotificationIcon} alt='icon'/></Link>    
        <Link to='/Profile'>Profile</Link>    
      </div>
    </div>
  );
}
export default Footer