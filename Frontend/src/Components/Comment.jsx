import React, { useState, useEffect } from "react";
import { userData } from "../scripts/functions";

const Comment = ({ author, text }) => {
  const [authorData, setAuthorData] = useState({});

  useEffect(() => {
    userData(author)
    .then((data) => setAuthorData(data))
    .catch((error) => console.error(error))
  }, [])

  return (
    <div className="Comment">
      <div className="CommentAuthor">{authorData.username}:</div>
      <p>{text}</p>
    </div>
  );
};

export default Comment;
