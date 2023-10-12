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
// Import Css
import './Assets/Css/Reset.css';
import './Assets/Css/Global.css';
// Render
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);