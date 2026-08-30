// MOCK: Presentation component for recent skill & assessment activity
import React from "react";
import { Card, Badge } from "@/components/ui";
import type { DashboardActivity } from "@/mocks/student-dashboard";

export interface ActivityListProps {
  activities: DashboardActivity[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <Card title="Recent Activity" subtitle="Your latest assessment attempts and score updates">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {activities.map((act) => (
          <div
            key={act.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              paddingBottom: "12px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "var(--paper-dim)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              {act.type === "assessment" ? "📝" : act.type === "score_update" ? "📈" : "💼"}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--ink)" }}>
                  {act.title}
                </span>
                {act.scoreDelta && <Badge variant="teal">{act.scoreDelta}</Badge>}
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-mute)", margin: "2px 0 0 0" }}>
                {act.detail}
              </p>
              <div style={{ fontSize: "11px", color: "#8592AE", fontFamily: "var(--font-mono)", marginTop: "4px" }}>
                {act.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};