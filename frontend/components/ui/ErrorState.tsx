import React from "react";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
}) => {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "var(--radius)",
        backgroundColor: "var(--coral-soft)",
        border: "1px solid #e3bda9",
        color: "var(--coral)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>⚠️ {title}</div>
      <div style={{ fontSize: "13.5px", marginBottom: onRetry ? "14px" : "0" }}>{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: "var(--coral)",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 14px",
            fontSize: "12.5px",
            fontWeight: 600,
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};