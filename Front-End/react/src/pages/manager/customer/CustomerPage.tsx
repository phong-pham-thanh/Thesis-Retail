import React, { useEffect, useState } from "react";
import "./styleCustomer.css";
import { Button, Input, Space, Table } from "antd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "../../component/CustomeButton";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";
import CustomerInformationPopupScreen from "./CustomerInformationPopupForm";
import EditIcon from "@mui/icons-material/Edit";
import { ColumnsType } from "antd/es/table";

interface UserType {
  id: string;
  name: string;
  phoneNumber: string;
}

const emptydata: UserType = {
  id: "0",
  name: "",
  phoneNumber: "",
};

export default function UserPage() {
  const [customers, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [popupData, setPopupData] = useState<UserType>(emptydata);
  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const getUsers = () => {
    setLoading(true);
    const api_link = api_links.customer.getAll;
    return fetch_Api(api_link)
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Danh sách Khách hàng";
    getUsers();
  }, [refresh]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = window.setTimeout(() => {
      if (value.trim()) {
        const filtered = customers.filter((customer) =>
          customer.name.toLowerCase().includes(value.trim().toLowerCase())
        );
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers(customers);
      }
    }, 2000);

    setTimeoutId(newTimeoutId);
  };

  const handleEditUser = (customer: UserType) => {
    setPopupData(customer);
    setIsChangeInformation(true);
  };

  const handleAddNewUser = () => {
    setPopupData(emptydata);
    setIsChangeInformation(true);
  };

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const columns: ColumnsType<UserType> = [
    {
      title: "Mã khách hàng",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            size={"middle"}
            onClick={() => {
              handleEditUser(record);
            }}
          >
            <EditIcon />
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) return <h1>Đang tải ...</h1>;

  return (
    <React.Fragment>
      <CustomerInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={popupData}
        type={popupData.id === "0" ? "create" : "edit"}
        onSave={() => setRefresh(!refresh)}
      />
      <div className="dashboard-container">
        <div className="header">
          <h2>Quản lý khách hàng</h2>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <CustomButton
              text="Thêm mới"
              icon={<AddCircleIcon />}
              onClick={handleAddNewUser}
              backgroundColor="#28C2FF"
              color="#fff"
            />
          </div>
        </div>
        <div className="customer-container">
          {/* Left Sidebar for Search */}
          <div className="filter-container">
            <div className="search-bar">
              <h3>Tìm kiếm</h3>
              <Input
                placeholder="Tên khách hàng"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
              />
            </div>
          </div>
          {/* Right Content (Table) */}
          <div className="content-container">
            <Table
              columns={columns}
              dataSource={filteredUsers}
              loading={loading}
              rowKey="id"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50"],
                onChange: (page, pageSize) => {
                  setPagination({ current: page, pageSize });
                },
              }}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
