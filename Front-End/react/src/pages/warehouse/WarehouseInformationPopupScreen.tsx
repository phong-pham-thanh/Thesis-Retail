import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import api_links from "../../app/api_links";
import fetch_Api from "../../app/api_fetch";

interface WarehouseInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: { id?: string; name?: string };
  type?: string;
  onSave?: () => void;
}

export default function WarehouseInformationPopupScreen({
  isPopup,
  setPopup,
  data,
  type,
  onSave,
}: WarehouseInformationPopupScreenProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form values if editing a partner
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
            `Partner ${type === "edit" ? "updated" : "created"} successfully`
          );
          if (onSave) onSave(); // Trigger refresh or other action
          handleCancel();
        } catch (error) {
          message.error("Failed to save partner");
        } finally {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <Modal
      title={type === "edit" ? "Edit Partner" : "Create Partner"}
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
          rules={[{ required: true, message: "Please enter partner name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
