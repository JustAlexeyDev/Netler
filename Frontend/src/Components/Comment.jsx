import React, { useState, useEffect } from "react";
import axios from "axios";
import backendIP from "../vars";
const Comment = ({ author, text }) => {
  const [authorData, setAuthorData] = useState({});

  const handleComment = async (e) => { // Добавляем параметр e для предотвращения перезагрузки страницы при отправке формы
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    try {
      const response = await axios.post(
        `${backendIP}//`,
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
    <div className="Comment">
      <form onSubmit={handleComment}>
        <input
          type="text"
          placeholder="Комментарий"
          value={text}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Отпраить</button>
      </form>
      <p>{authorData.username}: {text}</p>
    </div>
  );
};

export default Comment;
