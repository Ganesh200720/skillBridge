// MOCK: Presentation component for Opportunity Cards
import React from "react";
import { Card, Badge, Button } from "@/components/ui";
import type { DetailedOpportunity } from "@/mocks/opportunities";

export interface OpportunityCardProps {
  opportunity: DetailedOpportunity;
  onSelect?: (opp: DetailedOpportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onSelect,
}) => {
  return (
    <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "10px" }}>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-mute)", fontWeight: 600 }}>
              {opportunity.companyName}
            </span>
            <h3 style={{ fontSize: "17px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "2px 0 0 0" }}>
              {opportunity.title}
            </h3>
          </div>
          <Badge variant="teal">{opportunity.matchScore}% Skill Match</Badge>
        </div>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
          <Badge variant="brass">{opportunity.opportunityType}</Badge>
          <Badge variant="default">{opportunity.location} ({opportunity.locationType})</Badge>
          {opportunity.duration && <Badge variant="default">{opportunity.duration}</Badge>}
        </div>

        <p style={{ fontSize: "13px", color: "var(--text-mute)", margin: "0 0 14px 0", lineHeight: 1.4 }}>
          {opportunity.description}
        </p>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
          {opportunity.requiredSkills.map((sk, idx) => (
            <Badge key={idx} variant="have">
              {sk.skillName} (Min {sk.minimumScore}%)
            </Badge>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: "12px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, color: "var(--ink-mid)" }}>
            {opportunity.stipendOrCtc}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-mute)" }}>
            Deadline: {opportunity.applicationDeadline}
          </div>
        </div>

        <Button
          variant={opportunity.isApplied ? "ghost" : "brass"}
          size="sm"
          disabled={opportunity.isApplied}
          onClick={() => onSelect && onSelect(opportunity)}
        >
          {opportunity.isApplied ? "Applied ✓" : "View & Apply"}
        </Button>
      </div>
    </Card>
  );
};