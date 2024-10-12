import React, { useEffect, useState } from "react";
import "./styleWarehouse.css";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WarehouseInformationPopupScreen from "./WarehouseInformationPopupScreen";
import api_links from "../../app/api_links";
import fetch_Api from "../../app/api_fetch";
import CustomButton from "../component/CustomeButton";
import message from "antd/lib/message";
import { UploadFile } from "@mui/icons-material";

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
  const [data, setWarehouses] = useState<WarehouseType[]>([]);
  const [popupData, setPopupData] = useState<WarehouseType>(emptyWarehouse);
  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getAllWarehouses = () => {
    const api_link = api_links.warehouse.getAll;
    setLoading(true);
    return fetch_Api(api_link)
      .then((res) => {
        setWarehouses(res.data);
        setLoading(false);
      })
      .catch((error) => {
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

  const columns: ColumnsType<WarehouseType> = [
    {
      title: "Warehouse ID",
      dataIndex: "id",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Manager ID",
      dataIndex: "managerId",
    },
    {
      title: "Status",
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
        onSave={() => setRefresh(!refresh)}
      />
      <div className="dashboard-container">
        <div className="header">
          <h2>Warehouse Management</h2>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <CustomButton
              text="Export"
              icon={<UploadFile />}
              onClick={() => message.info("Exporting file...")}
              backgroundColor="#28C2FF"
              color="#fff"
            />
            <CustomButton
              text="Add New"
              icon={<AddCircleIcon />}
              onClick={handleAddNew}
              backgroundColor="#28C2FF"
              color="#fff"
            />
          </div>
        </div>
        <div className="warehouse-container">
          <div className="warehouse-list">
            <Table
              columns={columns}
              dataSource={data}
              loading={loading}
              rowKey="id"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
