import { useDispatch, useSelector } from "react-redux";
//import './popupscreen.css'
import { Button, Checkbox, Col, Form, Input, Modal, Row, Upload, message } from "antd";
import React, { FormEvent, useEffect, useState } from "react";

import { Rule } from 'antd/lib/form';

import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useParams } from "react-router-dom";
//import axios from "axios";

interface DataType {
    key: React.Key;
    Id: string;
    cusName: string;
    phone: string;
    gender: string;
    email: string;
    tongchitieu: string;
  };

export default function CustomerInformationPopupScreen({ isPopup, setPopup, data, componentDisabled, setComponentDisabled }: { isPopup?: boolean, setPopup?: any, data?: DataType, componentDisabled?: boolean, setComponentDisabled?: any }) {
    const { id } = useParams();
    // watch value in form
    const [form] = Form.useForm();
    const [checkForm] = Form.useForm();
    const formData = new FormData();
    //const [componentDisabled, setComponentDisabled] = useState(data?.isBlocked );
    //var componentDisabled = data?.isBlocked ?? false;
    //get data
    //const data = cookies.get("token")?.information

    const handleCancel = () => {
        form.resetFields();
        checkForm.resetFields();
        setPopup(false);
    }

    

    const handleOk = () => {
        
        form
            .validateFields()
            .then((values) => {
                console.log(values);
            })
    }

    return (
        <Modal
            title="Thông tin"
            open={isPopup}
            onCancel={handleCancel}
            footer={[
                <Button onClick={handleCancel} type="default" key="back">
                    Huỷ
                </Button>,
                <Button onClick={handleOk} type="primary" htmlType="submit" key="submit">
                    Lưu
                </Button>
            ]}
        >
            <Form
                form={form}
                disabled={componentDisabled}
                labelAlign="left"
                labelCol={{ span: 6 }}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            initialValue={data?.cusName}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Số Điện thoại"
                            name="phoneNumber"
                            //rules={[{ required: true, message: 'Please input your phone number!' }]}
                            initialValue={data?.phone}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                            //rules={[{ required: true, message: 'Please input your email!' }]}
                            initialValue={data?.email}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Tổng chi tiêu"
                            name="tongchitieu"
                            rules={[{ required: true, message: 'Please input this!' }]}
                            initialValue={data?.tongchitieu}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal >
    )
}