// MOCK: Presentation component for Faculty Student Detail View
import React from "react";
import Link from "next/link";
import { Card, Badge, ProgressBar, Button } from "@/components/ui";
import type { FacultyStudentSummary } from "@/mocks/faculty";

export interface FacultyStudentDetailViewProps {
  student: FacultyStudentSummary;
}

export const FacultyStudentDetailView: React.FC<FacultyStudentDetailViewProps> = ({
  student,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
              <Badge variant="default">{student.rollNumber}</Badge>
              <Badge variant={student.status === "Placement Ready" ? "teal" : "brass"}>{student.status}</Badge>
            </div>
            <h2 style={{ fontSize: "24px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
              {student.name}
            </h2>
            <p style={{ fontSize: "13.5px", color: "var(--text-mute)", marginTop: "4px" }}>
              {student.department} · {student.year}
            </p>
          </div>

          <div style={{ backgroundColor: "var(--paper-dim)", padding: "14px 20px", borderRadius: "10px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 700, color: "var(--teal)" }}>
              {student.readinessScore}%
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>Readiness Rating</div>
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
        <Card title="Skill Competency Summary">
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                <span>Top Strength: <strong>{student.topSkill}</strong></span>
                <span style={{ color: "var(--teal)", fontWeight: 600 }}>Verified ✓</span>
              </div>
              <ProgressBar value={92} variant="teal" height={8} showValue={false} />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                <span>Critical Gap: <strong>{student.majorGap}</strong></span>
                <span style={{ color: "var(--coral)", fontWeight: 600 }}>Gap Alert</span>
              </div>
              <ProgressBar value={62} variant="coral" height={8} showValue={false} />
            </div>
          </div>
        </Card>

        <Card title="Faculty Recommendations">
          <p style={{ fontSize: "13.5px", color: "var(--ink)", lineHeight: 1.5, margin: "0 0 16px 0" }}>
            Assign targeted Django and Cloud DevOps labs to upgrade placement readiness before upcoming industry drives.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/teacher/students" style={{ textDecoration: "none" }}>
              <Button variant="outline" size="sm">
                ← Back to Roster
              </Button>
            </Link>
            <Button variant="brass" size="sm" onClick={() => alert("Assigned prep module to student")}>
              + Assign Prep Module
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};