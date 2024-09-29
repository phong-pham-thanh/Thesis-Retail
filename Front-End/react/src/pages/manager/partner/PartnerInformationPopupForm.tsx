import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";

interface PartnerInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: { id?: string; name?: string; totalSale?: string }; // Adjust according to partner type
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
        totalSale: data.totalSale,
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
        <Form.Item
          name="totalSale"
          label="Total Sale"
          rules={[{ required: true, message: "Please enter total sale amount" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
