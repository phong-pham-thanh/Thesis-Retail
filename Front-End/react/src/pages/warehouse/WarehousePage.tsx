import React, { useEffect, useState } from "react";
import "./styleWarehouse.css";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WarehouseInformationPopupScreen from "./WarehouseInformationPopupScreen";
import api_links from "../../app/api_links";
import fetch_Api from "../../app/api_fetch";
import CustomButton from "../component/CustomeButton";
import message from "antd/lib/message";
import { UploadFile } from "@mui/icons-material";
import Input from "antd/lib/input";

interface InventoryType {
  id: number;
  productId: number;
  wareHouseId: number;
  quantity: number;
}

export interface WarehouseType {
  id: string;
  address: string;
  managerId: string;
  status: boolean;
  listInventories: InventoryType[];
}

const emptyWarehouse: WarehouseType = {
  id: "0",
  address: "",
  managerId: "0",
  status: true,
  listInventories: [],
};

export default function Warehouse() {
  const [warehouses, setWarehouses] = useState<WarehouseType[]>([]);
  const [popupData, setPopupData] = useState<WarehouseType>(emptyWarehouse);
  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [filteredWarehouses, setFilteredWarehouses] = useState<WarehouseType[]>(
    []
  );

  const getAllWarehouses = () => {
    const api_link = api_links.warehouse.getAll;
    setLoading(true);
    return fetch_Api(api_link)
      .then((res) => {
        setWarehouses(res.data);
        setFilteredWarehouses(res.data);
        setLoading(false);
      })
      .catch((error: any) => {
        message.error(error.message || "Lỗi khi tải thông tin kho.");
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllWarehouses();
  }, [refresh]);

  const handleEdit = (record: WarehouseType) => {
    setPopupData(record);
    setIsChangeInformation(true);
  };

  const handleAddNew = () => {
    setPopupData(emptyWarehouse);
    setIsChangeInformation(true);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = window.setTimeout(() => {
      if (value.trim()) {
        const filtered = warehouses.filter((warehouse) =>
          warehouse.address.toLowerCase().includes(value.trim().toLowerCase())
        );
        setFilteredWarehouses(filtered);
      } else {
        setFilteredWarehouses(warehouses);
      }
    }, 2000); // 2 seconds delay

    setTimeoutId(newTimeoutId);
  };

  const columns: ColumnsType<WarehouseType> = [
    {
      title: "Mã kho",
      dataIndex: "id",
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
    },
    {
      title: "Địa chỉ kho",
      dataIndex: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Mã quản lý",
      dataIndex: "managerId",
      sorter: (a, b) => parseInt(a.managerId) - parseInt(b.managerId),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: boolean) => (status ? "Active" : "Inactive"),
    },
    {
      title: "",
      key: "action",
      width: "112px",
      render: (_, record) => (
        <Space size="small">
          <Button
            size={"middle"}
            onClick={() => {
              handleEdit(record);
            }}
          >
            <EditIcon />
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) return <h1>Loading ...</h1>;

  return (
    <React.Fragment>
      <WarehouseInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={popupData}
        type={popupData.id === "0" ? "create" : "edit"}
        onSave={() => setRefresh(!refresh)}
      />
      <div className="dashboard-container">
        <div className="header">
          <h2>Quản lý kho</h2>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <CustomButton
              text="Xuất file"
              icon={<UploadFile />}
              onClick={() => message.info("Đang xuất file...")}
              backgroundColor="#28C2FF"
              color="#fff"
            />
            <CustomButton
              text="Thêm mới"
              icon={<AddCircleIcon />}
              onClick={handleAddNew}
              backgroundColor="#28C2FF"
              color="#fff"
            />
          </div>
        </div>
        <div className="warehouse-container">
          <div className="filter-container">
            <div className="search-bar">
              <h3>Tìm kiếm</h3>
              <Input
                placeholder="Địa chỉ kho"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
              />
            </div>
          </div>
          <div className="warehouse-list">
            <Table
              columns={columns}
              dataSource={filteredWarehouses}
              loading={loading}
              rowKey="id"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
