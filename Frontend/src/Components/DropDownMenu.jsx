import { useState } from "react";
import {Menu } from 'lucide-react'
import { useNavigate } from "react-router";

const DropDownMenu = () => {
 const navigate = useNavigate()
 const [isOpen, setIsOpen] = useState(false);

 const toggleMenu = () => {
   setIsOpen(!isOpen);
 };
 return(
  <div className="dropdown">
    <button className="dropdown-toggle" onClick={toggleMenu}>
      <Menu />
    </button>
    {isOpen && (
      <ul className="dropdown-menu">
        <li >Редактировать профиль</li>
        <li>Настройки</li>
        <li>Избранное</li>
        <li>Черновик</li>
        <li>Архив</li>
        <li className="warn-button" onClick={() => {localStorage.removeItem('token'); navigate('/Auth')}}><button >Выйти</button></li>
      </ul>
    )}
  </div>
 );
}
export default DropDownMenu;