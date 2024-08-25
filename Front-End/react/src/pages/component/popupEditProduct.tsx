import { useDispatch, useSelector } from "react-redux";
//import './popupscreen.css'
import { Button, Checkbox, Col, Form, Input, Modal, Row, Upload, message } from "antd";
import React, { FormEvent, useEffect, useState } from "react";

import { Rule } from 'antd/lib/form';

import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useParams } from "react-router-dom";
//import axios from "axios";
import { ProductState } from "../../app/type.d"
import api_links from "../../app/api_links";
import fetch_Api from "../../app/api_fetch";

interface DataType {
    key: React.Key;
    Id: string;
    name: string;
    giavon: string;
    giaban: string;
    slnhap: number;
    tonkho: number;
};

export default function ProductInformationPopupScreen({ isPopup, setPopup, data, componentDisabled, setComponentDisabled, type }: { isPopup?: boolean, setPopup?: any, data?: ProductState, componentDisabled?: boolean, setComponentDisabled?: any, type?: string }) {
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
        type == "edit" ?
            form
                .validateFields()
                .then((values) => {
                    const api_put = api_links.product.edit;
                    api_put.url=api_put.url+data?.id;
                    api_put.data=values;
                    return fetch_Api(api_put)
                })
            : 
            form
                .validateFields()
                .then((values) => {
                    const api_post = api_links.product.createNew;
                    api_post.data=values;
                    return fetch_Api(api_post)
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
                            initialValue={data?.name}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Phân loại"
                            name="phanloai"
                            //rules={[{ required: true, message: 'Please input your phone number!' }]}
                            initialValue={data?.category?.name}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/*<Col span={24}>
                        <Form.Item
                            label="SL nhập"
                            name="slnhap"
                            //rules={[{ required: true, message: 'Please input your phone number!' }]}
                            initialValue={data?.slnhap}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label="Giá vốn"
                            name="giavon"
                            //rules={[{ required: true, message: 'Please input your email!' }]}
                            initialValue={data?.giavon}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Giá bán"
                            name="giaban"
                            //rules={[{ required: true, message: 'Please input this!' }]}
                            initialValue={data?.giaban}
                        >
                            <Input />
                        </Form.Item>
                    </Col>*/}
                </Row>
            </Form>
        </Modal >
    )
}