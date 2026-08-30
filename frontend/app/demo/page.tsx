"use client";

import React, { useState } from "react";
import { AppShell, NavSection } from "@/components/layout";
import {
  Button,
  Card,
  Badge,
  ProgressBar,
  Loading,
  EmptyState,
  ErrorState,
} from "@/components/ui";

const DEMO_SECTIONS: NavSection[] = [
  {
    title: "Shell Component Demos",
    items: [
      { id: "overview", label: "UI Primitives", icon: "🎨", badge: "7" },
      { id: "layouts", label: "Layout & Cards", icon: "📐" },
      { id: "states", label: "State Feedbacks", icon: "⚡" },
    ],
  },
  {
    title: "Role Switcher (Visual Test)",
    items: [
      { id: "role-student", label: "Student Shell", icon: "🎓" },
      { id: "role-teacher", label: "Faculty Shell", icon: "📚" },
      { id: "role-industry", label: "Company Shell", icon: "🏭" },
      { id: "role-institution", label: "Institution Shell", icon: "🏛️" },
    ],
  },
];

export default function DemoPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [userRole, setUserRole] = useState("student");
  const [userName, setUserName] = useState("Priya Nair");
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const [showErrorDemo, setShowErrorDemo] = useState(false);

  const handleNavSelect = (item: { id: string }) => {
    setActiveNav(item.id);
    if (item.id === "role-student") {
      setUserRole("student");
      setUserName("Priya Nair");
    } else if (item.id === "role-teacher") {
      setUserRole("teacher");
      setUserName("Dr. Arisudan");
    } else if (item.id === "role-industry") {
      setUserRole("industry");
      setUserName("Nimbus Systems");
    } else if (item.id === "role-institution") {
      setUserRole("institution");
      setUserName("VIT Amaravati");
    }
  };

  return (
    <AppShell
      sections={DEMO_SECTIONS}
      activeNavId={activeNav}
      onSelectNav={handleNavSelect}
      pageTitle="UI Primitives & Application Shell Demo"
      pageSubtitle="Development verification route for SkillBridge frontend components (Person 2)"
      userRole={userRole}
      userName={userName}
      onLogout={() => alert("Logout button clicked (Auth flow handled in future task)")}
      headerActions={
        <Button variant="brass" size="sm" onClick={() => alert("Header Action clicked")}>
          + New Opportunity (Demo)
        </Button>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Banner Notice */}
        <div
          style={{
            backgroundColor: "var(--paper-dim)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            padding: "14px 18px",
            fontSize: "13px",
            color: "var(--ink-mid)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            ⚠️ <strong>DEVELOPMENT DEMO ROUTE:</strong> Demonstrating AppShell, Sidebar, Topbar, PageContainer &amp; UI Primitives.
          </span>
          <Badge variant="brass">DEV PREVIEW</Badge>
        </div>

        {/* Buttons Section */}
        <Card title="1. Button Primitive" subtitle="Supports primary, brass, teal, outline, ghost, danger variants and sizes">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", marginBottom: "16px" }}>
            <Button variant="primary">Primary (Ink)</Button>
            <Button variant="brass">Brass Accent</Button>
            <Button variant="teal">Teal Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger (Coral)</Button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <Button variant="brass" size="sm">Small</Button>
            <Button variant="brass" size="md">Medium</Button>
            <Button variant="brass" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled State</Button>
          </div>
        </Card>

        {/* Badges & Tags Section */}
        <Card title="2. Badge / Tag Primitive" subtitle="Skill tags, status indicators, and role badges">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <Badge variant="have" icon="✓">Python 85%</Badge>
            <Badge variant="gap" icon="⚡">AWS (Gap)</Badge>
            <Badge variant="brass">Placement Ready</Badge>
            <Badge variant="applied">Applied</Badge>
            <Badge variant="shortlisted">Shortlisted</Badge>
            <Badge variant="interview">Interview Scheduled</Badge>
          </div>
        </Card>

        {/* Progress Bar Section */}
        <Card title="3. Progress Bar Primitive" subtitle="Used for skill scores, readiness, and completion metrics">
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <ProgressBar value={85} label="Python SkillTwin Score" variant="teal" />
            <ProgressBar value={45} label="DevOps SkillTwin Score (Skill Gap)" variant="coral" />
            <ProgressBar value={72} label="Role Readiness (Backend Developer)" variant="brass" />
          </div>
        </Card>

        {/* Cards & Grid Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          <Card
            title="Interactive Card (Hoverable)"
            subtitle="Card with hover effects for listings & dashboard tiles"
            hoverable
            action={<Badge variant="teal">Match 88%</Badge>}
          >
            <p style={{ fontSize: "13.5px", color: "var(--text-mute)", margin: 0 }}>
              This card demonstrates the hoverable prop with SkillBridge border highlight and elevation.
            </p>
          </Card>

          <Card title="Standard Dashboard Stat Card">
            <div style={{ fontSize: "36px", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--ink)" }}>
              84%
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-mute)" }}>
              Overall Academia-Industry Readiness Score
            </div>
          </Card>
        </div>

        {/* States Section */}
        <Card title="4. Feedback States (Loading, Empty, Error)" subtitle="Standardized handling for async API states">
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLoadingDemo(!isLoadingDemo)}
            >
              Toggle Loading State ({isLoadingDemo ? "ON" : "OFF"})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowErrorDemo(!showErrorDemo)}
            >
              Toggle Error State ({showErrorDemo ? "ON" : "OFF"})
            </Button>
          </div>

          {isLoadingDemo ? (
            <Loading message="Fetching Skill Twin records from API..." />
          ) : showErrorDemo ? (
            <ErrorState
              title="Failed to load Skill Twin"
              message="Backend API returned HTTP 500. Check server logs."
              onRetry={() => setShowErrorDemo(false)}
            />
          ) : (
            <EmptyState
              title="No opportunities posted yet"
              description="When companies post internships or placements matching your verified skills, they will appear here."
              action={
                <Button variant="brass" size="sm" onClick={() => alert("Action triggered")}>
                  Browse All Roles
                </Button>
              }
            />
          )}
        </Card>
      </div>
    </AppShell>
  );
}