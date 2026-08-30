// MOCK: Presentation component for role readiness & recommendations
import React from "react";
import { Card, Badge, ProgressBar, Button } from "@/components/ui";
import type { DashboardRoleReadiness } from "@/mocks/student-dashboard";

export interface RoleReadinessCardProps {
  roles: DashboardRoleReadiness[];
  onSelectRole?: (roleId: string) => void;
}

export const RoleReadinessCard: React.FC<RoleReadinessCardProps> = ({
  roles,
  onSelectRole,
}) => {
  return (
    <Card
      title="Role Readiness & Recommendations"
      subtitle="Career target alignment calculated by Skill Twin intelligence"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {roles.map((role) => (
          <div
            key={role.id}
            style={{
              padding: "14px 16px",
              backgroundColor: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
              <div>
                <h4 style={{ fontSize: "15px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
                  {role.roleTitle}
                </h4>
                <div style={{ fontSize: "12px", color: "var(--text-mute)", marginTop: "2px" }}>
                  {role.matchingSkillsCount} of {role.totalRequiredSkillsCount} core skills verified
                </div>
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

            <ProgressBar
              value={role.readinessScore}
              variant={role.readinessScore >= 80 ? "teal" : role.readinessScore >= 70 ? "brass" : "coral"}
              height={7}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2px" }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectRole && onSelectRole(role.id)}
              >
                View Role Skill Gap →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};