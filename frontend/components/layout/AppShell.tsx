"use client";

import React, { useState } from "react";
import { Sidebar, NavSection, NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";
import { PageContainer } from "./PageContainer";

export interface AppShellProps {
  sections?: NavSection[];
  activeNavId?: string;
  onSelectNav?: (item: NavItem) => void;
  pageTitle?: string;
  pageSubtitle?: string;
  headerActions?: React.ReactNode;
  userRole?: string;
  userName?: string;
  onLogout?: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  sections,
  activeNavId,
  onSelectNav,
  pageTitle,
  pageSubtitle,
  headerActions,
  userRole = "student",
  userName = "Guest User",
  onLogout,
  children,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--paper)" }}>
      {/* Sidebar Navigation */}
      <Sidebar
        sections={sections}
        activeId={activeNavId}
        onSelectNav={onSelectNav}
        userRole={userRole}
        userName={userName}
        onLogout={onLogout}
        isOpenMobile={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Shell */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar
          title={pageTitle}
          subtitle={pageSubtitle}
          userRole={userRole}
          userName={userName}
          onToggleMobileMenu={() => setIsMobileOpen((prev) => !prev)}
          actions={headerActions}
        />

        <main style={{ flex: 1, padding: "30px 24px 80px" }} className="sm:px-9">
          <PageContainer>{children}</PageContainer>
        </main>
      </div>
    </div>
  );
};