"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Badge, Button, EmptyState } from "@/components/ui";
import { OpportunityCard, OpportunityDetailModal } from "@/components/opportunities";
import { MOCK_OPPORTUNITIES, DetailedOpportunity } from "@/mocks/opportunities";

const STUDENT_NAV_SECTIONS: NavSection[] = [
  {
    title: "Student Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/student", icon: "🏠" },
      { id: "skill-twin", label: "Skill Twin", href: "/student/skill-twin", icon: "📊" },
      { id: "roles", label: "Role Readiness", href: "/student/roles", icon: "🎯" },
      { id: "opportunities", label: "Opportunities", href: "/student/opportunities", icon: "💼", badge: "4", active: true },
      { id: "assessments", label: "Assessments", href: "/student/assessments", icon: "📝" },
      { id: "preparation", label: "Preparation", href: "/student/preparation", icon: "📖" },
    ],
  },
];

export default function StudentOpportunitiesPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const [oppList, setOppList] = useState<DetailedOpportunity[]>(MOCK_OPPORTUNITIES);
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOpp, setSelectedOpp] = useState<DetailedOpportunity | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?role=student");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loading fullPage message="Loading Opportunities..." />;
  }

  if (!user) {
    return null;
  }

  const filteredOpps = oppList.filter((opp) => {
    const matchesType =
      typeFilter === "All"
        ? true
        : opp.opportunityType.toLowerCase() === typeFilter.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === "" ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const handleApply = (id: string) => {
    setOppList((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isApplied: true, status: "Applied" } : o))
    );

    if (selectedOpp && selectedOpp.id === id) {
      setSelectedOpp((prev) => (prev ? { ...prev, isApplied: true, status: "Applied" } : null));
    }

    alert("Application submitted! (Demo Mode Application State)");
  };

  return (
    <AppShell
      sections={STUDENT_NAV_SECTIONS}
      activeNavId="opportunities"
      pageTitle="Industry Opportunities"
      pageSubtitle="Internships & placements matched to your verified Skill Twin profile"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => {
        logout();
        router.push("/auth");
      }}
      headerActions={
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/student" style={{ textDecoration: "none" }}>
            <Button variant="outline" size="sm">
              ← Dashboard
            </Button>
          </Link>
          <Badge variant="brass">SIH26044</Badge>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Banner Notice */}
        <div
          style={{
            backgroundColor: "var(--paper-dim)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            padding: "12px 18px",
            fontSize: "12.5px",
            color: "var(--ink-mid)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            ℹ️ <strong>Skill Match Ranking:</strong> Opportunities sort by your verified Skill Twin match score.
          </span>
          <Badge variant="teal">Skill Intelligence</Badge>
        </div>

        {/* Search & Filter Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
          <div>
            <h3 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
              Available Openings ({filteredOpps.length})
            </h3>
            <p style={{ fontSize: "12.8px", color: "var(--text-mute)", margin: "3px 0 0 0" }}>
              Explore partner company internships, full-time roles, and industrial projects
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Search company, title, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1.5px solid var(--line)",
                fontSize: "13px",
                fontFamily: "var(--font-body)",
                background: "var(--card)",
                minWidth: "220px",
              }}
            />

            <div style={{ display: "flex", gap: "4px", background: "var(--paper-dim)", borderRadius: "8px", padding: "3px" }}>
              {(["All", "Internship", "Placement"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTypeFilter(tab)}
                  style={{
                    background: typeFilter === tab ? "var(--card)" : "none",
                    color: typeFilter === tab ? "var(--ink)" : "var(--text-mute)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: typeFilter === tab ? 600 : 500,
                    cursor: "pointer",
                    transition: "0.15s",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        {filteredOpps.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "18px",
            }}
          >
            {filteredOpps.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onSelect={(selected) => setSelectedOpp(selected)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No opportunities match your filter"
            description="Try adjusting your search criteria or resetting filters to browse all open partner roles."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("All");
                }}
              >
                Reset Search Filters
              </Button>
            }
          />
        )}

        {/* Opportunity Detail Modal */}
        <OpportunityDetailModal
          opportunity={selectedOpp}
          onClose={() => setSelectedOpp(null)}
          onApply={handleApply}
        />
      </div>
    </AppShell>
  );
}