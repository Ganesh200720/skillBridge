"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Badge, Button } from "@/components/ui";
import {
  CircularProgressRing,
  SkillComparisonBar,
  HierarchicalSkillTree,
  RealCareerTreeVisualization,
  InsightGraph,
} from "@/components/visualizations";
import { DataService } from "@/lib/adapters/dataService";
import type { NormalizedSkillTwin } from "@/lib/adapters/types";

const STUDENT_NAV_SECTIONS: NavSection[] = [
  {
    title: "Student Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/student", icon: "🏠" },
      { id: "skill-twin", label: "Skill Twin", href: "/student/skill-twin", icon: "📊" },
      { id: "roles", label: "Role Readiness", href: "/student/roles", icon: "🎯" },
      { id: "opportunities", label: "Opportunities", href: "/student/opportunities", icon: "💼", badge: "4" },
      { id: "assessments", label: "Assessments", href: "/student/assessments", icon: "📝" },
      { id: "preparation", label: "Preparation", href: "/student/preparation", icon: "📖" },
    ],
  },
];

const MOCK_TREND_DATA = [
  { weekLabel: "Week 1", score: 62 },
  { weekLabel: "Week 2", score: 64 },
  { weekLabel: "Week 3", score: 68 },
  { weekLabel: "Week 4", score: 70 },
  { weekLabel: "Week 5", score: 72 },
  { weekLabel: "Week 6", score: 74 },
];

export default function StudentSkillTwinPage() {
  const { user, isLoading, isDemoMode, logout } = useAuth();
  const router = useRouter();
  const [twinData, setTwinData] = useState<NormalizedSkillTwin | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?role=student");
    } else if (user) {
      DataService.getSkillTwin(isDemoMode).then(setTwinData);
    }
  }, [isLoading, user, isDemoMode, router]);

  if (isLoading || !twinData) {
    return <Loading fullPage message="Loading Skill Twin Data Access Layer..." />;
  }

  if (!user) {
    return null;
  }

  const displayName = user.first_name ? user.first_name : user.username;

  return (
    <AppShell
      sections={STUDENT_NAV_SECTIONS}
      activeNavId="skill-twin"
      pageTitle="Professional Capability Map (Skill Twin)"
      pageSubtitle={`Signature competency architecture for ${displayName} (${user.username})`}
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
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* 1. OVERALL READINESS HEADER */}
        <div
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1.5px solid var(--card-border)",
            borderRadius: "var(--radius-lg)",
            padding: "26px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <CircularProgressRing score={twinData.overallReadiness} size={110} strokeWidth={9} label="Readiness" sublabel={twinData.statusLabel} />
              <div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                  <Badge variant="brass">{twinData.statusLabel}</Badge>
                  <Badge variant="teal">{twinData.dataSource}</Badge>
                </div>
                <h2 style={{ fontSize: "26px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
                  Competency Architecture & Skill Twin
                </h2>
                <p style={{ fontSize: "13.5px", color: "var(--text-mute)", marginTop: "4px" }}>
                  Normalized skill twin models, category hierarchy, and real role skill requirement benchmarks.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", backgroundColor: "var(--paper-dim)", padding: "12px 20px", borderRadius: "10px", border: "1px solid var(--line)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>
                  {twinData.totalSkillsAssessed}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-mute)" }}>Verified Skills</div>
              </div>
              <div style={{ width: "1px", backgroundColor: "var(--line-strong)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: 700, color: "var(--teal)" }}>
                  {twinData.totalEvidenceCount}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-mute)" }}>Evidence Artifacts</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PRIMARY VIEW: MULTI-TIER SKILL INTELLIGENCE TREE */}
        <HierarchicalSkillTree skills={twinData.skills} />

        {/* 3. REAL CAREER ROLE SKILL MATCH TREE */}
        <RealCareerTreeVisualization careerRoles={twinData.careerBranches} />

        {/* 4. CAPABILITY BENCHMARKS & INSIGHT GRAPH */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", alignItems: "flex-start" }}>
          <div
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1.5px solid var(--card-border)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <h3 style={{ fontSize: "18px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "0 0 4px 0" }}>
              Capability Benchmarks
            </h3>
            <p style={{ fontSize: "12.5px", color: "var(--text-mute)", margin: "0 0 12px 0" }}>
              Current verified scores vs minimum Backend Developer thresholds
            </p>
            {twinData.gaps.map((gap) => (
              <SkillComparisonBar
                key={gap.id}
                skillName={gap.skillName}
                currentScore={gap.currentScore}
                targetScore={gap.targetScore}
                targetRole={gap.targetRole}
              />
            ))}
          </div>

          <InsightGraph
            title="Readiness Trajectory (Score History)"
            insightSummary="Your readiness score trajectory is calculated from verified assessment submissions."
            trendData={
              twinData.skills.length > 0 && twinData.skills[0].scoreHistory && twinData.skills[0].scoreHistory.length > 0
                ? twinData.skills[0].scoreHistory.map((score, idx) => ({ weekLabel: `Attempt ${idx + 1}`, score }))
                : MOCK_TREND_DATA
            }
          />
        </div>
      </div>
    </AppShell>
  );
}