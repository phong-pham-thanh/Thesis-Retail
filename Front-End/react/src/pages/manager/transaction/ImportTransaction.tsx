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

import { Button, Form, Input, message, Modal, Pagination, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
//import ProductInformationPopupScreen from "../../component/popupEditProduct";
import CustomInput from "../../component/searchBox";
import CustomSelect from "../../component/selectBox";
import {
  EditOutlined,
  UploadOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { StateFilter, WarehouseFilter, PartnerFilter } from "./FilterBoxes";
import { GoodImportReceiptDetailDataType, PartnerState, WarehouseState } from "../../../app/type.d";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import { processAPIPostLink, ProcessDate, ProcessStatus } from "../../../app/processFunction"

const emptydata: GoodImportReceiptDetailDataType = {
  "id": 0,
  "importDate": "01/01/1970",
  "partnerID": 0,
  "totalAmount": 0,
  "partner": {
    "id": 0,
    "name": "",
    "totalSale": 0,
    "phoneNumber": "",
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
          "id": "0",
          "name": ""
        },
        "description": "",
        "status": true,
        "listInventories": null
      },
      "priceUnit": 0,
      "quantity": 0
    }],
  "wareHouseId": "0",
  "wareHouse": null,
}

export default function ImportTransaction() {
  const navigate = useNavigate();

  //useSelector, useNavigate
  const [importReceiptData, setImportReciptData] = useState<GoodImportReceiptDetailDataType[]>([]);
  const [filteredReceiptData, setFilteredReciptData] = useState<GoodImportReceiptDetailDataType[]>([]);
  const [goodReceiptData, setGoodReciptData] = useState<GoodImportReceiptDetailDataType>(emptydata);

  const [allPartners, setAllPartners] = useState<PartnerState[]>([]);
  const [allWarehouses, setAllWarehouses] = useState<WarehouseState[]>([]);

  const [filterState, setFilterByState] = useState([]);
  const [filterWarehouse, setFilterWarehouse] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState<string>("");
  const [filterByPartner, setFilterByPartner] = useState([]);
  const [filterByWarehouse, setFilterByWarehouse] = useState([]);

  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const size = 9;

  const [IDChoose, setIDChoose] = useState<string>();
  const [dataChoose, setDataChoose] = useState<GoodImportReceiptDetailDataType>();
  const [showModal, setShowModal] = useState<string>();

  //call api set data products on modal
  const [form] = Form.useForm();

  const filterByStatus = [
    {
      text: 'Đang xử lý',
      value: '2',
    },
    {
      text: 'Hoàn thành',
      value: '1',
    },
    {
      text: 'Đã hủy',
      value: '0',
    },
  ];

  useEffect(() => {
    getAllGoodReceipt()
      .then((res) => {
        setImportReciptData(res.data);
        setFilteredReciptData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    /*
        getAllPartner()
          .then((res) => {
            setAllPartners(res.data);
            res.data.map((item) => {
              filterByPartner.push({
                text: item.name ?? "0",
                value: item.id ?? "0"
              })
            });
          })
          .catch((error) => {
            console.log(error);
          });
    
        getAllWarehouse()
          .then((res) => {
            setAllWarehouses(res.data);
            res.data.map((item) => {
              filterByWarehouse.push({
                text: item.name ?? "0",
                value: item.id ?? "0"
              })
            });
          })
          .catch((error) => {
            console.log(error);
          });*/

  }, [showModal]);
  /*
    const getAllPartner = () => {
      const api_link = api_links.partner.getAll;
      return fetch_Api(api_link);
    };
    const getAllWarehouse = () => {
      const api_link = api_links.warehouse.getAll;
      return fetch_Api(api_link);
    };
  */
  const getAllGoodReceipt = () => {
    const api_link = api_links.goodsIssue.import.getAll;
    return fetch_Api(api_link);
  };

  const getGoodReceiptByID = (ID: string) => {
    const api_link = api_links.goodsIssue.import.getById;
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

  const handleAccept = (receiptId: number) => {
    const api_link = api_links.goodsIssue.import.accept;
    api_link.url = processAPIPostLink(api_link.url, receiptId);
    fetch_Api(api_link).then((res) => {
      message.success("Đã duyệt hóa đơn " + receiptId);
      setShowModal(undefined);
    })
      .catch((error) => {
        message.error("Đơn " + receiptId + " chưa được duyệt");
        message.error(error.detail);
      });
    setShowModal(undefined);

  };

  const handleCancel = (receiptId: number | string) => {
    const api_link = api_links.goodsIssue.import.cancel;
    api_link.url = processAPIPostLink(api_link.url, receiptId);
    fetch_Api(api_link).then((res) => {
      message.success("Đã hủy hóa đơn " + receiptId);
    })
      .catch((error) => {
        message.error("Đơn " + receiptId + " chưa được hủy");
        message.error(error.detail);
      });
    setShowModal(undefined);
  };

  const filterReceiptList = (stateId: string[], warehouseId: string[], customerName: string) => {
    // Không filter
    if ((stateId === null || stateId?.length == 0) &&
      (warehouseId === null || warehouseId?.length == 0) &&
      (customerName === null || customerName?.length == 0))// && filter customer by name = null
    {
      setFilteredReciptData(importReceiptData);
      return;
    }

    if (stateId === null || stateId?.length == 0) {
      if (warehouseId === null || warehouseId?.length == 0) {
        //filter theo tên khách hàng
        console.log(2)

        let filtered = importReceiptData.filter((product) => (
          product.partner?.name.includes(customerName))
        );
        setFilteredReciptData(filtered);
      }
      else {
        if (customerName === null || customerName?.length == 0) {
          //filter theo kho
          console.log(3)

          let filtered = importReceiptData.filter((product) => (
            warehouseId?.includes(product.wareHouseId))
          );
          setFilteredReciptData(filtered);
        } else {
          //filter theo khách và kho 
          console.log(4)

          let filtered = importReceiptData.filter((product) => (
            product.partner?.name.includes(customerName) &&
            warehouseId?.includes(product.wareHouseId))
          );
          setFilteredReciptData(filtered);
        }
      }
    } else {
      if (warehouseId === null || warehouseId?.length == 0) {
        if (customerName === null || customerName?.length == 0) {
          //filter theo trạng thái
          console.log(1)
          let filtered = importReceiptData.filter((product) => (
            stateId?.includes(String(product.receiptStatus)))
          );
          setFilteredReciptData(filtered);
        } else {
          //filter theo khách và trạng thái  
          console.log(5, customerName?.length, customerName)

          let filtered = importReceiptData.filter((product) => (
            product.partner?.name.includes(customerName) &&
            stateId?.includes(String(product.receiptStatus)))
          );
          setFilteredReciptData(filtered);
        }
      }
      else {
        if (customerName === null || customerName?.length == 0) {
          //filter theo trạng thái và kho
          console.log(6)
          let filtered = importReceiptData.filter((product) => (
            stateId?.includes(String(product.receiptStatus)) &&
            warehouseId?.includes(product.wareHouseId))
          );
          setFilteredReciptData(filtered);
        } else {
          console.log(7)

          //filter theo khách và trạng thái và kho
          let filtered = importReceiptData.filter((product) => (
            product.partner?.name.includes(customerName) &&
            stateId?.includes(String(product.receiptStatus)) &&
            warehouseId?.includes(product.wareHouseId))
          );
          setFilteredReciptData(filtered);
        }
      }
    }
  };
  /*  const filterReceiptList = (stateId: string[], warehouseId: string[]) => {
    if ((stateId === null || stateId.length == 0 || stateId.includes(null)) &&
      (warehouseId === null || warehouseId.length == 0 || warehouseId.includes(null))
    ) {
      setFilteredReciptData(importReceiptData);
      return;
    }
    let filtered = importReceiptData.filter((product) => (
      stateId?.includes(String(product.receiptStatus)) &&
      warehouseId?.includes(product.wareHouseId))
    );
    setFilteredReciptData(filtered);
  };*/

  function handleChangeFilterState(value: string[]): void {
    setFilterByState(value);
    filterReceiptList(value, filterWarehouse, filterCustomer);
  }

  function handleChangeFilterWarehouse(value: string[]): void {
    setFilterWarehouse(value);
    filterReceiptList(filterState, value, filterCustomer);
  }

  function handleChangeFilterCustomer(value: string): void {
    setFilterCustomer(value);
    filterReceiptList(filterState, filterWarehouse, value);
  }

  const onFinish = () => {
    setShowModal(undefined);
    form.resetFields();
  };

  const columns: ColumnsType<GoodImportReceiptDetailDataType> = [
    {
      title: "Mã nhập hàng",
      dataIndex: "id",
      sorter: (a, b) => a.id < b.id ? -1 : 1,
    },
    {
      title: "Ngày nhập",
      key: "importDate",
      render: (record) => {
        return <ProcessDate dateString={record.importDate.toLocaleString()} />
      },
      sorter: (a, b) => a.importDate < b.importDate ? -1 : 1,
    },
    {
      title: "Mã kho nhập",
      // dataIndex: "wareHouseId",
      dataIndex: ["wareHouse", "address"],
      /*filters: filterByWarehouse,
      onFilter: (value, record) => String(record.wareHouseId).indexOf(value as string) === 0,*/
      sorter: (a, b) => a.wareHouseId < b.wareHouseId ? -1 : 1,
    },
    {
      title: "Nhà cung cấp",
      dataIndex: ["partner", "name"],
      /*filters: filterByPartner,
      onFilter: (value, record) => String(record.partner.id).indexOf(value as string) === 0,*/
      sorter: (a, b) => a.partner ? (b.partner ? (-b.partner?.name.localeCompare(a.partner?.name)) : -1) : 1,
    },
    {
      title: "Tổng tiền",
      key: "totalAmount",
      render: (record) => {
        return record.totalAmount?.toLocaleString();
      },
      sorter: (a, b) => a.totalAmount < b.totalAmount ? -1 : 1,
    },
    {
      title: "Trạng thái",
      key: "receiptStatus",
      render: (record) => {
        return <ProcessStatus status={record.receiptStatus} />
      },
      /*filters: filterByStatus,
      onFilter: (value, record) => String(record.receiptStatus).indexOf(value as string) === 0,*/
      sorter: (a, b) => a.receiptStatus < b.receiptStatus ? -1 : 1,
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
              setShowModal("delete");
            }}
          >
          </Button>
        </Space>
      ),
    },
  ];

  //////////// EDIT MODAL//////////
  const ImportReceiptDetail = (ID: string, isShowModal?: boolean, setIsShowModal?: any) => {
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
            goodReceiptData.receiptStatus == 2 ?
              <>
                <Button onClick={() => handleAccept(goodReceiptData.id)}>Hoàn thành</Button>
                <Button onClick={() => handleCancel(goodReceiptData.id)}>Hủy bỏ</Button>
                <Button onClick={() => navigate("chinh-sua/" + goodReceiptData.id)}>Chỉnh sửa</Button>
              </>
              : <>
                <Button onClick={onFinish}>OK</Button>
              </>
          )}
          className="modal-create-trans"
        >
          <div className="modal-header">
            <div className="modal-info">Thông tin</div>
            {/*<div className="modal-desc">Nhập đến kho hiện tại</div>*/}
          </div>
          <div className="modal-content">
            <div className="modal-box">
              <Form form={form} onFinish={onFinish}>
                <Form.Item className="code" label={"Mã nhập kho"} name={"code"}>
                  {goodReceiptData.id}
                </Form.Item>
                <Form.Item className="time" label={"Ngày nhập"} name={"time"}>
                  <ProcessDate dateString={goodReceiptData.importDate} />
                </Form.Item>
                <Form.Item
                  className="trans"
                  label={"Nhà cung cấp"}
                  name={"trans"}
                >
                  {goodReceiptData.partner?.name}
                </Form.Item>
                <Form.Item
                  className="status"
                  label={"Trạng thái"}
                  name={"status"}
                >
                  <ProcessStatus status={goodReceiptData.receiptStatus} />
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
                        <td className="name">{product.product.name ? product.product.name : ""}</td>
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
    );
  }


  return (
    <React.Fragment>
      {ImportReceiptDetail(
        IDChoose,
        goodReceiptData && showModal === "edit")}
      <div className="product-container">

        <div className="filterField">
          <div className="title">Phiếu nhập kho</div>
          <StateFilter onSelect={handleChangeFilterState} />
          <WarehouseFilter onSelect={handleChangeFilterWarehouse} />
          <PartnerFilter onSelect={handleChangeFilterCustomer} />
        </div>
        <div className="product-list transaction-list">
          <div className="header-action">
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
          <Table
            columns={columns}
            dataSource={filteredReceiptData}
            loading={loading}
            rowKey="id"
          />

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
};

{/*<table className="table">
            <thead className="table-header">
              <th className="table-header-code">Mã nhập hàng</th>
              <th className="table-header-time">Thời gian</th>
              <th className="table-header-trans">Mã kho nhập</th>
              <th className="table-header-trans">Nhà cung cấp</th>
              <th className="table-header-total">Tổng tiền</th>
              <th className="table-header-status">Trạng thái</th>
              <th className="table-header-action"></th>
            </thead>
            <tbody className="table-body">
              {importReceiptData &&
                importReceiptData.length > 0 &&
                showReceiptData.map((tran) => (
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
                    <td className="table-body-time"><ProcessDate dateString={tran.importDate.toLocaleString()} /></td>
                    <th className="table-body-trans">{tran.wareHouseId}</th>
                    <td className="table-body-trans">{tran.partner.name}</td>
                    <td className="table-body-total">{tran.totalAmount?.toLocaleString()}</td>
                    <td className="table-body-status"><ProcessStatus status={tran.receiptStatus} /></td>
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
              total={importReceiptData.length}
              onChange={(page) => {
                setShowReciptData(importReceiptData.slice((page - 1) * size, page * size));
                setPage(page);
              }}
            />
          </div>*/}

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