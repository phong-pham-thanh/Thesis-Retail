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
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";
import { CategoryState } from "../../../app/type.d";

const { Option } = Select;
const { TextArea } = Input;

interface CategoryInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: CategoryState;
  type?: string;
  onSave?: () => void; // onSave callback after Category is saved
}

export default function CategoryInformationPopupScreen({
  isPopup,
  setPopup,
  data,
  type,
  onSave,
}: CategoryInformationPopupScreenProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form values if editing a Category
  useEffect(() => {
    if (type === "edit" && data) {
      form.setFieldsValue({
        ...data,
        name: data.name,
      });
    } else {
      form.resetFields();
    }
  }, [data, type]);

  // Close the modal and reset the form
  const handleCancel = () => {
    form.resetFields();
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
              ...api_links.category.edit(Number(data.id)),
              data: values,
            };
            await fetch_Api(api_put);
          } else if (type === "create") {
            const api_post = {
              ...api_links.category.create,
              data: values,
            };
            await fetch_Api(api_post);
          }

          message.success(
            `Category ${type === "edit" ? "updated" : "created"} successfully`
          );
          if (onSave) onSave(); // Trigger refresh or other action
          handleCancel();
        } catch (error) {
          message.error("Failed to save Category");
        } finally {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <Modal
      title={type === "edit" ? "Edit Category" : "Create Category"}
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
          label="Category Name"
          rules={[{ required: true, message: "Please enter Category name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
