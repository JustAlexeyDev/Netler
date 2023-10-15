import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import LogoBanner from '../Assets/Icons/LogoBanner.svg';
const LoginIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => { // Добавляем параметр e для предотвращения перезагрузки страницы при отправке формы
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/token/login/',
        { 
          username: username,
          password: password,
        }
      );
      const token = response.data.auth_token;
      localStorage.setItem('token', token);
      console.log(response);
      navigate('/Home')
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
        <span className='buttonSubmit'>
         <button type="submit">Войти</button>         
        </span>

      </form>
    </div>
  );
};

export default LoginIn;