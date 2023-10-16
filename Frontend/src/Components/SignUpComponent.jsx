// Impoer React Libs
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUpComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar);

      const response = await axios.post(`http://${location.hostname}:8000/auth/users/`, formData);
        const token = response.data.auth_token;
        console.log(response.data);
        navigate('/LoginIn')
      } catch (error) {
        console.error(error);
      }
    };

  return(
    <div className='LoginPage_Container'>
      <form onSubmit={handleRegistration} className='LoginForm'>
        <div className='LoginForm_Inputs'>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="file"
            alt="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
            required
          />          
        </div>
        <span><button className='buttonSubmit' type="submit">Регистрация</button></span>
        
      </form>
    </div>
  );
}
export default SignUpComponent;