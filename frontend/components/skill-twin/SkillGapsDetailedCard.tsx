// MOCK: Presentation component for detailed skill gaps
import React from "react";
import { Card, Badge, Button } from "@/components/ui";
import type { SkillTwinGap } from "@/mocks/skill-twin";

export interface SkillGapsDetailedCardProps {
  gaps: SkillTwinGap[];
}

export const SkillGapsDetailedCard: React.FC<SkillGapsDetailedCardProps> = ({
  gaps,
}) => {
  return (
    <Card
      title="Areas to Improve (Skill Gaps)"
      subtitle="Competencies to upgrade for targeted industry role readiness"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {gaps.map((gap) => (
          <div
            key={gap.id}
            style={{
              padding: "14px 16px",
              border: "1px solid #e3bda9",
              backgroundColor: "var(--coral-soft)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14.5px", color: "var(--coral)" }}>
                  {gap.skillName}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-mute)", marginTop: "2px" }}>
                  Target Role: <strong>{gap.targetRole}</strong>
                </div>
              </div>
              <Badge variant="gap">+{gap.gap} pts gap</Badge>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                color: "var(--ink-mid)",
                fontFamily: "var(--font-mono)",
                marginTop: "4px",
              }}
            >
              <span>Current Score: <strong>{gap.currentScore}%</strong></span>
              <span>Target Score: <strong>{gap.targetScore}%</strong></span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};