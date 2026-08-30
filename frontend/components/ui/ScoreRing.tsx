import React from "react";

export interface ScoreRingProps {
  value: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  variant?: "teal" | "brass" | "coral";
  className?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  value,
  size = 100,
  strokeWidth = 8,
  label,
  sublabel,
  variant = "teal",
  className = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const offset = circumference - (clampedValue / 100) * circumference;

  const colorMap = {
    teal: "var(--teal)",
    brass: "var(--brass)",
    coral: "var(--coral)",
  };

  const strokeColor = colorMap[variant] || "var(--brass)";

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      className={`sb-score-ring ${className}`}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--paper-dim)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: `${Math.max(16, size * 0.28)}px`,
            fontWeight: 700,
            color: "var(--ink)",
            lineHeight: 1,
          }}
        >
          {clampedValue}%
        </span>
        {label && (
          <span
            style={{
              fontSize: `${Math.max(9, size * 0.11)}px`,
              color: "var(--text-mute)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            {label}
          </span>
        )}
      </div>
      {sublabel && (
        <span style={{ fontSize: "12px", color: "var(--text-mute)", marginTop: "6px" }}>
          {sublabel}
        </span>
      )}
    </div>
  );
};