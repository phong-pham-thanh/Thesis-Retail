import React from "react";
import { Button } from "antd";

interface CustomButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  onClick,
  backgroundColor = "#007bff", // Default background color
  color = "#fff", // Default text and icon color
  borderRadius = "8px", // Default border radius
}) => {
  return (
    <Button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        color,
        borderRadius,
        padding: "0 16px",
        height: "40px",
        border: "none",
      }}
    >
      {icon && (
        <span style={{ marginRight: "8px", display: "flex" }}>{icon}</span>
      )}
      <span>{text}</span>
    </Button>
  );
};

export default CustomButton;
