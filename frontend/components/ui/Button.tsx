"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "brass" | "teal" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  children,
  className = "",
  disabled,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: 600,
    borderRadius: "10px",
    border: "1.5px solid transparent",
    transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    textDecoration: "none",
    userSelect: "none",
    ...style,
  };

  const sizeStyles: Record<"sm" | "md" | "lg", React.CSSProperties> = {
    sm: { padding: "7px 14px", fontSize: "12.5px" },
    md: { padding: "10px 18px", fontSize: "14px" },
    lg: { padding: "13px 22px", fontSize: "15px" },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "var(--ink)",
      color: "#FFFFFF",
      borderColor: "var(--ink)",
      boxShadow: "0 2px 6px rgba(18, 32, 61, 0.15)",
    },
    brass: {
      backgroundColor: "var(--brass)",
      color: "#221704",
      borderColor: "var(--brass)",
      boxShadow: "0 2px 6px rgba(184, 130, 58, 0.2)",
    },
    teal: {
      backgroundColor: "var(--teal)",
      color: "#FFFFFF",
      borderColor: "var(--teal)",
      boxShadow: "0 2px 6px rgba(36, 104, 90, 0.2)",
    },
    outline: {
      backgroundColor: "var(--card-bg)",
      color: "var(--ink)",
      borderColor: "var(--line-strong)",
      boxShadow: "0 1px 2px rgba(18, 32, 61, 0.05)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--ink)",
      borderColor: "transparent",
    },
    danger: {
      backgroundColor: "var(--coral)",
      color: "#FFFFFF",
      borderColor: "var(--coral)",
      boxShadow: "0 2px 6px rgba(178, 74, 46, 0.2)",
    },
  };

  const combinedStyle = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <button
      disabled={disabled}
      style={combinedStyle}
      className={`sb-button ${className}`}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};