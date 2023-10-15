import { useState, useEffect } from "react";
import axios from "axios";
import React, { useRef } from 'react';

const postSendURL = 'http://127.0.0.1:8000/create_post/' 
const AddPost = () => {
    const [desc, setDesc] = useState('');
    const [files, setFiles] = useState('');

    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
  
    const handleBrowseClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
    };

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
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="Page">
            <form onSubmit={sendPost} method="POST">
            <div>
            <button onClick={handleBrowseClick}>Выбрать файлы</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                multiple
            />
            <ul>
                {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
                ))}
            </ul>
            </div>
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