"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Badge, Button, Card } from "@/components/ui";
import { StatCard } from "@/components/dashboard";
import { FacultyStudentTable } from "@/components/faculty";
import { MOCK_FACULTY_STATS, MOCK_FACULTY_STUDENTS } from "@/mocks/faculty";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Faculty Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/teacher", icon: "🏠", active: true },
      { id: "students", label: "Student Roster", href: "/teacher/students", icon: "👨‍🎓" },
      { id: "skills", label: "Skill Analytics", href: "/teacher/skills", icon: "📊" },
      { id: "assessments", label: "Assessments", href: "/teacher/assessments", icon: "📝" },
      { id: "opportunities", label: "Opportunities", href: "/teacher/opportunities", icon: "💼" },
      { id: "reports", label: "Reports", href: "/teacher/reports", icon: "📈" },
    ],
  },
];

export default function FacultyDashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?role=teacher");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loading fullPage message="Loading Faculty Dashboard..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="dashboard"
      pageTitle={`Welcome, ${user.first_name || user.username}`}
      pageSubtitle="Department Skill Intelligence & Student Placement Readiness Overview"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => {
        logout();
        router.push("/auth");
      }}
      headerActions={
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Badge variant="brass">Faculty Workspace</Badge>
          <Button variant="brass" size="sm" onClick={() => router.push("/teacher/students")}>
            View Full Roster
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
          <StatCard title="Total Students" value={MOCK_FACULTY_STATS.totalStudents} subtitle="Assigned CSE department" icon="👨‍🎓" />
          <StatCard title="Active Students" value={MOCK_FACULTY_STATS.activeStudents} subtitle="Completing assessments" icon="⚡" change="95%" trend="up" />
          <StatCard title="Average Readiness" value={`${MOCK_FACULTY_STATS.averageReadiness}%`} subtitle="Skill Twin benchmark" icon="🎯" change="+4%" trend="up" />
          <StatCard title="Assessment Completion" value={`${MOCK_FACULTY_STATS.assessmentCompletionRate}%`} subtitle="Skill tests submitted" icon="📝" />
        </div>

        {/* Student Roster Snapshot */}
        <FacultyStudentTable students={MOCK_FACULTY_STUDENTS} />
      </div>
    </AppShell>
  );
}