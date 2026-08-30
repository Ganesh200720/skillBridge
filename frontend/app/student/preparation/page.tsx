"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Badge, Button } from "@/components/ui";
import { PreparationCard } from "@/components/preparation";
import { MOCK_PREPARATION_ITEMS } from "@/mocks/preparation";

const STUDENT_NAV_SECTIONS: NavSection[] = [
  {
    title: "Student Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/student", icon: "🏠" },
      { id: "skill-twin", label: "Skill Twin", href: "/student/skill-twin", icon: "📊" },
      { id: "roles", label: "Role Readiness", href: "/student/roles", icon: "🎯" },
      { id: "opportunities", label: "Opportunities", href: "/student/opportunities", icon: "💼", badge: "3" },
      { id: "assessments", label: "Assessments", href: "/student/assessments", icon: "📝" },
      { id: "preparation", label: "Preparation", href: "/student/preparation", icon: "📖", active: true },
    ],
  },
];

export default function StudentPreparationPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?role=student");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loading fullPage message="Loading Skill Preparation Tracks..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <AppShell
      sections={STUDENT_NAV_SECTIONS}
      activeNavId="preparation"
      pageTitle="Skill Preparation & Learning Tracks"
      pageSubtitle="Targeted learning resources to bridge skill gaps and boost role readiness"
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
            ℹ️ <strong>Gap-Driven Learning:</strong> Preparation tracks prioritize your highest impact skill gaps.
          </span>
          <Badge variant="teal">Adaptive Learning</Badge>
        </div>

        {/* Section Header */}
        <div>
          <h3 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
            Active Learning Tracks
          </h3>
          <p style={{ fontSize: "12.8px", color: "var(--text-mute)", margin: "3px 0 0 0" }}>
            Curated project labs, documentation, and practice tests to raise your Skill Twin scores
          </p>
        </div>

        {/* Learning Track Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "18px",
          }}
        >
          {MOCK_PREPARATION_ITEMS.map((item) => (
            <PreparationCard
              key={item.id}
              item={item}
              onStartTrack={(id) =>
                alert(`Selected track: ${item.recommendedResource.title}.\nLearning module placeholder.`)
              }
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}