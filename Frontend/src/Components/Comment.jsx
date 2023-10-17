import React, { useState, useEffect } from "react";
import axios from "axios";
import backendIP from "../vars";
const Comment = ({ author, text }) => {
  const [authorData, setAuthorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(backendIP + author);
        setAuthorData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [author]);

  return (
    <div className="Comment">
      <p>{authorData.username}: {text}</p>
    </div>
  );
};

export default Comment;
