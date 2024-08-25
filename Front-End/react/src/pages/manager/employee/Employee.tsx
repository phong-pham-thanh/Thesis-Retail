import React, { useEffect, useState } from 'react';
import './styleEmployee.css'

import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import { Account } from '../../component/account';
import NavBar from '../../component/menubar';
import { FilterBox } from '../../component/filterBox';

import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { randomFill } from 'crypto';
import EmployeeInformationPopupScreen from '../../component/popupEditEmployee';

interface DataType {
  key: React.Key;
  empId: string;
  empName: string;
  phone: string;
  gender: string;
  chinhanh: string;
  chucdanh: string;
};
const emptydata: DataType = {
  key: "",
  empId: "",
  empName: "",
  phone: "",
  gender: "",
  chinhanh: "",
  chucdanh: "",
}
let dataShow: DataType = emptydata;

const r = ['Quản lý chi nhánh', 'Quản lý kho', 'Nhân viên kho']
const gen = ['Nam', 'Nữ']
const data: DataType[] = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    empId: String(i),
    empName: "Nhân viên " + i,
    phone: '08 00 000 0' + i,
    gender: gen[Math.floor(Math.random() * 2)],
    chinhanh: "Chi nhánh 1",
    chucdanh: r[Math.floor(Math.random() * 3)],
  });
}

export default function Employee() {
  useEffect(() => {
  }, []);
  //useSelector, useNavigate

  const [isChangeInformation, setIsChangeInformation] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Họ và tên',
      dataIndex: 'empName',
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'empId',
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
      title: 'Chi nhánh',
      dataIndex: 'chinhanh',
    },
    {
      title: 'Chức danh',
      dataIndex: 'chucdanh',
    },
    {
      title: '',
      key: 'action',
      width: '112px',
      render: (_, record) => (
        <Space size="small">
          <Button size={"middle"} onClick={() => { dataShow = data[Number(record.empId)]; setIsChangeInformation(!isChangeInformation) }}><EditIcon /></Button>
          <Button size={"middle"} onClick={() => { console.log("Xóa : " + record.empId) }}><ClearIcon /></Button>
        </Space>),
    },
  ];

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
      <EmployeeInformationPopupScreen
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
