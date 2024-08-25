import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { useAppSelector, useAppDispatch } from '../../app/hooks';
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  login,
  selectSuccess,
  selectMessage,
  selectError,
  selectToken,
  selectRole,
  selectInformation,
  selectPermission,
  selectLogin,
  selectErrorServer,
} from "./loginSlice";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import image from "../../icon/Illustration.svg";
import logo from "../../icon/appLogo.svg";
/*
import api_links from '../../utils/api_links';
import handlePermission from '../../utils/permission_proccess'
import Cookies from 'universal-cookie';
import { log } from 'console';
import { unescapeLeadingUnderscores } from 'typescript';*/
//import PulseLoader from "react-spinners/PulseLoader";

export default function Login() {
  // Select data from store
  //not using const errorMessage = useSelector(selectErrorMessage);  const isSuccess = useSelector(selectSuccess);
  const isSuccess = useSelector(selectSuccess);
  const errorMessage1 = useSelector(selectMessage);
  const errorMessage2 = useSelector(selectError);
  const token = useSelector(selectToken);
  const information = useSelector(selectInformation);
  const role = useSelector(selectRole);
  const errorServer = useSelector(selectErrorServer);

  //const loginSelect = useSelector(selectLogin);
  //const permissionDone= handlePermission(permission?permission:[]);

  //variable

  const dispatch = useDispatch();

  const location = useLocation();
  const checked = location.pathname;
  const navigate = useNavigate();

  //api_link
  const userLoginAPI = "";
  const customerLoginAPI = "";
  // const loginLink = checked === "/login/nhanvien" ? userLoginAPI : customerLoginAPI;
  const loginLink = userLoginAPI;

  useEffect(() => {
    document.title = "Đăng nhập";
    if (0) {
      navigate("/dashboard/khach-hang");
      //return
    }
  }, []);

  const errorMessage = () => {
    if (errorMessage2) {
      if (typeof Object.values(errorMessage2)[0] == "string") {
        return Object.values(errorMessage2)[0];
      }
      return "";
    }
    if (errorMessage1) return errorMessage1;
  };

  const onFinish = (values: any) => {
    //dispatch(login({ "AccountInformation": values.username, "UserName": values.username, "Password": values.password, "link": loginLink }))
    navigate("/quan-ly");
  };

  //check token existed
  if (token != undefined) {
    //cookies.set("token", storeCookieData, { path: '/', maxAge: 7200 })  // set cookies for 30 minutes
  }

  if (0) {
    //cookies.get("token")?.token !== undefined) {
    navigate("/dashboard/khach-hang");
    //return
  }

  // Navigate to dashboard page if login successful

  return (
    <div className="login">
      <div className="box-form">
        <img src={logo} alt="" />
        <h2 className="title">Login</h2> <br />
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            className="email"
            label={"Email Address"}
            name={"email"}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="password"
            label={"Password"}
            name={"password"}
            required
          >
            <Input.Password />
          </Form.Item>
          <div className="more-action">
            <Checkbox>Remember me</Checkbox>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Reset Password?
              </a>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {isSuccess ? (
                <FontAwesomeIcon className="circle-loading" icon={faSpinner} />
              ) : (
                "Log in"
              )}
            </Button>
            {errorMessage() && (
              <p
                style={{
                  color: "red",
                  textAlign: "left",
                  fontSize: "13px",
                }}
              >
                <br /> {errorMessage()}
              </p>
            )}
            {errorServer?.includes("Failed to fetch") ? (
              <p
                style={{
                  color: "red",
                  textAlign: "left",
                  fontSize: "13px",
                }}
              >
                <br />
                Lỗi máy chủ vui lòng thử lại sau
              </p>
            ) : (
              ""
            )}
          </Form.Item>
          <div className="signup-account">
            <span>Don't have account yet?</span>
            <a className="signup-action" href="/register">
                New Account
              </a>
          </div>
        </Form>
      </div>
      <div className="right-content">
        <img src={image} alt="image" className="image" />
      </div>
    </div>
  );
}
