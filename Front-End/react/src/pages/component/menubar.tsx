import React, {
  Component,
  ReactComponentElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import "./component.css";
import "./styleMenubar.css";
import {
  Navigate,
  Link,
  Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";

import svgLogo from "../../icon/appLogo.svg";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import IosShareIcon from "@mui/icons-material/IosShare";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PeopleIcon from "@mui/icons-material/People";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import HailIcon from "@mui/icons-material/Hail";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LogoutIcon from "@mui/icons-material/Logout";
import HouseIcon from "@mui/icons-material/House";

// import Logo from '../component/IconComponent/AppLogo'
// import IconTongquan from '../component/IconComponent/IconTongquan'
// import IconHanghoa from '../component/IconComponent/IconHanghoa'
// import IconGiaodich from '../component/IconComponent/IconGiaodich'
// import IconDoitac from '../component/IconComponent/IconDoitac'
// import IconNV from '../component/IconComponent/IconNhanvien'
// import IconKhuyenmai from '../component/IconComponent/IconKhuyenmai'
// import IconBaocao from '../component/IconComponent/IconBaocao'
// import IconLogout from '../component/IconComponent/IconLogout'

import { Account } from "./account";
import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import { Hail } from "@mui/icons-material";

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

  const menuList: menuState = [
    {
      title: "Tổng quan",
      icon: <DashboardIcon />,
      path: "tongquan",
      status:
        location.pathname.includes("tongquan") ||
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
        location.pathname.includes("hanghoa") ||
        location.pathname.includes("kiemkho") ||
        location.pathname.includes("danhmuc"),
      subNav: [
        {
          title: "Kiểm kho",
          icon: <FactCheckIcon />,
          path: "kiemkho",
          status: location.pathname.includes("kiemkho"),
        },
        {
          title: "Danh mục",
          icon: <CategoryIcon />,
          path: "danhmuc",
          status: location.pathname.includes("danhmuc"),
        },
      ],
    },
    {
      title: "Giao dịch",
      icon: <ReceiptLongIcon />,
      path: "giaodich",
      status:
        location.pathname.includes("giaodich") ||
        location.pathname.includes("nhap-hang") ||
        location.pathname.includes("xuat-hang"),
      subNav: [
        {
          title: "Nhập hàng",
          icon: <IosShareIcon />,
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
          icon: <IosShareIcon />,
          path: "bill",
          status: location.pathname.includes("bill"),
        },
        {
          title: "Chuyển kho",
          icon: <IosShareIcon />,
          path: "good-transfer",
          status: location.pathname.includes("good-transfer"),
        },
      ],
    },
    {
      title: "Đối tác",
      icon: <HandshakeIcon />,
      path: "doitac",
      status:
        location.pathname.includes("doitac") ||
        location.pathname.includes("khachhang") ||
        location.pathname.includes("nhacungcap"),
      subNav: [
        {
          title: "Khách hàng",
          icon: <PeopleIcon />,
          path: "khachhang",
          status: location.pathname.includes("khachhang"),
        },
        {
          title: "Nhà cung cấp",
          icon: <AddBusinessIcon />,
          path: "nhacungcap",
          status: location.pathname.includes("nhacungcap"),
        },
      ],
    },
    {
      title: "Nhân viên",
      icon: <HailIcon />,
      path: "employee",
      status: location.pathname.includes("employee"),
    },
    {
      title: "Khuyến mãi",
      icon: <ConfirmationNumberIcon />,
      path: "khuyenmai",
      status: location.pathname.includes("khuyenmai"),
    },
    {
      title: "Báo cáo",
      icon: <SummarizeIcon />,
      path: "baocao",
      status: location.pathname.includes("baocao"),
    },
    {
      title: "Bán hàng",
      icon: <SummarizeIcon />,
      path: "retail",
      status: location.pathname.includes("retail"),
    },
    {
      title: "Quản lý giá",
      icon: <SummarizeIcon />,
      path: "price-management",
      status: location.pathname.includes("price-management"),
    },
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
      {menuList.map((item) => (
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
     <Account/>
    </header>
  );
}
