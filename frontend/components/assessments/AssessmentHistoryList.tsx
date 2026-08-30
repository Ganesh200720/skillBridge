// MOCK: Presentation component for assessment history list
import React from "react";
import { Card, Badge } from "@/components/ui";
import type { AssessmentHistoryItem } from "@/mocks/assessments";

export interface AssessmentHistoryListProps {
  historyItems: AssessmentHistoryItem[];
}

export const AssessmentHistoryList: React.FC<AssessmentHistoryListProps> = ({
  historyItems,
}) => {
  return (
    <Card
      title="Assessment History"
      subtitle="Previously attempted skill tests, scores, and evaluation dates"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {historyItems.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "14px 16px",
              backgroundColor: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontWeight: 600, fontSize: "15px", color: "var(--ink)" }}>
                  {item.assessmentTitle}
                </span>
                <Badge variant="default">{item.skillName}</Badge>
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-mute)", marginTop: "4px" }}>
                Attempt #{item.attemptNumber} · Completed on {item.takenAt}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700, color: "var(--teal)" }}>
                {item.score}%
              </span>
              <Badge variant={item.status === "Passed" ? "teal" : "gap"}>
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};