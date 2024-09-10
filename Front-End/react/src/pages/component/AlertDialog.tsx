import React from "react";
import { Modal } from "antd";

interface AlertDialogProps {
  title: string;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string; // Custom message to show in the dialog
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  visible,
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="OK"
      cancelText="Cancel"
    >
      <p>{message}</p>
    </Modal>
  );
};

export default AlertDialog;
