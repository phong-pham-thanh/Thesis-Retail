import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";

interface CustomerInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: { id?: string; name?: string; phoneNumber?: string }; // Adjust according to your user type
  type?: string; // "create" or "edit"
  onSave?: () => void; // Callback after user is saved
}

export default function CustomerInformationPopupScreen({
  isPopup,
  setPopup,
  data,
  type,
  onSave,
}: CustomerInformationPopupScreenProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form values only when editing a customer
  useEffect(() => {
    if (type === "edit" && data) {
      form.setFieldsValue({
        name: data.name,
        phoneNumber: data.phoneNumber, // Set both name and phone number
      });
    } else if (type === "create") {
      form.resetFields(); // Reset form fields when creating a new customer
    }
  }, [data, type, form]);

  // Close the modal and reset the form only when explicitly cancelled
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
              ...api_links.customer.edit(Number(data.id)), // Adjusting API link for user editing
              data: values,
            };
            await fetch_Api(api_put);
          } else if (type === "create") {
            const api_post = {
              ...api_links.customer.create, // Adjusting API link for user creation
              data: values,
            };
            await fetch_Api(api_post);
          }

          message.success(
            `Customer ${type === "edit" ? "updated" : "created"} successfully`
          );
          if (onSave) onSave(); // Trigger refresh or other action
          handleCancel();
        } catch (error) {
          message.error("Failed to save customer");
        } finally {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <Modal
      title={type === "edit" ? "Edit customer" : "Create customer"}
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
          label="Name"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone number"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
