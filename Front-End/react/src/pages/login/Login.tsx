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
import Illustration from "../component/IconComponent/Illustration"
import Logo from "../component/IconComponent/AppLogo"
import Cookies from 'universal-cookie';
import api_links from "../../app/api_links";
import fetch_Api from "../../app/api_fetch";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/*
import api_links from '../../utils/api_links';
import handlePermission from '../../utils/permission_proccess'
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
  const cookies = new Cookies();
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
    if (cookies.get("user") !== undefined) {
      navigate("/quan-ly");
      //return
    }
  }, []);

  const getLoginInfor0 = (data) => {
    const api_link = api_links.user.login;
    api_link.data=data;
    return fetch_Api(api_link)
  }
  const getLoginInfor = async function (data): Promise<AxiosResponse> {
    
    const config: AxiosRequestConfig = {
        headers: {
        },
        url: api_links.user.login.url,
        method: api_links.user.login.method,
        data: data,
    }
    try {
        const response: AxiosResponse = await axios(config);
        //console.log(response)
        cookies.set("user", response.data, { path: '/', maxAge: 7200 })  // set cookies for 30 minutes

        return response
    } catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data;
            throw errorMessage
        } else {
            throw new Error(`Lỗi khi đưa yêu cầu: ${error}`)
        }
    }
}

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
    const response= getLoginInfor(values);

    console.log(response);
    navigate("/quan-ly");

  };

  //check token existed
  if (token != undefined) {
    //cookies.set("token", storeCookieData, { path: '/', maxAge: 7200 })  // set cookies for 30 minutes
  }

  if (cookies.get("user") !== undefined) {
    navigate("/quan-ly");
    //return
  }

  // Navigate to dashboard page if login successful

  return (
    <div className="login">
      <div className="box-form">
        <Logo />
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
            name={"username"}
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
                <FontAwesomeIcon className="circle-loading" icon={faSpinner} 
                onClick={()=>onFinish}/>
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
        <Illustration />
      </div>
    </div>
  );
}
