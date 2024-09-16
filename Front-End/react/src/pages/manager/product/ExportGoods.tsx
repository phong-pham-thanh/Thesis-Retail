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
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ProductInformationPopupScreen from "../../component/popupEditProduct";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import { GoodsReceipt, GoodsReceiptDetails, PartnerState, ProductState, WarehouseState } from "../../../app/type.d";
//import axios from 'axios';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Option = Select.Option;

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
            handleTableProductClick(record)
          }}><AddIcon fontSize="small" /></Button>
        </Space>),
    },
  ];
  const exportColumns: ColumnsType<ExportProductTableState> = [
    {
      title: '',
      dataIndex: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button size={"small"} onClick={() => {
            removeExportProduct(record.productId)
          }}><RemoveIcon fontSize="small" /></Button>
        </Space>),
    },
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
          <InputNumber min={0} defaultValue={0} placeholder={"0"}
            onChange={(e) => {
              updateExportProduct(record.productId, "updatePrice", e);
            }} />
        </Space>),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_, record) => (
        <Space size="small">
          <InputNumber
            min={1} defaultValue={1}
            value={record.quantity}
            onChange={(e) => {
              updateExportProduct(record.productId, "updateQty", Number(e));
            }} />
        </Space>),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'subTotal',
      render: (_, record) => (
        <Space size="small">
          {record.subTotal.toLocaleString()}
        </Space>),
    },

  ];

  const [form] = Form.useForm();
  const [allProducts, setProducts] = useState([]);
  const [allPartners, setAllPartners] = useState<PartnerState[]>([]);
  const [allWarehouses, setAllWarehouses] = useState<WarehouseState[]>([]);
  const [exportTableData, setExportTableData] = useState<ExportProductTableState[]>([]);
  const [tempListGoodReceiptDetailModels, setTempList] = useState<GoodsReceiptDetails[]>([]);
  const [total, setTotal] = useState(0);

  // const data: DataType[] = []; // Assuming DataType is the type of your data
  useEffect(() => {
    getAllProduct()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllPartner()
      .then((res) => {
        setAllPartners(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllWarehouse()
      .then((res) => {
        setAllWarehouses(res.data);
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

  const getAllProduct = () => {
    const api_link = api_links.product.getAll;
    return fetch_Api(api_link);
  };
  const getAllPartner = () => {
    const api_link = api_links.partner.getAll;
    return fetch_Api(api_link);
  };
  const getAllWarehouse = () => {
    const api_link = api_links.warehouse.getAll;
    return fetch_Api(api_link);
  };

  const handleTableProductClick = (record: ProductState) => {
    const indx = exportTableData.findIndex((item) => item.productId === record.id);
    if (indx === -1) {
      const newExportData = {
        //"goodsReceiptId": "0",
        "productId": record.id,
        "productName": record.name,
        "priceUnit": 0,
        "quantity": 1,
        "subTotal": 0,
      }
      exportTableData.push(newExportData);
    }
    else {
      exportTableData[indx].quantity++;
      exportTableData[indx].subTotal = exportTableData[indx].quantity * exportTableData[indx].priceUnit;
      //updateTotal();
    }
    updateTotal();
    setExportTableData([...exportTableData]);
    console.log(exportTableData);
  }

  const updateExportProduct = (id: string, action: string, data: number | undefined) => {
    const idx = exportTableData.findIndex((item) => item.productId === id);
    switch (action) {
      case 'updatePrice':
        exportTableData[idx].priceUnit = data;
        break;
      case 'updateQty':
        exportTableData[idx].quantity = data;
        break;
      default:
        return;
    }
    exportTableData[idx].subTotal = exportTableData[idx].quantity * exportTableData[idx].priceUnit;
    setExportTableData([...exportTableData]);
    updateTotal();
  }

  const removeExportProduct = (id: string) => {
    const idx = exportTableData.findIndex((item) => item.productId === id);
    exportTableData.splice(idx, 1);
    setExportTableData([...exportTableData]);
    updateTotal();
  }

  const updateTotal = () => {
    setTotal(0);         
    exportTableData.map((d) => 
        setTotal(total + d.subTotal))
  }

  const postGoodsIssue = (postData: ExportDataType) => {
    const api_post = api_links.goodsIssue.createNew;
    api_post.data = postData;
    return fetch_Api(api_post);
  };

  const onFinish = () => {
    setFormValue(form.getFieldsValue());
    exportTableData.map((item) => {
      tempListGoodReceiptDetailModels.push({
        "goodsReceiptId": "",
        "productId": item.productId,
        "priceUnit": item.priceUnit,
        "quantity": item.quantity
      })
    })
    const event = new Date();
    const postData: ExportDataType = {
      goodsReceiptModel: {
        id: "0",
        importDate: form.getFieldValue("exportDate")?.toISOString(), //event.toISOString(),//form.getFieldValue("exportDate"),
        partnerId: form.getFieldValue("partnerId"),
        receiptStatus: 1,
        ListGoodReciptDetailsModel: []
      },
      listGoodReceiptDetailModels: tempListGoodReceiptDetailModels,
      idWareHouse: form.getFieldValue("idWareHouse")
    }

    console.log(postData);
    if (postGoodsIssue(postData))
      message.success("Success!");
    else console.log(0);

  };

  return (
    <div className="dashboard-container">

      <div className="product-container">
        <div className="filterField">
          <Form form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
          >

            <Form.Item
              className="idWareHouse"
              label={"Nhập đến kho"}
              name={"idWareHouse"}
              rules={[{
                required: true,
                message: 'Không để trống',
              }]}
            >
              <Select
                showSearch
                placeholder="Chọn kho"
                optionFilterProp="label"
              >
                {allWarehouses?.map((d) => {
                  return (
                    <Option value={d.id}>{d.address}</Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              className="exportDate"
              label={"Ngày nhập"}
              name={"exportDate"}
              rules={[{
                required: true,
                message: 'Không để trống',
              }]}
            >
              <DatePicker
                showTime
                disabledDate={(current) => { return current.valueOf() > Date.now() }}
              />
            </Form.Item >
            <Form.Item
              className="partnerId"
              label={"Nhà cung cấp"}
              name={"partnerId"}
              rules={[{
                required: true,
                message: 'Không để trống',
              }]}
            >
              <Select
                showSearch
                placeholder="Chọn nhà cung cấp"
                optionFilterProp="label"
              >
                {allPartners?.map((d) => {
                  return (
                    <Option value={d.id}>{d.name}</Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Button type='primary' onClick={() => {
              onFinish();//postGoodsIssue()
            }}
              style={{ backgroundColor: "#465d65" }}>
              Thêm mới</Button>
          </Form>
          <h4>Tổng cộng: {total.toLocaleString()}</h4>
        </div>

        <div className='filterField'>

          <Table
            columns={productColumns}
            dataSource={allProducts}
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
