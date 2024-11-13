import React, { useEffect, useState } from "react";
import { Button, Checkbox, message, Radio, Space, Input } from "antd";
import type { RadioChangeEvent, GetProps } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import "./styleTransaction.css";
const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

interface Category {
  id: number;
  name: string;
}

interface Option {
  value: number | null;
  label: string
}

interface CheckboxFilterProps {
  onSelect: (value: string[] | null) => void; // Allow `null` for 'Tất cả' option
}

interface SearchboxFilterProps {
  onSelect: (value: string) => void; // Function to handle selected warehouse
}

interface RadioFilterProps {
  onSelect: (value: number) => void; // Function to handle selected warehouse
}

export function StateFilter({ onSelect }: CheckboxFilterProps) {
  const [expand, setExpand] = useState(false);
  const [options, setOptions] = useState<Option[]>([]); // Include `null` for 'Tất cả'
  const [valueChecked, setValueChecked] = useState<number | null>(null); // Default to `null` for 'Tất cả'
  const [valueCheckedList, setValueCheckedList] = useState([]); // Đặt giá trị mặc định là mảng rỗng

  const statusOptions = [
    {
      label: 'Đang xử lý',
      value: '2',
    },
    {
      label: 'Hoàn thành',
      value: '1',
    },
    {
      label: 'Đã hủy',
      value: '0',
    },
  ];
  const all=['0','1','2'];

  useEffect(() => {
  }, []);

  const onChangeFilter = (checkedValues) => {
    console.log("Checked values: ", checkedValues);
    setValueCheckedList(checkedValues);
    onSelect(checkedValues); // Send `null` for 'Tất cả' selection
  };
  return (
    <div className="filterBox">
      <div className="filterBox-title" onClick={() => setExpand(!expand)}>
        Tình trạng đơn hàng
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {expand && (
        <div className="filterBox-content">
          <Checkbox.Group onChange={onChangeFilter} value={valueCheckedList}>
            <Space direction="vertical">
              {statusOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
          <Button className="none-filter-btn" type="link" onClick={() => { 
            onSelect(null); //onSelect(all); 
            setValueCheckedList([]) }}>Xóa bộ lọc</Button>
        </div>
      )}
    </div>
  );
}

export function WarehouseFilter({ onSelect }: CheckboxFilterProps) {
  const [expand, setExpand] = useState(false);
  const [options, setOptions] = useState<Option[]>([]); // Include `null` for 'Tất cả'
  const [all, setAll] = useState<string[]>([]); // Include `null` for 'Tất cả'
  const [valueChecked, setValueChecked] = useState<number | null>(null); // Default to `null` for 'Tất cả'
  const [valueCheckedList, setValueCheckedList] = useState([]); // Đặt giá trị mặc định là mảng rỗng

  const getAllWarehouse = () => {
    const api_link = api_links.warehouse.getAllByRole;
    return fetch_Api(api_link);
  };

  useEffect(() => {
    getAllWarehouse()
      .then((res) => {
        res.data.map((item) => {
          all.push(item.id);
          options.push({
            label: item.address,
            value: item.id
          })
        });
      })
      .catch((error) => {
        message.error(error.detail);
      });
  }, []);

  const onChangeFilter = (checkedValues) => {
    console.log("Checked values: ", checkedValues);
    setValueCheckedList(checkedValues);
    onSelect(checkedValues); // Send `null` for 'Tất cả' selection
  };
  return (
    <div className="filterBox">
      <div className="filterBox-title" onClick={() => setExpand(!expand)}>
       Vị trí kho hàng
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {expand && (
        <div className="filterBox-content">
          <Checkbox.Group onChange={onChangeFilter} value={valueCheckedList}>
            <Space direction="vertical">
              {options.map((option) => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
          <Button className="none-filter-btn" type="link" onClick={() => { 
            onSelect(null); setValueCheckedList([]) //set all=null
            //onSelect(all); setValueCheckedList([]) //set all=all
            }}>Xóa bộ lọc</Button>
        </div>
      )}
    </div>
  );
}

export function CustomerFilter({ onSelect }: SearchboxFilterProps) {
  const [expand, setExpand] = useState(false);
  const [options, setOptions] = useState<Option[]>([]); // Include `null` for 'Tất cả'
  const [all, setAll] = useState<string[]>([]); // Include `null` for 'Tất cả'
  const [valueChecked, setValueChecked] = useState<number | null>(null); // Default to `null` for 'Tất cả'
  const [valueCheckedList, setValueCheckedList] = useState([]); // Đặt giá trị mặc định là mảng rỗng

  useEffect(() => {
    
  }, []);

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
    onSelect(value);
  }

  const onChangeFilter = (checkedValues) => {
    console.log("Checked values: ", checkedValues);
    setValueCheckedList(checkedValues);
    onSelect(checkedValues); // Send `null` for 'Tất cả' selection
  };
  return (
    <div className="filterBox">
      <div className="filterBox-title" onClick={() => setExpand(!expand)}>
       Khách hàng
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {expand && (
        <div className="filterBox-content">
              <Search placeholder="input search text" allowClear onSearch={onSearch} />
        </div>
      )}
    </div>
  );
}

export function PartnerFilter({ onSelect }: SearchboxFilterProps) {
  const [expand, setExpand] = useState(false);
  const [options, setOptions] = useState<Option[]>([]); // Include `null` for 'Tất cả'
  const [all, setAll] = useState<string[]>([]); // Include `null` for 'Tất cả'
  const [valueChecked, setValueChecked] = useState<number | null>(null); // Default to `null` for 'Tất cả'
  const [valueCheckedList, setValueCheckedList] = useState([]); // Đặt giá trị mặc định là mảng rỗng

  useEffect(() => {
    
  }, []);

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
    onSelect(value);
  }

  const onChangeFilter = (checkedValues) => {
    console.log("Checked values: ", checkedValues);
    setValueCheckedList(checkedValues);
    onSelect(checkedValues); // Send `null` for 'Tất cả' selection
  };
  return (
    <div className="filterBox">
      <div className="filterBox-title" onClick={() => setExpand(!expand)}>
       Nhà cung cấp
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {expand && (
        <div className="filterBox-content">
              <Search placeholder="input search text" allowClear onSearch={onSearch} />
        </div>
      )}
    </div>
  );
}

export function CategoryFilter({ onSelect }: CheckboxFilterProps) {
  const [expand, setExpand] = useState(false);
  const [storeOptions, setStoreOptions] = useState<
    { value: number | null; label: string }[]
  >([]); // Include `null` for 'Tất cả'
  const [valueDanhMuc, setValueChinhanh] = useState<number | null>(null); // Default to `null` for 'Tất cả'
  const [valueDanhMuc2, setValueDanhMuc] = useState([]); // Đặt giá trị mặc định là mảng rỗng

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch_Api(api_links.category.getAll);
        const categoryData = res.data.map((category: Category) => ({
          value: category.id,
          label: category.name,
        }));

        // Add 'Tất cả' option
        setStoreOptions([{ value: null, label: "Tất cả" }, ...categoryData]);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    };

    fetchCategories();
  }, []);

  const onChangeDanhMuc = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;
    setValueChinhanh(selectedValue);
    onSelect(selectedValue); // Send `null` for 'Tất cả' selection
  };

  const onChangeDanhMuc2 = (checkedValues) => {
    console.log("Checked values: ", checkedValues);
    setValueDanhMuc(checkedValues);
    onSelect(checkedValues); // Send `null` for 'Tất cả' selection
  };
  return (
    <div className="filterBox">
      <div className="filterBox-title" onClick={() => setExpand(!expand)}>
        Danh mục
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {expand && (
        <div className="filterBox-content">
          <Checkbox.Group onChange={onChangeDanhMuc2} value={valueDanhMuc2}>
            <Space direction="vertical">
              {storeOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </div>
      )}
    </div>
  );
}
