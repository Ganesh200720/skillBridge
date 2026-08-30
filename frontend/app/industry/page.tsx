"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Badge, Button } from "@/components/ui";
import { StatCard } from "@/components/dashboard";
import { CandidateTable } from "@/components/industry";
import { MOCK_INDUSTRY_STATS, MOCK_INDUSTRY_CANDIDATES } from "@/mocks/industry";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Company Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/industry", icon: "🏠", active: true },
      { id: "opportunities", label: "Manage Opportunities", href: "/industry/opportunities", icon: "💼" },
      { id: "candidates", label: "Candidate Discovery", href: "/industry/candidates", icon: "👥" },
      { id: "skills", label: "Skill Demand", href: "/industry/skills", icon: "🎯" },
    ],
  },
];

export default function IndustryDashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=industry");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Recruiter Dashboard..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="dashboard"
      pageTitle={`Welcome, ${user.first_name || user.username}`}
      pageSubtitle="Company Recruiter Portal · Skill Intelligence & Candidate Matching"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
      headerActions={
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Badge variant="brass">Recruiter Portal</Badge>
          <Button variant="brass" size="sm" onClick={() => router.push("/industry/opportunities/create")}>
            + Post Opportunity
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
          <StatCard title="Active Postings" value={MOCK_INDUSTRY_STATS.activeOpportunities} subtitle="Open drives" icon="💼" />
          <StatCard title="Total Applicants" value={MOCK_INDUSTRY_STATS.totalApplicants} subtitle="Students applied" icon="👥" change="+12" trend="up" />
          <StatCard title="Shortlisted" value={MOCK_INDUSTRY_STATS.shortlistedCandidates} subtitle="Qualified by Skill Twin" icon="✓" change="18" trend="up" />
          <StatCard title="Avg Skill Match" value={`${MOCK_INDUSTRY_STATS.averageMatchScore}%`} subtitle="Applicant accuracy" icon="🎯" />
        </div>

        <CandidateTable candidates={MOCK_INDUSTRY_CANDIDATES} />
      </div>
    </AppShell>
  );
}