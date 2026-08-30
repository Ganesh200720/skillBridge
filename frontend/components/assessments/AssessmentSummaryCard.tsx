// MOCK: Presentation component for assessment summary metrics
import React from "react";
import { StatCard } from "@/components/dashboard";
import type { AssessmentSummaryMetrics } from "@/mocks/assessments";

export interface AssessmentSummaryCardProps {
  metrics: AssessmentSummaryMetrics;
}

export const AssessmentSummaryCard: React.FC<AssessmentSummaryCardProps> = ({
  metrics,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "14px",
      }}
    >
      <StatCard
        title="Available Assessments"
        value={metrics.totalAvailable}
        subtitle="Across technical categories"
        icon="📝"
      />
      <StatCard
        title="Completed Tests"
        value={metrics.totalCompleted}
        subtitle="Verified by Skill Twin"
        icon="✓"
        change="Active"
        trend="up"
      />
      <StatCard
        title="Average Score"
        value={`${metrics.averageScore}%`}
        subtitle="Overall test accuracy"
        icon="🎯"
        change="+5%"
        trend="up"
      />
      <StatCard
        title="Skills Assessed"
        value={metrics.skillsAssessedCount}
        subtitle="Unique competencies"
        icon="☕"
      />
    </div>
  );
};