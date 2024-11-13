import React, { useEffect, useState } from "react";
import { Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import api_links from "../../../app/api_links";
import fetch_Api from "../../../app/api_fetch";
import message from "antd/lib/message";

// Interfaces for API data
interface Warehouse {
  id: number;
  address: number;
  managerId: number;
  manager: string | null;
  status: boolean;
}

interface WarehouseFilterProps {
  onSelect: (value: number) => void; // Function to handle selected warehouse
}

export function WarehouseFilter({ onSelect }: WarehouseFilterProps) {
  const [expand, setExpand] = useState(false);
  const [storeOptions, setStoreOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [valueChinhanh, setValueChinhanh] = useState<number | null>(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const res = await fetch_Api(api_links.warehouse.getAllByRole);
        const warehouseData = res.data.map((warehouse: Warehouse) => ({
          value: warehouse.id,
          label: warehouse.address.toString(),
        }));
        setStoreOptions(warehouseData);
      } catch (error) {
        message.error(error.message || "Lỗi khi tải thông tin kho.");
      }
    };

    fetchWarehouses();
  }, []);

  const onChangeChinhanh = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;
    setValueChinhanh(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className="filterBox">
      <div className="filterBox-title" onClick={() => setExpand(!expand)}>
        Chi nhánh
        {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      {expand && (
        <div className="filterBox-content">
          <Radio.Group onChange={onChangeChinhanh} value={valueChinhanh}>
            <Space direction="vertical">
              {storeOptions.map((option) => (
                <Radio key={option.value} value={option.value}>
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
