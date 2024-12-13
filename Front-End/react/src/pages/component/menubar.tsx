import React, { ReactElement, ReactNode, useState } from "react";
import "./component.css";
import "./styleMenubar.css";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

import svgLogo from "../../icon/appLogo.svg";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import IosShareIcon from "@mui/icons-material/IosShare";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PeopleIcon from "@mui/icons-material/People";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import HailIcon from "@mui/icons-material/Hail";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SummarizeIcon from "@mui/icons-material/Summarize";
import HouseIcon from "@mui/icons-material/House";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WarehouseIcon from "@mui/icons-material/Warehouse";

import { Account } from "./account";

type menuItemState = {
  title: string;
  icon: ReactNode | ReactElement;
  path: string;
  status: boolean;
  subNav?: {
    title: string;
    icon: ReactNode;
    path: string;
    status: boolean;
  }[];
};

type menuState = menuItemState[];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();
  const isAdmin = cookies.get("isAdmin") == true;

  const menuList: menuState = [
    {
      title: "Tổng quan",
      icon: <DashboardIcon />,
      path: "tongquan",
      status:
        //location.pathname.includes("tongquan") ||
        location.pathname.includes("quan-ly-kho"),
      subNav: [
        {
          title: "Quản lý kho",
          icon: <HouseIcon />,
          path: "quan-ly-kho",
          status: location.pathname.includes("quan-ly-kho"),
        },
      ],
    },
    {
      title: "Hàng hóa",
      icon: <InventoryIcon />,
      path: "hanghoa/",
      status:
        //location.pathname.includes("hang-hoa") ||
        location.pathname.includes("kiem-kho") ||
        location.pathname.includes("danh-muc"),
      subNav: [
        {
          title: "Kiểm kho",
          icon: <FactCheckIcon />,
          path: "kiem-kho",
          status: location.pathname.includes("kiem-kho"),
        },
        isAdmin
          ? {
              title: "Danh mục",
              icon: <CategoryIcon />,
              path: "danh-muc",
              status: location.pathname.includes("danh-muc"),
            }
          : null,
      ],
    },
    {
      title: "Giao dịch",
      icon: <ReceiptLongIcon />,
      path: "giaodich",
      status:
        //location.pathname.includes("giaodich") ||
        location.pathname.includes("nhap-hang") ||
        location.pathname.includes("xuat-hang"),
      subNav: [
        {
          title: "Nhập hàng",
          icon: <SystemUpdateAltIcon fontSize="small" />,
          path: "nhap-hang",
          status: location.pathname.includes("nhap-hang"),
        },
        {
          title: "Xuất hàng",
          icon: <IosShareIcon />,
          path: "xuat-hang",
          status: location.pathname.includes("xuat-hang"),
        },
        {
          title: "Hóa đơn",
          icon: <ReceiptIcon />,
          path: "bill",
          status: location.pathname.includes("bill"),
        },
        {
          title: "Chuyển kho",
          icon: <WarehouseIcon />,
          path: "good-transfer",
          status: location.pathname.includes("good-transfer"),
        },
      ],
    },
    isAdmin
      ? {
          title: "Đối tác",
          icon: <HandshakeIcon />,
          path: "doitac",
          status:
            //location.pathname.includes("doitac") ||
            location.pathname.includes("khach-hang") ||
            location.pathname.includes("nha-cung-cap"),
          subNav: [
            {
              title: "Khách hàng",
              icon: <PeopleIcon />,
              path: "khach-hang",
              status: location.pathname.includes("khach-hang"),
            },
            {
              title: "Nhà cung cấp",
              icon: <AddBusinessIcon />,
              path: "nha-cung-cap",
              status: location.pathname.includes("nha-cung-cap"),
            },
          ],
        }
      : null,
    isAdmin
      ? {
          title: "Nhân viên",
          icon: <HailIcon />,
          path: "employee",
          status: location.pathname.includes("employee"),
        }
      : null,
    {
      title: "Báo cáo",
      icon: <SummarizeIcon />,
      path: "baocao",
      status: location.pathname.includes("baocao"),
    },
    {
      title: "Bán hàng",
      icon: <StoreIcon />,
      path: "retail",
      status: location.pathname.includes("retail"),
    },
    isAdmin
      ? {
          title: "Quản lý giá",
          icon: <ChecklistIcon />,
          path: "price-management",
          status: location.pathname.includes("price-management"),
        }
      : null,
  ];

  const [nameShowSubmenubar, setNameShowSubmenubar] = useState<string>("");

  const handleMenuClick = (item: menuItemState) => {
    if (item.subNav) {
      setNameShowSubmenubar(nameShowSubmenubar === item.path ? "" : item.path);
    } else {
      navigate(item.path);
      setNameShowSubmenubar("");
    }
  };

  const handleSubItemClick = (subItem: menuItemState["subNav"][0]) => {
    navigate(subItem.path);
    setNameShowSubmenubar("");
  };

  return (
    <header className="navbar-custom">
      <div className="navbar__title">
        <img
          src={svgLogo}
          width="100"
          height="100"
          style={{ marginLeft: 10, marginTop: 10 }}
        />
      </div>
      {menuList
        .filter((item) => item !== null)
        .map((item) => (
          <div key={item.title} className="navbar__submenu">
            <div
              className={item.status ? "navbar__item_active" : "navbar__item"}
              onClick={() => handleMenuClick(item)}
            >
              {item.icon} {item.title}
            </div>
            {item.subNav && item.path === nameShowSubmenubar && (
              <div className="navbar__submenubar">
                {item.subNav.map((subItem) => (
                  <div
                    key={subItem.title}
                    className={
                      subItem.status
                        ? "navbar__submenuitem_active"
                        : "navbar__submenuitem"
                    }
                    onClick={() => handleSubItemClick(subItem)}
                  >
                    {subItem.icon} {subItem.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      <Account />
    </header>
  );
}
