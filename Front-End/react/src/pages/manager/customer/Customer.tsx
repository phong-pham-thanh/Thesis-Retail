import React, { useEffect, useState } from 'react';
import './styleCustomer.css'
import { Navigate, Link, Router, Route, Routes, useNavigate, BrowserRouter, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as Logo } from '../../../icon/appLogo.svg'
import { ReactComponent as IconTongquan } from '../../../icon/menu-tongquan.svg'
import { ReactComponent as IconHanghoa } from '../../../icon/menu-hanghoa.svg'
import { ReactComponent as IconGiaodich } from '../../../icon/menu-giaodich.svg'
import { ReactComponent as IconDoitac } from '../../../icon/menu-doitac.svg'
import { ReactComponent as IconNV } from '../../../icon/menu-nhanvien.svg'
import { ReactComponent as IconKhuyenmai } from '../../../icon/menu-khuyenmai.svg'
import { ReactComponent as IconBaocao } from '../../../icon/menu-baocao.svg'
import { ReactComponent as IconLogout } from '../../../icon/logout.svg'

import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Account } from '../../component/account';
import NavBar from '../../component/menubar';
import { FilterBox } from '../../component/filterBox';

import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CustomerInformationPopupScreen from '../../component/popupEditCustomer';

interface DataType {
  Id: string;
  key: React.Key;
  cusId: string;
  cusName: string;
  phone: string;
  gender: string;
  email: string;
  tongchitieu: string;
}
const emptydata: DataType = {
  Id: "",
  key: "",
  cusId: "",
  cusName: "",
  phone: "",
  gender: "",
  email: "",
  tongchitieu: "",
}
let dataShow: DataType = emptydata;

const gen = ['Nam', 'Nữ']
const data: DataType[] = [];
for (let i = 0; i < 30; i++) {
  data.push({
    Id: i.toString(),
    key: i,
    cusId: String(i),
    cusName: "Khách hàng " + i,
    phone: '08 00 000 0' + i,
    gender: gen[Math.floor(Math.random() * 2)],
    email: "customer" + i + "@mail.com",
    tongchitieu: String(Math.floor(Math.random() * 500000) * 1000),
  });
}
export default function Customer() {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã khách hàng',
      dataIndex: 'cusId',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'cusName',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
    },
    {
      title: 'Tổng chi tiêu',
      dataIndex: 'tongchitieu',
    },
    {
      title: '',
      key: 'action',
      width: '112px',
      render: (_, record) => (
        <Space size="small">
          <Button size={"middle"} onClick={() => { dataShow = data[Number(record.cusId)]; setIsChangeInformation(!isChangeInformation) }}><EditIcon /></Button>
          <Button size={"middle"} onClick={() => { console.log("Xóa : " + record.cusId) }}><ClearIcon /></Button>
        </Space>),
    },
  ];

  useEffect(() => {
  }, []);
  //useSelector, useNavigate

  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className='dashboard-container'>
      <CustomerInformationPopupScreen
        isPopup={isChangeInformation}
        setPopup={setIsChangeInformation}
        data={dataShow}
        componentDisabled={componentDisabled}
        setComponentDisabled={setComponentDisabled}
      />
      <div className='product-container'>
        <div className='filterField'>
          <FilterBox title={"Chi nhánh"} type={"store"} />
          <FilterBox title={"Giới tính"} type={"gender"} />
          <FilterBox title={"Chức danh"} type={"role"} />
        </div>
        <div className='product-list'>
          <Button type='primary' onClick={() => { dataShow = emptydata; setIsChangeInformation(!isChangeInformation) }} style={{ backgroundColor: "#465d65" }}>Thêm mới</Button>
          <div style={{ marginBottom: 16 }}>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Đã chọn ${selectedRowKeys.length} nhân viên` : ''}
            </span>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );

}
