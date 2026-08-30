// MOCK: Presentation component for top skill strengths
import React from "react";
import { Card, Badge } from "@/components/ui";
import type { SkillTwinStrength } from "@/mocks/skill-twin";

export interface SkillStrengthsCardProps {
  strengths: SkillTwinStrength[];
}

export const SkillStrengthsCard: React.FC<SkillStrengthsCardProps> = ({
  strengths,
}) => {
  return (
    <Card title="Top Core Strengths" subtitle="Skills where you demonstrate highest relative mastery">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {strengths.map((str, idx) => (
          <div
            key={str.id}
            style={{
              padding: "14px",
              backgroundColor: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "var(--brass-soft)",
                  color: "#6b4a15",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                #{idx + 1}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>
                  {str.skillName}
                </div>
                <div style={{ fontSize: "11.5px", color: "var(--teal)", fontFamily: "var(--font-mono)" }}>
                  {str.percentile}
                </div>
              </div>
            </div>

            <Badge variant="teal">{str.score}% Score</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};