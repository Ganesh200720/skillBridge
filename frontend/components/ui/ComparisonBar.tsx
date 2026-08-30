import React from "react";

export interface ComparisonBarProps {
  label: string;
  currentValue: number; // 0-100
  targetValue: number;  // 0-100
  gapLabel?: string;
  className?: string;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  label,
  currentValue,
  targetValue,
  gapLabel,
  className = "",
}) => {
  const gap = Math.max(0, targetValue - currentValue);

  return (
    <div style={{ width: "100%" }} className={`sb-comparison-bar ${className}`}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
        <span style={{ fontWeight: 600, color: "var(--ink)" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-mute)" }}>
          Current {currentValue}% vs Target {targetValue}%
        </span>
      </div>

      {/* Dual Bar Track */}
      <div
        style={{
          position: "relative",
          height: "12px",
          backgroundColor: "var(--paper-dim)",
          borderRadius: "6px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Target ghost area */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${targetValue}%`,
            backgroundColor: "rgba(192, 74, 51, 0.2)", // soft coral gap zone
            borderRadius: "6px",
          }}
        />

        {/* Current score fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${currentValue}%`,
            background: "linear-gradient(90deg, var(--teal), #2b8c77)",
            borderRadius: "6px",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontSize: "11.5px" }}>
        <span style={{ color: "var(--teal)", fontWeight: 600 }}>Verified Mastery: {currentValue}%</span>
        {gap > 0 ? (
          <span style={{ color: "var(--coral)", fontWeight: 600 }}>
            {gapLabel || `Gap: +${gap} pts needed`}
          </span>
        ) : (
          <span style={{ color: "var(--teal)", fontWeight: 600 }}>Target Exceeded ✓</span>
        )}
      </div>
    </div>
  );
};