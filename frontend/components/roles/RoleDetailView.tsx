// MOCK: Presentation component for detailed role readiness view
import React from "react";
import Link from "next/link";
import { Card, Badge, ProgressBar, Button } from "@/components/ui";
import type { DetailedRole } from "@/mocks/roles";

export interface RoleDetailViewProps {
  role: DetailedRole;
}

export const RoleDetailView: React.FC<RoleDetailViewProps> = ({ role }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header Banner */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
              <Badge variant="default">{role.category}</Badge>
              <Badge variant={role.status === "High Match" ? "teal" : "brass"}>{role.status}</Badge>
            </div>
            <h2 style={{ fontSize: "24px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
              {role.title}
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-mute)", marginTop: "6px", maxWidth: "700px" }}>
              {role.description}
            </p>
          </div>

          <div style={{ backgroundColor: "var(--paper-dim)", padding: "16px 20px", borderRadius: "10px", textAlign: "center", minWidth: "160px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 700, color: "var(--teal)" }}>
              {role.readinessScore}%
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>Readiness Score</div>
          </div>
        </div>
      </Card>

      {/* 2-Column Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {/* Left: Skill Requirements */}
        <Card title="Skill Requirements & Student Verification" subtitle="Comparing target thresholds against your Skill Twin scores">
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {role.requirements.map((req, idx) => (
              <div
                key={idx}
                style={{
                  padding: "14px",
                  backgroundColor: "var(--paper)",
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 600, fontSize: "14.5px", color: "var(--ink)" }}>
                      {req.skillName}
                    </span>
                    <Badge variant={req.importance === "required" ? "brass" : "default"}>
                      {req.importance}
                    </Badge>
                  </div>
                  <Badge variant={req.met ? "teal" : "gap"}>
                    {req.met ? "Target Met ✓" : "Gap Alert ⚡"}
                  </Badge>
                </div>

                <ProgressBar
                  value={req.studentScore}
                  max={100}
                  variant={req.met ? "teal" : "coral"}
                  height={8}
                  showValue={false}
                />

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "var(--text-mute)" }}>
                  <span>Your Score: <strong>{req.studentScore}%</strong></span>
                  <span>Required Target: <strong>{req.minimumScore}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Gap Analysis & Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card title="Preparation Strategy" subtitle="Recommended path to close remaining gaps">
            <p style={{ fontSize: "13.5px", color: "var(--ink)", lineHeight: 1.5, margin: "0 0 16px 0" }}>
              {role.suggestedPreparation}
            </p>
            <div style={{ padding: "14px", backgroundColor: "var(--paper-dim)", borderRadius: "8px", fontSize: "12.5px" }}>
              <div style={{ fontWeight: 600, color: "var(--ink-mid)", marginBottom: "4px" }}>
                Industry Insights
              </div>
              Average Market Salary: <strong>{role.averageSalary}</strong> · Current Market Demand: <strong>{role.industryDemand}%</strong>
            </div>
          </Card>

          <Card title="Quick Actions">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/student/preparation" style={{ textDecoration: "none" }}>
                <Button variant="brass" fullWidth>
                  Start Role Preparation Track →
                </Button>
              </Link>
              <Link href="/student/roles" style={{ textDecoration: "none" }}>
                <Button variant="outline" fullWidth>
                  ← Back to All Roles
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};