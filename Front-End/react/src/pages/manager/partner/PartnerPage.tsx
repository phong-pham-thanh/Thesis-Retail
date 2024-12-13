import React, { useEffect, useState } from "react";
import "./stylePartner.css";
import { Button, Input, Space, Table } from "antd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "../../component/CustomeButton";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";
import PartnerInformationPopupForm from "./PartnerInformationPopupForm";
import EditIcon from "@mui/icons-material/Edit";
import { ColumnsType } from "antd/es/table";

interface PartnerType {
  id: string;
  name: string;
  totalSale: string;
  phoneNumber: string;
}

const emptydata: PartnerType = {
  id: "0",
  name: "",
  totalSale: "0",
  phoneNumber: "",
};

export default function PartnerPage() {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<PartnerType[]>([]);
  const [popupData, setPopupData] = useState<PartnerType>(emptydata);
  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const getPartners = () => {
    setLoading(true);
    const api_link = api_links.partner.getAll;
    return fetch_Api(api_link)
      .then((res) => {
        setPartners(res.data);
        setFilteredPartners(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Danh sách Nhà cung cấp";
    getPartners();
  }, [refresh]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = window.setTimeout(() => {
      if (value.trim()) {
        const filtered = partners.filter((partner) =>
          partner.name.toLowerCase().includes(value.trim().toLowerCase())
        );
        setFilteredPartners(filtered);
      } else {
        setFilteredPartners(partners);
      }
    }, 2000);

    setTimeoutId(newTimeoutId);
  };

  const handleEditPartner = (partner: PartnerType) => {
    setPopupData(partner);
    setIsChangeInformation(true);
  };

  const handleAddNewPartner = () => {
    setPopupData(emptydata);
    setIsChangeInformation(true);
  };

  const columns: ColumnsType<PartnerType> = [
    {
      title: "Mã đối tác",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tên đối tác",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tổng bán",
      dataIndex: "totalSale",
      key: "totalSale",
      sorter: (a, b) => parseInt(a.totalSale) - parseInt(b.totalSale),
      sortDirections: ["descend", "ascend"],
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
              handleEditPartner(record);
            }}
          >
            <EditIcon />
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  if (loading) return <h1>Đang tải ...</h1>;

  return (
    <React.Fragment>
      <PartnerInformationPopupForm
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={popupData}
        type={popupData.id === "0" ? "create" : "edit"}
        onSave={() => setRefresh(!refresh)}
      />
      <div className="dashboard-container">
        <div className="header">
          <h2>Quản lý đối tác</h2>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <CustomButton
              text="Thêm mới"
              icon={<AddCircleIcon />}
              onClick={handleAddNewPartner}
              backgroundColor="#28C2FF"
              color="#fff"
            />
          </div>
        </div>
        <div className="partner-container">
          {/* Left Sidebar for Search */}
          <div className="filter-container">
            <div className="search-bar">
              <h3>Tìm kiếm</h3>
              <Input
                placeholder="Tên đối tác"
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
              dataSource={filteredPartners}
              loading={loading}
              rowKey="id"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                showSizeChanger: true,
                total: filteredPartners.length,
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
