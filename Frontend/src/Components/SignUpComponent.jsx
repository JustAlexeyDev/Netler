// Impoer React Libs
import React, { useState } from 'react';
import axios from 'axios';

const SignUpComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);


  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar);

      const response = await axios.post('http://127.0.0.1:8000/auth/users/', formData);
        // const token = response.data.auth_token;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/token/login/', { username, password });
      const token = response.data.auth_token;
      localStorage.setItem('token', token);
      axios.get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Token ${token}`
        }
      })
        .then(response => {
          console.log('yay')
        })
        .catch(error => {
          console.log(error);
        });
      console.log(response.data);
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
        <span className='buttonSubmit'><button type="submit">Регистрация</button></span>
        
      </form>
    </div>
  );
}
export default SignUpComponent;