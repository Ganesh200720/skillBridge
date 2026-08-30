"use client";

import React from "react";
import { roleLabel } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export interface TopbarProps {
  title?: string;
  subtitle?: string;
  userRole?: string;
  userName?: string;
  onToggleMobileMenu?: () => void;
  actions?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({
  title,
  subtitle,
  userRole = "student",
  userName = "Guest User",
  onToggleMobileMenu,
  actions,
}) => {
  const { isDemoMode } = useAuth();

  return (
    <header
      style={{
        backgroundColor: "var(--card-bg)",
        borderBottom: "1px solid var(--line-strong)",
        padding: "14px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        position: "sticky",
        top: 0,
        zIndex: 30,
        boxShadow: "0 2px 8px rgba(18, 32, 61, 0.03)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            style={{
              background: "none",
              border: "1.5px solid var(--line-strong)",
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "16px",
              color: "var(--ink)",
              cursor: "pointer",
            }}
            className="md:hidden"
            aria-label="Toggle Navigation"
          >
            ☰
          </button>
        )}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {title && (
              <h1
                style={{
                  fontSize: "20px",
                  fontFamily: "var(--font-display)",
                  color: "var(--ink)",
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {title}
              </h1>
            )}
            {isDemoMode && (
              <span
                style={{
                  fontSize: "10.5px",
                  fontFamily: "var(--font-mono)",
                  backgroundColor: "var(--paper-dim)",
                  color: "var(--ink-mid)",
                  border: "1px solid var(--line-strong)",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                ⚡ Demo Mode
              </span>
            )}
          </div>
          {subtitle && (
            <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", margin: "2px 0 0 0" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {actions && <div>{actions}</div>}

        <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: "1px solid var(--line)", paddingLeft: "16px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "var(--ink)",
              border: "2px solid var(--brass)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 700,
              color: "#FFFFFF",
              fontFamily: "var(--font-mono)",
              boxShadow: "0 2px 4px rgba(18, 32, 61, 0.15)",
            }}
          >
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="hidden sm:block">
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>
              {userName}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontWeight: 500 }}>
              {roleLabel(userRole)} {isDemoMode ? "(Demo)" : "(Live)"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};