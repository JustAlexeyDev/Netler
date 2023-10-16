import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import LogoBanner from '../Assets/Icons/LogoBanner.svg';

const Auth = () => {
  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/token/login/', {
        username: username,
        password: password,
      });
      const token = response.data.auth_token;
      localStorage.setItem('token', token);
      setToken(localStorage.getItem('token'));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar);

      const response = await axios.post('http://127.0.0.1:8000/auth/users/', formData);
      console.log(response.data);
      navigate('/Home');
    } catch (error) {
      if (error.response.data.email) {
        setError(error.response.data.email)
      }
      if (error.response.data.password) {
        setError(error.response.data.password)
      }
    }
  };

  useEffect(() => {
    if (token !== null) {
      navigate('/Home');
    }
  }, [token, navigate]);

  return (
    <div className="LoginPage">
      <div className='LoginPage_Container'>
        <div className="LoginPage_Banner">
          <img width={200} src={LogoBanner} alt="Banner" />
        </div>
        <form onSubmit={handleRegistration} className='LoginForm'>
          <div className='LoginForm_Inputs'>
            <input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="file" alt="avatar" onChange={(e) => setAvatar(e.target.files[0])} required />
          </div>
          <div className="LoginForm_ifAccount">
            <p>Уже есть аккаунт?</p>
            <button onClick={() => {navigate('/LoginIn')}}>Войти</button>
          </div>
          <span>
            <p key="loginError">{error}</p>
          </span>
          <span>
            <button className='buttonSubmit' type="submit">Регистрация</button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Auth;
