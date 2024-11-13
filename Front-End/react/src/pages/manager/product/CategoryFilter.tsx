import React, { useEffect, useState } from "react";
import { Checkbox, Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  onSelect: (value: string[] | null) => void; // Allow `null` for 'Tất cả' option
}

export function CategoryFilter({ onSelect }: CategoryFilterProps) {
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
