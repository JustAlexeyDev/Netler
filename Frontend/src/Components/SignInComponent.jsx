import React, { useState } from 'react';
import axios from 'axios';
const SignInComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/users/', {
        email,
        password,
      });

      // Обработка успешного входа в систему
      console.log(response.data);
    } catch (error) {
      // Обработка ошибок входа в систему
      console.error(error);
    }
  };

  return(
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
}
export default SignInComponent;