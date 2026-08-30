"use client";

import { useState } from "react";
import Link from "next/link";

const ROLES = [
  {
    key: "student",
    icon: "🎓",
    title: "Student",
    description:
      "Get skills verified, match to internships & placements, prep for interviews.",
    href: "/auth?role=student",
  },
  {
    key: "industry",
    icon: "🏭",
    title: "Company",
    description:
      "Post opportunities and get candidates ranked by verified skill match.",
    href: "/auth?role=industry",
  },
  {
    key: "teacher",
    icon: "📚",
    title: "Faculty",
    description:
      "Track student skill development and connect with industry opportunities.",
    href: "/auth?role=teacher",
  },
  {
    key: "institution",
    icon: "🏛️",
    title: "Institution",
    description:
      "Monitor skill development and placement readiness college-wide.",
    href: "/auth?role=institution",
  },
] as const;

export default function LandingPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--paper)" }}>
      {/* Top nav */}
      <header style={{ background: "var(--ink)", color: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 20,
              color: "#FFFFFF",
            }}
          >
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "linear-gradient(135deg, var(--brass), var(--teal))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              SB
            </span>
            SkillBridge
          </div>
          <Link
            href="/auth"
            style={{
              backgroundColor: "var(--brass)",
              color: "#221704",
              border: "1.5px solid var(--brass)",
              borderRadius: 10,
              padding: "9px 18px",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 90px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 46px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--teal)",
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            SIH26044 · One platform, three worlds
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 44,
              lineHeight: 1.08,
              marginBottom: 16,
              letterSpacing: "-0.5px",
              color: "var(--ink)",
            }}
          >
            Close the gap between the classroom and the job.
          </h1>
          <p style={{ color: "var(--text-mute)", fontSize: 16, margin: 0 }}>
            Choose your role to get started — you&apos;ll be asked to sign in or
            create an account.
          </p>
        </div>

        {/* Role cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {ROLES.map((r) => (
            <Link
              key={r.key}
              href={r.href}
              style={{
                background: "var(--card)",
                border: `1.5px solid ${hovered === r.key ? "var(--brass)" : "var(--line)"}`,
                borderRadius: "var(--radius)",
                padding: "26px 22px",
                textAlign: "left",
                textDecoration: "none",
                display: "block",
                transition: "border-color 0.18s, transform 0.18s, box-shadow 0.18s",
                transform: hovered === r.key ? "translateY(-3px)" : "none",
                boxShadow:
                  hovered === r.key
                    ? "0 12px 28px -16px rgba(18,32,61,.35)"
                    : "none",
              }}
              onMouseEnter={() => setHovered(r.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ fontSize: 26, marginBottom: 12 }}>{r.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  color: "var(--ink)",
                  marginBottom: 6,
                }}
              >
                {r.title}
              </h3>
              <p style={{ fontSize: 12.8, color: "var(--text-mute)", margin: "0 0 16px" }}>
                {r.description}
              </p>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12.5,
                  color: "#9A6622",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Continue as {r.title.toLowerCase()} →
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          padding: "20px 24px",
          textAlign: "center",
          color: "var(--text-mute)",
          fontSize: 12,
          marginTop: "auto",
        }}
      >
        SkillBridge — Academia·Industry Collaboration Portal · SIH26044 · All
        data shown is illustrative.
      </footer>
    </div>
  );
}