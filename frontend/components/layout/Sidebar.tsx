"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { roleLabel } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface SidebarProps {
  sections?: NavSection[];
  activeId?: string;
  onSelectNav?: (item: NavItem) => void;
  userRole?: string;
  userName?: string;
  onLogout?: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const DEFAULT_STUDENT_NAV_SECTIONS: NavSection[] = [
  {
    title: "Student Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/student", icon: "🏠" },
      { id: "skill-twin", label: "Skill Twin", href: "/student/skill-twin", icon: "📊" },
      { id: "roles", label: "Role Readiness", href: "/student/roles", icon: "🎯" },
      { id: "opportunities", label: "Opportunities", href: "/student/opportunities", icon: "💼", badge: "4" },
      { id: "assessments", label: "Assessments", href: "/student/assessments", icon: "📝" },
      { id: "preparation", label: "Preparation", href: "/student/preparation", icon: "📖" },
    ],
  },
  {
    title: "Practice Tools",
    items: [
      {
        id: "ai-mock-interview",
        label: "AI Mock Interview",
        href: process.env.NEXT_PUBLIC_AI_INTERVIEW_URL || "http://localhost:5500",
        icon: "🎙️",
      },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  sections = DEFAULT_STUDENT_NAV_SECTIONS,
  activeId,
  onSelectNav,
  userRole = "student",
  userName = "Guest User",
  onLogout,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const pathname = usePathname() || "";
  const navSections = userRole === "student" && sections === DEFAULT_STUDENT_NAV_SECTIONS ? DEFAULT_STUDENT_NAV_SECTIONS : sections;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(18, 32, 61, 0.5)",
            zIndex: 40,
          }}
          className="md:hidden"
        />
      )}

      <aside
        style={{
          width: "var(--sidebar-w)",
          backgroundColor: "var(--ink)",
          color: "var(--paper)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
          zIndex: 50,
          transition: "transform 0.2s ease",
        }}
        className={`fixed md:sticky left-0 top-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div
          style={{
            padding: "22px 20px",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "17px",
            borderBottom: "1px solid rgba(246, 243, 236, 0.12)",
            display: "flex",
            alignItems: "center",
            gap: "9px",
          }}
        >
          <span
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "7px",
              background: "linear-gradient(135deg, var(--brass), var(--teal))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            SB
          </span>
          SkillBridge
        </div>

        {/* Nav list */}
        <div style={{ padding: "14px 10px", flex: 1, overflowY: "auto" }}>
          {navSections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: "14px" }}>
              {section.title && (
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10.5px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#8592AE",
                    padding: "10px 12px 6px",
                  }}
                >
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const isRootPath =
                  item.href === "/student" ||
                  item.href === "/teacher" ||
                  item.href === "/industry" ||
                  item.href === "/institution";

                const isPathActive = item.href
                  ? isRootPath
                    ? pathname === item.href
                    : pathname.startsWith(item.href)
                  : false;

                const isActive = activeId
                  ? activeId === item.id || isPathActive
                  : isPathActive || item.active;

                const handleClick = () => {
                  if (item.onClick) item.onClick();
                  if (onSelectNav) onSelectNav(item);
                  if (onCloseMobile) onCloseMobile();
                };

                const content = (
                  <button
                    onClick={handleClick}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: isActive ? "var(--brass)" : "none",
                      border: "none",
                      color: isActive ? "#221704" : "#C9D0E0",
                      padding: "10px 12px",
                      borderRadius: "999px",
                      fontSize: "13.8px",
                      fontWeight: isActive ? 600 : 500,
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "2px",
                      transition: "0.15s",
                      cursor: "pointer",
                    }}
                    className={!isActive ? "hover:bg-[rgba(246,243,236,0.08)] hover:text-white" : ""}
                  >
                    {item.icon && <span style={{ fontSize: "16px" }}>{item.icon}</span>}
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge !== undefined && (
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          background: isActive ? "#221704" : "rgba(246,243,236,0.15)",
                          color: isActive ? "var(--paper)" : "#fff",
                          padding: "2px 6px",
                          borderRadius: "999px",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );

                if (item.href) {
                  const isExternal = item.href.startsWith("http://") || item.href.startsWith("https://");
                  if (isExternal) {
                    return (
                      <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        {content}
                      </a>
                    );
                  }
                  return (
                    <Link key={item.id} href={item.href} style={{ textDecoration: "none" }}>
                      {content}
                    </Link>
                  );
                }

                return <div key={item.id}>{content}</div>;
              })}
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: "14px 18px",
            borderTop: "1px solid rgba(246, 243, 236, 0.12)",
            fontSize: "12.5px",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "2px" }}>{userName}</div>
          <div style={{ color: "#8592AE", fontFamily: "var(--font-mono)", fontSize: "11px", marginBottom: "10px" }}>
            {roleLabel(userRole)}
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                background: "none",
                border: "1px solid rgba(246,243,236,0.25)",
                color: "var(--paper)",
                padding: "7px 12px",
                borderRadius: "8px",
                fontSize: "12px",
                width: "100%",
                cursor: "pointer",
              }}
              className="hover:bg-[rgba(246,243,236,0.1)]"
            >
              Log out
            </button>
          )}
        </div>
      </aside>
    </>
  );
};