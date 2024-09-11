import React, { useEffect, useState } from "react";
import "./styleProduct.css";
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

import { Account } from "../../component/account";
import NavBar from "../../component/menubar";
import { FilterBox } from "../../component/filterBox";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Form, Input, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ProductInformationPopupScreen from "../../component/popupEditProduct";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import { GoodsReceipt, GoodsReceiptDetails } from "../../../app/type.d";
//import axios from 'axios';

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
interface ExportDataType {
  goodsReceiptModel: GoodsReceipt,
  listGoodReceiptDetailModels: GoodsReceiptDetails[],
  idWareHouse: string,
}

let dataShow: DataType = emptydata;

/*
const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    Id: String(i),
    name: "Sản phẩm "+i,
    giavon: '100.000',
    giaban: '500.000',
    slnhap: 50,
    tonkho: 20,
  });
}*/

export default function ExportGoods() {
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
    },
    {
      title: "Tên hàng",
      dataIndex: "name",
    },
    {
      title: "Loại",
      dataIndex: "categoryId",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "",
      key: "action",
      width: "112px",
      render: (_, record) => (
        <Space size="small">
          <Button size={"middle"} onClick={() => {
            handleTableRowClick(record.id)}}>+</Button>
        </Space>),
    },
  ];
  const exportColumns: ColumnsType<GoodsReceiptDetails> = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productId',
    },
    {
      title: 'Tên hàng',
      dataIndex: 'name',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'priceUnit',
      render: (_, record) => (
        <Space size="small">
          <Input/> 
        </Space>),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_, record) => (
        <Space size="small">
          <Button size={"small"} onClick={() => {
            record.quantity=String(Number(record.quantity)-1)}}>-</Button>
            {record.quantity}
            <Button size={"small"} onClick={() => {
            record.quantity=String(Number(record.quantity)+1)}}>+</Button>
        </Space>),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'subTotal',
      render: (_, record) => (
        <Space size="small">
          {Number(record.priceUnit)*Number(record.quantity)}
        </Space>),
    },

  ];

  const [form] = Form.useForm();
  const [data, setProducts] = useState([]);
  const [importData, setImportData] = useState<GoodsReceiptDetails[]>([]);

  // const data: DataType[] = []; // Assuming DataType is the type of your data
  useEffect(() => {
    getAllBooking()
      .then((res) => {
        //setAllData(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //useSelector, useNavigate
  const [formValues, setFormValue] = useState();

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

  const getAllBooking = () => {
    const api_link = api_links.product.getAll;
    return fetch_Api(api_link);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleTableRowClick = (record : string) => {
    importData.push({
      "goodsReceiptId": "0",
      "productId": record,
      "priceUnit": "",
      "quantity": "1"
    });
    setImportData(importData);
    console.log(importData);
  }
  const postGoodsIssue = (postData:ExportDataType) => {
    const api_post = api_links.goodsIssue.createNew;
    api_post.data = postData;
    console.log(api_post);
    return fetch_Api(api_post);
  };

  const onFinish = () => {
    setFormValue(form.getFieldsValue());
    const postData:ExportDataType={
      goodsReceiptModel: {
        id: "0",
        exportDate: form.getFieldValue("exportDate"),
        partnerId: form.getFieldValue("partnerId"),
        receiptStatus: "2"
      },
      listGoodReceiptDetailModels: [
        {
            "goodsReceiptId": "4",
            "productId": "3",
            "priceUnit": "200",
            "quantity": "20"
        },
        {
          "goodsReceiptId": "4",
          "productId": "3",
          "priceUnit": "200",
          "quantity": "20"
        }
    ],
      idWareHouse: form.getFieldValue("idWareHouse")
    }
        console.log(postData);

  };

  return (
    <React.Fragment>
      <ProductInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={dataShow}
        componentDisabled={componentDisabled}
        setComponentDisabled={setComponentDisabled}
      />

      <div className="dashboard-container">
        {/*<ProductInformationPopupScreen
                    isPopup={isChangeInformation}
                    setPopup={setIsChangeInformation}
                    data={dataShow}
                    componentDisabled={componentDisabled}
                    setComponentDisabled={setComponentDisabled}
  />*/}
        <div className="product-container">
          <div className="filterField">
            <Form form={form} onFinish={onFinish}>

          <Form.Item
                className="idWareHouse"
                label={"Nhập đến kho"}
                name={"idWareHouse"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="exportDate"
                label={"Ngày nhập"}
                name={"exportDate"}
              >
                <Input />
              </Form.Item >
              <Form.Item
                className="partnerId"
                label={"Nhà cung cấp"}
                name={"partnerId"}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
             
              <Button type='primary' onClick={() => {
              onFinish();//postGoodsIssue()
            }}
              style={{ backgroundColor: "#465d65" }}>
              Thêm mới</Button>            </Form>
          </div>

          <div className='filterField'>

            <Table
              columns={columns}
              dataSource={data}
              /*onRow={(record) => ({
                onClick: () => handleTableRowClick(record.id),
              })}*/
            />
          </div>

          <div className='export-list'>
            Đơn nhập hàng
            <Table columns={exportColumns} dataSource={[...importData]} />

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
