// MOCK: Presentation component for Preparation Learning Tracks
import React from "react";
import { Card, Badge, ProgressBar, Button } from "@/components/ui";
import type { LearningItemTrack } from "@/mocks/preparation";

export interface PreparationCardProps {
  item: LearningItemTrack;
  onStartTrack?: (id: string) => void;
}

export const PreparationCard: React.FC<PreparationCardProps> = ({
  item,
  onStartTrack,
}) => {
  return (
    <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "10px" }}>
          <div>
            <Badge variant={item.priority === "High" ? "gap" : "brass"}>
              {item.priority} Priority
            </Badge>
            <h3 style={{ fontSize: "16px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "6px 0 0 0" }}>
              {item.skillName}
            </h3>
          </div>
          <Badge variant="teal">{item.status}</Badge>
        </div>

        <div style={{ fontSize: "12px", color: "var(--text-mute)", marginBottom: "12px" }}>
          Target Role: <strong>{item.targetRole}</strong> · Gap: <strong>+{item.gapPoints} pts needed</strong>
        </div>

        <div
          style={{
            padding: "14px",
            backgroundColor: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: "10px",
            marginBottom: "14px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--teal)", fontWeight: 600 }}>
              {item.recommendedResource.type}
            </span>
            <span style={{ fontSize: "11px", color: "var(--text-mute)", fontFamily: "var(--font-mono)" }}>
              Est. {item.recommendedResource.durationEstimate}
            </span>
          </div>
          <div style={{ fontWeight: 600, fontSize: "13.5px", color: "var(--ink)", marginBottom: "2px" }}>
            {item.recommendedResource.title}
          </div>
          <div style={{ fontSize: "11.5px", color: "var(--text-mute)" }}>
            Provider: {item.recommendedResource.provider}
          </div>
        </div>

        <div style={{ marginBottom: "8px" }}>
          <ProgressBar
            value={item.progressPercentage}
            label="Learning Track Progress"
            variant="teal"
            height={7}
          />
        </div>
      </div>

      <div style={{ paddingTop: "12px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="brass"
          size="sm"
          onClick={() => {
            if (onStartTrack) {
              onStartTrack(item.id);
            } else {
              alert(`Starting preparation track: ${item.recommendedResource.title}`);
            }
          }}
        >
          {item.progressPercentage > 0 ? "Continue Track →" : "Start Learning Track →"}
        </Button>
      </div>
    </Card>
  );
};