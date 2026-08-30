// MOCK: Presentation component for Industry Candidate Discovery Table
import React from "react";
import Link from "next/link";
import { Card, Badge, Button } from "@/components/ui";
import type { IndustryCandidate } from "@/mocks/industry";

export interface CandidateTableProps {
  candidates: IndustryCandidate[];
}

export const CandidateTable: React.FC<CandidateTableProps> = ({ candidates }) => {
  return (
    <Card title="Candidate Pool & Verified Skill Match" subtitle="Skill Twin ranked candidates matching active opportunity criteria">
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid var(--line)", color: "var(--text-mute)", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "10px 12px" }}>Candidate</th>
              <th style={{ padding: "10px 12px" }}>Institution</th>
              <th style={{ padding: "10px 12px" }}>Skill Match</th>
              <th style={{ padding: "10px 12px" }}>Verified Skills</th>
              <th style={{ padding: "10px 12px" }}>Applied Role</th>
              <th style={{ padding: "10px 12px" }}>Status</th>
              <th style={{ padding: "10px 12px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((cand) => (
              <tr key={cand.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "12px" }}>
                  <div style={{ fontWeight: 600, color: "var(--ink)" }}>{cand.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-mute)" }}>{cand.degree}</div>
                </td>
                <td style={{ padding: "12px", color: "var(--text-mute)", fontSize: "12.5px" }}>
                  {cand.institution}
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--teal)", fontSize: "15px" }}>
                    {cand.matchScore}%
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {cand.verifiedSkills.map((s, idx) => (
                      <Badge key={idx} variant="have">{s}</Badge>
                    ))}
                  </div>
                </td>
                <td style={{ padding: "12px", color: "var(--ink-mid)", fontWeight: 500, fontSize: "12.5px" }}>
                  {cand.appliedOpportunity}
                </td>
                <td style={{ padding: "12px" }}>
                  <Badge variant={cand.status === "Shortlisted" ? "brass" : cand.status === "Interview Scheduled" ? "teal" : "default"}>
                    {cand.status}
                  </Badge>
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  <Link href={`/industry/candidates/${cand.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="outline" size="sm">
                      View Profile →
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};