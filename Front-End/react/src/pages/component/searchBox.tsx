import { Input, InputProps } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

interface CustomInputProps extends InputProps {
  placeholder?: string;
  className?: string;
  isPassword?: boolean;
}

const CustomInput = (props: CustomInputProps) => {
  const { placeholder, className, isPassword, ...restProps } = props;

  return !isPassword ? (
    <Input placeholder={placeholder || undefined} className={`ant-custom-input ${className}`} {...restProps} prefix={<SearchOutlined style={{ fontSize: '24px' }} />} />
  ) : (
    <Input.Password placeholder={placeholder || undefined} className={`ant-custom-input ${className}`} {...restProps} />
  );
};

export default CustomInput;
