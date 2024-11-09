import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { message } from "antd";
//import Cookies from 'universal-cookie';

interface Api {
  url: string;
  method: string;
  token?: string;
  data?: any;
}

//const [messageApi, contextHolder] = message.useMessage();

const fetch_Api = async function (params: Api): Promise<AxiosResponse> {
  //const cookies = new Cookies()
  //const token = cookies.get("token")?.token
  const config: AxiosRequestConfig = {
    headers: {
      /*"Authorization": `Bearer  ${token}`,
            "Content-Type": "application/json"*/
    },
    url: params.url,
    method: params.method,
    data: params.data,
    withCredentials: true
  };
  try {
    const response: AxiosResponse = await axios(config);
    //console.log(response)
    params.method === "GET"
      ? console.log("GET success!")
      : console.log("POST success!");
    //message.success("Success!");
    return response;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data;
      throw errorMessage;
    } else {
      throw new Error(`Lỗi khi đưa yêu cầu: ${error}`);
    }
  }
};

export default fetch_Api;
