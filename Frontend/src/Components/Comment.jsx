import { useState, useEffect } from "react";
import getUserData from "../scripts/functions";

const Comment = ({author, likes, text}) => {
 return(
  <div className="Comment">
   <p>{author}: {text}</p>
   <p>{likes.length}</p>
  </div>
 );
}
export default Comment;