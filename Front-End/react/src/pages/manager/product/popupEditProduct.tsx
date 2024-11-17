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
import { HttpStatusCode } from "axios";

const { Option } = Select;

const defaultImagePathPrefix = "https://localhost:7030/images/products";

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
  const [previousPath, setPreviousPath] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

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
        categoryId: data.category.id,
      });
      setPreviousPath(data.imgPath);
      setImageUrl(data.imgPath);
    } else if (type === "create") {
      form.resetFields();
    }
    clearImage();
  }, [data, type, form]);

  const handleCancel = () => {
    setPopup(false);
    if (data?.imgPath) {
      setImageUrl(data.imgPath);
    } else {
      clearImage();
    }
  };

  const clearImage = () => {
    setImageUrl("");
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        console.log(
          `2 hinh có khác nhau không? : ${
            imageUrl !== previousPath ? "Có" : "Không"
          }`
        );
        let productData;
        if (imageUrl !== previousPath)
          productData = { ...values, imgPath: imageUrl };
        else productData = { ...values, imgPath: previousPath };
        console.log(productData);
        try {
          if (type === "edit" && data?.id) {
            const api_put = {
              ...api_links.product.edit(Number(data.id)),
              data: productData,
            };
            await fetch_Api(api_put);
          } else if (type === "create") {
            const api_post = {
              ...api_links.product.createNew,
              data: productData,
            };
            await fetch_Api(api_post);
          }

          message.success(
            `${
              type === "edit" ? "Thay đổi" : "Thêm mới"
            } thông tin sản phẩm thành công.`
          );
          if (onSave) onSave();
          handleCancel();
        } catch (error) {
          message.error("Lỗi khi lưu thông tin sản phẩm");
        } finally {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      message.error("Không tìm thấy tệp tin nào được chọn.");
      return;
    }
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productName", data?.name || "Sản phẩm mới");

    try {
      const uploadApi = { ...api_links.uploadFile.post, data: formData };
      const response = await fetch_Api(uploadApi);
      if (response.status === HttpStatusCode.Ok) {
        console.log(response.data);
        setImageUrl(response.data.imageUrl);
      }
      message.success("Tải hình ảnh thành công.");
    } catch (error) {
      message.error("Lỗi khi tải hình ảnh.");
    }
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
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="currentPrice" label="Giá">
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Danh mục"
          rules={[{ required: true, message: "Chọn một danh mục" }]}
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
        <Form.Item label="Tải hình ảnh">
          <input id="file-upload" type="file" onChange={handleFileChange} />
        </Form.Item>
        {(imageUrl || previousPath) && (
          <img
            src={
              imageUrl ? `${imageUrl}` : `${defaultImagePathPrefix}/${imageUrl}`
            }
            alt="Xem trước"
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}
      </Form>
    </Modal>
  );
}
