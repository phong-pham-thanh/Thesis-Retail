import React, { Component, useEffect, useState } from "react";
import "./component.css";
import {
  Navigate,
  Link,
  Router,
  Route,
  Routes,
  useNavigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { FormInstance, RadioChangeEvent } from "antd";
import { Input, Radio, Space } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

export function FilterBox({
  title,
  type,
  form,
  options,
}: {
  title: string;
  type: string;
  form?: FormInstance;
  options?: { value: number; label: string }[];
}) {
  const [expand, setExpand] = useState(false);

  useEffect(() => { }, []);
  //useSelector, useNavigate

  /*<Radio value={4}>
          More...
          {valueTongban === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>*/

  ///////// CHI NHANH ///////////
  const [valueChinhanh, setValueChinhanh] = useState(1);
  const optionStores = [
    { value: 1, label: "Chi nhánh tổng" },
    { value: 2, label: "Chi nhánh 1" },
    { value: 3, label: "Chi nhánh 2" },
  ];
  const onChangeChinhanh = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValueChinhanh(e.target.value);
    form && form.setFieldValue(type, e.target.value);
  };
  const noidungChinhanh = () => (
    <div className="expand">
      <Radio.Group onChange={onChangeChinhanh} value={valueChinhanh}>
        <Space direction="vertical">
          {(options || optionStores).map((option, index) => (
            <Radio key={index} value={option.value}>
              {option.label}
            </Radio>
          ))}
          {/* <Radio value={1}>Chi nhánh tổng</Radio>
          <Radio value={2}>Chi nhánh 1</Radio>
          <Radio value={3}>Chi nhánh 2</Radio> */}
        </Space>
      </Radio.Group>
    </div>
  );

  ///////// TONG BAN ///////////
  const [valueTongban, setValueTongban] = useState();
  const onChangeTongban = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValueTongban(e.target.value);
  };
  const noidungTongban = () => (
    <div className="expand">
      <Radio.Group onChange={onChangeTongban} value={valueTongban}>
        <Space direction="vertical">
          <Radio value={1}>&lt; 500.000</Radio>
          <Radio value={2}>500.000 - 1.000.000</Radio>
          <Radio value={3}>1.000.000 - 5.000.000</Radio>
          <Radio value={4}>5.000.000 - 10.000.000</Radio>
          <Radio value={5}>&gt; 10.000.000</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  ///////// SO LUONG ///////////
  const [valueSoluong, setValueSoluong] = useState();
  const onChangeSoluong = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValueSoluong(e.target.value);
  };
  const noidungSoluong = () => (
    <div className="expand">
      <Radio.Group onChange={onChangeSoluong} value={valueSoluong}>
        <Space direction="vertical">
          <Radio value={1}>&lt; 100</Radio>
          <Radio value={2}>100 - 500</Radio>
          <Radio value={3}>&gt; 500</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  ///////// GIOI TINH ///////////
  const [valueGioitinh, setValueGioitinh] = useState(1);
  const onChangeGioitinh = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValueGioitinh(e.target.value);
  };
  const noidungGioitinh = () => (
    <div className="expand">
      <Radio.Group onChange={onChangeGioitinh} value={valueGioitinh}>
        <Space direction="vertical">
          <Radio value={1}>Tất cả</Radio>
          <Radio value={2}>Nam</Radio>
          <Radio value={3}>Nữ</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  ///////// CHUC DANH ///////////
  const [valueChucdanh, setValueChucdanh] = useState(1);
  const onChangeChucdanh = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValueChucdanh(e.target.value);
  };
  const noidungChucdanh = () => (
    <div className="expand">
      <Radio.Group onChange={onChangeChucdanh} value={valueChucdanh}>
        <Space direction="vertical">
          <Radio value={1}>Tất cả</Radio>
          <Radio value={2}>Quản lý chi nhánh</Radio>
          <Radio value={3}>Quản lý kho</Radio>
          <Radio value={4}>Nhân viên kho</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  ///////// TRANG THAI ///////////
  const [status, setStatus] = useState(1);
  const onChangeStatus = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setStatus(e.target.value);
  };
  const statusContent = () => (
    <div className="expand">
      <Radio.Group onChange={onChangeStatus} value={status}>
        <Space direction="vertical">
          <Radio value={1}>Phiếu tạm</Radio>
          <Radio value={2}>Đã nhập hàng</Radio>
          <Radio value={3}>Đã trả hàng</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  ///////// TRANG THAI ///////////
  const [timeType, setTimeType] = useState(1);
  const onChangeTimeType = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setTimeType(e.target.value);
  };
  const timeTypeContent = () => (
    <div className="expand">
      <Radio.Group onChange={onChangeTimeType} value={timeType}>
        <Space direction="vertical">
          <Radio value={1}>Tháng này</Radio>
          <Radio value={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Thời gian khác</span>
              <CalendarOutlined />
            </div>
          </Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  ///////// PHAN LOAI REPORT ///////////
  const [reportType, setReportType] = useState(1);
  const onChangeReportType = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setReportType(e.target.value);
  };
  const reportTypeContent = () => (
    <div className="expand">
      <Radio.Group onChange={onChangeReportType} value={reportType}>
        <Space direction="vertical">
          <Radio value={1}>Theo loại hàng</Radio>
          <Radio value={2}>Theo nhóm hàng</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  ///////// HIEN THI REPORT ///////////
  const [displayReport, setDisplayReport] = useState(1);
  const onChangeDisplayReport = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setDisplayReport(e.target.value);
  };
  const displayReportContent = () => (
    <div className="expand">
      <Radio.Group onChange={onChangeDisplayReport} value={displayReport}>
        <Space direction="vertical">
          <Radio value={1}>Ngang</Radio>
          <Radio value={2}>Dọc</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  return (
    <div className="filterBox">
      <div className="filterBox-title" onClick={() => setExpand(!expand)}>
        {title}
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {expand && (
        <div className="filterBox-content">
          {
            {
              store: noidungChinhanh(),
              amount: noidungTongban(),
              num: noidungSoluong(),
              gender: noidungGioitinh(),
              role: noidungChucdanh(),
              status: statusContent(),
              time: timeTypeContent(),
              reportType: reportTypeContent(),
              displayReport: displayReportContent(),
            }[type]
          }
        </div>
      )}
    </div>
  );
}
