import React from "react";

export interface BadgeProps {
  variant?: "default" | "have" | "gap" | "brass" | "teal" | "coral" | "applied" | "shortlisted" | "interview";
  showDot?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  showDot = false,
  children,
  icon,
  className = "",
  style,
}) => {
  const variantStyles: Record<string, { bg: string; border: string; color: string; dot: string }> = {
    default: { bg: "var(--paper-dim)", border: "var(--line)", color: "var(--ink-mid)", dot: "var(--text-mute)" },
    have: { bg: "var(--teal-soft)", border: "var(--teal-border)", color: "var(--teal)", dot: "var(--teal)" },
    gap: { bg: "var(--coral-soft)", border: "var(--coral-border)", color: "var(--coral)", dot: "var(--coral)" },
    brass: { bg: "var(--brass-soft)", border: "var(--brass-border)", color: "#6b4a15", dot: "var(--brass)" },
    teal: { bg: "var(--teal-soft)", border: "var(--teal-border)", color: "var(--teal)", dot: "var(--teal)" },
    coral: { bg: "var(--coral-soft)", border: "var(--coral-border)", color: "var(--coral)", dot: "var(--coral)" },
    applied: { bg: "#E4E9F5", border: "#c3d0e8", color: "var(--ink-mid)", dot: "var(--ink-mid)" },
    shortlisted: { bg: "var(--teal-soft)", border: "var(--teal-border)", color: "var(--teal)", dot: "var(--teal)" },
    interview: { bg: "var(--brass-soft)", border: "var(--brass-border)", color: "#6b4a15", dot: "var(--brass)" },
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        backgroundColor: currentVariant.bg,
        border: `1.5px solid ${currentVariant.border}`,
        color: currentVariant.color,
        padding: "3px 10px",
        borderRadius: "999px",
        fontWeight: 600,
        letterSpacing: "0.02em",
        ...style,
      }}
      className={`sb-badge ${className}`}
    >
      {showDot && (
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: currentVariant.dot,
            display: "inline-block",
          }}
        />
      )}
      {icon}
      <span>{children}</span>
    </span>
  );
};