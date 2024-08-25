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

import { Button, Form, Input, Modal, Pagination, Table } from "antd";
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

interface IData {
  code: string;
  time: string;
  trans: string;
  fee: number;
  status: string;
}

interface IProduct {
  code: string;
  quantity: string;
  name: string
}

const fakeData = [
  {
    code: "PN000038",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000037",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000036",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000035",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000034",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000033",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000032",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000031",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000030",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000029",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000028",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000027",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000026",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000025",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
  {
    code: "PN000024",
    time: "10/11/2023",
    trans: "Công ty Hoàng Gia",
    fee: 0,
    status: "Đã nhập hàng",
  },
];

const listProductsFake = [
  {
    code: "SP000001",
    quantity: "10",
    name: "Mì gói Hảo Hảo"
  },
  {
    code: "SP000005",
    quantity: "13",
    name: "Mì gói Indome"
  },
  {
    code: "SP000015",
    quantity: "10",
    name: "Sữa Vinanilk..."
  },
  {
    code: "SP000002",
    quantity: "08",
    name: "Bún khô Meizan V..."
  }
]

export default function Transaction() {
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
  //call api set data xuất kho
  const [dataTrans, setDataTrans] = useState<IData[]>([]);
  const [page, setPage] = useState<number>(1);
  const size = 7;

  const [dataChoose, setDataChoose] = useState<IData>();
  const [isShowModal, setIsShowModal] = useState<string>();

  //call api set data products on modal
  const [listProduct, setListProduct] = useState<IProduct[]>(listProductsFake);

  useEffect(() => {
    setDataTrans(fakeData.slice((page - 1) * size, page * size));
  }, [page]);

  const [form] = Form.useForm();

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

  const onFinish = () => {
    console.log(form.getFieldsValue());
  };

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
        <div className="filterField">
          <div className="title">Phiếu xuất kho</div>
          <CustomInput placeholder="Theo mã xuất kho" />
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
              onClick={() => setIsShowModal("create")}
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
              <th className="table-header-trans">Đối tác</th>
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
                            setIsShowModal("edit");
                            form.setFieldsValue(tran);
                          }}
                        >
                          Sửa
                        </Button>
                        <Button
                          icon={<DeleteOutlined />}
                          className="delete-button"
                          onClick={() => {
                            setIsShowModal("delete");
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
        open={isShowModal === "delete"}
        onOk={() => setIsShowModal(undefined)}
        onCancel={() => setIsShowModal(undefined)}
        okText="Xác nhận"
        cancelText="Huỷ"
      >
        <p>Bạn có chắc sẽ xoá nó không?</p>
      </Modal>
      <Modal
        title={`Phiếu xuất kho${
          form.getFieldValue("code") ? " - " + form.getFieldValue("code") : ""
        }`}
        open={isShowModal === "create" || isShowModal === "edit"}
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
          <div className="modal-desc">Xuất từ kho tổng</div>
        </div>
        <hr className="modal-line" />
        <div className="modal-content">
          <div className="modal-box">
            <Form form={form} onFinish={onFinish}>
              <Form.Item className="code" label={"Mã xuất kho"} name={"code"}>
                <Input disabled />
              </Form.Item>
              <Form.Item className="time" label={"Ngày xuất"} name={"time"}>
                <Input disabled />
              </Form.Item>
              <Form.Item
                className="trans"
                label={"Đối tác"}
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
  );
}
