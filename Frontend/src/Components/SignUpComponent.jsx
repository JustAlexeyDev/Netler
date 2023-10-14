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
      // Обработка успешной регистрации
      console.log(response.data);
    } catch (error) {
      // Обработка ошибок регистрации
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/users/', { username, email, password, avatar });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div>
      <form onSubmit={handleRegistration}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default SignUpComponent;