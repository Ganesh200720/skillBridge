"use client";

import React, { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading } from "@/components/ui";
import { FacultyStudentDetailView } from "@/components/faculty";
import { MOCK_FACULTY_STUDENTS, FacultyStudentSummary } from "@/mocks/faculty";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Faculty Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/teacher", icon: "🏠" },
      { id: "students", label: "Student Roster", href: "/teacher/students", icon: "👨‍🎓", active: true },
      { id: "skills", label: "Skill Analytics", href: "/teacher/skills", icon: "📊" },
      { id: "assessments", label: "Assessments", href: "/teacher/assessments", icon: "📝" },
      { id: "opportunities", label: "Opportunities", href: "/teacher/opportunities", icon: "💼" },
      { id: "reports", label: "Reports", href: "/teacher/reports", icon: "📈" },
    ],
  },
];

export default function FacultyStudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=teacher");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Profile..." />;

  const student: FacultyStudentSummary =
    MOCK_FACULTY_STUDENTS.find((s) => s.id === resolvedParams.id) || MOCK_FACULTY_STUDENTS[0];

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="students"
      pageTitle={`Student Profile: ${student.name}`}
      pageSubtitle={`Roll No: ${student.rollNumber} · Detailed Skill Twin Analysis`}
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <FacultyStudentDetailView student={student} />
    </AppShell>
  );
}