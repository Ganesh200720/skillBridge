// DESIGN V2: Circular progress ring visualization for scores & readiness
import React from "react";

export interface CircularProgressRingProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  variant?: "teal" | "brass" | "coral";
}

export const CircularProgressRing: React.FC<CircularProgressRingProps> = ({
  score,
  size = 110,
  strokeWidth = 9,
  label = "Readiness",
  sublabel,
  variant = "teal",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorMap: Record<string, string> = {
    teal: "var(--teal)",
    brass: "var(--brass)",
    coral: "var(--coral)",
  };

  const strokeColor = colorMap[variant] || colorMap.teal;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--paper-dim)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
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
            fontSize: size >= 110 ? "26px" : "20px",
            fontWeight: 700,
            color: "var(--ink)",
            lineHeight: 1,
          }}
        >
          {progress}%
        </span>
        {label && (
          <span style={{ fontSize: "10px", color: "var(--text-mute)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: "2px" }}>
            {label}
          </span>
        )}
        {sublabel && (
          <span style={{ fontSize: "9.5px", color: "var(--teal)", fontFamily: "var(--font-mono)" }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};