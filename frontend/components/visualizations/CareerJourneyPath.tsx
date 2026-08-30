// DESIGN V2: Career Journey Path Visualizer
import React from "react";
import { Badge } from "@/components/ui";

export interface CareerMilestone {
  title: string;
  subtitle: string;
  status: "Completed" | "Current Position" | "Target Milestone";
  matchScore?: number;
}

export interface CareerJourneyPathProps {
  roleTitle: string;
  overallReadiness: number;
  milestones: CareerMilestone[];
}

export const CareerJourneyPath: React.FC<CareerJourneyPathProps> = ({
  roleTitle,
  overallReadiness,
  milestones,
}) => {
  return (
    <div
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "var(--radius-md)",
        padding: "22px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <div>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--brass)", textTransform: "uppercase" }}>
            Career Journey Path
          </span>
          <h3 style={{ fontSize: "18px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "2px 0 0 0" }}>
            Target: {roleTitle}
          </h3>
        </div>
        <Badge variant="teal">{overallReadiness}% Match</Badge>
      </div>

      {/* Connected Nodes Path */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", position: "relative" }}>
        {milestones.map((m, idx) => {
          const isCurrent = m.status === "Current Position";
          const isCompleted = m.status === "Completed";

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 16px",
                backgroundColor: isCurrent ? "var(--brass-soft)" : "var(--paper)",
                border: `1.5px solid ${isCurrent ? "var(--brass)" : "var(--line)"}`,
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: isCompleted ? "var(--teal)" : isCurrent ? "var(--brass)" : "var(--paper-dim)",
                  color: isCompleted || isCurrent ? "#fff" : "var(--text-mute)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {isCompleted ? "✓" : idx + 1}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>
                  {m.title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>
                  {m.subtitle}
                </div>
              </div>

              <Badge variant={isCompleted ? "teal" : isCurrent ? "brass" : "default"}>
                {m.status}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
};