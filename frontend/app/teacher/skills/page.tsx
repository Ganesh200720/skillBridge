"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Card, Badge, ProgressBar } from "@/components/ui";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Faculty Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/teacher", icon: "🏠" },
      { id: "students", label: "Student Roster", href: "/teacher/students", icon: "👨‍🎓" },
      { id: "skills", label: "Skill Analytics", href: "/teacher/skills", icon: "📊", active: true },
      { id: "assessments", label: "Assessments", href: "/teacher/assessments", icon: "📝" },
      { id: "opportunities", label: "Opportunities", href: "/teacher/opportunities", icon: "💼" },
      { id: "reports", label: "Reports", href: "/teacher/reports", icon: "📈" },
    ],
  },
];

export default function FacultySkillsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=teacher");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Skill Analytics..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="skills"
      pageTitle="Department Skill Analytics"
      pageSubtitle="Aggregated competency distribution across assigned students"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <Card title="Skill Proficiency Distribution">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Python & Data Structures (Average: 88%)</span>
              <Badge variant="teal">High Mastery</Badge>
            </div>
            <ProgressBar value={88} variant="teal" height={9} showValue={false} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>JavaScript & Frontend Frameworks (Average: 82%)</span>
              <Badge variant="teal">High Mastery</Badge>
            </div>
            <ProgressBar value={82} variant="teal" height={9} showValue={false} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Django Backend APIs (Average: 62%)</span>
              <Badge variant="gap">Priority Gap</Badge>
            </div>
            <ProgressBar value={62} variant="coral" height={9} showValue={false} />
          </div>
        </div>
      </Card>
    </AppShell>
  );
}