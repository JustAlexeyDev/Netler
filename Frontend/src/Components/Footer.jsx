// Import Icons
import HomeIcon from '../Assets/Icons/homeIcon.svg';
import FriendsIcon from '../Assets/Icons/friendsIcon.svg';
import AddPost from '../Assets/Icons/addPostIcon.svg';
import NotificationIcon from '../Assets/Icons/notificationIcon.svg';
// Import React Libs
import { Link } from 'react-router-dom';


const Footer = () => {


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