"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Card, Badge } from "@/components/ui";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Company Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/industry", icon: "🏠" },
      { id: "opportunities", label: "Manage Opportunities", href: "/industry/opportunities", icon: "💼" },
      { id: "candidates", label: "Candidate Discovery", href: "/industry/candidates", icon: "👥" },
      { id: "skills", label: "Skill Demand", href: "/industry/skills", icon: "🎯", active: true },
    ],
  },
];

export default function IndustrySkillsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=industry");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Skill Demand..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="skills"
      pageTitle="Company Skill Requirements"
      pageSubtitle="Define required competency benchmarks and minimum score thresholds"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <Card title="Skill Benchmark Requirements">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>Python OOP & Data Structures</strong>
              <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>Required Minimum: 80% · Priority: High</div>
            </div>
            <Badge variant="teal">Required</Badge>
          </div>
          <div style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>Django REST Framework APIs</strong>
              <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>Required Minimum: 75% · Priority: High</div>
            </div>
            <Badge variant="brass">Required</Badge>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}