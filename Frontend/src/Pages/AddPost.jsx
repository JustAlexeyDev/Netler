import React, { useState, useRef } from 'react';
import axios from 'axios';
import backendIP from '../vars';

const postSendURL = `${backendIP}/create_post/`;

const AddPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [desc, setDesc] = useState('');
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting && desc.trim() !== '') { // Add validation check for non-empty description
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append('files', file);
        });
        formData.append('description', desc);
        const response = axios.post(postSendURL, formData, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response);
      } catch (error) {
        console.error(error);
        alert('Вы не авторизованы');
      }
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000); // Set your desired delay time in milliseconds
    }
  };

  const handleFileChange = (event) => {
    event.stopPropagation();
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const sendPost = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('description', desc);
      const response = axios.post(postSendURL, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      naviagte('/Home');
    } catch (error) {
      console.error(error);
      alert('Вы не авторизованы');
    }
  };

  return (
    <div className="Page">
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple />
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
