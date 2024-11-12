import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, message, Switch, Select } from "antd";
import api_links from "../../app/api_links";
import fetch_Api from "../../app/api_fetch";
import { WarehouseType } from "./WarehousePage";
import { StaffState } from "../../app/type.d";

interface WarehouseInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: WarehouseType;
  type?: string;
  onSave?: () => void;
}

const { Option } = Select;

export default function WarehouseInformationPopupScreen({
  isPopup,
  setPopup,
  data,
  type,
  onSave,
}: WarehouseInformationPopupScreenProps) {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<StaffState[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const api_get = api_links.user.getAll;
        const response = await fetch_Api(api_get);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error("Lỗi khi tải thông tin users");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (type === "edit" && data) {
      form.setFieldsValue({
        ...data,
        address: data.address,
        managerId: data.managerId,
        status: data.status,
      });
    } else if (type === "create") {
      form.resetFields();
    }
  }, [data, type, form]);

  const handleCancel = () => {
    setPopup(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);

        try {
          if (type === "edit" && data?.id != null) {
            const api_put = {
              ...api_links.warehouse.edit(Number(data.id)),
              data: values,
            };
            await fetch_Api(api_put);
          } else if (type === "create") {
            const api_post = {
              ...api_links.warehouse.create,
              data: values,
            };
            await fetch_Api(api_post);
          }

          message.success(
            `${
              type === "edit" ? "Thay đổi" : "Thêm mới"
            } thông tin kho thành công.`
          );
          if (onSave) onSave();
          handleCancel();
        } catch (error) {
          message.error("Lỗi khi lưu thông tin kho.");
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
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Nhập địa chỉ kho" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="managerId"
          label="Quản lý"
          rules={[{ required: true, message: "Chọn thông tin quản lý" }]}
        >
          <Select>
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Trạng thái" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
