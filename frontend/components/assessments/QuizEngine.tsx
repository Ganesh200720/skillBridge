// MOCK: Interactive Question-Taking Engine for /student/assessments/[id]
import React, { useState } from "react";
import { Card, Badge, Button, ProgressBar } from "@/components/ui";
import type { AssessmentQuizDetail } from "@/mocks/assessment-quiz";

export interface QuizEngineProps {
  quiz: AssessmentQuizDetail;
  onFinish?: (score: number) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ quiz, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<number | null>(null);

  const currentQ = quiz.questions[currentIdx];
  const totalQ = quiz.questions.length;
  const progressPct = Math.round(((currentIdx + 1) / totalQ) * 100);

  const handleOptionSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentIdx < totalQ - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / totalQ) * 100);
    setScoreResult(calculatedScore);
    setIsSubmitted(true);

    if (onFinish) {
      onFinish(calculatedScore);
    }
  };

  if (isSubmitted && scoreResult !== null) {
    return (
      <Card title="Assessment Completed! (Demo Result)">
        <div style={{ textAlign: "center", padding: "30px 20px" }}>
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              backgroundColor: "var(--teal-soft)",
              border: "3px solid var(--teal)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              fontWeight: 700,
              color: "var(--teal)",
            }}
          >
            {scoreResult}%
          </div>

          <h3 style={{ fontSize: "22px", fontFamily: "var(--font-display)", color: "var(--ink)", marginBottom: "6px" }}>
            Skill Twin Score Updated for {quiz.skillName}
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-mute)", maxWidth: "480px", margin: "0 auto 20px auto" }}>
            You answered {Math.round((scoreResult / 100) * totalQ)} out of {totalQ} questions correctly.
            This result has been processed for demo presentation.
          </p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers({});
                setCurrentIdx(0);
              }}
            >
              Retry Assessment
            </Button>
            <Button
              variant="brass"
              onClick={() => window.location.href = "/student/skill-twin"}
            >
              View Updated Skill Twin →
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={`${quiz.title} Assessment`}
      subtitle={`Question ${currentIdx + 1} of ${totalQ} · ${quiz.skillName} Competency Evaluation`}
    >
      <div style={{ marginBottom: "20px" }}>
        <ProgressBar value={progressPct} showValue={false} height={6} variant="brass" />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "17px", fontFamily: "var(--font-display)", color: "var(--ink)", marginBottom: "16px", lineHeight: 1.4 }}>
          Q{currentIdx + 1}: {currentQ.questionText}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = selectedAnswers[currentQ.id] === oIdx;

            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => handleOptionSelect(oIdx)}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: `1.5px solid ${isSelected ? "var(--ink)" : "var(--line)"}`,
                  backgroundColor: isSelected ? "var(--paper-dim)" : "var(--paper)",
                  fontWeight: isSelected ? 600 : 400,
                  fontSize: "14px",
                  color: "var(--text)",
                  cursor: "pointer",
                  transition: "0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: `1.5px solid ${isSelected ? "var(--ink)" : "var(--line)"}`,
                    backgroundColor: isSelected ? "var(--ink)" : "transparent",
                    color: isSelected ? "var(--paper)" : "var(--text-mute)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                  }}
                >
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <span style={{ flex: 1 }}>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
        <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentIdx === 0}>
          ← Previous
        </Button>

        {currentIdx < totalQ - 1 ? (
          <Button variant="brass" size="sm" onClick={handleNext}>
            Next Question →
          </Button>
        ) : (
          <Button variant="teal" size="sm" onClick={handleSubmit}>
            Submit Assessment ✓
          </Button>
        )}
      </div>
    </Card>
  );
};