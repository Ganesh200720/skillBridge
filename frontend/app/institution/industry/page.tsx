"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppShell, NavSection } from "@/components/layout";
import { Loading, Card, Badge } from "@/components/ui";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Institution Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/institution", icon: "🏠" },
      { id: "students", label: "Student Registry", href: "/institution/students", icon: "👨‍🎓" },
      { id: "faculty", label: "Faculty Directory", href: "/institution/faculty", icon: "📚" },
      { id: "skills", label: "Skill Analytics", href: "/institution/skills", icon: "📊" },
      { id: "industry", label: "Industry Network", href: "/institution/industry", icon: "🤝", active: true },
      { id: "placements", label: "Placements", href: "/institution/placements", icon: "💼" },
      { id: "reports", label: "Executive Reports", href: "/institution/reports", icon: "📈" },
    ],
  },
];

export default function InstitutionIndustryPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/auth?role=institution");
  }, [isLoading, user, router]);

  if (isLoading || !user) return <Loading fullPage message="Loading Industry Partners..." />;

  return (
    <AppShell
      sections={NAV_SECTIONS}
      activeNavId="industry"
      pageTitle="Industry Collaborations & MOUs"
      pageSubtitle="Corporate partner network, internship drives, and placement agreements"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => { logout(); router.push("/auth"); }}
    >
      <Card title="Active Corporate Partner Network">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "12px", border: "1px solid var(--line)", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong>Nimbus Cloud Systems</strong> — Active MOU Partner
              <div style={{ fontSize: "12px", color: "var(--text-mute)" }}>18 Offers Made · Cloud Engineering Internship Drives</div>
            </div>
            <Badge variant="teal">Primary Partner</Badge>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}