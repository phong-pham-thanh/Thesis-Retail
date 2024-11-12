import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";

interface PartnerInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: { id?: string; name?: string; phoneNumber?: string }; // Adjust according to partner type
  type?: string; // "create" or "edit"
  onSave?: () => void; // Callback after partner is saved
}

export default function PartnerInformationPopupScreen({
  isPopup,
  setPopup,
  data,
  type,
  onSave,
}: PartnerInformationPopupScreenProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form values if editing a partner
  useEffect(() => {
    if (type === "edit" && data) {
      form.setFieldsValue({
        ...data,
        name: data.name,
        phoneNumber: data.phoneNumber,
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
              ...api_links.partner.edit(Number(data.id)), // Adjusting API link for partner editing
              data: values,
            };
            await fetch_Api(api_put);
          } else if (type === "create") {
            const api_post = {
              ...api_links.partner.create, // Adjusting API link for partner creation
              data: values,
            };
            await fetch_Api(api_post);
          }

          message.success(
            `${
              type === "edit" ? "Thay đổi" : "Thêm mới"
            } thông tin đối tác thành công.`
          );
          if (onSave) onSave(); // Trigger refresh or other action
          handleCancel();
        } catch (error) {
          message.error("Lỗi khi lưu thông tin đối tác.");
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
          label="Tên"
          rules={[{ required: true, message: "Nhập tên đối tác" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
