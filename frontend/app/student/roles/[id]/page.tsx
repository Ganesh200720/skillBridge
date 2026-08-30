"use client";

import React, { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppShell } from "@/components/layout";
import { DEFAULT_STUDENT_NAV_SECTIONS } from "@/components/layout/Sidebar";
import { Loading, Badge, Button } from "@/components/ui";
import { RoleDetailView } from "@/components/roles";
import { MOCK_ROLES, DetailedRole } from "@/mocks/roles";

export default function StudentRoleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const roleId = resolvedParams.id;

  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?role=student");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loading fullPage message="Loading Role Breakdown..." />;
  }

  if (!user) {
    return null;
  }

  // Find role by id or fallback to first role
  const role: DetailedRole =
    MOCK_ROLES.find((r) => r.id === roleId) || MOCK_ROLES[0];

  return (
    <AppShell
      sections={DEFAULT_STUDENT_NAV_SECTIONS}
      activeNavId="roles"
      pageTitle={role.title}
      pageSubtitle="Target Role Requirements & Skill Gap Analysis"
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => {
        logout();
        router.push("/auth");
      }}
      headerActions={
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/student/roles" style={{ textDecoration: "none" }}>
            <Button variant="outline" size="sm">
              ← All Roles
            </Button>
          </Link>
          <Badge variant="brass">SIH26044</Badge>
        </div>
      }
    >
      <RoleDetailView role={role} />
    </AppShell>
  );
}