// MOCK: Presentation component for available assessment cards
import React from "react";
import { Card, Badge, Button } from "@/components/ui";
import type { AvailableAssessment } from "@/mocks/assessments";

export interface AssessmentCardProps {
  assessment: AvailableAssessment;
  onStartAssessment?: (id: string) => void;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  onStartAssessment,
}) => {
  const isCompleted = assessment.status === "Completed";

  return (
    <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>{assessment.icon}</span>
            <div>
              <Badge variant="default">{assessment.skillName}</Badge>
            </div>
          </div>
          <Badge variant={isCompleted ? "teal" : "brass"}>
            {assessment.status}
          </Badge>
        </div>

        <h4 style={{ fontSize: "16px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "0 0 6px 0" }}>
          {assessment.title}
        </h4>

        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
          <Badge
            variant={
              assessment.difficulty === "Beginner"
                ? "default"
                : assessment.difficulty === "Intermediate"
                ? "brass"
                : "gap"
            }
          >
            {assessment.difficulty}
          </Badge>
          <span style={{ fontSize: "12px", color: "var(--text-mute)" }}>
            {assessment.questionCount} Questions · {assessment.durationMinutes} Mins
          </span>
        </div>
      </div>

      <div style={{ paddingTop: "12px", borderTop: "1px solid var(--line)", marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {isCompleted && assessment.latestScore !== undefined ? (
          <span style={{ fontSize: "12.5px", fontFamily: "var(--font-mono)", color: "var(--teal)", fontWeight: 600 }}>
            Best Score: {assessment.latestScore}%
          </span>
        ) : (
          <span style={{ fontSize: "12px", color: "var(--text-mute)" }}>
            Ready to attempt
          </span>
        )}

        <Button
          variant={isCompleted ? "outline" : "brass"}
          size="sm"
          onClick={() => {
            if (onStartAssessment) {
              onStartAssessment(assessment.id);
            } else {
              alert("Question-taking experience will be built in the next phase.");
            }
          }}
        >
          {isCompleted ? "Retake Test" : "Start Assessment"}
        </Button>
      </div>
    </Card>
  );
};