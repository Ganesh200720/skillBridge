"use client";

import React, { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading } from "@/components/ui";
import { CandidateDetailView } from "@/components/industry";
import { MOCK_INDUSTRY_CANDIDATES, IndustryCandidate } from "@/mocks/industry";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Company Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/industry", icon: "🏠" },
      { id: "opportunities", label: "Manage Opportunities", href: "/industry/opportunities", icon: "💼" },
      { id: "candidates", label: "Candidate Discovery", href: "/industry/candidates", icon: "👥", active: true },
      { id: "skills", label: "Skill Demand", href: "/industry/skills", icon: "🎯" },
    ],
  },
];

export default function IndustryCandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=industry");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Candidate Profile..." />;

  const candidate: IndustryCandidate =
    MOCK_INDUSTRY_CANDIDATES.find((c) => c.id === resolvedParams.id) || MOCK_INDUSTRY_CANDIDATES[0];

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="candidates"
      pageTitle={`Candidate Profile: ${candidate.name}`}
      pageSubtitle={`Verified Skill Twin match profile for ${candidate.appliedOpportunity}`}
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <CandidateDetailView candidate={candidate} />
    </AppShell>
  );
}