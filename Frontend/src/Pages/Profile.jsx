import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
 const userURL = 'http://127.0.0.1:8000/users/1'
 const [userData, setUserData] = useState(null);
 useEffect(() => {
  axios.get(userURL).then((response) => {
    setUserData(response.data);
  });
 }, []);
 return(
  <div className="Page">
   <div className="Profile-Banner">
    <img 
     className="Prifile-Banner_image" 
     alt="banner" 
    />
   </div>
   <div>
    
   </div>
  </div>
 );
}
export default Profile;