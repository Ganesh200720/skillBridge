"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell } from "@/components/layout";
import { DEFAULT_STUDENT_NAV_SECTIONS } from "@/components/layout/Sidebar";
import { Loading, Badge, Button, EmptyState } from "@/components/ui";
import {
  AssessmentSummaryCard,
  AssessmentCard,
  AssessmentHistoryList,
} from "@/components/assessments";

// MOCK DATA IMPORT: Isolated mock data for Student Assessments UI
import {
  MOCK_ASSESSMENT_METRICS,
  MOCK_AVAILABLE_ASSESSMENTS,
  MOCK_ASSESSMENT_HISTORY,
} from "@/mocks/assessments";

export default function StudentAssessmentsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState<"All" | "Available" | "Completed">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?role=student");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loading fullPage message="Loading Skill Assessments..." />;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const displayName = user.first_name ? user.first_name : user.username;

  // Filter available assessments
  const filteredAssessments = MOCK_AVAILABLE_ASSESSMENTS.filter((item) => {
    const matchesStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "Available"
        ? item.status === "Available"
        : item.status === "Completed";

    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skillName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <AppShell
      sections={DEFAULT_STUDENT_NAV_SECTIONS}
      activeNavId="assessments"
      pageTitle="Skill Assessments"
      pageSubtitle={`Measure your skills and identify where to improve · ${displayName}`}
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
            ℹ️ <strong>Assessment System:</strong> Tests measure verified competency levels for Skill Twin calculation.
          </span>
          <Badge variant="brass">Assessment Engine</Badge>
        </div>

        {/* 1. Summary Metrics Row */}
        <AssessmentSummaryCard metrics={MOCK_ASSESSMENT_METRICS} />

        {/* 2. Available Assessments Filter & Search Bar */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "16px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
                Available Skill Assessments
              </h3>
              <p style={{ fontSize: "12.8px", color: "var(--text-mute)", margin: "3px 0 0 0" }}>
                Select a skill test to evaluate proficiency and update your Skill Twin
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              {/* Search input */}
              <input
                type="text"
                placeholder="Search by skill or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1.5px solid var(--line)",
                  fontSize: "13px",
                  fontFamily: "var(--font-body)",
                  background: "var(--card)",
                  minWidth: "200px",
                }}
              />

              {/* Status Filter Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  background: "var(--paper-dim)",
                  borderRadius: "8px",
                  padding: "3px",
                }}
              >
                {(["All", "Available", "Completed"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    style={{
                      background: statusFilter === tab ? "var(--card)" : "none",
                      color: statusFilter === tab ? "var(--ink)" : "var(--text-mute)",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: statusFilter === tab ? 600 : 500,
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

          {/* 3. Assessment Cards Grid / Empty State */}
          {filteredAssessments.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "16px",
              }}
            >
              {filteredAssessments.map((test) => (
                <AssessmentCard
                  key={test.id}
                  assessment={test}
                  onStartAssessment={(testId) => router.push(`/student/assessments/${testId}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No assessments match your criteria"
              description="Try adjusting your search query or switching the status filter to see available skill tests."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("All");
                  }}
                >
                  Reset Search Filters
                </Button>
              }
            />
          )}
        </div>

        {/* 4. Assessment History Section */}
        <AssessmentHistoryList historyItems={MOCK_ASSESSMENT_HISTORY} />
      </div>
    </AppShell>
  );
}