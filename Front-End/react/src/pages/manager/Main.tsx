import React, { useEffect } from 'react';
import './managerMain.css'
import { Navigate, Link, Router, Route, Routes, useNavigate, BrowserRouter, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

import NavBar from '../component/menubar';


export default function Manager() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Quản lý";
    if (cookies.get("user") == undefined) {
      console.log(cookies.get("user"))
      navigate("/login");
      //return
    }
  }, []);
  return (
    <div className='dashboard-container'>
      <NavBar />
      <div className='dashboard-body'>
        <Outlet />
      </div>
    </div>
  );

}
