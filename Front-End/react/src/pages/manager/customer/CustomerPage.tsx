import React, { useEffect, useState } from "react";
import "./styleCustomer.css";
import { Button, Input, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "../../component/CustomeButton";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";
import CustomerInformationPopupScreen from "./CustomerInformationPopupForm";
import AlertDialog from "../../component/AlertDialog";
import message from "antd/lib/message";

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
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number | undefined>(); // Timeout for search
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Default page size
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
    getUsers();
  }, [refresh]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (timeoutId) clearTimeout(timeoutId);

    // Set timeout to delay search, simulating debounce effect
    const newTimeoutId = window.setTimeout(() => {
      if (value.trim()) {
        const filtered = customers.filter((customer) =>
          customer.name.toLowerCase().includes(value.trim().toLowerCase())
        );
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers(customers); // If search term is cleared, reset to all customers
      }
    }, 2000); // 2 seconds delay

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

  const showDeleteDialog = (customer: UserType) => {
    setUserToDelete(customer);
    setIsAlertVisible(true);
  };

  // Handle pagination changes
  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "",
      key: "actions",
      render: (text: any, record: UserType) => (
        <Space size="middle">
          <Button
            size={"middle"}
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          />
          <Button
            size={"middle"}
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteDialog(record)}
          />
        </Space>
      ),
    },
  ];

  if (loading) return <h1>Loading ...</h1>;

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
          <h2>Customer Management</h2>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <CustomButton
              text="Add New Customer"
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
              <h3>Search</h3>
              <Input
                placeholder="Search for customers"
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
                showSizeChanger: true, // Show options to change page size
                pageSizeOptions: ["5", "10", "20", "50"], // Admin can select page size
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
