import React, { useEffect, useState } from "react";
import "./styleReport.css";
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
import { ReactComponent as Logo } from "../../../icon/appLogo.svg";
import { ReactComponent as IconTongquan } from "../../../icon/menu-tongquan.svg";
import { ReactComponent as IconHanghoa } from "../../../icon/menu-hanghoa.svg";
import { ReactComponent as IconGiaodich } from "../../../icon/menu-giaodich.svg";
import { ReactComponent as IconDoitac } from "../../../icon/menu-doitac.svg";
import { ReactComponent as IconNV } from "../../../icon/menu-nhanvien.svg";
import { ReactComponent as IconKhuyenmai } from "../../../icon/menu-khuyenmai.svg";
import { ReactComponent as IconBaocao } from "../../../icon/menu-baocao.svg";
import { ReactComponent as IconLogout } from "../../../icon/logout.svg";

import { Account } from "../../component/account";
import NavBar from "../../component/menubar";
import { FilterBox } from "../../component/filterBox";

import { Button, Form, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ProductInformationPopupScreen from "../../component/popupEditProduct";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

interface DataType {
  key: React.Key;
    "id": string;
    "name": string;
    "categoryId": string;
    "category": {
      "id": string;
      "name": string;
    },
    "description": string;
    "status": boolean;
  }
const emptydata:DataType ={
  key: "",
  "id": "0",
  "name": "",
  "categoryId": "0",
  "category": {
    "id": "0",
    "name": ""
  },
  "description": "string",
  "status": true
}
let dataShow: DataType = emptydata;

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    id: String(i),
    name: "Sản phẩm " + i,
    "categoryId": "0",
    "category": {
      "id": "0",
      "name": ""
    },
    "description": "string",
    "status": true
  });
}

const fakeData = [
  {
    code: "SP000001",
    name: "Pepsi chai 500ml",
    buy: 2,
    receive: 0,
    revenue: 40000,
  },
  {
    code: "SP000002",
    name: "Coca chai 500ml",
    buy: 1,
    receive: 0,
    revenue: 20000,
  },
  {
    code: "SP000005",
    name: "Thuốc lá gói 555",
    buy: 3,
    receive: 0,
    revenue: 75000,
  },
  {
    code: "SP000008",
    name: "Chocopie hộp 12pcs",
    buy: 2,
    receive: 0,
    revenue: 100000,
  },
  {
    code: "SP000009",
    name: "Mì gói cung đình vị ...",
    buy: 12,
    receive: 0,
    revenue: 96000,
  },
  {
    code: "SP000011",
    name: "Khăn giấy Bless yo...",
    buy: 10,
    receive: 0,
    revenue: 40000,
  },
  {
    code: "SP000012",
    name: "Kẹo cao su hũ Doub...",
    buy: 1,
    receive: 0,
    revenue: 32000,
  },
  {
    code: "SP000019",
    name: "Pepsi chai 500ml",
    buy: 5,
    receive: 0,
    revenue: 40000,
  },
];

interface IDataReport {
  code: string;
  name: string;
  buy: number;
  receive: number;
  revenue: number;
}

export default function Report() {
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
  const [dataReport, setDataReport] = useState<IDataReport[]>(fakeData);
  //Call api lấy danh sách chi nhánh set cho optionStore
  const [optionStore, setOptionStore] = useState<
    { value: number; label: string }[]
  >([
    { value: 1, label: "Chi nhánh tổng" },
    { value: 2, label: "Chi nhánh 1" },
    { value: 3, label: "Chi nhánh 2" },
  ]);
  const [form] = Form.useForm();

  const initialValues = {
    store: 1,
    rangeTime: "",
    reportType: 1,
    displayReport: 1,
  };

  const store = Form.useWatch("store", form);

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
      <div className="product-container report-container">
        <Form form={form} initialValues={initialValues}>
          <div className="filterField">
            <Button icon={<UploadOutlined />} className="custom-button">
              Xuất tất cả
            </Button>
            <Form.Item className="store" name={"store"}>
              <FilterBox title={"Chi nhánh"} type={"store"} form={form} />
            </Form.Item>

            <FilterBox title={"Thời gian"} type={"time"} />
            <FilterBox title={"Phân loại"} type={"reportType"} />
            <FilterBox title={"Hiển thị"} type={"displayReport"} />
          </div>
        </Form>
        <div className="product-list">
          <div className="report-time">
            Ngày lập: {moment().format("DD/MM/YYYY HH:mm")}
          </div>
          <div className="report-title">Báo cáo bán hàng theo hàng hóa</div>
          <div className="range-time">
            Từ ngày {moment().startOf("date").format("DD/MM/YYYY HH:mm")} đến
            ngày {moment().format("DD/MM/YYYY HH:mm")}
          </div>
          <div className="store">
            Chi nhánh: {optionStore.find((x) => x.value === store)?.label}
          </div>
          <table className="table">
            <thead>
              <th className="code">Mã hàng</th>
              <th className="name">Tên hàng</th>
              <th className="buy">SL bán</th>
              <th className="receive">SL trả</th>
              <th className="revenue">Doanh thu thực</th>
            </thead>
            <tbody>
              {dataReport &&
                dataReport.length > 0 &&
                dataReport.map((data, index) => (
                  <tr key={index}>
                    <td className="code">{data.code}</td>
                    <td className="name">{data.name}</td>
                    <td className="buy">{data.buy}</td>
                    <td className="receive">{data.receive}</td>
                    <td className="revenue">{data.revenue.toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <td>SL mặt hàng: {dataReport.length}</td>
              <td></td>
              <td className="buy">
                SL bán:{" "}
                {dataReport.reduce((total, record) => {
                  return total + record.buy;
                }, 0)}
              </td>
              <td className="receive">
                SL trả:{" "}
                {dataReport.reduce((total, record) => {
                  return total + record.receive;
                }, 0)}
              </td>
              <td className="revenue">
                Doanh thu thực:{" "}
                {dataReport
                  .reduce((total, record) => {
                    return total + record.revenue;
                  }, 0)
                  .toLocaleString()}
              </td>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
