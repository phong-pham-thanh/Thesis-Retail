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
import { GoodsReceipt, GoodsReceiptDetails, ProductState } from "../../../app/type.d";
//import axios from 'axios';

interface ExportProductTableState {
  //"goodsReceiptId": "0",
  "productId": string,
  "productName": string,
  "priceUnit": number,
  "quantity": number,
  "subTotal": number
};

interface ExportDataType {
  goodsReceiptModel: GoodsReceipt,
  listGoodReceiptDetailModels: GoodsReceiptDetails[],
  idWareHouse: string,
}


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
  const productColumns: ColumnsType<ProductState> = [
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
            handleTableProductClick(record)}}>+</Button>
        </Space>),
    },
  ];
  const exportColumns: ColumnsType<ExportProductTableState> = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productId',
    },
    {
      title: 'Tên hàng',
      dataIndex: 'productName',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'priceUnit',
      render: (_, record) => (
        <Space size="small">
          <Input onChange={(e)=>{
            updateExportProduct(record.productId,"updatePrice",Number(e.target.value));
            }}/> 
        </Space>),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_, record) => (
        <Space size="small">
          <Button size={"small"} onClick={() => {
             record.quantity===1?
             removeExportProduct(record.productId)
             :
          updateExportProduct(record.productId,"minusQty",0)}}>-</Button>
            {record.quantity}
            <Button size={"small"} onClick={() => {
              updateExportProduct(record.productId,"plusQty",0)
            }}>+</Button>
        </Space>),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'subTotal',
      render: (_, record) => (
        <Space size="small">
          {record.subTotal}
        </Space>),
    },

  ];

  const [form] = Form.useForm();
  const [data, setProducts] = useState([]);
  const [exportTableData, setExportTableData] = useState<ExportProductTableState[]>([]);
  const [tempListGoodReceiptDetailModels, setTempList] = useState<GoodsReceiptDetails[]>([]);

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

  const handleTableProductClick = (record : ProductState) => {
    const indx= exportTableData.findIndex((item)=>item.productId===record.id);
    if (indx===-1){
    const newExportData = {
      //"goodsReceiptId": "0",
      "productId": record.id,
      "productName":record.name,
      "priceUnit": 0,
      "quantity": 1,
      "subTotal":0,
    }
    exportTableData.push(newExportData);
  }
  else {
    exportTableData[indx].quantity++;
    exportTableData[indx].subTotal=exportTableData[indx].quantity*exportTableData[indx].priceUnit;  
  }
  setExportTableData([...exportTableData]);
    console.log(exportTableData);
  }

const updateExportProduct=(id: string, action: string, data: number|undefined)=>{
  const idx= exportTableData.findIndex((item)=>item.productId===id);
  switch(action) {
    case 'plusQty':
      exportTableData[idx].quantity++;
      break ;
    case 'minusQty':
     exportTableData[idx].quantity--;
      break ;
    case 'updatePrice':
      exportTableData[idx].priceUnit=data;
      break ;
    default:
      return;
  }
  exportTableData[idx].subTotal=exportTableData[idx].quantity*exportTableData[idx].priceUnit;
  setExportTableData([...exportTableData]);
}

const removeExportProduct=(id: string)=>{
  const idx= exportTableData.findIndex((item)=>item.productId===id);
  exportTableData.splice(idx,1);
  setExportTableData([...exportTableData]);
}

  const postGoodsIssue = (postData:ExportDataType) => {
    const api_post = api_links.goodsIssue.createNew;
    api_post.data = postData;
    return fetch_Api(api_post);
  };

  const onFinish = () => {
    setFormValue(form.getFieldsValue());
    exportTableData.map((item)=>{
      tempListGoodReceiptDetailModels.push({
        "goodsReceiptId": "",
        "productId": item.productId,
        "priceUnit": item.priceUnit,
        "quantity": item.quantity
      })
    })
    const event = new Date();
    const postData:ExportDataType={
      goodsReceiptModel: {
        id: "0",
        exportDate: event.toISOString(),//form.getFieldValue("exportDate"),
        partnerId: form.getFieldValue("partnerId"),
        receiptStatus: 1,
        ListGoodReciptDetailsModel:[]
      },
      listGoodReceiptDetailModels: tempListGoodReceiptDetailModels,
      idWareHouse: form.getFieldValue("idWareHouse")
    }
    return postGoodsIssue(postData);

  };

  return (
      <div className="dashboard-container">

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
              columns={productColumns}
              dataSource={data}
              /*onRow={(record) => ({
                onClick: () => handleTableRowClick(record.id),
              })}*/
            />
          </div>

          <div className='export-list'>
            Đơn nhập hàng
            <Table columns={exportColumns} dataSource={[...exportTableData]} />

          </div>
        </div>
      </div>
  );
}
