import React from "react";

export interface JourneyMilestone {
  title: string;
  readinessScore: number;
  status: "Current Level" | "Target Goal" | "Future Milestone";
  isCurrent?: boolean;
}

export interface JourneyPathProps {
  milestones: JourneyMilestone[];
}

export const JourneyPath: React.FC<JourneyPathProps> = ({ milestones }) => {
  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        padding: "22px",
      }}
    >
      <h3 style={{ fontSize: "17px", fontFamily: "var(--font-display)", color: "var(--ink)", marginBottom: "4px" }}>
        Career Progression Pathway
      </h3>
      <p style={{ fontSize: "12.5px", color: "var(--text-mute)", marginBottom: "20px" }}>
        Your mapped progression milestones toward senior role alignment
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
        {milestones.map((m, idx) => {
          const isCurrent = m.isCurrent || m.status === "Current Level";

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "14px 18px",
                borderRadius: "10px",
                backgroundColor: isCurrent ? "var(--paper-dim)" : "var(--paper)",
                border: `1.5px solid ${isCurrent ? "var(--brass)" : "var(--line)"}`,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: isCurrent ? "var(--brass)" : "var(--paper)",
                  border: `2px solid ${isCurrent ? "var(--brass)" : "var(--line)"}`,
                  color: isCurrent ? "#221704" : "var(--ink-mid)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "13px",
                  flexShrink: 0,
                }}
              >
                0{idx + 1}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "14.5px", color: "var(--ink)" }}>
                  {m.title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>
                  {m.status} · Score Threshold: <strong>{m.readinessScore}%</strong>
                </div>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: isCurrent ? "var(--brass-dark)" : "var(--teal)",
                  backgroundColor: isCurrent ? "var(--brass-soft)" : "var(--teal-soft)",
                  padding: "4px 10px",
                  borderRadius: "999px",
                }}
              >
                {isCurrent ? "Active Position" : `${m.readinessScore}% Target`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};