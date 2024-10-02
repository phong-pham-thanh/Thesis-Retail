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
import { GoodReceiptDataType, GoodImportReceiptDetailDataType } from "../../../app/type.d";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import { ProcessDate, ProcessStatus } from "../../../app/processFunction"

const emptydata:GoodImportReceiptDetailDataType={
  "id": 0,
  "importDate": "01/01/1970",
  "partnerID": 0,
  "totalAmount": 0,
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

export default function ImportTransaction() {
  const navigate = useNavigate();

  //useSelector, useNavigate
  const [importReceiptData, setImportReciptData] = useState<GoodReceiptDataType[]>([]);
  const [goodReceiptData, setGoodReciptData] = useState<GoodImportReceiptDetailDataType>(emptydata);

  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  //call api set data nhập kho
  const [page, setPage] = useState<number>(1);
  const size = 7;

  const [IDChoose, setIDChoose] = useState<string>();
  const [dataChoose, setDataChoose] = useState<GoodReceiptDataType>();
  const [showModal, setShowModal] = useState<string>();

  //call api set data products on modal
  const [form] = Form.useForm();

  useEffect(() => {
    getAllGoodReceipt()
      .then((res) => {
        setImportReciptData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //setDataTrans(fakeData.slice((page - 1) * size, page * size));
  }, [page]);

  const getAllGoodReceipt = () => {
    const api_link = api_links.goodsIssue.import.getAll;
    return fetch_Api(api_link);
  };

  const getGoodReceiptByID = (ID:string) => {
    const api_link = api_links.goodsIssue.import.getById;
    const words1 = api_link.url.split('/');
words1.pop();words1.push(ID);
const strCopy1 = words1.join('/');
    api_link.url=strCopy1;
    return fetch_Api(api_link);
  };

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
  const ImportReceiptDetail=(ID: string, isShowModal?: boolean, setIsShowModal?: any)=>{
  return (
    <div className="product-container">
      <Modal
        title={`Phiếu nhập kho${" - " + goodReceiptData.id}`}
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
              <ProcessDate dateString={goodReceiptData.importDate}/>
              </Form.Item>
              <Form.Item
                className="trans"
                label={"Nhà cung cấp"}
                name={"trans"}
              >
                {goodReceiptData.partner.name}
              </Form.Item>
              <Form.Item
                className="status"
                label={"Trạng thái"}
                name={"status"}
              >
                <ProcessStatus status={goodReceiptData.receiptStatus}/>
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
                {goodReceiptData.listGoodReciptDetailsModel &&
                  goodReceiptData.listGoodReciptDetailsModel.length > 0 &&
                  goodReceiptData.listGoodReciptDetailsModel.map((product, index) => (
                    <tr key={index}>
                      <td className="name">{product.product.name?product.product.name:""}</td>
                      <td className="quantity">{product.quantity}</td>
                      <td className="priceUnit">{product.priceUnit.toLocaleString()}</td>
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
    {ImportReceiptDetail(
        IDChoose,
        goodReceiptData && showModal==="edit")}
      <div className="product-container">
      
      <div className="filterField">
        <div className="title">Phiếu nhập kho</div>
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
              navigate("tao-moi")}
          >
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
            <th className="table-header-code">Mã nhập hàng</th>
            <th className="table-header-time">Thời gian</th>
            <th className="table-header-trans">Nhà cung cấp</th>
            <th className="table-header-total">Tổng tiền</th>
            <th className="table-header-status">Trạng thái</th>
            <th className="table-header-action"></th>
          </thead>
          <tbody className="table-body">
            {importReceiptData &&
              importReceiptData.length > 0 &&
              importReceiptData.map((tran) => (
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
                  <td className="table-body-time"><ProcessDate dateString={tran.importDate.toLocaleString()}/></td>
                  <td className="table-body-trans">{tran.partner.name}</td>
                  <td className="table-body-total">{tran.totalAmount?.toLocaleString()}</td>
                  <td className="table-body-status"><ProcessStatus status={tran.receiptStatus}/></td>
                  {dataChoose?.id === tran.id && (
                    <td className="table-body-action">
                      <Button
                        icon={<EditOutlined />}
                        className="edit-button"
                        onClick={() => {
                          handleEdit(String(tran.id));
                          setShowModal("edit");
                          form.setFieldsValue(tran);
                          
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

      {/*//////////// EDIT MODAL//////
      <Modal
        title={`Phiếu nhập kho`}//${goodReceiptData?.id?? " - " + goodReceiptData.id}
        open={showModal==="edit"}
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
          {/*<div className="modal-desc">Nhập đến kho hiện tại</div>}
        </div>
        <hr className="modal-line" />
        <div className="modal-content">
          <div className="modal-box">
            <Form form={form} onFinish={onFinish}>
              <Form.Item className="code" label={"Mã nhập kho"} name={"code"}>
                {goodReceiptData?.id}
              </Form.Item>
              <Form.Item className="time" label={"Ngày nhập"} name={"time"}>
                {goodReceiptData?proccessDate(goodReceiptData?.importDate):""}
              </Form.Item>
              <Form.Item
                className="trans"
                label={"Nhà cung cấp"}
                name={"trans"}
                rules={[{ required: true }]}
              >
                {goodReceiptData?.partner?.name}
              </Form.Item>
              <Form.Item
                className="status"
                label={"Trạng thái"}
                name={"status"}
              >
                {goodReceiptData??proccessStatus(Number(goodReceiptData?.receiptStatus))}
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
                {goodReceiptData?.listGoodReciptDetailsModel &&
                  goodReceiptData?.listGoodReciptDetailsModel.length > 0 &&
                  goodReceiptData?.listGoodReciptDetailsModel.map((product, index) => (
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
*/}
      {/*<React.Fragment>

      <ProductInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={dataShow}
        componentDisabled={componentDisabled}
        setComponentDisabled={setComponentDisabled}
      />
          <div className="dashboard-container">

      <div className="product-container">
        <div className="filterField">
          <div className="title">Phiếu nhập kho</div>
          <CustomInput placeholder="Theo mã nhập kho" />
          <FilterBox title={"Chi nhánh"} type={"store"} />
          <FilterBox title={"Thời gian"} type={"time"} />
          <FilterBox title={"Trạng thái"} type={"status"} />
          <CustomSelect
            placeholder="Chọn người tạo"
            options={[
              {
                value: "0",
                label: "Phong",
              },
              {
                value: "1",
                label: "Tuấn",
              },
              {
                value: "2",
                label: "Khanh",
              },
            ]}
          />
        </div>
        <div className="product-list transaction-list">
          <div className="header-action">
            <Button icon={<EditOutlined />} className="custom-button">
              Điều chỉnh
            </Button>
            <Button
              icon={<PlusCircleOutlined />}
              className="custom-button"
              onClick={() => setShowModal("create")}
            >
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
              <th className="table-header-code">Mã nhập hàng</th>
              <th className="table-header-time">Thời gian</th>
              <th className="table-header-trans">Nhà cung cấp</th>
              <th className="table-header-fee">Cần trả nhà cung cấp</th>
              <th className="table-header-status">Trạng thái</th>
              <th className="table-header-action"></th>
            </thead>
            <tbody className="table-body">
              {dataTrans &&
                dataTrans.length > 0 &&
                dataTrans.map((tran) => (
                  <tr
                    key={tran.code}
                    onClick={() => {
                      setDataChoose(tran);
                    }}
                    className={`${
                      dataChoose?.code === tran.code && "tr-active"
                    }`}
                  >
                    <td className="table-body-code">{tran.code}</td>
                    <td className="table-body-time">{tran.time}</td>
                    <td className="table-body-trans">{tran.trans}</td>
                    <td className="table-body-fee">{tran.fee}</td>
                    <td className="table-body-status">{tran.status}</td>
                    {dataChoose?.code === tran.code && (
                      <td className="table-body-action">
                        <Button
                          icon={<EditOutlined />}
                          className="edit-button"
                          onClick={() => {
                            setShowModal("edit");
                            form.setFieldsValue(tran);
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
              total={fakeData.length}
              onChange={(page) => setPage(page)}
            />
          </div>
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
      <Modal
        title={`Phiếu nhập kho${
          form.getFieldValue("code") ? " - " + form.getFieldValue("code") : ""
        }`}
        open={showModal === "create" || showModal === "edit"}
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
          <div className="modal-desc">Nhập đến kho hiện tại</div>
        </div>
        <hr className="modal-line" />
        <div className="modal-content">
          <div className="modal-box">
            <Form form={form} onFinish={onFinish}>
              <Form.Item className="code" label={"Mã nhập kho"} name={"code"}>
                <Input disabled />
              </Form.Item>
              <Form.Item className="time" label={"Ngày nhập"} name={"time"}>
                <Input disabled />
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
          <div className="modal-products">
            <table>
              <thead>
                <th className="code">Mã sản phẩm</th>
                <th className="quantity">Số lượng</th>
                <th className="name">Tên sản phẩm</th>
              </thead>
              <tbody>
                {listProduct &&
                  listProduct.length > 0 &&
                  listProduct.map((product, index) => (
                    <tr key={index}>
                      <td className="code">{product.code}</td>
                      <td className="quantity">{product.quantity}</td>
                      <td className="name">{product.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
    </React.Fragment>*/}

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