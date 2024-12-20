import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  message,
  Checkbox,
  InputNumber,
} from "antd";
import fetch_Api from "../../../app/api_fetch";
import api_links from "../../../app/api_links";
import { ProductState, CategoryType } from "../../../app/type.d";

const { Option } = Select;
const { TextArea } = Input;

interface ProductInformationPopupScreenProps {
  isPopup: boolean;
  setPopup: (value: boolean) => void;
  data?: ProductState;
  componentDisabled?: boolean;
  setComponentDisabled?: (value: boolean) => void;
  type?: string;
  onSave?: () => void;
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
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fullPath, setFullPath] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  useEffect(() => {
    if (type === "edit" && data) {
      form.setFieldsValue({
        ...data,
        barcode: data.barcode,
        categoryId: data.category.id,
      });
      setImageUrl(data.leafPath || "");
      setFullPath(data.imgPath || "");
    } else if (type === "create") {
      form.resetFields();
    }
  }, [data, type, form]);

  const handleCancel = () => {
    setPopup(false);
    clearImage(); // Reset image when modal is canceled
  };

  const clearImage = () => {
    setSelectedFile(null);
    setImageUrl(""); // Clear the image preview URL
    setFullPath(""); // Clear the image preview URL
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const productData = { ...values, imgPath: imageUrl };
        try {
          if (type === "edit" && data?.id) {
            const api_put = {
              ...api_links.product.edit(Number(data.id)),
              data: productData,
            };
            console.log(api_put);
            await fetch_Api(api_put);
          } else if (type === "create") {
            const api_post = {
              ...api_links.product.createNew,
              data: productData,
            };
            await fetch_Api(api_post);
          }

          message.success(
            `Product ${type === "edit" ? "Thay đổi" : "Thêm mới"} thành công.`
          );
          if (onSave) onSave();
          handleCancel();
        } catch (error) {
          message.error("Failed to save product");
        } finally {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      message.error("No file selected.");
      return;
    }
    setSelectedFile(file);
    await handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productName", data.name);

    try {
      const uploadApi = { ...api_links.uploadFile.post, data: formData };
      const response = await fetch_Api(uploadApi);
      setImageUrl(response.data.imageUrl);
      setFullPath(response.data.fullPath);
      message.success("Image uploaded successfully.");
    } catch (error) {
      message.error("Failed to upload image.");
    }
  };

  return (
    <Modal
      title={type === "edit" ? "Chỉnh sửa" : "Thêm mới"}
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
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="currentPrice" label="Giá bán">
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Danh mục"
          rules={[{ required: true, message: "Chọn danh mục" }]}
        >
          <Select>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>


        <Form.Item
          name="barcode"
          label="Barcode"
          // rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="status" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Form.Item label="Tải hình ảnh">
          {/* <input type="file" onChange={handleFileChange} /> */}
          <input id="file-upload" type="file" onChange={handleFileChange} />
        </Form.Item>

        {fullPath && (
          <img
            src={fullPath}
            alt="Xem trước"
            style={{ width: "100px", height:"100px", marginTop: "10px" }}
          />
        )}
      </Form>
    </Modal>
  );
}
