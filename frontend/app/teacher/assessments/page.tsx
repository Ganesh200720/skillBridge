"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Card, Badge } from "@/components/ui";
import { MOCK_FACULTY_ASSESSMENTS } from "@/mocks/faculty";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Faculty Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/teacher", icon: "🏠" },
      { id: "students", label: "Student Roster", href: "/teacher/students", icon: "👨‍🎓" },
      { id: "skills", label: "Skill Analytics", href: "/teacher/skills", icon: "📊" },
      { id: "assessments", label: "Assessments", href: "/teacher/assessments", icon: "📝", active: true },
      { id: "opportunities", label: "Opportunities", href: "/teacher/opportunities", icon: "💼" },
      { id: "reports", label: "Reports", href: "/teacher/reports", icon: "📈" },
    ],
  },
];

export default function FacultyAssessmentsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=teacher");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Assessments..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="assessments"
      pageTitle="Assessment Monitoring"
      pageSubtitle="Participation rates and test score completion metrics"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
        {MOCK_FACULTY_ASSESSMENTS.map((test) => (
          <Card key={test.id} title={test.title}>
            <div style={{ fontSize: "13px", color: "var(--text-mute)", marginBottom: "12px" }}>
              Skill: <strong>{test.skillName}</strong> · Assigned: {test.totalAssigned} Students
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--teal)" }}>
                {test.completedCount} Completed ({test.averageScore}% Avg)
              </span>
              <Badge variant="brass">{test.pendingCount} Pending</Badge>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}