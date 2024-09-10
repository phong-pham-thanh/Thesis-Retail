import React, { useEffect, useState } from "react";
import "./styleProduct.css";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FilterBox } from "../../component/filterBox";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProductInformationPopupScreen from "../../component/popupEditProduct";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import CustomButton from "../../component/CustomeButton";
import AlertDialog from "../../component/AlertDialog";
import { UploadFile } from "@mui/icons-material";
import message from "antd/lib/message";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  description: string;
  status: boolean;
}
const emptydata: DataType = {
  key: "",
  id: "0",
  name: "",
  categoryId: "0",
  category: {
    id: "0",
    name: "",
  },
  description: "string",
  status: true,
};

export default function Product() {
  const columns: ColumnsType<DataType> = [
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
          <Button
            size={"middle"}
            onClick={() => {
              handleEdit(record); // Use the handler to edit the product
            }}
          >
            <EditIcon />
          </Button>
          <Button
            size={"middle"}
            onClick={() => showDeleteDialog(record)} // Use the handler to show delete confirmation
          >
            <ClearIcon />
          </Button>
        </Space>
      ),
    },
  ];

  const [data, setProducts] = useState<DataType[]>([]);
  const [popupData, setPopupData] = useState<DataType>(emptydata); // State to store the selected product data
  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false); // State to track changes for refetching
  const [isAlertVisible, setIsAlertVisible] = useState(false); // Track visibility of AlertDialog
  const [productToDelete, setProductToDelete] = useState<DataType | null>(null); // Store the product to be deleted

  const getAllProducts = () => {
    const api_link = api_links.product.getAll;
    setLoading(true);
    return fetch_Api(api_link)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllProducts();
  }, [refresh]);

  const handleEdit = (record: DataType) => {
    setPopupData(record); // Set the selected product data
    setIsChangeInformation(true); // Trigger the popup to open
  };

  const handleAddNew = () => {
    setPopupData(emptydata); // Reset form for adding new product
    setIsChangeInformation(true); // Trigger the popup to open
  };

  const showDeleteDialog = (product: DataType) => {
    setProductToDelete(product); // Store the product to be deleted
    setIsAlertVisible(true); // Show the alert dialog
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      // Simulate API call for deletion
      const api_delete = {
        ...api_links.product.delete(Number(productToDelete.id)),
      };
      fetch_Api(api_delete)
        .then(() => {
          setRefresh(!refresh); // Trigger a refetch after deletion
          setIsAlertVisible(false); // Close the alert dialog
          setProductToDelete(null); // Reset the product to be deleted
          message.success(
            `Product: ${productToDelete.name} deleted successfully.`
          );
        })
        .catch((error) => {
          console.log("Failed to delete:", error);
          setIsAlertVisible(false); // Close the alert dialog
          setProductToDelete(null); // Reset the product to be deleted
        });
    }
  };

  const handleCancelDelete = () => {
    setIsAlertVisible(false); // Close the alert dialog without doing anything
    setProductToDelete(null); // Reset the product to be deleted
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

  if (loading) return <h1>Loading ...</h1>;
  return (
    <React.Fragment>
      <ProductInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={popupData} // Pass the product data to the popup
        componentDisabled={componentDisabled}
        setComponentDisabled={setComponentDisabled}
        type={popupData.id === "0" ? "create" : "edit"} // Check if it's a new product or edit
        onSave={() => setRefresh(!refresh)} // Trigger refresh after adding/editing a product
      />
      <AlertDialog
        title="Xác nhận xóa"
        visible={isAlertVisible}
        onConfirm={handleConfirmDelete} // Proceed with deletion if confirmed
        onCancel={handleCancelDelete} // Cancel deletion
        message="Bạn có muốn xóa sản phẩm này ?"
      />
      <div className="dashboard-container">
        <div className="header">
          <h2>Danh mục sản phẩm</h2>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <CustomButton
              text="Xuất file"
              icon={<UploadFile />}
              onClick={() => message.info("Đang xuất file ...")} // Use the handler to add a new product
              backgroundColor="#28C2FF"
              color="#fff"
            />
            <CustomButton
              text="Thêm mới"
              icon={<AddCircleIcon />}
              onClick={handleAddNew} // Trigger the add new functionality
              backgroundColor="#28C2FF"
              color="#fff"
            />
          </div>
        </div>
        <div className="product-container">
          <div className="filterField">
            <FilterBox title={"Chi nhánh"} type={"store"} />
            <FilterBox title={"Tổng bán"} type={"amount"} />
            <FilterBox title={"Số lượng"} type={"num"} />
          </div>
          <div className="product-list">
            <div>
              <span>
                {hasSelected
                  ? `Đã chọn ${selectedRowKeys.length} sản phẩm`
                  : ""}
              </span>
            </div>
            <Table
              rowSelection={rowSelection}
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
