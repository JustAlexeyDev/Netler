import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const Auth = () => {
  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  
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

  // Navigate hook for redirecting after successful registration
  const navigate = useNavigate();

  // Handle registration form submission
  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object and append form data
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar);

      // Make a POST request to register the user
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/users/', formData);
      console.log(response.data);

      // Redirect to the login page after successful registration
      navigate('/Home');
    } catch (error) {
      console.error(error);
    }
  };

  // Render the login form
  return (
    <div className='LoginPage_Container'>

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
};

export default Auth;
