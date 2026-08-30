"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell } from "@/components/layout";
import { DEFAULT_STUDENT_NAV_SECTIONS } from "@/components/layout/Sidebar";
import { Loading, Badge, Button } from "@/components/ui";
import {
  CircularProgressRing,
  HierarchicalSkillTree,
  RealCareerTreeVisualization,
  InsightGraph,
} from "@/components/visualizations";
import { DataService } from "@/lib/adapters/dataService";
import type { NormalizedSkillTwin } from "@/lib/adapters/types";

const MOCK_TREND_DATA = [
  { weekLabel: "Week 1", score: 62 },
  { weekLabel: "Week 2", score: 64 },
  { weekLabel: "Week 3", score: 68 },
  { weekLabel: "Week 4", score: 70 },
  { weekLabel: "Week 5", score: 72 },
  { weekLabel: "Week 6", score: 74 },
];

export default function StudentDashboardPage() {
  const { user, isLoading, isDemoMode, logout } = useAuth();
  const router = useRouter();
  const [twinData, setTwinData] = useState<NormalizedSkillTwin | null>(null);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?role=student");
    } else if (user) {
      DataService.getSkillTwin(isDemoMode).then(setTwinData);
    }
  }, [isLoading, user, isDemoMode, router]);

  if (isLoading || !twinData) {
    return <Loading fullPage message="Loading Career Intelligence Cockpit..." />;
  }

  if (!user) {
    return null;
  }

  const studentName = user.first_name ? user.first_name : user.username;
  const primaryCareer = twinData.careerBranches[0] || {
    id: "1",
    title: "Backend Developer",
    readinessScore: 82,
    requirements: [],
  };

  const primaryGap = twinData.gaps[0] || {
    skillName: "Django",
    currentScore: 62,
    targetScore: 75,
  };

  return (
    <AppShell
      sections={DEFAULT_STUDENT_NAV_SECTIONS}
      activeNavId="dashboard"
      pageTitle={`Career Position: ${studentName}`}
      pageSubtitle="Skill intelligence portal · Verified competency architecture & target role fit"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => {
        logout();
        router.push("/auth");
      }}
      headerActions={
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button variant="brass" size="sm" onClick={() => router.push("/student/assessments")}>
            + Verify New Skill
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* 1. HERO — CAREER POSITION & READINESS OVERVIEW */}
        <div
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1.5px solid var(--card-border)",
            borderRadius: "var(--radius-lg)",
            padding: "28px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <CircularProgressRing score={twinData.overallReadiness} size={110} strokeWidth={9} label="Readiness" sublabel={twinData.statusLabel} />
              <div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                  <Badge variant="brass" showDot>Target Career</Badge>
                  <Badge variant="teal">{primaryCareer.readinessScore}% Match</Badge>
                </div>
                <h2 style={{ fontSize: "26px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
                  {primaryCareer.title}
                </h2>
                <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", marginTop: "6px", maxWidth: "560px", lineHeight: 1.4 }}>
                  Your verified competencies match <strong>{primaryCareer.readinessScore}%</strong> of target role criteria. Closing your <strong>{primaryGap.skillName}</strong> gap ({primaryGap.currentScore}% vs {primaryGap.targetScore}%) unlocks active recruiter placement drives.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "200px" }}>
              <Button variant="brass" fullWidth onClick={() => router.push("/student/assessments")}>
                Bridge Skill Gap Now →
              </Button>
              <Button variant="outline" fullWidth onClick={() => setShowFullAnalysis(!showFullAnalysis)}>
                {showFullAnalysis ? "Collapse Deep Analysis ▲" : "View Career Analysis ▼"}
              </Button>
            </div>
          </div>

          {/* PROGRESSIVE DISCLOSURE: DEEP ANALYSIS BREAKDOWN */}
          {showFullAnalysis && (
            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1.5px dashed var(--line-strong)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <div style={{ backgroundColor: "var(--bg-subtle)", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--line)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-mute)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontWeight: 600 }}>Assessed Competencies</div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{twinData.totalSkillsAssessed} Verified Skills</div>
              </div>
              <div style={{ backgroundColor: "var(--bg-subtle)", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--line)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-mute)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontWeight: 600 }}>Evidence Artifacts</div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--teal)", fontFamily: "var(--font-mono)" }}>{twinData.totalEvidenceCount} Logged Evidence</div>
              </div>
              <div style={{ backgroundColor: "var(--bg-subtle)", padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--line)" }}>
                <div style={{ fontSize: "11px", color: "var(--text-mute)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontWeight: 600 }}>Data Intelligence Source</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)", marginTop: "4px" }}>{twinData.dataSource}</div>
              </div>
            </div>
          )}
        </div>

        {/* 2. PRIMARY CAREER TARGET MATCH TREE */}
        <RealCareerTreeVisualization careerRoles={twinData.careerBranches} />

        {/* 3. CATEGORY SKILL INTELLIGENCE TREE */}
        <HierarchicalSkillTree skills={twinData.skills} />

        {/* 4. READINESS TRAJECTORY & RECOMMENDED NEXT ACTION */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", alignItems: "flex-start" }}>
          {/* Left Column: Insight Graph */}
          <InsightGraph
            title="Readiness Trajectory (Verified History)"
            insightSummary="Your readiness score trajectory is calculated from verified assessment submissions."
            trendData={
              twinData.skills.length > 0 && twinData.skills[0].scoreHistory && twinData.skills[0].scoreHistory.length > 0
                ? twinData.skills[0].scoreHistory.map((score, idx) => ({ weekLabel: `Attempt ${idx + 1}`, score }))
                : MOCK_TREND_DATA
            }
          />

          {/* Right Column: High-Impact Action Banner */}
          <div
            style={{
              backgroundColor: "var(--brass-soft)",
              border: "1.5px solid var(--brass)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Badge variant="brass" showDot>RECOMMENDED NEXT ACTION</Badge>
            <h3 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "#4A320F", margin: "12px 0 6px 0" }}>
              Bridge Your {primaryGap.skillName} Skill Gap
            </h3>
            <p style={{ fontSize: "13.5px", color: "#6B4B1B", lineHeight: 1.5, margin: "0 0 18px 0" }}>
              Your current {primaryGap.skillName} score is {primaryGap.currentScore}% (Target {primaryGap.targetScore}%). Passing the assessment qualifies you for active placement opportunities.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Button variant="primary" fullWidth onClick={() => router.push("/student/assessments")}>
                Take {primaryGap.skillName} Assessment Now →
              </Button>
              <Button variant="outline" fullWidth onClick={() => router.push("/student/preparation")}>
                📖 Open Learning Track
              </Button>
            </div>
          </div>
        </div>

        {/* 5. AI MOCK INTERVIEW — PRACTICE TOOL ENTRY POINT */}
        <a
          href={process.env.NEXT_PUBLIC_AI_INTERVIEW_URL || "http://localhost:5500"}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1.5px solid var(--card-border)",
              borderRadius: "var(--radius-lg)",
              padding: "20px 24px",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              transition: "box-shadow 0.18s ease, transform 0.18s ease",
              cursor: "pointer",
            }}
            className="hover:shadow-md"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "30px", lineHeight: 1 }}>🎙️</span>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)", marginBottom: "3px" }}>
                  AI Mock Interview
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                  Practice spoken technical interviews with Natalie, an AI interviewer. Get scored feedback on 5 questions across any subject.
                </div>
              </div>
            </div>
            <div
              style={{
                flexShrink: 0,
                backgroundColor: "var(--ink)",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "9px 16px",
                fontSize: "13px",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Start Interview →
            </div>
          </div>
        </a>
      </div>
    </AppShell>
  );
}