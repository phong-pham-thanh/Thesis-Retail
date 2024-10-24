import React, { useEffect, useState } from "react";
import "./styleDashboard.css";
import {
  Navigate,
  Link,
  Router,
  Route,
  Routes,
  useNavigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../component/IconComponent/AppLogo";
import IconTongquan from "../../component/IconComponent/IconTongquan";
import IconHanghoa from "../../component/IconComponent/IconHanghoa";
import IconGiaodich from "../../component/IconComponent/IconGiaodich";
import IconDoitac from "../../component/IconComponent/IconDoitac";
import IconNV from "../../component/IconComponent/IconNhanvien";
import IconKhuyenmai from "../../component/IconComponent/IconKhuyenmai";
import IconBaocao from "../../component/IconComponent/IconBaocao";
import IconLogout from "../../component/IconComponent/IconLogout";

import { Account } from "../../component/account";
import NavBar from "../../component/menubar";
import { FilterBox } from "../../component/filterBox";

import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ProductInformationPopupScreen from "../product/popupEditProduct";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  description: string;
  status: boolean;
}
const emptydata: DataType = {
  key: "",
  id: "0",
  name: "",
  categoryId: "0",
  category: {
    id: "0",
    name: "",
  },
  description: "string",
  status: true,
};
let dataShow: DataType = emptydata;

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: String(i),
    name: "Sản phẩm " + i,
    categoryId: "0",
    category: {
      id: "0",
      name: "",
    },
    description: "string",
    status: true,
  });
}

export default function Dashboard() {
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã sản phẩm",
      dataIndex: "Id",
    },
    {
      title: "Tên hàng",
      dataIndex: "name",
    },
    {
      title: "Giá vốn",
      dataIndex: "giavon",
    },
    {
      title: "Giá bán",
      dataIndex: "giaban",
    },
    {
      title: "SL nhập",
      dataIndex: "slnhap",
    },
    {
      title: "Tồn kho",
      dataIndex: "tonkho",
    },
    {
      title: "",
      key: "action",
      width: "112px",
      render: (_, record) => (
        <Button
          size={"middle"}
          onClick={() => {
            dataShow = data[Number(record.id)];
            setIsChangeInformation(!isChangeInformation);
          }}
        >
          Sửa
        </Button>
      ),
    },
  ];

  useEffect(() => {}, []);
  //useSelector, useNavigate

  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="dashboard-container">
      <ProductInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={dataShow}
        componentDisabled={componentDisabled}
        setComponentDisabled={setComponentDisabled}
      />
      <div className="product-container">
        <div className="filterField">Lọc danh sách</div>
        <div className="product-list">Nội dung Tổng quan</div>
      </div>
    </div>
  );
}
