// MOCK: Presentation component for skill gap analysis and next prep steps
import React from "react";
import { Card, Badge, Button } from "@/components/ui";
import type { DashboardSkillGap } from "@/mocks/student-dashboard";

export interface SkillGapCardProps {
  gaps: DashboardSkillGap[];
  onStartPrep?: (gapId: string) => void;
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({ gaps, onStartPrep }) => {
  return (
    <Card
      title="Priority Skill Gaps (What to Learn Next)"
      subtitle="Highest impact skill improvements to unlock role readiness"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {gaps.map((gap) => (
          <div
            key={gap.id}
            style={{
              padding: "14px 16px",
              border: "1px solid #e3bda9",
              backgroundColor: "var(--coral-soft)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 700, fontSize: "14.5px", color: "var(--coral)" }}>
                  {gap.skillName}
                </span>
                <Badge variant="gap">+{gap.gap} pts needed</Badge>
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-mute)", marginTop: "4px" }}>
                Target for <strong>{gap.targetRole}</strong>: Current {gap.currentScore} / Target {gap.targetScore}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onStartPrep && onStartPrep(gap.id)}
              style={{ borderColor: "var(--coral)", color: "var(--coral)" }}
            >
              Start Prep
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};