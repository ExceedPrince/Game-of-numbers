import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './components/App';
import Audio from './components/Audio';
import Rules from './components/Rules';

import CookiePage from './components/CookiePage';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Audio src={Math.floor((Math.random() * 6) + 1)} />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CookiePage />} />
        <Route exact path="/rules" element={<Rules />} />
        <Route exact path="/game" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
