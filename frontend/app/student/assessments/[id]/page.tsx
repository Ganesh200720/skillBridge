"use client";

import React, { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell } from "@/components/layout";
import { DEFAULT_STUDENT_NAV_SECTIONS } from "@/components/layout/Sidebar";
import { Loading, Badge, Button } from "@/components/ui";
import { QuizEngine } from "@/components/assessments";
import { MOCK_QUIZ_DATA, AssessmentQuizDetail } from "@/mocks/assessment-quiz";

export default function AssessmentQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.id;

  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?role=student");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loading fullPage message="Loading Skill Assessment Engine..." />;
  }

  if (!user) {
    return null;
  }

  // Find quiz from mock quiz bank or provide fallback
  const quiz: AssessmentQuizDetail = MOCK_QUIZ_DATA[quizId] || {
    id: quizId,
    title: "Skill Assessment Test",
    skillName: "General Competency",
    durationMinutes: 15,
    questions: [
      {
        id: 1,
        questionText: "What is the primary goal of academia-industry skill intelligence platforms?",
        options: [
          "To align student verified skill profiles with active industry job role requirements",
          "To generate random resume templates",
          "To replace university degree courses completely",
          "To host social networking forums",
        ],
        correctOptionIndex: 0,
        explanation: "SkillBridge maps verified student competency data against live industry role requirements.",
      },
      {
        id: 2,
        questionText: "How does Skill Twin intelligence help identify career readiness?",
        options: [
          "By comparing verified student scores against target role skill thresholds to highlight gaps",
          "By counting social media followers",
          "By predicting exam dates",
          "By hardcoding static database IDs",
        ],
        correctOptionIndex: 0,
        explanation: "Skill Twin compares student score benchmarks against target role criteria to surface skill gaps.",
      },
    ],
  };

  return (
    <AppShell
      sections={DEFAULT_STUDENT_NAV_SECTIONS}
      activeNavId="assessments"
      pageTitle={quiz.title}
      pageSubtitle={`Interactive Competency Test · ${quiz.skillName}`}
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => {
        logout();
        router.push("/auth");
      }}
      headerActions={
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/student/assessments" style={{ textDecoration: "none" }}>
            <Button variant="outline" size="sm">
              ← Back to Tests
            </Button>
          </Link>
          <Badge variant="brass">Quiz Mode</Badge>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <QuizEngine quiz={quiz} />
      </div>
    </AppShell>
  );
}