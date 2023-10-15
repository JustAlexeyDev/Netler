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
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import AddPost from "./Pages/AddPost";
import Notifications from "./Pages/Notifications";
import PeopleList from "./Pages/PeopleList";
import SignIn from "./Pages/SignIn";
// Import Css
import './Assets/Css/Reset.css';
import './Assets/Css/Global.css';
// Render SIte
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="/AddPost" element={<AddPost />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/PeopleList" element={<PeopleList />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);