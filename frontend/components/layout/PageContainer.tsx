import React from "react";

export interface PageContainerProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: number | string;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  actions,
  children,
  maxWidth = "1080px",
  className = "",
}) => {
  return (
    <div
      style={{
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        margin: "0 auto",
        width: "100%",
      }}
      className={`sb-page-container ${className}`}
    >
      {(title || subtitle || actions) && (
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
          <div>
            {title && (
              <h2 style={{ fontSize: "26px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0, marginBottom: "4px" }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <div style={{ color: "var(--text-mute)", fontSize: "13.5px" }}>
                {subtitle}
              </div>
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};