import React, { useEffect, useState } from "react";
import "./styleCategory.css";
import { Button, Input, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "../../component/CustomeButton";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";
import CategoryInformationPopupScreen from "./PopUpCategoryInformation";
import AlertDialog from "../../component/AlertDialog"; // Import alert dialog for delete confirmation
import message from "antd/lib/message"; // AntD message for notifications

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
  const [refresh, setRefresh] = useState(false); // State to refetch data
  const [isAlertVisible, setIsAlertVisible] = useState(false); // For alert dialog visibility
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(
    null
  ); // Category selected for deletion
  const [searchTerm, setSearchTerm] = useState<string>(""); // For handling search input
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
    getCategories();
  }, [refresh]);

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
        setFilteredCategories(categories); // Reset to original list if no search term
      }
    }, 2000); // Delay for search (2 seconds)

    setTimeoutId(newTimeoutId);
  };

  const handleEditCategory = (category: CategoryType) => {
    setPopupData(category); // Set selected category data for popup
    setIsChangeInformation(true); // Trigger popup for editing
  };

  const handleAddNewCategory = () => {
    setPopupData(emptydata); // Reset form for adding a new category
    setIsChangeInformation(true); // Trigger popup
  };

  const showDeleteDialog = (category: CategoryType) => {
    setCategoryToDelete(category); // Store the category to be deleted
    setIsAlertVisible(true); // Show alert dialog
  };

  //   const handleConfirmDelete = () => {
  //     if (categoryToDelete) {
  //       // Simulate API call for deletion
  //       const api_delete = {
  //         ...api_links.category.delete(Number(categoryToDelete.id)),
  //       };
  //       fetch_Api(api_delete)
  //         .then(() => {
  //           setRefresh(!refresh); // Trigger refetch after deletion
  //           setIsAlertVisible(false); // Close the alert dialog
  //           setCategoryToDelete(null); // Reset category to delete
  //           message.success(
  //             `Category: ${categoryToDelete.name} deleted successfully.`
  //           );
  //         })
  //         .catch((error) => {
  //           console.log("Failed to delete:", error);
  //           setIsAlertVisible(false); // Close alert dialog
  //           setCategoryToDelete(null); // Reset category to delete
  //         });
  //     }
  //   };

  //   const handleCancelDelete = () => {
  //     setIsAlertVisible(false); // Close the alert dialog without doing anything
  //     setCategoryToDelete(null); // Reset the category to be deleted
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
            size={"middle"}
            icon={<EditOutlined />}
            onClick={() => handleEditCategory(record)}
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
      <CategoryInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={popupData} // Pass the category data to the popup
        type={popupData.id === "0" ? "create" : "edit"} // Check if it's a new category or edit
        onSave={() => setRefresh(!refresh)} // Trigger refresh after adding/editing a category
      />
      {/* <AlertDialog
        title="Xác nhận xóa"
        visible={isAlertVisible}
        onConfirm={handleConfirmDelete} // Proceed with deletion if confirmed
        onCancel={handleCancelDelete} // Cancel deletion
        message="Bạn có muốn xóa danh mục này ?"
      /> */}
      <div className="dashboard-container">
        <div className="header">
          <h2>Danh mục hàng hóa</h2>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
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
          {/* Left Sidebar for Search */}
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
    </React.Fragment>
  );
}
