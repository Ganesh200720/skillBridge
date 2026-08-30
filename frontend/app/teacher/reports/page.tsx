"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Card, Badge } from "@/components/ui";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Faculty Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/teacher", icon: "🏠" },
      { id: "students", label: "Student Roster", href: "/teacher/students", icon: "👨‍🎓" },
      { id: "skills", label: "Skill Analytics", href: "/teacher/skills", icon: "📊" },
      { id: "assessments", label: "Assessments", href: "/teacher/assessments", icon: "📝" },
      { id: "opportunities", label: "Opportunities", href: "/teacher/opportunities", icon: "💼" },
      { id: "reports", label: "Reports", href: "/teacher/reports", icon: "📈", active: true },
    ],
  },
];

export default function FacultyReportsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=teacher");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Reports..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="reports"
      pageTitle="Faculty Reports & Analytics"
      pageSubtitle="Department placement readiness and skill intelligence summaries"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
        <Card title="Readiness Index Report">
          <div style={{ fontSize: "28px", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--teal)" }}>76%</div>
          <div style={{ fontSize: "12.5px", color: "var(--text-mute)" }}>Overall Department Placement Readiness</div>
        </Card>
        <Card title="Skill Gap Summary Report">
          <Badge variant="gap">AWS Cloud & Django</Badge>
          <div style={{ fontSize: "12.5px", color: "var(--text-mute)", marginTop: "8px" }}>Primary focus areas for upcoming workshops</div>
        </Card>
      </div>
    </AppShell>
  );
}