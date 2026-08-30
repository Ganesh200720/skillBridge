// MOCK: Presentation component for verified student skills overview
import React from "react";
import { Card, Badge, ProgressBar } from "@/components/ui";
import type { DashboardSkill } from "@/mocks/student-dashboard";

export interface SkillProgressCardProps {
  skills: DashboardSkill[];
  onVerifyNewSkill?: () => void;
}

export const SkillProgressCard: React.FC<SkillProgressCardProps> = ({
  skills,
  onVerifyNewSkill,
}) => {
  return (
    <Card
      title="Verified Skills (Skill Twin Snapshot)"
      subtitle="Verified competency levels based on completed assessments"
      action={
        onVerifyNewSkill && (
          <button
            onClick={onVerifyNewSkill}
            style={{
              background: "none",
              border: "1px solid var(--brass)",
              color: "var(--brass)",
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Verify Skill
          </button>
        )
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {skills.map((skill) => (
          <div key={skill.id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "18px" }}>{skill.icon}</span>
                <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>
                  {skill.name}
                </span>
                <Badge variant={skill.level === "Advanced" ? "have" : "default"}>
                  {skill.level}
                </Badge>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, color: "var(--teal)" }}>
                {skill.score}%
              </div>
            </div>
            <ProgressBar value={skill.score} variant={skill.score >= 80 ? "teal" : "brass"} height={8} showValue={false} />
            <div style={{ fontSize: "11px", color: "var(--text-mute)", textAlign: "right" }}>
              Assessed {skill.lastAssessed}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};