import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  let pageTitle = '';

  if (currentPath === '/') {
    pageTitle = 'Главная';
  } else if (currentPath === '/Home') {
    pageTitle = 'Главная';
  } else if (currentPath === '/Profile') {
    pageTitle = 'Профиль'
  }
  return(
    <div className="Header_Container">
      <div className="Header_Content">
        <span>
          {pageTitle}
        </span>
        <span className='Header_Avatar'>
          <Link to='Profile'>
            <img alt="profile" />
          </Link>
        </span>
      </div>
    </div>
  );
}
export default Header;