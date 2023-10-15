import { useState, useEffect } from "react";


const PeopleList = () => {
 const [peoples, setPeoples] = useState([]);
 const peoplesListApi = async () => {
  const response = await fetch(
   "http://127.0.0.1:8000/users/?format=json"
  ).then((response) => response.json()).then(data => {
    setPeoples(data)
  });
  console.log(response);
  return response;
};
useEffect(() => {
 peoplesListApi()
}, [])

if (!peoples) return null;
 return(
  <div className="User-Container_Main Page">
    <h1>Список пользователей</h1>    
   {peoples.length > 0 && (
    <div className="User-Container">

     {peoples.map(people => (
      <div className="User-Box">
        <span className="User-Box_avatar">
          <img src={people.avatar}/>          
        </span>
        <span>
          {people.username}
        </span>
        <span className="User-Box_Button">
          <button onClick={() => window.location.href=`/Profile/${people.id}/`}>Посмотреть</button>
        </span>
       
      </div>
     ))}
    </div>
   )}
  </div>
 );
}
export default PeopleList;