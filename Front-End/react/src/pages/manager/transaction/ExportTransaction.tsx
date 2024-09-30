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
import Logo from "../../component/IconComponent/AppLogo";
import IconTongquan from "../../../icon/menu-tongquan.svg";
import IconHanghoa from "../../../icon/menu-hanghoa.svg";
import IconGiaodich from "../../../icon/menu-giaodich.svg";
import IconDoitac from "../../../icon/menu-doitac.svg";
import IconNV from "../../../icon/menu-nhanvien.svg";
import IconKhuyenmai from "../../../icon/menu-khuyenmai.svg";
import IconBaocao from "../../../icon/menu-baocao.svg";
import IconLogout from "../../../icon/logout.svg";

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
import {  ListGoodReciptDetailsModel, GoodExportReceiptDetailDataType } from "../../../app/type.d";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";

const emptydata:GoodExportReceiptDetailDataType={
  "id": 0,
  "exportDate": "01/01/1970",
  "totalAmount": 0,
  "customerID": 0,
  "customer": {
    "id": 0,
    "name": "",
    "totalSale": 0
  },
  "exportStatus": 0,
  "listGoodExportDetailsModel": [
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

export default function ExportTransaction() {
  const navigate = useNavigate();
  
  //useSelector, useNavigate
  const [exportReceiptData, setExportReciptData] = useState<GoodExportReceiptDetailDataType[]>([]);
  const [goodReceiptData, setGoodReciptData] = useState<GoodExportReceiptDetailDataType>(emptydata);

  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  //call api set data xuất kho
  const [page, setPage] = useState<number>(1);
  const size = 7;

  const [IDChoose, setIDChoose] = useState<string>();
  const [dataChoose, setDataChoose] = useState<GoodExportReceiptDetailDataType>();
  const [showModal, setShowModal] = useState<string>();

  //call api set data products on modal
  const [listProduct, setListProduct] = useState<ListGoodReciptDetailsModel[]>();
  const [form] = Form.useForm();

  useEffect(() => {
    getAllGoodReceipt()
      .then((res) => {
        setExportReciptData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //setDataTrans(fakeData.slice((page - 1) * size, page * size));
  }, [page]);

  const getAllGoodReceipt = () => {
    const api_link = api_links.goodsIssue.export.getAll;
    return fetch_Api(api_link);
  };

  const getGoodReceiptByID = (ID:string) => {
    const api_link = api_links.goodsIssue.export.getById;
    const words1 = api_link.url.split('/');
words1.pop();words1.push(ID);
const strCopy1 = words1.join('/');
    api_link.url=strCopy1;
    console.log(api_link);
    return fetch_Api(api_link);
  };

  const proccessStatus = (status: Number) => {
    switch (status) {
      case 0:

        return <Tag color="error">Đã hủy</Tag>

      case 1:
        return <Tag color="success">Hoàn thành</Tag>

        break;
      case 2:
        return <Tag color="processing">Đang xử lý</Tag>

        break;
      default:
        break;
    }
    return;

  }

  const proccessDate = (dateString: String) => {
    const date = new Date(dateString.toLocaleString());
    const hour=date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2});
    const min=date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2});
    const timeString=hour+":"+min;
    const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedDate = formatter.format(date);
    const newDateString ="";
    //return formattedDate;
    return (<div>{timeString}<br/>{formattedDate}</div>);
  }

const handleEdit =(ID:string)=>{
  getGoodReceiptByID(ID)
      .then((res) => {
        setGoodReciptData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        setGoodReciptData(emptydata);
        console.log(error);
      });
    setShowModal("edit");
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


 //////////// EDIT MODAL//////////
  const ExportReceiptDetail=(ID: string, isShowModal?: boolean, setIsShowModal?: any)=>{
  return (
    <div className="product-container">
      <Modal
        title={`Phiếu xuất kho${" - " + goodReceiptData.id}`}
        open={isShowModal}
        onOk={() => setShowModal(undefined)}
        onCancel={() => {
          setShowModal(undefined);
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
          {/*<div className="modal-desc">xuất đến kho hiện tại</div>*/}
        </div>
        <hr className="modal-line" />
        <div className="modal-content">
          <div className="modal-box">
            <Form form={form} onFinish={onFinish}>
              <Form.Item className="code" label={"Mã xuất kho"} name={"code"}>
                {goodReceiptData.id}
              </Form.Item>
              <Form.Item className="time" label={"Ngày xuất"} name={"time"}>
                {proccessDate(goodReceiptData.exportDate)}
              </Form.Item>
              <Form.Item
                className="trans"
                label={"Khách hàng"}
                name={"trans"}
                rules={[{ required: true }]}
              >
                {goodReceiptData.customer.name}
              </Form.Item>
              <Form.Item
                className="status"
                label={"Trạng thái"}
                name={"status"}
              >
                {proccessStatus(goodReceiptData.exportStatus)}
              </Form.Item>
            </Form>
          </div>
          <div className="modal-products">
          <h4>Tổng cộng: {goodReceiptData.totalAmount?.toLocaleString()}</h4>
            <table>
              <thead>
                <th className="code">Tên sản phẩm</th>
                <th className="quantity">Số lượng</th>
                <th className="name">Đơn giá</th>
              </thead>
              <tbody>
                {goodReceiptData.listGoodExportDetailsModel &&
                  goodReceiptData.listGoodExportDetailsModel.length > 0 &&
                  goodReceiptData.listGoodExportDetailsModel.map((product, index) => (
                    <tr key={index}>
                      <td className="name">{product.product.name?product.product.name:""}</td>
                      <td className="quantity">{product.quantity}</td>
                      <td className="priceUnit">{product.priceUnit?.toLocaleString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      
    </div>
  );}


  return (
    <React.Fragment>
    {ExportReceiptDetail(
        IDChoose,
        goodReceiptData && showModal==="edit")}
      <div className="product-container">
      
      <div className="filterField">
        <div className="title">Phiếu xuất kho</div>
      </div>
      <div className="product-list transaction-list">
        <div className="header-action">
          <Button icon={<EditOutlined />} className="custom-button">
            Điều chỉnh
          </Button>
          <Button
            icon={<PlusCircleOutlined />}
            className="custom-button"
            onClick={() => //setShowModal("create")
              navigate("tao-moi")}          >
            Thêm mới
          </Button>
          <Button icon={<DownloadOutlined />} className="custom-button">
            Nhập File
          </Button>
          <Button icon={<UploadOutlined />} className="custom-button">
            Xuất File
          </Button>
        </div>
        <table className="table">
          <thead className="table-header">
            <th className="table-header-code">Mã xuất hàng</th>
            <th className="table-header-time">Thời gian</th>
            <th className="table-header-trans">Khách hàng</th>
            <th className="table-header-total">Tổng tiền</th>
            <th className="table-header-status">Trạng thái</th>
            <th className="table-header-action"></th>
          </thead>
          <tbody className="table-body">
            {exportReceiptData &&
              exportReceiptData.length > 0 &&
              exportReceiptData.map((tran) => (
                <tr
                  key={Number(tran.id)}
                  onClick={() => {
                    setDataChoose(tran);
                    setIDChoose(String(tran.id));
                  }}
                  className={`${dataChoose?.id === tran.id && "tr-active"
                    }`}
                >
                  <td className="table-body-code">{tran.id}</td>
                  <td className="table-body-time">{proccessDate(tran.exportDate.toLocaleString())}</td>
                  <td className="table-body-trans">{tran.customer.name}</td>
                  <td className="table-body-total">{tran.totalAmount?.toLocaleString()}</td>
                  <td className="table-body-status">{proccessStatus(tran.exportStatus)}</td>
                  {dataChoose?.id === tran.id && (
                    <td className="table-body-action">
                      <Button
                        icon={<EditOutlined />}
                        className="edit-button"
                        onClick={() => {
                          handleEdit(String(tran.id));
                          setShowModal("edit");
                          form.setFieldsValue(tran);
                          
                          setListProduct(form.getFieldValue("listGoodReciptDetailsModel"))
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        icon={<DeleteOutlined />}
                        className="delete-button"
                        onClick={() => {
                          setShowModal("delete");
                        }}
                      >
                        Xoá
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        <div className="custom-pagination">
          <Pagination
            current={page}
            //total={fakeData.length}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
      <Modal
        title="Xoá"
        open={showModal === "delete"}
        onOk={() => setShowModal(undefined)}
        onCancel={() => setShowModal(undefined)}
        okText="Xác nhận"
        cancelText="Huỷ"
      >
        <p>Bạn có chắc sẽ xoá nó không?</p>
      </Modal>
      </div>
      </React.Fragment>
      
  );
}