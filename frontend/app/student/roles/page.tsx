"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Badge, Button, EmptyState } from "@/components/ui";
import { RoleCard } from "@/components/roles";
import { MOCK_ROLES, DetailedRole } from "@/mocks/roles";

const STUDENT_NAV_SECTIONS: NavSection[] = [
  {
    title: "Student Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/student", icon: "🏠" },
      { id: "skill-twin", label: "Skill Twin", href: "/student/skill-twin", icon: "📊" },
      { id: "roles", label: "Role Readiness", href: "/student/roles", icon: "🎯", active: true },
      { id: "opportunities", label: "Opportunities", href: "/student/opportunities", icon: "💼", badge: "3" },
      { id: "assessments", label: "Assessments", href: "/student/assessments", icon: "📝" },
      { id: "preparation", label: "Preparation", href: "/student/preparation", icon: "📖" },
    ],
  },
];

export default function StudentRolesPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?role=student");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loading fullPage message="Loading Recommended Roles..." />;
  }

  if (!user) {
    return null;
  }

  const filteredRoles = MOCK_ROLES.filter(
    (r) =>
      searchQuery.trim() === "" ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell
      sections={STUDENT_NAV_SECTIONS}
      activeNavId="roles"
      pageTitle="Recommended Career Roles"
      pageSubtitle="Target role requirements matched against your Skill Twin competency levels"
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
            ℹ️ <strong>Role Intelligence:</strong> Role readiness scores are calculated by comparing verified skill scores to industry role thresholds.
          </span>
          <Badge variant="teal">Skill Intelligence</Badge>
        </div>

        {/* Header Search Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
          <div>
            <h3 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
              Career Role Recommendations
            </h3>
            <p style={{ fontSize: "12.8px", color: "var(--text-mute)", margin: "3px 0 0 0" }}>
              Explore industry role standards, score thresholds, and target skill gaps
            </p>
          </div>

          <input
            type="text"
            placeholder="Search roles or categories..."
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
        </div>

        {/* Roles Cards Grid */}
        {filteredRoles.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "18px",
            }}
          >
            {filteredRoles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No role recommendations match your search"
            description="Try clearing your search query to explore available industry career targets."
            action={
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
                Reset Search
              </Button>
            }
          />
        )}
      </div>
    </AppShell>
  );
}