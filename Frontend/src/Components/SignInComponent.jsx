import React, { useState } from 'react';
import axios from 'axios';

const SignInComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignInComponent;