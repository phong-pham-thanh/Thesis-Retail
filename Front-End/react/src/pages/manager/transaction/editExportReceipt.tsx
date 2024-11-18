import React, { useEffect, useState } from "react";
//import "./styleProduct.css";
import {
  Navigate,
  Link,
  Router,
  Route,
  Routes,
  useNavigate,
  BrowserRouter,
  Outlet,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Account } from "../../component/account";
import NavBar from "../../component/menubar";
import { FilterBox } from "../../component/filterBox";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, message, Row, Select, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { GetProps } from 'antd';

import { CategoryType, GoodsReceipt, ListGoodReciptDetailsModel, CustomerState, ProductState, WarehouseState, GoodExportReceiptDetailDataType } from "../../../app/type.d";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import { handleSearch, processAPIPostLink } from "../../../app/processFunction"


import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Search from "antd/lib/input/Search";
import moment from "moment";

const Option = Select.Option;
type SearchProps = GetProps<typeof Input.Search>;

interface ExportProductTableState {
  //"goodsReceiptId": "0",
  "productId": string,
  "productName": string,
  "priceUnit": number,
  "quantity": number,
  "subTotal": number
};

interface ExportDataType {
  goodsExportModel: GoodsReceipt,
  listGoodExportDetailModels: ListGoodReciptDetailsModel[],
}

const gridStyle: React.CSSProperties = {
  width: '24%',
  textAlign: 'center',
  backgroundColor: 'aquamarine',
  padding: '15px',
  borderRadius: '5px',
  margin: '2px',
};

