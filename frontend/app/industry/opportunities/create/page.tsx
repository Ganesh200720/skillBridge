"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading } from "@/components/ui";
import { CreateOpportunityForm } from "@/components/industry";

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

export default function IndustryCreateOpportunityPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=industry");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Form..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="opportunities"
      pageTitle="Create Opportunity Posting"
      pageSubtitle="Specify skill thresholds to attract matched candidates via Skill Twin intelligence"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <CreateOpportunityForm />
    </AppShell>
  );
}