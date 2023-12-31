import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import LogoBanner from '../Assets/Icons/LogoBanner.svg';
import backendIP from '../vars'
const LoginIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  
  const handleLogin = async (e) => { // Добавляем параметр e для предотвращения перезагрузки страницы при отправке формы
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    try {
      const response = await axios.post(
        `${backendIP}/auth/token/login/`,
        { 
          username: username,
          password: password,
        }
      );
      const token = response.data.auth_token;
      localStorage.setItem('token', token);
      console.log(response);
      window.location.href=`/Home`
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (token !== null) {
      window.location.href=`/Home`
    }
  }, [token, navigate]);

  return (
    <div className='LoginPage'>
      <div className='Page LoginPage_Container'>
        <div className="LoginPage_Banner">
          <img width={200} src={LogoBanner} alt="Banner" />
        </div>   
        <form onSubmit={handleLogin} className='LoginForm_Inputs'>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="LoginForm_ifAccount">
            <p>Нет аккаунта?</p>
            <button onClick={() => {navigate('/Auth')}}>Зарегистрироваться</button>
          </div>
          <span className='buttonSubmit'>
          <button type="submit">Войти</button>         
          </span>

        </form>
      </div>      
    </div>

  );
};

export default LoginIn;