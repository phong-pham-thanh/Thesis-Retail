import React, { useEffect, useState } from 'react';
import './managerMain.css'
import { Navigate, Link, Router, Route, Routes, useNavigate, BrowserRouter, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

import NavBar from '../component/menubar';
import fetch_Api from '../../app/api_fetch';
import api_links from '../../app/api_links';


export default function Manager() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Trạng thái để kiểm tra việc tải

  useEffect(() => {
    document.title = "Quản lý";
    if (cookies.get("user") === undefined) {
      console.log(cookies.get("user"));
      navigate("/login");
    } else {
      const fetchSetSession = async () => {
        try {
          const res = await fetch_Api(
            api_links.users.setSession(Number(cookies.get("user")?.id))
          );
          const currentUser = res.data;
          cookies.set("isAdmin", JSON.stringify(currentUser.isAdmin), { path: "/" });
        } catch (error) {
          console.error("Failed set session:", error);
        } finally {
          setIsLoading(false); // Cập nhật trạng thái sau khi kết thúc fetch
        }
      };

      setIsLoading(true);
      fetchSetSession();
    }
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  );
}
