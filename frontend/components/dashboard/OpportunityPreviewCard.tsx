// MOCK: Presentation component for recommended industry opportunities preview
import React from "react";
import { Card, Badge, Button } from "@/components/ui";
import type { DashboardOpportunityPreview } from "@/mocks/student-dashboard";

export interface OpportunityPreviewCardProps {
  opportunities: DashboardOpportunityPreview[];
  onViewAll?: () => void;
}

export const OpportunityPreviewCard: React.FC<OpportunityPreviewCardProps> = ({
  opportunities,
  onViewAll,
}) => {
  return (
    <Card
      title="Recommended Opportunities"
      subtitle="Internships & placements matching your verified skill twin"
      action={
        onViewAll && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All ({opportunities.length}) →
          </Button>
        )
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            style={{
              padding: "16px",
              backgroundColor: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
              <div>
                <h4 style={{ fontSize: "16px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
                  {opp.title}
                </h4>
                <div style={{ fontSize: "12.8px", color: "var(--text-mute)", marginTop: "2px" }}>
                  {opp.companyName} · {opp.location} {opp.duration ? `· ${opp.duration}` : ""}
                </div>
              </div>
              <Badge variant="teal">{opp.matchScore}% Skill Match</Badge>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {opp.requiredSkills.map((sk, idx) => (
                <Badge key={idx} variant="have">
                  {sk}
                </Badge>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", fontWeight: 600, color: "var(--ink-mid)" }}>
                {opp.stipendOrCtc}
              </span>
              <span style={{ fontSize: "11.5px", color: "var(--text-mute)" }}>
                Deadline: {opp.deadline}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};