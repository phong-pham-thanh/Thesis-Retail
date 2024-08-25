import { Select, SelectProps } from "antd";

interface CustomSelectProps<T = any> extends SelectProps<T> {}

const CustomSelect = <T extends any>(props: CustomSelectProps<T>) => {
  return (
    <Select
      allowClear
      {...props}
      className={`ant-custom-select ${props.className}`}
      getPopupContainer={(trigger: any) => trigger.parentNode}
      placeholder={props?.placeholder ? props.placeholder : undefined}
    />
  );
};

export default CustomSelect;
