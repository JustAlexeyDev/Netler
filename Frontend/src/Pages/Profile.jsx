import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
 const userURL = 'http://127.0.0.1:8000/users/1/'
 const [userData, setUserData] = useState({});
 useEffect(() => {
  axios.get(userURL).then((response) => {
    setUserData(response.data);
  });
 }, []);
 console.log(userData.username)
 console.log(userData.avatar)
 return(
  <div className="ProfilePage">
   <div className="Profile-Banner">
    <img 
     className="Prifile-Banner_image" 
     alt="banner" 
     src={userData.avatar}
    />
   </div>
   <div>
    <img 
      className="Prifile-Avatar_image" 
      alt="banner" 
      src={userData.avatar}
     />
   </div>
   <div>
    {userData.username}
   </div>
  </div>
 );
}
export default Profile;