export default function ExportGoods() {
  const navigate = useNavigate();

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
    /*{
      title: 'Đơn giá',
      dataIndex: 'priceUnit',
      render: (_, record) => (
        <Space size="small">
          <InputNumber
            disabled={goodReceiptData?.exportStatus !== 2}
            min={0} defaultValue={0} placeholder={"0"}
            onChange={(e) => {
              updateExportProduct(record.productId, "updatePrice", e);
            }} />
        </Space>),
    },*/
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_, record) => (
        <Space size="small">
          <InputNumber
            disabled={goodReceiptData?.exportStatus !== 2}
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

  const params = useParams();
  const [form] = Form.useForm();
  const [goodReceiptData, setGoodReciptData] = useState<GoodExportReceiptDetailDataType>();
  const [allProducts, setProducts] = useState<ProductState[]>([]);
  const [filteredProducts, setFilterProducts] = useState<ProductState[]>([]);
  const [allCustomers, setAllCustomers] = useState<CustomerState[]>([]);
  const [allWarehouses, setAllWarehouses] = useState<WarehouseState[]>([]);
  const [allCategory, setAllCategory] = useState<CategoryType[]>([]);
  const [choosedCategory, setChoosedCategory] = useState("Tất cả");
  const [exportTableData, setExportTableData] = useState<ExportProductTableState[]>([]);
  const [tempListGoodReceiptDetailModels, setTempList] = useState<ListGoodReciptDetailsModel[]>([]);
  const [total, setTotal] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  // const data: DataType[] = []; // Assuming DataType is the type of your data
  useEffect(() => {
    getGoodReceiptByID(params.id)
      .then((res) => {
        setGoodReciptData(res.data);
        handleGetTableProductDataByID(res.data.listGoodExportDetailsModel);
        console.log(res.data);
      })
      .catch((error) => {
        message.error(error.detail);
      });
    getAllProduct()
      .then((res) => {
        setProducts(res.data);
        setFilterProducts(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
    getAllCustomer()
      .then((res) => {
        setAllCustomers(res.data);
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
    getAllCategory()
      .then((res) => {
        setAllCategory(res.data);
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

  const getGoodReceiptByID = (ID: string) => {
    const api_link = api_links.goodsIssue.export.getById;
    api_link.url = processAPIPostLink(api_link.url, ID);
    return fetch_Api(api_link);
  };
  const getAllProduct = () => {
    const api_link = api_links.product.getAll;
    return fetch_Api(api_link);
  };
  const getAllCustomer = () => {
    const api_link = api_links.customer.getAll;
    return fetch_Api(api_link);
  };
  const getAllWarehouse = () => {
    const api_link = api_links.warehouse.getAll;
    return fetch_Api(api_link);
  };
  const getAllCategory = () => {
    const api_link = api_links.category.getAll;
    return fetch_Api(api_link);
  };

  const putGoodsIssue = (putData: GoodExportReceiptDetailDataType) => {
    const api_post = api_links.goodsIssue.export.update;
    api_post.url = processAPIPostLink(api_post.url, goodReceiptData.id);
    api_post.data = putData;
    return fetch_Api(api_post);
  };

  const handleGetTableProductDataByID = (listProduct: ListGoodReciptDetailsModel[]) => {
    let newExportData: ExportProductTableState;
    listProduct.map((item) => {
      newExportData = {
        //"goodsReceiptId": "0",
        "productId": String(item.productId),
        "productName": item.product.name,
        "priceUnit": 0,
        "quantity": item.quantity,
        "subTotal": 0,
      }
      exportTableData.push(newExportData);
    })
    updateTotal();
    setExportTableData([...exportTableData]);
    console.log(exportTableData);
  }

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
    let sumT = 0;
    let sumQ = 0;
    exportTableData.map((d) => {
      sumT = sumT + d.subTotal;
      sumQ = sumQ + d.quantity;
    })
    setTotal(sumT);
    setTotalQty(sumQ);
  }

  const onFinish = () => {
    setFormValue(form.getFieldsValue());
    exportTableData.map((item) => {
      tempListGoodReceiptDetailModels.push({
        id: 0,
        goodExportId: goodReceiptData.id,
        goodExport: null,
        productId: Number(item.productId),
        product: {
          currentPrice: null,
        },
        //priceUnit: item.priceUnit,
        quantity: item.quantity,

      })
    })
    const event = new Date();
    const postData: GoodExportReceiptDetailDataType = {
      id: goodReceiptData.id,
      exportDate: form.getFieldValue("exportDate")?.toISOString(), //event.toISOString(),//form.getFieldValue("exportDate"),
      customerId: form.getFieldValue("customerId"),
      exportStatus: goodReceiptData.exportStatus,
      listGoodExportDetailsModel: tempListGoodReceiptDetailModels,
      wareHouseId: form.getFieldValue("idWareHouse"),
      wareHouse: null,
    };

    console.log(postData);
    putGoodsIssue(postData)
      .then((res) => {
        message.success("Chỉnh sửa thành công");
        navigate("/quan-ly/xuat-hang");
      })
      .catch((error) => {
        message.error(error.detail);
        console.log(error);
      });

  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
    handleFilterProductTable(0);
    setFilterProducts(handleSearch(value, allProducts))
  }

  const handleFilterProductTable = (value: string | number) => {
    if (value == 0) {
      setFilterProducts(allProducts);
      setChoosedCategory("Tất cả");
    }
    else {
      setFilterProducts(allProducts.filter((p) => p.categoryId == value));
      setChoosedCategory(allCategory.find((c) => c.id == value).name);
    }
  };

  return (
    <div className="dashboard-container">

      <div className="product-container">

        <div className="receipt-container">
          Đơn xuất hàng
          <Form form={form}
            //labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
          >
            <Space size={"large"} >
              {goodReceiptData &&
                <Row>
                  <Col span={8}>
                    <Form.Item
                      className="idWareHouse"
                      label={"Xuất đến kho"}
                      name={"idWareHouse"}
                      layout="vertical"
                      rules={[{
                        required: true,
                        message: 'Không để trống',
                      }]}
                      initialValue={goodReceiptData?.wareHouseId}
                    >
                      <Select
                        disabled={goodReceiptData?.exportStatus !== 2}
                        showSearch
                        placeholder="Chọn kho"
                        optionFilterProp="label"
                      //defaultValue={goodReceiptData?.wareHouseId}
                      >
                        {allWarehouses?.map((d) => {
                          return (
                            <Option value={d.id}>{d.address}</Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      className="exportDate"
                      label={"Ngày xuất"}
                      name={"exportDate"}
                      layout="vertical"
                      rules={[{
                        required: true,
                        message: 'Không để trống',
                      }]}
                      initialValue={moment(goodReceiptData?.exportDate)}
                    >
                      <DatePicker
                        disabled={goodReceiptData?.exportStatus !== 2}
                        showTime
                        disabledDate={(current) => { return current.valueOf() > Date.now() }}
                      />
                    </Form.Item >
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      className="customerId"
                      label={"Khách hàng"}
                      name={"customerId"}
                      layout="vertical"
                      rules={[{
                        required: true,
                        message: 'Không để trống',
                      }]}
                      initialValue={goodReceiptData?.customerId}
                    >
                      <Select
                        disabled={goodReceiptData?.exportStatus !== 2}
                        showSearch
                        placeholder="Chọn khách hàng"
                        optionFilterProp="label"
                      //defaultValue={goodReceiptData?.customerId}//
                      >
                        {allCustomers?.map((d) => {
                          return (
                            <Option value={d.id}>{d.name}</Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              }
              <Row>
                {(goodReceiptData?.exportStatus == 2) && <Button type='primary' onClick={() => {
                  onFinish();//postGoodsIssue()
                }}
                  style={{ backgroundColor: "#465d65" }}>
                  Chỉnh sửa</Button>}
              </Row>
            </Space>
          </Form>

          <div className='export-list'>
            <Table
              columns={exportColumns}
              dataSource={[...exportTableData]}
              sticky={true}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}><h4>Tổng cộng:</h4></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>{totalQty}</Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>{total.toLocaleString()}</Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )} />
          </div>
        </div>
        {(goodReceiptData?.exportStatus == 2) &&
          <div className='newtransaction-product-table'>
            <Row>
              <Select
                showSearch
                placeholder="Phân loại"
                optionFilterProp="label"
                style={{ width: '50%' }}
                onChange={handleFilterProductTable}
              >
                <Option value={0}>Tất cả</Option>
                {allCategory?.map((d) => {
                  return (
                    <Option value={d.id}>{d.name}</Option>
                  )
                })}</Select>
              <Search placeholder="Tìm trong tất cả" onSearch={onSearch} style={{ width: "50%" }} />
            </Row>
            <Card className="product-table" title={choosedCategory}>
              {filteredProducts?.map((p) =>
                <Card.Grid className="product-cell" style={gridStyle}
                  onClick={() => handleTableProductClick(p)}>{p.name}</Card.Grid>)}
            </Card>
          </div>
        }

      </div>
    </div >
  );
};
/*{
  "id": 56,
  "exportDate": "2024-10-04T03:07:53",
  "customerId": 2,
  "wareHouseId": 3,
  "exportStatus": 2,
  "listGoodExportDetailsModel": [
    {
      "goodExportId": 56,
      "productId": 4,
      "product": {
        "id": 4,
        "name": "Omachi",


        "currentPrice": null
      },
      "quantity": 18
    }
  ],

  "wareHouse": null
}*/