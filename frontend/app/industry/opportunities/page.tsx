"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Badge, Button, Card } from "@/components/ui";
import { MOCK_OPPORTUNITIES } from "@/mocks/opportunities";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Company Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/industry", icon: "🏠" },
      { id: "opportunities", label: "Manage Opportunities", href: "/industry/opportunities", icon: "💼", active: true },
      { id: "candidates", label: "Candidate Discovery", href: "/industry/candidates", icon: "👥" },
      { id: "skills", label: "Skill Demand", href: "/industry/skills", icon: "🎯" },
    ],
  },
];

export default function IndustryOpportunitiesPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=industry");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Opportunities..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="opportunities"
      pageTitle="Company Opportunities Management"
      pageSubtitle="Post and manage internship drives, placement roles, and skill criteria"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
      headerActions={
        <Button variant="brass" size="sm" onClick={() => router.push("/industry/opportunities/create")}>
          + Post New Opportunity
        </Button>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "18px" }}>
        {MOCK_OPPORTUNITIES.map((opp) => (
          <Card key={opp.id} title={opp.title} subtitle={`${opp.opportunityType} · ${opp.location}`}>
            <div style={{ fontSize: "13px", color: "var(--text-mute)", marginBottom: "12px" }}>
              Package: <strong>{opp.stipendOrCtc}</strong> · Applicants: <strong>{opp.applicantsCount}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Badge variant="teal">{opp.status}</Badge>
              <Button variant="outline" size="sm" onClick={() => router.push("/industry/candidates")}>
                View Candidates →
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}