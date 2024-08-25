import React, { useEffect, useState } from 'react';
import './styleProduct.css'
import { Navigate, Link, Router, Route, Routes, useNavigate, BrowserRouter, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Account } from '../../component/account';
import NavBar from '../../component/menubar';
import { FilterBox } from '../../component/filterBox';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Form, Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ProductInformationPopupScreen from '../../component/popupEditProduct';
import api_links from '../../../app/api_links';
import fetch_Api from '../../../app/api_fetch';
import { GoodsReceipt, GoodsReceiptDetails } from '../../../app/type.d';
//import axios from 'axios';

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
const emptydata: DataType = {
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
interface ExportDataType {
  info: GoodsReceipt,
  list: GoodsReceiptDetails,
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
      title: 'Mã sản phẩm',
      dataIndex: 'id',
    },
    {
      title: 'Tên hàng',
      dataIndex: 'name',
    },
    {
      title: 'Loại',
      dataIndex: 'categoryId',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
    {
      title: '',
      key: 'action',
      width: '112px',
      render: (_, record) => (
        <Space size="small">
          <Button size={"middle"} onClick={() => { dataShow = data[Number(record.id)]; setIsChangeInformation(!isChangeInformation) }}><EditIcon /></Button>
          <Button size={"middle"} onClick={() => { console.log("Xóa : " + record.id) }}><ClearIcon /></Button>
        </Space>),
    },
  ];

  const [form] = Form.useForm();
  const [data, setProducts] = useState([]);
  const [importData, setImportData] = useState<DataType[]>([emptydata]);

  // const data: DataType[] = []; // Assuming DataType is the type of your data
  useEffect(() => {
    getAllBooking()
      .then(res => {
        //setAllData(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);

      })
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
    return fetch_Api(api_link)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleTableRowClick = (record: DataType) => {
    importData.push(record);
    setImportData(importData);
    console.log(importData);
  }
  const postGoodsIssue = () => {
    const api_post = api_links.goodsIssue.createNew;
    let newReceipt = //:ExportDataType
    {
      info: formValues,
      list: importData,
      idWareHouse: "0",
    }
    api_post.data = newReceipt;
    console.log(api_post);
    return fetch_Api(api_post)
  }

  const onFinish = () => {
    setFormValue(form.getFieldsValue());
    console.log(form.getFieldsValue());
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

      <div className='dashboard-container'>
        {/*<ProductInformationPopupScreen
                    isPopup={isChangeInformation}
                    setPopup={setIsChangeInformation}
                    data={dataShow}
                    componentDisabled={componentDisabled}
                    setComponentDisabled={setComponentDisabled}
  />*/}
        <div className='product-container'>
          <div className='filterField'>
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                className="code"
                label={"Mã nhập kho"}
                name={"code"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="time"
                label={"Ngày nhập"}
                name={"time"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="trans"
                label={"Nhà cung cấp"}
                name={"trans"}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="fee"
                label={"Cần trả nhà cung cấp"}
                name={"fee"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="status"
                label={"Trạng thái"}
                name={"status"}
              >
                <Input />
              </Form.Item>
            </Form>
          </div>

          <div className='filterField'>
            <div style={{ marginBottom: 16 }}>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Đã chọn ${selectedRowKeys.length} sản phẩm` : ''}
              </span>
            </div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              onRow={(record) => ({
                onClick: () => handleTableRowClick(record),
              })}
            />
          </div>

          <div className='product-list'>
            Đơn nhập hàng
            <Table rowSelection={rowSelection} columns={columns} dataSource={[...importData]} />
            <Button type='primary' onClick={() => {
              postGoodsIssue()
            }}
              style={{ backgroundColor: "#465d65" }}>
              Thêm mới</Button>
          </div>

        </div>
      </div>
    </React.Fragment>
  );

}
