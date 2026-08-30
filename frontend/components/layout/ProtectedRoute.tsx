"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loading } from "@/components/ui";
import { AppShell } from "@/components/layout";
import type { BackendRole } from "@/types";

export interface ProtectedRouteProps {
  allowedRole: BackendRole;
  roleTitle: string;
  roleDescription: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRole,
  roleTitle,
  roleDescription,
  children,
}) => {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/auth?role=${allowedRole}`);
    }
  }, [isLoading, user, router, allowedRole]);

  if (isLoading) {
    return <Loading fullPage message="Verifying authentication session..." />;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  // Handle role mismatch gracefully
  const isCorrectRole = user.role === allowedRole;

  const defaultNavSections = [
    {
      title: `${roleTitle} Workspace`,
      items: [
        { id: "overview", label: "Overview", icon: "🏠", active: true },
        { id: "profile", label: "Account Profile", icon: "🧑‍💻" },
      ],
    },
  ];

  return (
    <AppShell
      sections={defaultNavSections}
      activeNavId="overview"
      pageTitle={roleTitle}
      pageSubtitle={roleDescription}
      userRole={user.role}
      userName={user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username}
      onLogout={() => {
        logout();
        router.push("/auth");
      }}
    >
      {!isCorrectRole ? (
        <div
          style={{
            padding: "24px",
            backgroundColor: "var(--brass-soft)",
            border: "1px solid var(--brass)",
            borderRadius: "var(--radius)",
            color: "#6b4a15",
          }}
        >
          <h3>Role Mismatch Notice</h3>
          <p style={{ fontSize: "13.5px", margin: "8px 0" }}>
            You are authenticated as <strong>{user.username}</strong> with role <code>{user.role}</code>,
            which differs from this page requirement (<code>{allowedRole}</code>).
          </p>
          <button
            onClick={() => router.push(`/${user.role}`)}
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Go to your area (/{user.role}) →
          </button>
        </div>
      ) : (
        children || (
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                color: "var(--ink)",
                marginBottom: "8px",
              }}
            >
              Authenticated as {user.username} ({user.role})
            </h3>
            <p
              style={{
                color: "var(--text-mute)",
                fontSize: "14px",
                maxWidth: "500px",
                margin: "0 auto 24px auto",
              }}
            >
              {roleTitle} area — dashboard features and skill intelligence workflows will be implemented in a later phase.
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "8px 16px",
                background: "var(--paper-dim)",
                borderRadius: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--ink-mid)",
              }}
            >
              User ID: {user.id} | Email: {user.email || "N/A"} | Role: {user.role}
            </div>
          </div>
        )
      )}
    </AppShell>
  );
};