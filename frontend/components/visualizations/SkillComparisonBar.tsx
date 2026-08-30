// DESIGN V2: Current vs Target skill comparison visualization
import React from "react";
import { Badge } from "@/components/ui";

export interface SkillComparisonBarProps {
  skillName: string;
  currentScore: number;
  targetScore: number;
  targetRole?: string;
  icon?: string;
}

export const SkillComparisonBar: React.FC<SkillComparisonBarProps> = ({
  skillName,
  currentScore,
  targetScore,
  targetRole,
  icon = "🎯",
}) => {
  const gap = Math.max(0, targetScore - currentScore);
  const isTargetMet = currentScore >= targetScore;

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "var(--card-bg)",
        border: `1.5px solid ${isTargetMet ? "var(--teal-border)" : "var(--coral-border)"}`,
        borderRadius: "var(--radius-md)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "18px" }}>{icon}</span>
          <span style={{ fontWeight: 600, fontSize: "14.5px", color: "var(--ink)" }}>
            {skillName}
          </span>
          {targetRole && (
            <span style={{ fontSize: "12px", color: "var(--text-mute)" }}>
              for {targetRole}
            </span>
          )}
        </div>

        <Badge variant={isTargetMet ? "teal" : "gap"}>
          {isTargetMet ? "Target Met ✓" : `+${gap} pts gap`}
        </Badge>
      </div>

      {/* Dual Comparison Bar */}
      <div style={{ position: "relative", width: "100%", height: "24px", background: "var(--paper-dim)", borderRadius: "8px", overflow: "hidden" }}>
        {/* Current Score Fill (Teal) */}
        <div
          style={{
            height: "100%",
            width: `${Math.min(100, currentScore)}%`,
            background: "linear-gradient(90deg, var(--teal), #3f9482)",
            borderRadius: "8px 0 0 8px",
            position: "absolute",
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            paddingLeft: "8px",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 700,
          }}
        >
          {currentScore}%
        </div>

        {/* Target Gap Segment (Coral/Brass) */}
        {!isTargetMet && (
          <div
            style={{
              height: "100%",
              width: `${gap}%`,
              left: `${currentScore}%`,
              background: "linear-gradient(90deg, var(--coral), #c96849)",
              position: "absolute",
              top: 0,
              opacity: 0.85,
            }}
          />
        )}

        {/* Target Indicator Line */}
        <div
          style={{
            position: "absolute",
            left: `${targetScore}%`,
            top: 0,
            bottom: 0,
            width: "3px",
            backgroundColor: "var(--ink)",
            zIndex: 10,
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "var(--text-mute)", fontFamily: "var(--font-mono)" }}>
        <span>Current: <strong>{currentScore}%</strong></span>
        <span>Required Target: <strong>{targetScore}%</strong></span>
      </div>
    </div>
  );
};