import React from "react";

export interface ProgressBarProps {
  value: number; // 0 - 100
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: "teal" | "coral" | "brass";
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  variant = "teal",
  height = 9,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const gradients: Record<string, string> = {
    teal: "linear-gradient(90deg, var(--teal), #3f9482)",
    coral: "linear-gradient(90deg, var(--coral), #c96849)",
    brass: "linear-gradient(90deg, var(--brass), #d6a15c)",
  };

  return (
    <div style={{ width: "100%" }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", marginBottom: "4px" }}>
          {label && <span style={{ color: "var(--text-mute)" }}>{label}</span>}
          {showValue && <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-mid)" }}>{percentage}%</span>}
        </div>
      )}
      <div
        style={{
          background: "var(--paper-dim)",
          borderRadius: "6px",
          height: `${height}px`,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "6px",
            background: gradients[variant] || gradients.teal,
            width: `${percentage}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
};