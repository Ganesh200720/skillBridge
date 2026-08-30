import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  hoverable = false,
  className = "",
  style,
  ...props
}) => {
  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        padding: "22px",
        transition: hoverable ? "transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease" : "none",
        ...style,
      }}
      className={`sb-card ${hoverable ? "hover:border-[var(--brass)] hover:-translate-y-0.5 hover:shadow-md cursor-pointer" : ""} ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "12px" }}>
          <div>
            {title && <h3 style={{ fontSize: "17px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>{title}</h3>}
            {subtitle && <p style={{ fontSize: "12.8px", color: "var(--text-mute)", margin: "3px 0 0 0" }}>{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};