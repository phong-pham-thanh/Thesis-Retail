import React, { useEffect, useState } from "react";
import "./styleTransaction.css";
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

import { Button, Form, Input, Modal, Pagination, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ProductInformationPopupScreen from "../../component/popupEditProduct";
import CustomInput from "../../component/searchBox";
import CustomSelect from "../../component/selectBox";
import {
  EditOutlined,
  UploadOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { GoodReceiptDataType, GoodsReceiptDetails } from "../../../app/type.d";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";

interface GoodReceiptDetailDataType {
"id": Number,
"importDate": String,
"partnerID": Number,
"partner": {
  "id": Number,
  "name": String,
  "totalSale": Number
},
"receiptStatus": Number,
"listGoodReciptDetailsModel": [
  {
    "id": Number,
    "goodReceiptId": Number,
    "goodsReceipt": null,
    "productId": Number,
    "product": {
      "id": Number,
      "name": String,
      "categoryId": Number,
      "category": {
        "id": Number,
        "name": String
      },
      "description": String,
      "status": Boolean,
      "listInventories": null
    },
    "priceUnit": Number,
    "quantity": Number
  }]
}

const emptydata:GoodReceiptDetailDataType={
"id": 0,
"importDate": "01/01/1970",
"partnerID": 0,
"partner": {
  "id": 0,
  "name": "",
  "totalSale": 0
},
"receiptStatus": 0,
"listGoodReciptDetailsModel": [
  {
    "id": 0,
    "goodReceiptId": 0,
    "goodsReceipt": null,
    "productId": 0,
    "product": {
      "id": 0,
      "name": "",
      "categoryId": 0,
      "category": {
        "id": 0,
        "name": ""
      },
      "description": "",
      "status": true,
      "listInventories": null
    },
    "priceUnit": 0,
    "quantity": 0
  }]
}

export default function ImportReceiptDetail({ID, isShowModal, setIsShowModal}: { ID: string, isShowModal?: boolean, setIsShowModal?: any}) {
  
  //useSelector, useNavigate
  const [goodReceiptData, setGoodReciptData] = useState<GoodReceiptDetailDataType>(emptydata);

  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  //call api set data nhập kho
  const [dataTrans, setDataTrans] = useState([]);
  const [page, setPage] = useState<number>(1);
  const size = 7;

  const [dataChoose, setDataChoose] = useState<GoodReceiptDataType>();
  //const [isShowModal, setIsShowModal] = useState<string>();

  //call api set data products on modal
  const [listProduct, setListProduct] = useState<GoodsReceiptDetails[]>();
  const [form] = Form.useForm();

  useEffect(() => {
    getGoodReceiptByID()
      .then((res) => {
        setGoodReciptData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [ID]);

  const getGoodReceiptByID = () => {
    const api_link = api_links.goodsIssue.getById;
    api_link.url=api_link.url+ID;
    console.log(api_link);
    return fetch_Api(api_link);
  };

  const proccessStatus = (status: Number) => {
    switch (status) {
      case 0:

        return <Tag color="success">success</Tag>

      case 1:
        return <Tag color="success">success</Tag>

        break;
      case 2:
        return <Tag color="processing">processing</Tag>

        break;
      default:
        break;
    }
    return;

  }

  const proccessDate = (dateString: String) => {
    const date = new Date(dateString.toLocaleString());
    const timeString=dateString.slice(11,16);
    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedDate = formatter.format(date);
    const newDateString ="";
    return formattedDate;
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const onFinish = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <div className="product-container">
      
      {/*//////////// EDIT MODAL//////*/}
      <Modal
        title={`Phiếu nhập kho${" - " + goodReceiptData.id}`}
        open={isShowModal}
        onOk={() => setIsShowModal(undefined)}
        onCancel={() => {
          setIsShowModal(undefined);
          form.resetFields();
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button onClick={onFinish}>Lưu</Button>
          </>
        )}
        className="modal-create-trans"
      >
        <div className="modal-header">
          <div className="modal-info">Thông tin</div>
          {/*<div className="modal-desc">Nhập đến kho hiện tại</div>*/}
        </div>
        <hr className="modal-line" />
        <div className="modal-content">
          <div className="modal-box">
            <Form form={form} onFinish={onFinish}>
              <Form.Item className="code" label={"Mã nhập kho"} name={"code"}>
                {goodReceiptData.id}
              </Form.Item>
              <Form.Item className="time" label={"Ngày nhập"} name={"time"}>
                {proccessDate(goodReceiptData.importDate)}
              </Form.Item>
              <Form.Item
                className="trans"
                label={"Nhà cung cấp"}
                name={"trans"}
                rules={[{ required: true }]}
              >
                {goodReceiptData.partner.name}
              </Form.Item>
              <Form.Item
                className="status"
                label={"Trạng thái"}
                name={"status"}
              >
                {proccessStatus(goodReceiptData.receiptStatus)}
              </Form.Item>
            </Form>
          </div>
          <div className="modal-products">
            <table>
              <thead>
                <th className="code">Mã sản phẩm</th>
                <th className="quantity">Số lượng</th>
                <th className="name">Đơn giá</th>
              </thead>
              <tbody>
                {goodReceiptData.listGoodReciptDetailsModel &&
                  goodReceiptData.listGoodReciptDetailsModel.length > 0 &&
                  goodReceiptData.listGoodReciptDetailsModel.map((product, index) => (
                    <tr key={index}>
                      <td className="name">{product.productId}-{product.product.name?product.product.name:""}</td>
                      <td className="quantity">{product.quantity}</td>
                      <td className="priceUnit">{product.priceUnit}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      
    </div>
  );
}

/*{
  "goodsReceiptModel": {
      "PartnerID": 2,
      "Status": 0,
      "ListGoodReciptDetailsModel":[]
  },
  "listGoodReceiptDetailModels": [
      {
          "GoodReceiptId": 4,
          "ProductId": 3,
          "PriceUnit": 200,
          "Quantity": 20
      },
      {
          "GoodReceiptId": 4,
          "ProductId": 3,
          "PriceUnit": 200,
          "Quantity": 20
      }
  ],
  "idWareHouse": 3
}*/