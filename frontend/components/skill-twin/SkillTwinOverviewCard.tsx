// MOCK: Presentation component for Skill Twin overall readiness & metadata
import React from "react";
import { Card, Badge, ProgressBar } from "@/components/ui";
import type { SkillTwinProfile } from "@/mocks/skill-twin";

export interface SkillTwinOverviewCardProps {
  profile: SkillTwinProfile;
}

export const SkillTwinOverviewCard: React.FC<SkillTwinOverviewCardProps> = ({
  profile,
}) => {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Left: Overall Readiness Metric */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "var(--paper-dim)",
              border: "3px solid var(--brass)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 700,
                color: "var(--teal)",
                lineHeight: 1,
              }}
            >
              {profile.overallReadiness}%
            </span>
            <span style={{ fontSize: "10px", color: "var(--text-mute)", textTransform: "uppercase" }}>
              Score
            </span>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h3 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
                Overall Industry Readiness
              </h3>
              <Badge variant="brass">{profile.status}</Badge>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-mute)", margin: "4px 0 10px 0" }}>
              Aggregate readiness calculated across verified technical competencies and role criteria.
            </p>
            <div style={{ width: "240px" }}>
              <ProgressBar value={profile.overallReadiness} variant="brass" height={8} showValue={false} />
            </div>
          </div>
        </div>

        {/* Right: Quick Metadata Summary */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            backgroundColor: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: "10px",
            padding: "12px 18px",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>
              {profile.totalSkillsAssessed}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-mute)" }}>Skills Verified</div>
          </div>
          <div style={{ width: "1px", backgroundColor: "var(--line)" }} />
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700, color: "var(--teal)" }}>
              {profile.totalEvidenceCount}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-mute)" }}>Evidence Artifacts</div>
          </div>
          <div style={{ width: "1px", backgroundColor: "var(--line)" }} />
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mid)" }}>
              {profile.lastUpdated}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-mute)" }}>Last Profile Update</div>
          </div>
        </div>
      </div>
    </Card>
  );
};