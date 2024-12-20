import React, { useEffect, useState } from "react";
import "./styleCategory.css";
import { Button, Input, Space, Table } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "../../component/CustomeButton";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";
import CategoryInformationPopupScreen from "./PopUpCategoryInformation";
import { ColumnsType } from "antd/es/table";

interface CategoryType {
  id: string;
  name: string;
}

const emptydata: CategoryType = {
  id: "0",
  name: "",
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<CategoryType[]>(
    []
  );
  const [popupData, setPopupData] = useState<CategoryType>(emptydata);
  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number | undefined>();

  const getCategories = () => {
    setLoading(true);
    const api_link = api_links.category.getAll;
    return fetch_Api(api_link)
      .then((res) => {
        setCategories(res.data);
        setFilteredCategories(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Quản lý Danh mục";
    getCategories();
  }, [refresh]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = window.setTimeout(() => {
      if (value.trim()) {
        const filtered = categories.filter((category) =>
          category.name.toLowerCase().includes(value.trim().toLowerCase())
        );
        setFilteredCategories(filtered);
      } else {
        setFilteredCategories(categories);
      }
    }, 2000);

    setTimeoutId(newTimeoutId);
  };

  const handleEditCategory = (category: CategoryType) => {
    setPopupData(category);
    setIsChangeInformation(true);
  };

  const handleAddNewCategory = () => {
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

  const columns: ColumnsType<CategoryType> = [
    {
      title: "Mã danh mục",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            size={"middle"}
            onClick={() => {
              handleEditCategory(record);
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
      <CategoryInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={popupData}
        type={popupData.id === "0" ? "create" : "edit"}
        onSave={() => setRefresh(!refresh)}
      />
      <div className="dashboard-container">
        <div className="header">
          <h2>Danh mục hàng hóa</h2>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <CustomButton
              text="Thêm mới"
              icon={<AddCircleIcon />}
              onClick={handleAddNewCategory}
              backgroundColor="#28C2FF"
              color="#fff"
            />
          </div>
        </div>
        <div className="category-container">
          {/* Left Sidebar for Search */}
          <div className="filter-container">
            <div className="search-bar">
              <h3>Tìm kiếm</h3>
              <Input
                placeholder="Tên danh mục"
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
              dataSource={filteredCategories}
              loading={loading}
              rowKey="id"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                showSizeChanger: true,
                total: filteredCategories.length,
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
