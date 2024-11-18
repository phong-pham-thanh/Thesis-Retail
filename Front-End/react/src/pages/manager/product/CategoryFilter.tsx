import React, { useEffect, useState } from "react";
import { Checkbox, Space } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  onSelect: (value: string[] | null) => void;
  warehouse: number;
}

export function CategoryFilter({ onSelect, warehouse }: CategoryFilterProps) {
  const [expand, setExpand] = useState(false);
  const [storeOptions, setStoreOptions] = useState<
    { value: number | null; label: string }[]
  >([]);
  const [valueDanhMuc, setValueChinhanh] = useState<number | null>(null);
  const [valueDanhMuc2, setValueDanhMuc] = useState([]);

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

  useEffect(() => {
    setValueDanhMuc([null]);
    onSelect(null);
  }, [warehouse]);

  const onChangeDanhMuc2 = (checkedValues) => {
    console.log("Checked values: ", checkedValues);
    setValueDanhMuc(checkedValues);
    onSelect(checkedValues);
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
                <Checkbox key={option.value} value={option.value}>
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
