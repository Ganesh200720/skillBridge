import React from "react";

export interface EmptyStateProps {
  title?: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = "🔍",
  action,
}) => {
  return (
    <div
      style={{
        padding: "40px 24px",
        textAlign: "center",
        border: "1.5px dashed var(--line)",
        borderRadius: "var(--radius)",
        backgroundColor: "rgba(246, 243, 236, 0.5)",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "10px" }}>{icon}</div>
      {title && <h4 style={{ fontSize: "16px", color: "var(--ink)", marginBottom: "6px", fontFamily: "var(--font-display)" }}>{title}</h4>}
      <p style={{ fontSize: "13px", color: "var(--text-mute)", maxWidth: "400px", margin: "0 auto 16px auto" }}>{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};