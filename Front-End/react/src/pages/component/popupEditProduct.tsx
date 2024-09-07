import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
  Checkbox,
} from "antd";
import { useParams } from "react-router-dom";
import fetch_Api from "../../app/api_fetch";
import api_links from "../../app/api_links";
import { ProductState, CategoryType } from "../../app/type.d"; // Assuming CategoryType is defined in type.d

const { Option } = Select;
const { TextArea } = Input; // For the description text area

interface ProductInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: ProductState;
  componentDisabled?: boolean;
  setComponentDisabled?: (value: boolean) => void;
  type?: string;
}

export default function ProductInformationPopupScreen({
  isPopup,
  setPopup,
  data,
  componentDisabled,
  setComponentDisabled,
  type,
}: ProductInformationPopupScreenProps) {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<CategoryType[]>([]); // To hold the list of categories
  const [loading, setLoading] = useState(false); // For loading state during the API request

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const api_get = api_links.category.getAll; // Assuming you have an endpoint for fetching all categories
        const response = await fetch_Api(api_get);
        setCategories(response.data); // Update the categories state with API response
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleCancel = () => {
    form.resetFields();
    setPopup(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (type === "edit") {
          const api_put = {
            ...api_links.product.edit,
            url: api_links.product.edit.url + data?.id,
            data: values,
          };
          return fetch_Api(api_put);
        } else {
          const api_post = { ...api_links.product.createNew, data: values };
          return fetch_Api(api_post);
        }
      })
      .then(() => {
        message.success("Product saved successfully");
        setPopup(false);
      })
      .catch((err) => {
        message.error("Failed to save product");
      });
  };

  return (
    <Modal
      title="Thông tin"
      open={isPopup}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel} type="default" key="back">
          Huỷ
        </Button>,
        <Button
          onClick={handleOk}
          type="primary"
          htmlType="submit"
          key="submit"
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} labelAlign="left" labelCol={{ span: 6 }}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Tên hàng"
              name="name"
              rules={[
                { required: true, message: "Please input the product name!" },
              ]}
              initialValue={data?.name}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Phân loại"
              name="categoryId"
              rules={[{ required: true, message: "Please select a category!" }]}
              initialValue={data?.category?.id} // Assuming 'category.id' is the initial value
            >
              <Select placeholder="Chọn phân loại" loading={loading}>
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Mô tả" // Description
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input the product description!",
                },
              ]}
              initialValue={data?.description}
            >
              <TextArea rows={4} placeholder="Enter product description" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Trạng thái" // Status
              name="status"
              valuePropName="checked" // Checkbox checked property
              initialValue={data?.status ?? true} // Default to true if not available
            >
              <Checkbox>Active</Checkbox>
            </Form.Item>
          </Col>

          {/* <Col span={24}>
            <Form.Item
              label="Giá vốn"
              name="giavon"
              rules={[{ required: true, message: "Please input the cost price!" }]}
              initialValue={data?.giavon}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Giá bán"
              name="giaban"
              rules={[{ required: true, message: "Please input the selling price!" }]}
              initialValue={data?.giaban}
            >
              <Input />
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  );
}
