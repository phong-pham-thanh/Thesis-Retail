import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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

import { Button, Form, Input, message, Modal, Pagination, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import CustomInput from "../../component/searchBox";
import CustomSelect from "../../component/selectBox";
import {
  EditOutlined,
  UploadOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  ListGoodReciptDetailsModel,
  GoodExportReceiptDetailDataType,
} from "../../../app/type.d";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import {
  processAPIPostLink,
  ProcessDate,
  ProcessStatus,
} from "../../../app/processFunction";
import { StateFilter, WarehouseFilter, CustomerFilter } from "./FilterBoxes";


const emptydata: GoodExportReceiptDetailDataType = {
  "id": 0,
  "exportDate": "01/01/1970",
  "totalAmount": 0,
  "customerId": 0,
  "customer": {
    "id": "0",
    "name": "",
    "phoneNumber": "",
  },
  exportStatus: 0,
  listGoodExportDetailModels: [
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
          "id": "0",
          "name": ""
        },
        description: "",
        status: true,
        listInventories: null,
      },
      "priceUnit": 0,
      "quantity": 0
    }],
  "wareHouseId": "0",
  "wareHouse": null,
}

export default function ExportTransaction() {
  const navigate = useNavigate();

  //useSelector, useNavigate
  const [exportReceiptData, setExportReciptData] = useState<GoodExportReceiptDetailDataType[]>([]);
  const [showReceiptData, setShowReciptData] = useState<GoodExportReceiptDetailDataType[]>([]);
  const [goodReceiptData, setGoodReciptData] = useState<GoodExportReceiptDetailDataType>(emptydata);

  const [filterByCustomer, setFilterByCustomer] = useState("");
  const [filterByStatus, setFilterByStatus] = useState([]);
  const [filterByWarehouse, setFilterByWarehouse] = useState([]);

  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  //call api set data xuất kho
  const [page, setPage] = useState<number>(1);
  const size = 9;

  const [IDChoose, setIDChoose] = useState<string>();
  const [dataChoose, setDataChoose] =
    useState<GoodExportReceiptDetailDataType>();
  const [showModal, setShowModal] = useState<string>();

  //call api set data products on modal
  const [listProduct, setListProduct] =
    useState<ListGoodReciptDetailsModel[]>();
  const [form] = Form.useForm();

  useEffect(() => {
    document.title = "Quản lý Xuất hàng";
    getAllGoodReceipt()
      .then((res) => {
        setExportReciptData(res.data);
        setShowReciptData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [showModal]);

  const getAllGoodReceipt = () => {
    const api_link = api_links.goodsIssue.export.getAll;
    return fetch_Api(api_link);
  };

  const getGoodReceiptByID = (ID: string) => {
    const api_link = api_links.goodsIssue.export.getById;
    api_link.url = processAPIPostLink(api_link.url, ID);
    return fetch_Api(api_link);
  };

  const handleEdit = (ID: string) => {
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
  };

  const handleDeleteConfirm = (ID: string) => {
    getGoodReceiptByID(ID)
      .then((res) => {
        setGoodReciptData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        setGoodReciptData(emptydata);
        console.log(error);
      });
    setShowModal("delete");
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

  const handleAccept = (receiptId: number) => {
    const api_link = api_links.goodsIssue.export.accept;
    api_link.url = processAPIPostLink(api_link.url, receiptId);
    console.log(api_link);
    fetch_Api(api_link)
      .then((res) => {
        message.success("Đã duyệt hóa đơn " + receiptId);
      })
      .catch((error) => {
        message.error("Đơn " + receiptId + " chưa được duyệt");
        message.error(error.detail);
      });
    setShowModal(undefined);
  };

  const handleDelete = (receiptId: number) => {
    const api_link = api_links.goodsIssue.export.delete;
    api_link.url = processAPIPostLink(api_link.url, receiptId);
    console.log(api_link);
    fetch_Api(api_link)
      .then((res) => {
        message.success("Đã xóa đơn " + receiptId);
        // location.reload();
      })
      .catch((error) => {
        message.error("Đơn " + receiptId + " chưa được xóa");
        message.error(error.detail);
      });
    setShowModal(undefined);
  };

  const handleDownload = (receiptId: number) => {
    const api_link = api_links.goodsIssue.export.download;
    api_link.url = processAPIPostLink(api_link.url, receiptId);
    axios
      .get(api_link.url, { responseType: "blob" }) // Đảm bảo trả về blob
      .then((response) => {
        if (response.status === 200) {
          const url = window.URL.createObjectURL(response.data);
          const a = document.createElement("a");
          a.href = url;
          a.download = `phieu_xuat_kho_${receiptId}`; // Đặt tên file
          a.click();

          window.URL.revokeObjectURL(url);

          message.success("Đã tải phiếu xuất " + receiptId);
        } else {
          throw new Error(`Failed to download file: ${response.status}`);
        }
      })
      .catch((error) => {
        // Xử lý lỗi khi tải file thất bại
        message.error("Không thể tải phiếu xuất " + receiptId);
        message.error(error?.detail);
      });
  }

  const handleCancel = (receiptId: number | string) => {
    const api_link = api_links.goodsIssue.export.cancel;
    api_link.url = processAPIPostLink(api_link.url, receiptId);
    fetch_Api(api_link)
      .then((res) => {
        message.success("Đã hủy hóa đơn " + receiptId);
      })
      .catch((error) => {
        message.error("Đơn " + receiptId + " chưa được hủy");
        message.error(error.detail);
      });
    setShowModal(undefined);
  };

  const filterReceiptList = (stateId: string[], warehouseId: string[], customerName: string) => {
    console.log(customerName);
    // Không filter
    if ((stateId === null || stateId?.length == 0 || stateId?.includes(null)) &&
      (warehouseId === null || warehouseId?.length == 0 || warehouseId?.includes(null)) &&
      (customerName === null || customerName?.length == 0 || customerName?.includes(null)))// && filter customer by name = null
    {
      setShowReciptData(exportReceiptData);
      return;
    }

    if (stateId === null || stateId?.length == 0 || stateId?.includes(null)) {
      if (warehouseId === null || warehouseId?.length == 0 || warehouseId?.includes(null)) {
        //filter theo tên khách hàng
        let filtered = exportReceiptData.filter((product) => (
          product.customer?.name.includes(customerName))
        );
        setShowReciptData(filtered);
      }
      else {
        if (customerName === null || customerName?.length == 0 || customerName?.includes(null)) {
          //filter theo kho
          let filtered = exportReceiptData.filter((product) => (
            warehouseId?.includes(product.wareHouseId))
          );
          setShowReciptData(filtered);
        } else {
          //filter theo khách và kho 
          let filtered = exportReceiptData.filter((product) => (
            product.customer?.name.includes(customerName) &&
            warehouseId?.includes(product.wareHouseId))
          );
          setShowReciptData(filtered);
        }
      }
    } else {
      if (warehouseId === null || warehouseId?.length == 0 || warehouseId?.includes(null)) {
        if (customerName === null || customerName?.length == 0 || customerName?.includes(null)) {
          //filter theo trạng thái
          let filtered = exportReceiptData.filter((product) => (
            stateId?.includes(String(product.exportStatus)))
          );
          setShowReciptData(filtered);
        } else {
          //filter theo khách và trạng thái  
          let filtered = exportReceiptData.filter((product) => (
            product.customer?.name.includes(customerName) &&
            stateId?.includes(String(product.exportStatus)))
          );
          setShowReciptData(filtered);
        }
      }
      else {
        if (customerName === null || customerName?.length == 0 || customerName?.includes(null)) {
          //filter theo trạng thái và kho
          let filtered = exportReceiptData.filter((product) => (
            stateId?.includes(String(product.exportStatus)) &&
            warehouseId?.includes(product.wareHouseId))
          );
          setShowReciptData(filtered);
        } else {
          //filter theo khách và trạng thái và kho
          let filtered = exportReceiptData.filter((product) => (
            product.customer?.name.includes(customerName) &&
            stateId?.includes(String(product.exportStatus)) &&
            warehouseId?.includes(product.wareHouseId))
          );
          setShowReciptData(filtered);
        }
      }
    }
  };

  function handleChangeFilterState(value: string[]): void {
    setFilterByStatus(value);
    filterReceiptList(value, filterByWarehouse, filterByCustomer);
  };

  function handleChangeFilterWarehouse(value: string[]): void {
    setFilterByWarehouse(value);
    filterReceiptList(filterByStatus, value, filterByCustomer);
  };

  function handleChangeFilterCustomer(value: string): void {
    setFilterByCustomer(value);
    filterReceiptList(filterByStatus, filterByWarehouse, value);
  };

  const onFinish = () => {
    setShowModal(undefined);
    form.resetFields();
  };

  const columns: ColumnsType<GoodExportReceiptDetailDataType> = [
    {
      title: "Mã nhập hàng",
      dataIndex: "id",
      sorter: (a, b) => a.id < b.id ? -1 : 1,
    },
    {
      title: "Ngày xuất",
      key: "exportDate",
      render: (record) => {
        return <ProcessDate dateString={record.exportDate.toLocaleString()} />
      },
      sorter: (a, b) => a.exportDate < b.exportDate ? -1 : 1,
    },
    {
      title: "Kho xuất",
      // dataIndex: "wareHouseId",
      dataIndex: ["wareHouse", "address"],
      sorter: (a, b) => a.wareHouseId < b.wareHouseId ? -1 : 1,
    },
    {
      title: "Khách hàng",
      dataIndex: ["customer", "name"],
      sorter: (a, b) => a.customer ? (b.customer ? (-b.customer?.name.localeCompare(a.customer?.name)) : -1) : 1,
    },
    {
      title: "Người tạo phiếu",
      dataIndex: ["createdBy", "name"],
      sorter: (a, b) => a.createdBy ? (b.createdBy ? (-b.createdBy?.name.localeCompare(a.createdBy?.name)) : -1) : 1,
    },
    /*{
      title: "Tổng tiền",
      key: "totalAmount",
      render: (record) => {
        return record.totalAmount?.toLocaleString();
      },
    },*/
    {
      title: "Trạng thái",
      key: "exportStatus",
      render: (record) => {
        return <ProcessStatus status={record.exportStatus} />
      },
      sorter: (a, b) => a.exportStatus < b.exportStatus ? -1 : 1,
    },

    {
      title: "",
      key: "action",
      width: "112px",
      render: (_, record) => (
        <Space size="small">
          <Button
            size={"middle"}
            icon={<EditOutlined />}
            className="edit-button"
            onClick={() => {
              handleEdit(String(record.id));
              setShowModal("edit");
              //form.setFieldsValue(record);
            }}
          >{/*Chi tiết*/}
          </Button>
          <Button
            size={"middle"}
            icon={<DeleteOutlined />}
            className="delete-button"
            onClick={() => {
              handleDeleteConfirm(String(record.id));
              setShowModal("delete");
            }}
          >
          </Button>
        </Space>
      ),
    },
  ];

  //////////// EDIT MODAL//////////
  const ExportReceiptDetail = (
    ID: string,
    isShowModal?: boolean,
    setIsShowModal?: any
  ) => {
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
          footer={(_, { OkBtn, CancelBtn }) =>
            goodReceiptData.exportStatus == 2 ? (
              <>
                <Button style={{ "background": "green" }} onClick={() => handleAccept(goodReceiptData.id)}>Hoàn thành</Button>
                <Button style={{ "background": "red" }} onClick={() => handleCancel(goodReceiptData.id)}>Hủy bỏ</Button>
                <Button style={{ "background": "orange" }} onClick={() => navigate("chinh-sua/" + goodReceiptData.id)}>Chỉnh sửa</Button>
                <Button onClick={() => handleDownload(goodReceiptData.id)}>Tải thông tin phiếu</Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleDownload(goodReceiptData.id)}>Tải thông tin phiếu</Button>
                <Button onClick={onFinish}>OK</Button>
              </>
            )
          }
          className="modal-create-trans"
        >
          <div className="modal-header">
            <div className="modal-info">Thông tin</div>
            {/*<div className="modal-desc">xuất đến kho hiện tại</div>*/}
          </div>
          <div className="modal-content">
            <div className="modal-box">
              <Form form={form} onFinish={onFinish}>
                <Form.Item className="code" label={"Mã xuất kho"} name={"code"}>
                  {goodReceiptData.id}
                </Form.Item>
                <Form.Item className="time" label={"Ngày xuất"} name={"time"}>
                  <ProcessDate dateString={goodReceiptData.exportDate} />
                </Form.Item>
                <Form.Item
                  className="trans"
                  label={"Khách hàng"}
                  name={"trans"}
                >
                  {goodReceiptData.customer?.name}
                </Form.Item>
                <Form.Item className="createdBy" label={"Người tạo phiếu"} name={"createdBy"}>
                  {goodReceiptData.createdBy?.name}
                </Form.Item>
                {goodReceiptData.exportStatus !== 2 && (
                  <Form.Item className="acceptedBy" label="Người hoàn thành" name="acceptedBy">
                    {goodReceiptData.acceptedBy?.name}
                  </Form.Item>
                )}
                <Form.Item
                  className="status"
                  label={"Trạng thái"}
                  name={"status"}
                >
                  <ProcessStatus status={goodReceiptData.exportStatus} />
                </Form.Item>
              </Form>
            </div>
            <div className="modal-products">
              {/*<h4>
                Tổng cộng: {goodReceiptData.totalAmount?.toLocaleString()}
              </h4>*/}
              <table>
                <thead>
                  <th className="code">Tên sản phẩm</th>
                  <th className="quantity">Số lượng</th>
                  {/*<th className="name">Đơn giá</th>*/}
                </thead>
                <tbody>
                  {goodReceiptData.listGoodExportDetailsModel &&
                    goodReceiptData.listGoodExportDetailsModel.length > 0 &&
                    goodReceiptData.listGoodExportDetailsModel.map(
                      (product, index) => (
                        <tr key={index}>
                          <td className="name">
                            {product.product.name ? product.product.name : ""}
                          </td>
                          <td className="quantity">{product.quantity}</td>
                          {/*<td className="priceUnit">
                            {product.priceUnit?.toLocaleString()}
                          </td>*/}
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <React.Fragment>
      {ExportReceiptDetail(IDChoose, goodReceiptData && showModal === "edit")}
      <div className="product-container">
        <div className="filterField">
          <div className="title">Phiếu xuất kho</div>
          <StateFilter onSelect={handleChangeFilterState} />
          <WarehouseFilter onSelect={handleChangeFilterWarehouse} />
          <CustomerFilter onSelect={handleChangeFilterCustomer} />
        </div>
        <div className="product-list transaction-list">
          <div className="header-action">
            <Button
              icon={<PlusCircleOutlined />}
              className="custom-button"
              onClick={() =>
                //setShowModal("create")
                navigate("tao-moi")
              }
            >
              Thêm mới
            </Button>
            {/*<Button icon={<DownloadOutlined />} className="custom-button">
              Nhập File
            </Button>
            <Button icon={<UploadOutlined />} className="custom-button">
              Xuất File
            </Button>*/}
          </div>
          <Table
            columns={columns}
            dataSource={showReceiptData}
            loading={loading}
            rowKey="id"
          />
        </div>
        <Modal
          title="Xoá"
          open={showModal === "delete"}
          onOk={() => handleDelete(goodReceiptData.id)}
          onCancel={() => setShowModal(undefined)}
          okText="Xác nhận"
          cancelText="Huỷ"
        >
          <p>Bạn có chắc sẽ xoá đơn số {goodReceiptData.id} không?</p>
        </Modal>
      </div>
    </React.Fragment>

  );
}

{/*<table className="table">
            <thead className="table-header">
              <th className="table-header-code">Mã xuất hàng</th>
              <th className="table-header-time">Thời gian</th>
              <th className="table-header-trans">Mã kho xuất</th>
              <th className="table-header-trans">Khách hàng</th>
              <th className="table-header-total">Tổng tiền</th>
              <th className="table-header-status">Trạng thái</th>
              <th className="table-header-action"></th>
            </thead>
            <tbody className="table-body">
              {exportReceiptData &&
                exportReceiptData.length > 0 &&
                showReceiptData.map((tran) => (
                  <tr
                    key={Number(tran.id)}
                    onClick={() => {
                      setDataChoose(tran);
                      setIDChoose(String(tran.id));
                    }}
                    className={`${dataChoose?.id === tran.id && "tr-active"}`}
                  >
                    <td className="table-body-code">{tran.id}</td>
                    <td className="table-body-time"><ProcessDate dateString={tran.exportDate.toLocaleString()} /></td>
                    <th className="table-body-trans">{tran.wareHouseId}</th>
                    <td className="table-body-time">
                      <ProcessDate
                        dateString={tran.exportDate.toLocaleString()}
                      />
                    </td>
                    <td className="table-body-trans">{tran.customer?.name}</td>
                    <td className="table-body-total">
                      {tran.totalAmount?.toLocaleString()}
                    </td>
                    <td className="table-body-status">
                      <ProcessStatus status={tran.exportStatus} />
                    </td>
                    {dataChoose?.id === tran.id && (
                      <td className="table-body-action">
                        <Button
                          icon={<EditOutlined />}
                          className="edit-button"
                          onClick={() => {
                            handleEdit(String(tran.id));
                            setShowModal("edit");
                            form.setFieldsValue(tran);

                            setListProduct(
                              form.getFieldValue("listGoodReciptDetailsModel")
                            );
                          }}
                        >
                          Chi tiết
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
              total={exportReceiptData.length}
              onChange={(page) => {
                setShowReciptData(exportReceiptData.slice((page - 1) * size, page * size));
                setPage(page);
              }}
            />
          </div>*/}
