// DESIGN & INTEGRATION: Real Career Role Skill Match Tree Visualization
"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui";
import type { NormalizedCareerRole } from "@/lib/adapters/types";

export interface RealCareerTreeVisualizationProps {
  careerRoles: NormalizedCareerRole[];
  onSelectRole?: (role: NormalizedCareerRole) => void;
}

export const RealCareerTreeVisualization: React.FC<RealCareerTreeVisualizationProps> = ({
  careerRoles,
  onSelectRole,
}) => {
  const [selectedRole, setSelectedRole] = useState<NormalizedCareerRole | null>(careerRoles[0] || null);
  const [filterMode, setFilterMode] = useState<"all" | "gaps">("all");

  if (!careerRoles || careerRoles.length === 0) {
    return (
      <div className="empty-state">
        ℹ️ No career role requirement data currently available. Select a target role to view skill match criteria.
      </div>
    );
  }

  const handleRoleClick = (role: NormalizedCareerRole) => {
    setSelectedRole(role);
    if (onSelectRole) onSelectRole(role);
  };

  const activeRequirements = selectedRole
    ? selectedRole.requirements.filter((r) => (filterMode === "gaps" ? r.gap < 0 : true))
    : [];

  return (
    <div
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1.5px solid var(--card-border)",
        borderRadius: "var(--radius-lg)",
        padding: "28px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--brass)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
            Role Requirement Intelligence & Gap Trees
          </span>
          <h3 style={{ fontSize: "22px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "3px 0 0 0" }}>
            Career Target Match & Gap Tree
          </h3>
          <p style={{ fontSize: "12.8px", color: "var(--text-secondary)", margin: "3px 0 0 0" }}>
            Compare your verified skill scores against live target role thresholds to pinpoint exact skill gaps
          </p>
        </div>

        <Badge variant="teal">Real API Data Supported</Badge>
      </div>

      {/* LEVEL 1: ROOT STUDENT NODE */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 28px",
            backgroundColor: "var(--ink)",
            color: "#FFFFFF",
            borderRadius: "999px",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            boxShadow: "0 4px 14px rgba(18, 32, 61, 0.2)",
            border: "2px solid var(--brass)",
          }}
        >
          <span>🎓</span> STUDENT CAREER TARGET BRANCHES
        </div>
        <div style={{ width: "2.5px", height: "28px", backgroundColor: "var(--brass)", margin: "0 auto" }} />
      </div>

      {/* LEVEL 2: CAREER ROLE BRANCHES */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px", marginBottom: "28px" }}>
        {careerRoles.map((role) => {
          const isSelected = selectedRole?.id === role.id;
          const matchColor = role.readinessScore >= 80 ? "var(--teal)" : role.readinessScore >= 60 ? "var(--brass)" : "var(--coral)";
          const gapCount = role.requirements.filter((r) => r.gap < 0).length;

          return (
            <div
              key={role.id}
              onClick={() => handleRoleClick(role)}
              style={{
                backgroundColor: isSelected ? "var(--brass-soft)" : "var(--bg-subtle)",
                border: `2px solid ${isSelected ? "var(--brass)" : "var(--line-strong)"}`,
                borderRadius: "14px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                boxShadow: isSelected ? "0 4px 14px rgba(184, 130, 58, 0.2)" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <Badge variant={role.readinessScore >= 80 ? "teal" : role.readinessScore >= 60 ? "brass" : "gap"}>
                  {role.readinessScore}% Match
                </Badge>
                <span style={{ fontSize: "11.5px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", fontWeight: 600 }}>
                  {role.requirements.length} Skill Criteria
                </span>
              </div>

              <h4 style={{ fontSize: "18px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "0 0 6px 0" }}>
                {role.title}
              </h4>
              {role.description && (
                <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", margin: "0 0 12px 0", lineHeight: 1.4 }}>
                  {role.description}
                </p>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11.5px", fontFamily: "var(--font-mono)", paddingTop: "10px", borderTop: "1px dashed var(--line-strong)" }}>
                <span style={{ color: gapCount === 0 ? "var(--teal)" : "var(--coral)", fontWeight: 700 }}>
                  {gapCount === 0 ? "✓ Ready to Apply" : `⚠️ ${gapCount} Skill Gap(s)`}
                </span>
                <span style={{ color: "var(--ink)", fontWeight: 700 }}>Inspect Tree →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* LEVEL 3: SELECTED ROLE SKILL REQUIREMENT & GAP TREE */}
      {selectedRole && (
        <div
          style={{
            padding: "24px",
            backgroundColor: "var(--paper-dim)",
            borderRadius: "16px",
            border: "1.5px solid var(--line-strong)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "20px" }}>
            <div>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--brass)", textTransform: "uppercase", fontWeight: 700 }}>
                Requirement Breakdown & Gap Analysis
              </div>
              <h4 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "2px 0 0 0" }}>
                Role: {selectedRole.title}
              </h4>
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => setFilterMode("all")}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                  border: "1.5px solid var(--line-strong)",
                  background: filterMode === "all" ? "var(--ink)" : "var(--card-bg)",
                  color: filterMode === "all" ? "#FFFFFF" : "var(--ink)",
                  cursor: "pointer",
                }}
              >
                All Requirements ({selectedRole.requirements.length})
              </button>
              <button
                onClick={() => setFilterMode("gaps")}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                  border: "1.5px solid var(--line-strong)",
                  background: filterMode === "gaps" ? "var(--coral)" : "var(--card-bg)",
                  color: filterMode === "gaps" ? "#FFFFFF" : "var(--ink)",
                  cursor: "pointer",
                }}
              >
                Skill Gaps Only ({selectedRole.requirements.filter((r) => r.gap < 0).length})
              </button>
            </div>
          </div>

          {/* REQUIREMENTS LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {activeRequirements.map((req, idx) => {
              const isMet = req.gap >= 0;
              const gapDelta = Math.abs(req.gap);

              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: `2px solid ${isMet ? "var(--teal-border)" : "var(--coral-border)"}`,
                    borderRadius: "12px",
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "14px",
                    boxShadow: "0 2px 6px rgba(18, 32, 61, 0.04)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--ink)" }}>
                        {req.skillName}
                      </span>
                      <Badge variant={req.importance === "required" ? "brass" : "default"}>
                        {req.importance.toUpperCase()}
                      </Badge>
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                      Your Score: <strong style={{ color: isMet ? "var(--teal)" : "var(--coral)" }}>{req.currentStudentScore}%</strong> vs Required Target: <strong>{req.minimumScore}%</strong>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <Badge variant={isMet ? "teal" : "gap"}>
                      {isMet ? "✓ Requirement Met" : `⚠️ ${gapDelta} pt Skill Gap`}
                    </Badge>
                    <div style={{ fontSize: "11.5px", color: "var(--text-mute)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
                      {isMet ? "Target achieved" : `Take ${req.skillName} assessment to close gap`}
                    </div>
                  </div>
                </div>
              );
            })}

            {activeRequirements.length === 0 && (
              <div style={{ textAlign: "center", padding: "24px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                🎉 No skill gaps found for this filter! All requirements are met.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};