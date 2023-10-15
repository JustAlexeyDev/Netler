import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  let pageTitle = '';

  if (currentPath === '/Profile') {
    pageTitle = 'Профиль'
  } else {
    pageTitle = ''
  }
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
    <div className="Header_Container">
      <div className="Header_Content">
        <span>
          {pageTitle}
        </span>
        <span>{userData.username}</span>
        <span className='Header_Avatar'>
          <Link to='Profile'>
            <img src={avatar} alt="profile" />
          </Link>
        </span>
      </div>
    </div>
  );
}
export default Header;