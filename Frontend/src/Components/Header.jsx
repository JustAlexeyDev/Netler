import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {ArrowLeft } from 'lucide-react'
import axios from 'axios';
const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  var user = '';
  var PageName = ''
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
  
  if (currentPath === '/*') {
    user = ''
  } else if (currentPath === `/Profile/${userData.id}/`) {
    user = userData.username
  } else if (currentPath === '/AddPost') {
    user = '';
    PageName = 'Новый пост'
  }
  return(
    <div className="Header_Container">
      <div className="Header_Content">
        <span className='pointer'>
          <ArrowLeft onClick={() => {window.history.back()}} />
        </span>
        <span className='Header_Name'>
          {user}
          {PageName}
        </span>
        <span className='Header_Avatar'>

        </span>
      </div>
    </div>
  );
}
export default Header;