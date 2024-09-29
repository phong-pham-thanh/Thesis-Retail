import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";

interface CustomerInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: { id?: string; name?: string }; // Adjust according to your user type
  type?: string; // "create" or "edit"
  onSave?: () => void; // Callback after user is saved
}

export default function UserInformationPopupScreen({
  isPopup,
  setPopup,
  data,
  type,
  onSave,
}: CustomerInformationPopupScreenProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form values if editing a user
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
      </Form>
    </Modal>
  );
}
