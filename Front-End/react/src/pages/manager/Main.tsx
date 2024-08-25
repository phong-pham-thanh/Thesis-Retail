import React, { useEffect } from 'react';
//import './dashboard.css'
import { Navigate, Link, Router, Route, Routes, useNavigate, BrowserRouter, Outlet } from 'react-router-dom';

import NavBar  from '../component/menubar';


export default function Manager() {
  useEffect(() => {
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
