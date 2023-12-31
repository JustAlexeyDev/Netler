// Import react Libs
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Import Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// Import Pages
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Auth from "./Pages/Auth";
import Profile from "./Pages/Profile";
import AddPost from "./Pages/AddPost";
import Notifications from "./Pages/Notifications";
import PeopleList from "./Pages/PeopleList";
import LoginIn from "./Pages/LoginIn";
import Chat from "./Pages/Chat";
// Import Css
import './Assets/Css/Reset.css';
import './Assets/Css/Global.css';
import './Assets/Css/Media.css';
// Render SIte
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<Auth />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="/AddPost" element={<AddPost />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/PeopleList" element={<PeopleList />} />
        <Route path="/LoginIn" element={<LoginIn />} />
        <Route path="/Chat/:room_id" element={<Chat />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);