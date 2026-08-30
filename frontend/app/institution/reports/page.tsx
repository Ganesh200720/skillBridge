"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Card, Badge } from "@/components/ui";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Institution Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/institution", icon: "🏠" },
      { id: "students", label: "Student Registry", href: "/institution/students", icon: "👨‍🎓" },
      { id: "faculty", label: "Faculty Directory", href: "/institution/faculty", icon: "📚" },
      { id: "skills", label: "Skill Analytics", href: "/institution/skills", icon: "📊" },
      { id: "industry", label: "Industry Network", href: "/institution/industry", icon: "🤝" },
      { id: "placements", label: "Placements", href: "/institution/placements", icon: "💼" },
      { id: "reports", label: "Executive Reports", href: "/institution/reports", icon: "📈", active: true },
    ],
  },
];

export default function InstitutionReportsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=institution");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Executive Reports..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="reports"
      pageTitle="Executive Institutional Analytics"
      pageSubtitle="Board-level campus readiness, skill gap trends, and placement metrics"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
        <Card title="Campus Placement Success Rate">
          <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--teal)" }}>84%</div>
          <div style={{ fontSize: "12.5px", color: "var(--text-mute)" }}>Target achieved for 2025-2026 academic batch</div>
        </Card>
        <Card title="Curriculum Gap Insight Report">
          <Badge variant="gap">AWS Cloud & Containerization</Badge>
          <div style={{ fontSize: "12.5px", color: "var(--text-mute)", marginTop: "8px" }}>Recommended curriculum update for next academic cycle</div>
        </Card>
      </div>
    </AppShell>
  );
}