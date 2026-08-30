"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Card, Badge } from "@/components/ui";
import { MOCK_INSTITUTION_PLACEMENTS } from "@/mocks/institution";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Institution Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/institution", icon: "🏠" },
      { id: "students", label: "Student Registry", href: "/institution/students", icon: "👨‍🎓" },
      { id: "faculty", label: "Faculty Directory", href: "/institution/faculty", icon: "📚" },
      { id: "skills", label: "Skill Analytics", href: "/institution/skills", icon: "📊" },
      { id: "industry", label: "Industry Network", href: "/institution/industry", icon: "🤝" },
      { id: "placements", label: "Placements", href: "/institution/placements", icon: "💼", active: true },
      { id: "reports", label: "Executive Reports", href: "/institution/reports", icon: "📈" },
    ],
  },
];

export default function InstitutionPlacementsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=institution");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Placements..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="placements"
      pageTitle="Campus Placement Overview"
      pageSubtitle="Corporate drives, offers extended, and CTC package analytics"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "18px" }}>
        {MOCK_INSTITUTION_PLACEMENTS.map((p) => (
          <Card key={p.id} title={p.companyName} subtitle={`Average Package: ${p.averagePackage}`}>
            <div style={{ fontSize: "13px", color: "var(--text-mute)", marginBottom: "12px" }}>
              Offers Made: <strong>{p.offersMade}</strong> · Drives Completed: <strong>{p.drivesCompleted}</strong>
            </div>
            <Badge variant="teal">{p.topSkillDemanded}</Badge>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}