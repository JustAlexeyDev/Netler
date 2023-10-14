import { useEffect, useState } from "react";
import axios from "axios";
const AddPost = () => {
 const [selectedFile, setSelectedFile] = useState(null);

 const handleFileChange = (event) => {
   setSelectedFile(event.target.files[0]);
 };

 const handleSubmit = (event) => {
   event.preventDefault();

   const formData = new FormData();
   formData.append('file', selectedFile);

   axios.post('http://127.0.0.1:8000/posts_files/', formData, {
     headers: {
       'Content-Type': 'multipart/form-data'
     }
   })
   .then((response) => {
     console.log(response);
     // Дополнительная обработка успешной отправки файла
   })
   .catch((error) => {
     console.error('Error uploading file:', error);
     // Обработка ошибки при отправке файла
   });
 };
 return(
  <div className="Page">
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Отправить</button>
    </form>
  </div>
 );
}
export default AddPost;