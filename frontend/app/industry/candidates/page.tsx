"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading } from "@/components/ui";
import { CandidateTable } from "@/components/industry";
import { MOCK_INDUSTRY_CANDIDATES } from "@/mocks/industry";

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

export default function IndustryCandidatesPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=industry");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Candidate Pool..." />;

  const filtered = MOCK_INDUSTRY_CANDIDATES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.institution.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="candidates"
      pageTitle="Candidate Discovery & Ranking"
      pageSubtitle="Discover candidates filtered and ranked by verified Skill Twin scores"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <input
          type="text"
          placeholder="Search by candidate name or university..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "8px", border: "1.5px solid var(--line)", maxWidth: "300px" }}
        />
        <CandidateTable candidates={filtered} />
      </div>
    </AppShell>
  );
}