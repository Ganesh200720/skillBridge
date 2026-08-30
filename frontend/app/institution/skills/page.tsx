"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Card, Badge, ProgressBar } from "@/components/ui";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Institution Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/institution", icon: "🏠" },
      { id: "students", label: "Student Registry", href: "/institution/students", icon: "👨‍🎓" },
      { id: "faculty", label: "Faculty Directory", href: "/institution/faculty", icon: "📚" },
      { id: "skills", label: "Skill Analytics", href: "/institution/skills", icon: "📊", active: true },
      { id: "industry", label: "Industry Network", href: "/institution/industry", icon: "🤝" },
      { id: "placements", label: "Placements", href: "/institution/placements", icon: "💼" },
      { id: "reports", label: "Executive Reports", href: "/institution/reports", icon: "📈" },
    ],
  },
];

export default function InstitutionSkillsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=institution");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Skill Analytics..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="skills"
      pageTitle="College-Wide Skill Taxonomy & Gaps"
      pageSubtitle="Aggregated competency mapping and skill gaps across all departments"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <Card title="Campus Skill Mastery Index">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Python & Core Data Structures</span>
              <Badge variant="teal">86% Benchmark</Badge>
            </div>
            <ProgressBar value={86} variant="teal" height={9} showValue={false} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Cloud Computing & DevOps (AWS / Docker)</span>
              <Badge variant="gap">32% Gap Alert</Badge>
            </div>
            <ProgressBar value={54} variant="coral" height={9} showValue={false} />
          </div>
        </div>
      </Card>
    </AppShell>
  );
}