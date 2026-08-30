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
      { id: "opportunities", label: "Opportunities", href: "/teacher/opportunities", icon: "💼", active: true },
      { id: "reports", label: "Reports", href: "/teacher/reports", icon: "📈" },
    ],
  },
];

export default function FacultyOpportunitiesPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=teacher");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Opportunities..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="opportunities"
      pageTitle="Industry Opportunity Tracking"
      pageSubtitle="Monitor student applications and industry drive participation"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <Card title="Active Placement & Internship Drives">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>Backend Engineering Intern</strong> — Nimbus Systems
              <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>14 Students Applied · 8 Shortlisted</div>
            </div>
            <Badge variant="teal">Active Drive</Badge>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}