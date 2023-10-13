// Import Icons
import HomeIcon from '../Assets/Icons/homeIcon.svg';
import FriendsIcon from '../Assets/Icons/friendsIcon.svg';
import AddPost from '../Assets/Icons/addPostIcon.svg';
import notificationIcon from '../Assets/Icons/notificationIcon.svg';
// Import React Libs
import { Link } from 'react-router-dom';

const Footer = () => {
  return(
    <div className="Footer_Container">
      <Link to='/Home'>
        <img src={HomeIcon} alt="Home" />
      </Link>
      <Link to='/'>
        <img src={FriendsIcon} alt="frends" />
      </Link>
      <Link to='/'>
        <img src={AddPost} alt="addPost" />
      </Link>
      <Link to='/'>
        <img src={notificationIcon} alt="notification" />
      </Link>
      <Link to='/'>
        <img alt="profile" />
      </Link>
    </div>
  );
}
export default Footer