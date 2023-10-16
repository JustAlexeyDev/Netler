import { useState, useEffect } from "react";
import { userData } from "../scripts/functions";

const Comment = ({author, text}) => {
    const [authorData, setAuthorData] = useState({})

    useEffect(() => {
        userData(author)
        .then((value) => setAuthorData(value))
        .catch((error) => console.error(error))
    }, []);

    return(
        <div className="Comment">
        <p>{authorData.username}: {text}</p>
        </div>
    );
}
export default Comment;