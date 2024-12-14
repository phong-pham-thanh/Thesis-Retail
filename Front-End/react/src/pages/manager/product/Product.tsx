import React, { useEffect, useState } from "react";
import "./styleProduct.css";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditIcon from "@mui/icons-material/Edit";
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
import Input from "antd/lib/input";

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
  const [filteredProducts, setFilteredProducts] = useState<DataType[]>([]);
  const [popupData, setPopupData] = useState<DataType>(emptydata);
  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(
    null
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState<DataType | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState<string>(""); // handling tìm kiếm theo tên
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const defaultImage =
    "https://localhost:7030/images/default/default_image.png";

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
    document.title = "Kiểm kho";
    getAllProducts();
  }, [refresh]);

  const handleWarehouseChange = (value: number) => {
    setSelectedWarehouseId(value);
    setSearchTerm("");
    handleCategoryChange(null);
  };

  const filterProductsByCategory = (
    categoryId: string[],
    searchTerm: string
  ) => {
    if (
      categoryId === null ||
      categoryId.length === 0 ||
      categoryId.includes(null)
    ) {
      setFilteredProducts(data);
      return;
    }

    let filtered = data.filter((product) =>
      categoryId.includes(product.categoryId)
    );

    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  function handleCategoryChange(value: string[]): void {
    setSelectedCategoryIds(value);
    filterProductsByCategory(value, searchTerm);
  }

  const handleEdit = (record: DataType) => {
    setPopupData(record);
    setIsChangeInformation(true);
  };

  const handleAddNew = () => {
    setPopupData(emptydata);
    setIsChangeInformation(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      const api_delete = {
        ...api_links.product.delete(Number(productToDelete.id)),
      };
      fetch_Api(api_delete)
        .then(() => {
          setRefresh(!refresh);
          setIsAlertVisible(false);
          setProductToDelete(null);
          message.success(
            `Product: ${productToDelete.name} deleted successfully.`
          );
        })
        .catch((error) => {
          console.log("Failed to delete:", error);
          setIsAlertVisible(false);
          setProductToDelete(null);
        });
    }
  };

  const handleCancelDelete = () => {
    setIsAlertVisible(false);
    setProductToDelete(null);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = window.setTimeout(() => {
      const searchTermLowerCase = value.trim().toLowerCase();

      let filteredData = data;

      if (selectedCategoryIds?.length > 0) {
        filteredData = filteredData.filter((product) =>
          selectedCategoryIds.includes(product.categoryId)
        );
      }

      if (searchTermLowerCase) {
        filteredData = filteredData.filter((product) =>
          product.name.toLowerCase().includes(searchTermLowerCase)
        );
      }

      setFilteredProducts(filteredData);
    }, 2000);

    setTimeoutId(newTimeoutId);
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
            width: "80px",
            height: "80px",
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
      dataIndex: ["category", "name"],
      sorter: (a, b) => a.category.name.localeCompare(b.category.name),
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (record: DataType) => {
        const inventory = record.listInventories.find(
          (inv) => inv.wareHouseId === selectedWarehouseId
        );
        return inventory ? inventory.quantity : 0;
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
              handleEdit(record);
            }}
          >
            <EditIcon />
          </Button>
        </Space>
      ),
    },
  ];

  const hasSelected = selectedRowKeys.length > 0;

  if (loading) return <h1>Đang tải ...</h1>;

  return (
    <React.Fragment>
      <ProductInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={popupData}
        componentDisabled={componentDisabled}
        setComponentDisabled={setComponentDisabled}
        type={popupData.id === "0" ? "create" : "edit"}
        onSave={() => setRefresh(!refresh)}
      />
      <AlertDialog
        title="Xác nhận xóa"
        visible={isAlertVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="Bạn có muốn xóa sản phẩm này ?"
      />
      <div className="dashboard-container">
        <div className="header">
          <h2>Danh mục sản phẩm</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            {/*<CustomButton
              text="Xuất file"
              icon={<UploadFile />}
              onClick={() => message.info("Đang xuất file ...")}
              backgroundColor="#28C2FF"
              color="#fff"
            />*/}
            <CustomButton
              text="Thêm mới"
              icon={<AddCircleIcon />}
              onClick={handleAddNew}
              backgroundColor="#28C2FF"
              color="#fff"
            />
          </div>
        </div>
        <div className="product-container">
          <div className="filterField">
            <div className="search-bar">
              <h3>Tìm kiếm</h3>
              <Input
                placeholder="Tên sản phẩm"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
              />
            </div>
            <WarehouseFilter onSelect={handleWarehouseChange} />

            <CategoryFilter
              onSelect={handleCategoryChange}
              warehouse={selectedWarehouseId}
            />
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
              //rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredProducts}
              loading={loading}
              rowKey="id"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                showSizeChanger: true,
                total: filteredProducts.length,
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
