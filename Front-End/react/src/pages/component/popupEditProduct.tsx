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
  InputNumber,
} from "antd";
import fetch_Api from "../../app/api_fetch";
import api_links from "../../app/api_links";
import { ProductState, CategoryType } from "../../app/type.d";

const { Option } = Select;
const { TextArea } = Input;

interface ProductInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: ProductState;
  componentDisabled?: boolean;
  setComponentDisabled?: (value: boolean) => void;
  type?: string;
  onSave?: () => void; // onSave callback after product is saved
}

export default function ProductInformationPopupScreen({
  isPopup,
  setPopup,
  data,
  componentDisabled,
  setComponentDisabled,
  type,
  onSave,
}: ProductInformationPopupScreenProps) {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const api_get = api_links.category.getAll;
        const response = await fetch_Api(api_get);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // Set form values if editing a product
  useEffect(() => {
    if (type === "edit" && data) {
      form.setFieldsValue({
        ...data,
        categoryId: data.category.id,
      });
    } else if (type === "create") {
      form.resetFields();
    }
  }, [data, type, form]);

  // Close the modal and reset the form
  const handleCancel = () => {
    setPopup(false);
  };

  // Handle form submission (Create or Update)
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);

        try {
          if (type === "edit" && data?.id) {
            const api_put = {
              ...api_links.product.edit(Number(data.id)),
              data: values,
            };
            await fetch_Api(api_put);
          } else if (type === "create") {
            const api_post = {
              ...api_links.product.createNew,
              data: values,
            };
            await fetch_Api(api_post);
          }

          message.success(
            `Product ${type === "edit" ? "updated" : "created"} successfully`
          );
          if (onSave) onSave(); // Trigger refresh or other action
          handleCancel();
        } catch (error) {
          message.error("Failed to save product");
        } finally {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <Modal
      title={type === "edit" ? "Edit Product" : "Create Product"}
      open={isPopup}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" loading={loading} onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="currentPrice" label="Giá bán">
          <InputNumber />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}
