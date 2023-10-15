import { useState } from "react";
import axios from "axios";
import React from "react";

const postSendURL = 'http://127.0.0.1:8000/create_post/' 
const AddPost = () => {
    const [desc, setDesc] = useState('');
    const [files, setFiles] = useState('');

    const sendPost = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('files', files)
            formData.append('description', desc)
            console.log(formData)
            const response = await axios.post(
                postSendURL,
                formData,
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                },
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="Page">
            <form onSubmit={sendPost}>
                <input 
                    type="file"
                    placeholder="Фотографии" 
                    // value={files}
                    onChange={(e) => Array.from(e.target.files)} 
                    multiple
                />
                <input 
                    type="text"
                    placeholder="Описание" 
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)} 
                />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}
export default AddPost;