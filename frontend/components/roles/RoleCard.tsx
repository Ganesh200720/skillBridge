// MOCK: Presentation component for career role cards
import React from "react";
import Link from "next/link";
import { Card, Badge, ProgressBar, Button } from "@/components/ui";
import type { DetailedRole } from "@/mocks/roles";

export interface RoleCardProps {
  role: DetailedRole;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  return (
    <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "10px" }}>
          <div>
            <Badge variant="default">{role.category}</Badge>
            <h3 style={{ fontSize: "17px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "6px 0 0 0" }}>
              {role.title}
            </h3>
          </div>
          <Badge
            variant={
              role.status === "High Match"
                ? "teal"
                : role.status === "Moderate Match"
                ? "brass"
                : "default"
            }
          >
            {role.status}
          </Badge>
        </div>

        <p style={{ fontSize: "13px", color: "var(--text-mute)", margin: "0 0 14px 0", lineHeight: 1.4 }}>
          {role.description}
        </p>

        <div style={{ marginBottom: "14px" }}>
          <ProgressBar
            value={role.readinessScore}
            label="Role Readiness Score"
            variant={role.readinessScore >= 80 ? "teal" : role.readinessScore >= 70 ? "brass" : "coral"}
            height={8}
          />
        </div>

        <div style={{ fontSize: "12px", color: "var(--ink-mid)", marginBottom: "12px" }}>
          <strong>Top Skill Gaps:</strong>{" "}
          {role.topGaps.map((g) => `${g.skillName} (+${g.gapPoints} pts)`).join(", ")}
        </div>
      </div>

      <div style={{ paddingTop: "12px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "var(--text-mute)", fontFamily: "var(--font-mono)" }}>
          {role.industryDemand}% Demand
        </span>

        <Link href={`/student/roles/${role.id}`} style={{ textDecoration: "none" }}>
          <Button variant="brass" size="sm">
            View Role Details →
          </Button>
        </Link>
      </div>
    </Card>
  );
};