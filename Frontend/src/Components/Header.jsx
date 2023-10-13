import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  let pageTitle = '';

  if (currentPath === '/') {
    pageTitle = 'Главная';
  } else if (currentPath === '/Home') {
    pageTitle = 'Главная';
  } 
  return(
    <div className="Header_Container">
      <div className="Header_Content">
        <span>
          {pageTitle}
        </span>
        <span className='Header_Avatar'>
          <button>
            <img alt="profile" />
          </button>
        </span>
      </div>
    </div>
  );
}
export default Header;