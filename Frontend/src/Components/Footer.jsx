import HomeIcon from '../Assets/Icons/homeIcon.svg';
import FriendsIcon from '../Assets/Icons/friendsIcon.svg';
import AddPost from '../Assets/Icons/addPostIcon.svg';
import NotificationIcon from '../Assets/Icons/notificationIcon.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

import backendIP from '../vars'
import currentUserData from '../scripts/functions';

const Footer = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    currentUserData()
    .then((value) => setUserData(value))
    .catch((error) => console.log(error))
  }, []);

  if (!userData) return null;

  const avatar = `${backendIP}` + userData.avatar;
  const profileLink = `/Profile/${userData.id}/`;

  return (
    <div className="Footer">
      <div className='Footer_Container'>
        <Link to='/Home'><img src={HomeIcon} alt='icon'/></Link>
        <Link to='/PeopleList'><img src={FriendsIcon} alt='icon'/></Link>
        <Link to='/AddPost'><img src={AddPost} alt='icon'/></Link>
        <Link to='/Notifications'><img src={NotificationIcon} alt='icon'/></Link>
        <a href={profileLink} className='Footer_Avatar'>
          <img src={avatar} alt="profile" /> 
        </a>
      </div>
    </div>
  );
}

export default Footer;
