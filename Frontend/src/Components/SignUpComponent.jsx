// Impoer React Libs
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
const SignUpComponent = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const userSignUp = async (credentials) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/users/', credentials);
      localStorage.setItem('token', response.data.auth_token);
    } catch(error) {
      console.log(error)
    }
  }
  // Auth request
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('', {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div>
      <form method="POST" className="LoginForm">
        <div className="LoginForm_Inputs">
          <input 
            type="text"
            placeholder="Электронная почта" 
            id="Email"
            required
          />
          <input 
            type="Password" 
            placeholder="Пароль"
            id="Password" 
            required
          />
          <input 
            type="Password" 
            placeholder="Подтвердите пароль"
            id="PasswordSubmit" 
            required
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
            <button type="submit">Зарегистрироваться</button>
          </span>          
        </div>
      </form>
    </div>
  );
}
export default SignUpComponent;