import React, { useEffect, useState } from "react";
import { Radio, Space } from "antd";
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
  onSelect: (value: string | null) => void; // Allow `null` for 'Tất cả' option
}

export function CategoryFilter({ onSelect }: CategoryFilterProps) {
  const [expand, setExpand] = useState(false);
  const [storeOptions, setStoreOptions] = useState<
    { value: number | null; label: string }[]
  >([]); // Include `null` for 'Tất cả'
  const [valueDanhMuc, setValueChinhanh] = useState<number | null>(null); // Default to `null` for 'Tất cả'

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

  return (
    <div className="filterBox">
      <div className="filterBox-title" onClick={() => setExpand(!expand)}>
        Danh mục
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {expand && (
        <div className="filterBox-content">
          <Radio.Group onChange={onChangeDanhMuc} value={valueDanhMuc}>
            <Space direction="vertical">
              {storeOptions.map((option) => (
                <Radio
                  key={option.value === null ? "all" : option.value}
                  value={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
      )}
    </div>
  );
}
