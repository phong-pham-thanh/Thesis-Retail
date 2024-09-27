import React, { Component, ReactComponentElement, ReactElement, ReactNode, useEffect, useState } from 'react';
import './component.css'
import './styleMenubar.css'
import { Navigate, Link, Router, Route, Routes, useNavigate, useLocation, BrowserRouter, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import Logo from '../component/IconComponent/AppLogo'

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import IosShareIcon from '@mui/icons-material/IosShare';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PeopleIcon from '@mui/icons-material/People';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HailIcon from '@mui/icons-material/Hail';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';

// import Logo from '../component/IconComponent/AppLogo'
// import IconTongquan from '../component/IconComponent/IconTongquan'
// import IconHanghoa from '../component/IconComponent/IconHanghoa'
// import IconGiaodich from '../component/IconComponent/IconGiaodich'
// import IconDoitac from '../component/IconComponent/IconDoitac'
// import IconNV from '../component/IconComponent/IconNhanvien'
// import IconKhuyenmai from '../component/IconComponent/IconKhuyenmai'
// import IconBaocao from '../component/IconComponent/IconBaocao'
// import IconLogout from '../component/IconComponent/IconLogout'


import { Account } from './account';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import { Hail } from '@mui/icons-material';

type menuItemState =
    {
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
    }

type menuState = menuItemState[];/*
    {
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
    }[]
*/
export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const cookies = new Cookies();

    const menuList: menuState = [
        {
            title: 'Tổng quan',
            icon: <DashboardIcon />,
            path: 'tongquan',
            status: location.pathname.includes('tongquan'),
        },
        {
            title: 'Hàng hóa',
            icon: <InventoryIcon />,
            path: 'hanghoa/',
            status: location.pathname.includes('hanghoa'),
            subNav: [
                {
                    title: 'Kiểm kho',
                    icon: <FactCheckIcon />,
                    path: 'hanghoa',
                    status: location.pathname.includes('kiemkho'),
                },
                {
                    title: 'Danh mục',
                    icon: <CategoryIcon />,
                    path: 'danhmuc',
                    status: location.pathname.includes('danhmuc'),
                },
            ],
        },
        {
            title: 'Giao dịch',
            icon: <ReceiptLongIcon />,
            path: 'giaodich',
            status: location.pathname.includes('giaodich'),
            subNav: [
                {
                    title: 'Nhập hàng',
                    icon: <IosShareIcon />,
                    path: 'nhap-hang',
                    status: location.pathname.includes('nhap-hang'),
                },
                {
                    title: 'Xuất hàng',
                    icon: <IosShareIcon />,
                    path: 'xuat-hang',
                    status: location.pathname.includes('xuat-hang'),
                },
            ],
        },
        {
            title: 'Đối tác',
            icon: <HandshakeIcon />,
            path: 'doitac',
            status: location.pathname.includes('doitac'),
            subNav: [
                {
                    title: 'Khách hàng',
                    icon: <PeopleIcon />,
                    path: 'khachhang',
                    status: location.pathname.includes('khachhang'),
                },
                {
                    title: 'Nhà cung cấp',
                    icon: <AddBusinessIcon />,
                    path: 'doitac/nhacungcap',
                    status: location.pathname.includes('nhacungcap'),
                },
            ],
        },
        {
            title: 'Nhân viên',
            icon: <HailIcon />,
            path: 'nhanvien',
            status: location.pathname.includes('nhanvien'),
        },
        {
            title: 'Khuyến mãi',
            icon: <ConfirmationNumberIcon />,
            path: 'khuyenmai',
            status: location.pathname.includes('khuyenmai'),
        },
        {
            title: 'Báo cáo',
            icon: <SummarizeIcon />,
            path: 'baocao',
            status: location.pathname.includes('baocao'),
        }
        ,
        {
            title: 'Bán hàng',
            icon: <SummarizeIcon />,
            path: 'retail',
            status: location.pathname.includes('retail'),
        }
        ,
        {
            title: 'Quản lý giá',
            icon: <SummarizeIcon />,
            path: 'price-management',
            status: location.pathname.includes('price-management'),
        }
    ]

    const [nameShowSubmenubar, setNameShowSubmenubar] = useState("");

    return (
        <header className='navbar'>
            <div className='navbar__title navbar__item'><Logo /></div>
            {menuList.map((item) => (
                <div className='navbar__submenu'>
                    <div className={item.status ? 'navbar__item_active' : 'navbar__item'}
                        onClick={() => {
                            nameShowSubmenubar == item.path ?
                                setNameShowSubmenubar("") : setNameShowSubmenubar(item.path);
                            item.subNav ?? navigate(item.path);
                        }}>
                        {item.icon} {item.title}
                    </div>
                    {item.path == nameShowSubmenubar ?
                        <div className='navbar__submenubar'>
                            {item.subNav?.map((subItem) => (
                                <div className={subItem.status ? 'navbar__submenuitem_active' : 'navbar__submenuitem'}
                                    onClick={() => {
                                        navigate(subItem.path)
                                    }}>
                                    {subItem.icon} {subItem.title}
                                </div>))
                            }</div>
                        : <></>}
                </div>
            )
            )}
            {/*<Account/>*/}
            <div className='account-container'>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46.757 45.0264C44.1672 40.5264 39.3039 37.5029 33.7492 37.5029L26.2492 37.5029C20.6945 37.5029 15.8312 40.5264 13.2414 45.0264C17.3664 49.6201 23.343 52.5029 29.9992 52.5029C36.6555 52.5029 42.632 49.6084 46.757 45.0264ZM-0.000793458 30.0029C-0.000793457 22.0464 3.15991 14.4158 8.786 8.78973C14.4121 3.16364 22.0427 0.00292969 29.9992 0.00292969C37.9557 0.00292969 45.5863 3.16364 51.2124 8.78973C56.8385 14.4158 59.9992 22.0464 59.9992 30.0029C59.9992 37.9594 56.8385 45.59 51.2124 51.2161C45.5863 56.8422 37.9557 60.0029 29.9992 60.0029C22.0427 60.0029 14.4121 56.8422 8.786 51.2161C3.15991 45.59 -0.000793458 37.9594 -0.000793458 30.0029ZM29.9992 31.8779C32.237 31.8779 34.3831 30.989 35.9654 29.4066C37.5478 27.8243 38.4367 25.6782 38.4367 23.4404C38.4367 21.2027 37.5478 19.0566 35.9654 17.4742C34.3831 15.8919 32.237 15.0029 29.9992 15.0029C27.7614 15.0029 25.6153 15.8919 24.033 17.4742C22.4507 19.0566 21.5617 21.2027 21.5617 23.4404C21.5617 25.6782 22.4507 27.8243 24.033 29.4066C25.6153 30.989 27.7614 31.8779 29.9992 31.8779Z" fill="white" />
                </svg>
                <div className='infor'>
                    {/*<h5>Tuan Nguyen</h5>
<h6>Free Account</h6>*/}
                    <div>{cookies.get("user")?.name??"Anonymous"}</div>
                    <div>{cookies.get("user")?.branch??"No Branch"}</div>
                </div>
                <LogoutIcon  onClick={() => {
                                        //cookies.set("user",null);
                                        cookies.remove("user",{ path: '/' });
                                        navigate("/login");
                                    }}/>
            </div>
        </header>
    );
}
