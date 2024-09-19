import React, { useEffect, useState } from "react";
import "./styleCategory.css";
import { Button, Input, Space, Table } from "antd";
//import { DownOutlined } from "@ant-design/icons";
//import { Button, Dropdown, Menu } from "antd";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "../../component/CustomeButton";

interface CategoryType {
  id: number;
  name: string;
  // children?: CategoryType[];
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<CategoryType[]>(
    []
  ); // State for filtered categories
  const [searchTerm, setSearchTerm] = useState<string>(""); // Track search input
  const [loading, setLoading] = useState(false);
  //   const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
  //     null
  //   ); // Track selected dropdown category
  const [timeoutId, setTimeoutId] = useState<number | undefined>(); // Timeout for debouncing search

  const getCategories = () => {
    setLoading(true);
    const api_link = api_links.category.getAll;
    return fetch_Api(api_link)
      .then((res) => {
        setCategories(res.data);
        setFilteredCategories(res.data); // Set filtered categories initially to all
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (timeoutId) clearTimeout(timeoutId); // Clear the previous timeout

    const newTimeoutId = window.setTimeout(() => {
      if (value.trim()) {
        const filtered = categories.filter((category) =>
          category.name.toLowerCase().includes(value.trim().toLowerCase())
        );
        setFilteredCategories(filtered);
      } else {
        setFilteredCategories(categories); // Reset
      }
    }, 2000); // 2second await

    setTimeoutId(newTimeoutId);
  };

  //   const handleSelectCategory = (category: CategoryType) => {
  //     setSelectedCategory(category); // Select the wrapper category
  //     const filtered = categories.filter(
  //       (cat) =>
  //         cat.id === category.id ||
  //         (category.children &&
  //           category.children.some((child) => child.id === cat.id))
  //     );
  //     setFilteredCategories(filtered);
  //   };

  const columns = [
    {
      title: "Category ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: CategoryType) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record.id)}
          ></Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveCategory(record.id)}
          ></Button>
        </Space>
      ),
    },
  ];

  const handleEditCategory = (id: number) => {
    console.log(`Edit category with id: ${id}`);
  };

  const handleRemoveCategory = (id: number) => {
    console.log(`Remove category with id: ${id}`);
  };

  const handleAddNewCategory = () => {
    console.log("Add new category");
  };

  //   const menu = (
  //     <Menu>
  //       {categories.map((category) => (
  //         <Menu.Item
  //           key={category.id}
  //           onClick={() => handleSelectCategory(category)}
  //         >
  //           {category.name}
  //         </Menu.Item>
  //       ))}
  //     </Menu>
  //   );

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Danh mục hàng hóa</h2>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton
            text="Thêm mới"
            icon={<AddCircleIcon />}
            onClick={handleAddNewCategory} // Trigger the add new functionality
            backgroundColor="#28C2FF"
            color="#fff"
          />
        </div>
      </div>
      <div className="category-container">
        {/* Left Sidebar for Search Filter */}
        <div className="filter-container">
          <div className="search-bar">
            <h3>Tìm kiếm</h3>
            <Input
              placeholder="Tìm kiếm danh mục"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
          </div>
          {/* <div className="dropdown-filter">
                <Dropdown overlay={menu}>
                  <Button>
                    {selectedCategory
                      ? selectedCategory.name
                      : "Select Category"}{" "}
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div> */}
        </div>

        {/* Right Content (Table) */}
        <div className="content-container">
          <Table
            columns={columns}
            dataSource={filteredCategories}
            loading={loading}
            rowKey="id"
          />
        </div>
      </div>
    </div>
  );
}
