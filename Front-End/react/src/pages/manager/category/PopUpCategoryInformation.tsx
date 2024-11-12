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
            `${
              type === "edit" ? "Thay đổi" : "Thêm mới"
            } thông tin danh mục thành công.`
          );
          if (onSave) onSave(); // Trigger refresh or other action
          handleCancel();
        } catch (error) {
          message.error(error.message || "Lỗi khi lưu thông tin danh mục");
        } finally {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <Modal
      title={type === "edit" ? "Thay đổi" : "Thêm mới"}
      open={isPopup}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="save" type="primary" loading={loading} onClick={handleOk}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Nhập tên danh mục" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
