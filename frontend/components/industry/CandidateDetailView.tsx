// MOCK: Presentation component for Industry Candidate Detail View
import React from "react";
import Link from "next/link";
import { Card, Badge, Button } from "@/components/ui";
import type { IndustryCandidate } from "@/mocks/industry";

export interface CandidateDetailViewProps {
  candidate: IndustryCandidate;
}

export const CandidateDetailView: React.FC<CandidateDetailViewProps> = ({ candidate }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
              <Badge variant="default">{candidate.institution}</Badge>
              <Badge variant="teal">{candidate.matchScore}% Skill Match</Badge>
            </div>
            <h2 style={{ fontSize: "24px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
              {candidate.name}
            </h2>
            <p style={{ fontSize: "13.5px", color: "var(--text-mute)", marginTop: "4px" }}>
              {candidate.degree} · Applied for {candidate.appliedOpportunity} ({candidate.applicationDate})
            </p>
          </div>

          <div style={{ backgroundColor: "var(--paper-dim)", padding: "14px 20px", borderRadius: "10px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 700, color: "var(--teal)" }}>
              {candidate.matchScore}%
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>Verified Match</div>
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
        <Card title="Verified Skill Profile (Skill Twin)">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {candidate.verifiedSkills.map((sk, idx) => (
              <div key={idx} style={{ padding: "10px", backgroundColor: "var(--paper)", borderRadius: "8px", border: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
                <span>{sk}</span>
                <span style={{ color: "var(--teal)", fontWeight: 600 }}>Verified ✓</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recruiter Actions">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Button variant="brass" fullWidth onClick={() => alert("Candidate shortlisted for interview")}>
              Schedule Interview
            </Button>
            <Link href="/industry/candidates" style={{ textDecoration: "none" }}>
              <Button variant="outline" fullWidth>
                ← Back to Candidate Pool
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};