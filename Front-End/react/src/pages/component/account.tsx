import React from "react";
import "./component.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import LogoutIcon from "@mui/icons-material/Logout";

export function Account() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  return (
    <div className="account-container">
      <div className="infor">
        <div>{cookies.get("user")?.name ?? "Anonymous"}</div>
        <div>{cookies.get("user")?.branch ?? "No Branch"}</div>
      </div>
      <LogoutIcon
        onClick={() => {
          cookies.remove("user", { path: "/" });
          navigate("/login");
        }}
      />
    </div>
  );
}
