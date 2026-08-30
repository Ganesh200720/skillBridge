// DESIGN CORRECTION: Career Path Tree Visualization (Root Candidate -> Branching Career Options -> Blocking Skills)
"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui";

export interface CareerBranch {
  id: string;
  roleTitle: string;
  matchScore: number;
  demandTrend: string;
  status: "Primary Goal" | "Alternative Option" | "Stretch Goal";
  keyRequirement: string;
  blockingSkill: string;
  blockingGapPts: number;
}

export interface CareerPathTreeVisualizationProps {
  branches: CareerBranch[];
  onSelectBranch?: (branch: CareerBranch) => void;
}

export const CareerPathTreeVisualization: React.FC<CareerPathTreeVisualizationProps> = ({
  branches,
  onSelectBranch,
}) => {
  const [activeBranch, setActiveBranch] = useState<CareerBranch>(branches[0] || null);

  const handleBranchClick = (b: CareerBranch) => {
    setActiveBranch(b);
    if (onSelectBranch) onSelectBranch(b);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1.5px solid var(--card-border)",
        borderRadius: "var(--radius-lg)",
        padding: "26px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--brass)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Career Progression Vector
          </span>
          <h3 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "2px 0 0 0" }}>
            Career Path Tree
          </h3>
        </div>
        <Badge variant="teal">Skill Intelligence Map</Badge>
      </div>

      {/* Root Node */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "var(--paper-dim)",
            border: "1.5px solid var(--line-strong)",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--ink)",
          }}
        >
          <span>👤</span> YOU (Current Standing: 74% Overall Readiness)
        </div>
        <div style={{ width: "2px", height: "18px", backgroundColor: "var(--line-strong)", margin: "0 auto" }} />
      </div>

      {/* Branching Paths Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
        {branches.map((branch) => {
          const isSelected = activeBranch?.id === branch.id;
          const isPrimary = branch.status === "Primary Goal";

          return (
            <div
              key={branch.id}
              onClick={() => handleBranchClick(branch)}
              style={{
                backgroundColor: isSelected ? "var(--brass-soft)" : "var(--bg-subtle)",
                border: `1.5px solid ${isSelected ? "var(--brass)" : "var(--line)"}`,
                borderRadius: "12px",
                padding: "16px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <Badge variant={isPrimary ? "brass" : "default"}>{branch.status}</Badge>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700, color: "var(--teal)" }}>
                  {branch.matchScore}% Match
                </span>
              </div>

              <h4 style={{ fontSize: "16px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "0 0 6px 0" }}>
                {branch.roleTitle}
              </h4>

              <div style={{ fontSize: "12px", color: "var(--text-mute)", marginBottom: "10px" }}>
                Key Need: <strong>{branch.keyRequirement}</strong>
              </div>

              {/* Blocking Gap Pill */}
              <div
                style={{
                  padding: "8px 10px",
                  backgroundColor: "var(--coral-soft)",
                  border: "1px solid var(--coral-border)",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  color: "var(--coral)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>⚠️ Blocking: {branch.blockingSkill}</span>
                <span style={{ fontWeight: 700 }}>+{branch.blockingGapPts} pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
