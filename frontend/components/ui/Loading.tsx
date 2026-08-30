import React from "react";

export interface LoadingProps {
  message?: string;
  fullPage?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  fullPage = false,
}) => {
  const content = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", gap: "12px" }}>
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid var(--paper-dim)",
          borderTopColor: "var(--brass)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ fontSize: "13.5px", color: "var(--text-mute)", fontFamily: "var(--font-mono)" }}>{message}</span>
    </div>
  );

  if (fullPage) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {content}
      </div>
    );
  }

  return content;
};