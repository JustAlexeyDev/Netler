import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
const SignUpComponent = () => {

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch('http://10.40.4.189:8000/auth/users/', requestOptions)
        .then(response => response.json())
        .then(data => setPostId(data.id));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

  return(
    <div>
      <form method="POST" action="" className="LoginForm">
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