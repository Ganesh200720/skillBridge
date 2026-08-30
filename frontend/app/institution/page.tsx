"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Badge, Button, Card } from "@/components/ui";
import { StatCard } from "@/components/dashboard";
import { InstitutionFacultyTable } from "@/components/institution";
import { MOCK_INSTITUTION_STATS, MOCK_INSTITUTION_FACULTY, MOCK_INSTITUTION_PLACEMENTS } from "@/mocks/institution";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Institution Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/institution", icon: "🏠", active: true },
      { id: "students", label: "Student Registry", href: "/institution/students", icon: "👨‍🎓" },
      { id: "faculty", label: "Faculty Directory", href: "/institution/faculty", icon: "📚" },
      { id: "skills", label: "Skill Analytics", href: "/institution/skills", icon: "📊" },
      { id: "industry", label: "Industry Network", href: "/institution/industry", icon: "🤝" },
      { id: "placements", label: "Placements", href: "/institution/placements", icon: "💼" },
      { id: "reports", label: "Executive Reports", href: "/institution/reports", icon: "📈" },
    ],
  },
];

export default function InstitutionDashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=institution");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Executive Dashboard..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="dashboard"
      pageTitle={`Welcome, ${user.first_name || user.username}`}
      pageSubtitle="Institution Leadership & Placement Intelligence Command Center"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
      headerActions={
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Badge variant="brass">College Admin</Badge>
          <Button variant="brass" size="sm" onClick={() => router.push("/institution/reports")}>
            Executive Report
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
          <StatCard title="Total Enrolled" value={MOCK_INSTITUTION_STATS.totalStudents} subtitle="All departments" icon="👨‍🎓" />
          <StatCard title="Placement Rate" value={MOCK_INSTITUTION_STATS.overallPlacementRate} subtitle="Overall campus benchmark" icon="📈" change="+6%" trend="up" />
          <StatCard title="Industry Partners" value={MOCK_INSTITUTION_STATS.connectedCompanies} subtitle="Active recruiters" icon="🤝" change="42" trend="up" />
          <StatCard title="Placements Made" value={MOCK_INSTITUTION_STATS.placementsCompleted} subtitle="Offers accepted" icon="💼" />
        </div>

        <InstitutionFacultyTable facultyList={MOCK_INSTITUTION_FACULTY} />
      </div>
    </AppShell>
  );
}