import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './styles/index.css';
import App from './App';
import Login from './Login';
import SignIn from './SignIn';
import Formulario from "./Formulario";
import Principal from "./Principal";
import Privacy from './Privacy'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          <Route path='/' element={<App />} />
          <Route path='app' element={<App />} />
          <Route path='login' element={<Login />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='principal' element={<Principal />} />
          <Route path='formulario' element={<Formulario />} />
          <Route path='privacy' element={<Privacy/>}/>
      </Routes>
  </BrowserRouter>
);
