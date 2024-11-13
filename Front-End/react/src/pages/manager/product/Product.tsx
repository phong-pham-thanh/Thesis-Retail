import React, { useEffect, useState } from "react";
import "./styleProduct.css";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ProductInformationPopupScreen from "./popupEditProduct";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import CustomButton from "../../component/CustomeButton";
import AlertDialog from "../../component/AlertDialog";
import { UploadFile } from "@mui/icons-material";
import message from "antd/lib/message";
import { WarehouseFilter } from "./WarehouseFilter";
import { CategoryFilter } from "./CategoryFilter";

interface InventoryType {
  id: number;
  productId: number;
  wareHouseId: number;
  quantity: number;
}

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
  listInventories: InventoryType[];
  imgPath: string;
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
  listInventories: [],
  imgPath: "",
};

export default function Product() {
  const [data, setProducts] = useState<DataType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<DataType[]>([]); // State for filtered products
  const [popupData, setPopupData] = useState<DataType>(emptydata); // State to store the selected product data
  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(
    null
  ); // Track selected warehouse

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false); // State to track changes for refetching
  const [isAlertVisible, setIsAlertVisible] = useState(false); // Track visibility of AlertDialog
  const [productToDelete, setProductToDelete] = useState<DataType | null>(null); // Store the product to be deleted

  const defaultImage =
    "https://localhost:7030/images/products/default_image.webp";

  const getAllProducts = () => {
    const api_link = api_links.product.getAll;
    setLoading(true);
    return fetch_Api(api_link)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
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

  // Function to filter products based on selected warehouse (Chi nhánh)
  const filterProductsByWarehouse = (warehouseId: number) => {
    setSelectedWarehouseId(warehouseId); // Set the selected warehouse ID
    const filtered = data.filter((product) =>
      product.listInventories.some(
        (inventory) => inventory.wareHouseId === warehouseId
      )
    );
    setFilteredProducts(filtered);
  };

  const filterProductsByCategory = (categoryId: string[]) => {
    if (
      categoryId === null ||
      categoryId.length == 0 ||
      categoryId.includes(null)
    ) {
      setFilteredProducts(data);
    } else {
      const filtered = data.filter((product) =>
        categoryId.includes(product.categoryId)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleWarehouseChange = (value: number) => {
    setSelectedWarehouseId(value);
    //filterProductsByWarehouse(value); // Filter products based on the selected warehouse
  };

  function handleCategoryChange(value: string[]): void {
    filterProductsByCategory(value);
  }

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
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "imgPath",
      render: (imgPath: string) => (
        <img
          src={imgPath && imgPath.trim() !== "" ? imgPath : defaultImage}
          alt=""
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      ),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tên hàng",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Loại",
      dataIndex: ["category", "name"], // Show category name instead of categoryId
      sorter: (a, b) => a.category.name.localeCompare(b.category.name),
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (record: DataType) => {
        // Display the quantity in the selected warehouse
        const inventory = record.listInventories.find(
          (inv) => inv.wareHouseId === selectedWarehouseId
        );
        return inventory ? inventory.quantity : "N/A"; // Show quantity or 'N/A' if not found
      },
      sorter: (a, b) => {
        const quantityA =
          a.listInventories.find(
            (inv) => inv.wareHouseId === selectedWarehouseId
          )?.quantity || 0;
        const quantityB =
          b.listInventories.find(
            (inv) => inv.wareHouseId === selectedWarehouseId
          )?.quantity || 0;

        return quantityA - quantityB;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Giá bán",
      dataIndex: "currentPrice",
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
            <WarehouseFilter onSelect={handleWarehouseChange} />

            <CategoryFilter onSelect={handleCategoryChange} />
          </div>
          <div className="product-list">
            <div>
              <span style={{ marginLeft: 8 }}>
                {hasSelected
                  ? `Đã chọn ${selectedRowKeys.length} sản phẩm`
                  : ""}
              </span>
            </div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredProducts}
              loading={loading}
              rowKey="id"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
