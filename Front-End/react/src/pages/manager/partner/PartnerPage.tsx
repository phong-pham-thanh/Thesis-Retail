import React, { useEffect, useState } from "react";
import "./stylePartner.css";
import { Button, Input, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomButton from "../../component/CustomeButton";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";
import PartnerInformationPopupForm from "./PartnerInformationPopupForm";
import AlertDialog from "../../component/AlertDialog";

interface PartnerType {
  id: string;
  name: string;
  totalSale: string;
  phoneNumber: string;
}

const emptydata: PartnerType = {
  id: "0",
  name: "",
  totalSale: "0", // Initialize with 0 total sale
  phoneNumber: "",
};

export default function PartnerPage() {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<PartnerType[]>([]);
  const [popupData, setPopupData] = useState<PartnerType>(emptydata);
  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<PartnerType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number | undefined>();

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

  const showDeleteDialog = (partner: PartnerType) => {
    setPartnerToDelete(partner);
    setIsAlertVisible(true);
  };

  const columns = [
    {
      title: "Partner ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Partner Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Sale",
      dataIndex: "totalSale",
      key: "totalSale",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "",
      key: "actions",
      render: (text: any, record: PartnerType) => (
        <Space size="middle">
          <Button
            size={"middle"}
            icon={<EditOutlined />}
            onClick={() => handleEditPartner(record)}
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
      <PartnerInformationPopupForm
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={popupData}
        type={popupData.id === "0" ? "create" : "edit"}
        onSave={() => setRefresh(!refresh)}
      />
      <div className="dashboard-container">
        <div className="header">
          <h2>Partner Management</h2>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <CustomButton
              text="Add New Partner"
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
              <h3>Search</h3>
              <Input
                placeholder="Search for partners"
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
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
