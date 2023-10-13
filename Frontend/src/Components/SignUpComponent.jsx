// Impoer React Libs
import React, { useState } from 'react';

import {Link} from 'react-router-dom';
import axios from "axios";
const SignUpComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/users/', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); 
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/users/', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return(
    <div>
      <form className="LoginForm">
        <div className="LoginForm_Inputs">
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="LoginPage_Options">
          <div className="LoginPage_Options-Inputs">
            <input type="checkbox" id="" />
            <p>Запомнить</p>
          </div>
          <Link>Забыли пароль</Link>
        </div>
        <div className="buttonSubmit_Container">
          <span className="buttonSubmit">
            <button onClick={handleRegistration}>Зарегистрироваться</button>
          </span>          
        </div>
      </form>
    </div>
  );
}
export default SignUpComponent;