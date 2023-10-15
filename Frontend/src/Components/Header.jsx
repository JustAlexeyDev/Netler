import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  let pageTitle = '';
  let user = '';

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
    pageTitle = '',
    user = ''
  } else if (currentPath === `/Profile/${userData.id}/`) {
    pageTitle = 'Профиль',
    user = userData.username
  } else {
    pageTitle = ''
  }
  return(
    <div className="Header_Container">
      <div className="Header_Content">
        <span>
          {pageTitle}
        </span>
        <span className=''>
          {user}
        </span>
        <span className='Header_Avatar'>

        </span>
      </div>
    </div>
  );
}
export default Header;