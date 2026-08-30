"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Badge, Button } from "@/components/ui";
import { FacultyStudentTable } from "@/components/faculty";
import { MOCK_FACULTY_STUDENTS } from "@/mocks/faculty";

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

export default function FacultyStudentsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=teacher");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Roster..." />;

  const filtered = MOCK_FACULTY_STUDENTS.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="students"
      pageTitle="Department Student Roster"
      pageSubtitle="Track individual student skill readiness, assessments, and skill gaps"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search student name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "8px", border: "1.5px solid var(--line)", minWidth: "260px" }}
          />
        </div>
        <FacultyStudentTable students={filtered} />
      </div>
    </AppShell>
  );
}