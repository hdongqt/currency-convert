import React, { useEffect, useState } from "react";

export default function Toast({ message, type, duration = 2500 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timeoutId = setTimeout(() => {
      setShow(false);
    }, duration);
    return () => clearTimeout(timeoutId);
  }, [duration]);

  const getToastType = () => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "warning":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <div className={`toast-modal ${getToastType()} ${show ? "show" : ""}`}>
      <div className="toast-content">{message}</div>
    </div>
  );
}
