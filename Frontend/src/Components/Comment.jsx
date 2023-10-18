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
      <space className="CommentAuthor">{authorData.username}:</space>
      <p>{text}</p>
    </div>
  );
};

export default Comment;
