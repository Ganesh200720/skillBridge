// MOCK: Presentation component for Opportunity Detail Modal
import React from "react";
import { Badge, Button } from "@/components/ui";
import type { DetailedOpportunity } from "@/mocks/opportunities";

export interface OpportunityDetailModalProps {
  opportunity: DetailedOpportunity | null;
  onClose: () => void;
  onApply: (id: string) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  onApply,
}) => {
  if (!opportunity) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(18, 32, 61, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--card)",
          borderRadius: "var(--radius)",
          maxWidth: "600px",
          width: "100%",
          padding: "30px",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "18px",
            background: "none",
            border: "none",
            fontSize: "20px",
            color: "var(--text-mute)",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
          <Badge variant="brass">{opportunity.opportunityType}</Badge>
          <Badge variant="teal">{opportunity.matchScore}% Skill Match</Badge>
        </div>

        <h2 style={{ fontSize: "22px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
          {opportunity.title}
        </h2>
        <div style={{ fontSize: "14px", color: "var(--text-mute)", marginTop: "4px" }}>
          {opportunity.companyName} · {opportunity.location} ({opportunity.locationType}) {opportunity.duration ? `· ${opportunity.duration}` : ""}
        </div>

        <div
          style={{
            margin: "20px 0",
            padding: "16px",
            backgroundColor: "var(--paper)",
            borderRadius: "10px",
            border: "1px solid var(--line)",
          }}
        >
          <div style={{ fontSize: "12px", color: "var(--text-mute)", textTransform: "uppercase", marginBottom: "4px" }}>
            Stipend / Package
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: 700, color: "var(--teal)" }}>
            {opportunity.stipendOrCtc}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-mute)", marginTop: "4px" }}>
            Application Deadline: {opportunity.applicationDeadline} · Applicants: {opportunity.applicantsCount}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ fontSize: "15px", fontFamily: "var(--font-display)", color: "var(--ink)", marginBottom: "8px" }}>
            Opportunity Description
          </h4>
          <p style={{ fontSize: "13.5px", color: "var(--text-mute)", lineHeight: 1.5 }}>
            {opportunity.description}
          </p>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h4 style={{ fontSize: "15px", fontFamily: "var(--font-display)", color: "var(--ink)", marginBottom: "8px" }}>
            Required Skills (Skill Twin Matching)
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {opportunity.requiredSkills.map((sk, idx) => (
              <Badge key={idx} variant="have">
                {sk.skillName} (Minimum {sk.minimumScore}%)
              </Badge>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            variant={opportunity.isApplied ? "ghost" : "brass"}
            disabled={opportunity.isApplied}
            onClick={() => onApply(opportunity.id)}
          >
            {opportunity.isApplied ? "Applied ✓" : "Submit Application"}
          </Button>
        </div>
      </div>
    </div>
  );
};