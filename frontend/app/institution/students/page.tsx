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
      { id: "students", label: "Student Registry", href: "/institution/students", icon: "👨‍🎓", active: true },
      { id: "faculty", label: "Faculty Directory", href: "/institution/faculty", icon: "📚" },
      { id: "skills", label: "Skill Analytics", href: "/institution/skills", icon: "📊" },
      { id: "industry", label: "Industry Network", href: "/institution/industry", icon: "🤝" },
      { id: "placements", label: "Placements", href: "/institution/placements", icon: "💼" },
      { id: "reports", label: "Executive Reports", href: "/institution/reports", icon: "📈" },
    ],
  },
];

export default function InstitutionStudentsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=institution");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Registry..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="students"
      pageTitle="College Student Registry"
      pageSubtitle="Campus-wide student enrollment, department skill twins, and placement readiness"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <Card title="Institutional Student Overview">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>Computer Science & Engineering</strong>
              <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>520 Students Enrolled · 82% Avg Readiness</div>
            </div>
            <Badge variant="teal">86% Placed</Badge>
          </div>
          <div style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>Information Technology</strong>
              <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>430 Students Enrolled · 78% Avg Readiness</div>
            </div>
            <Badge variant="brass">82% Placed</Badge>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}