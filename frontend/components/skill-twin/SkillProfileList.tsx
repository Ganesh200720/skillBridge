// MOCK: Presentation component for detailed skills by category
import React, { useState } from "react";
import { Card, Badge, ProgressBar } from "@/components/ui";
import type { DetailedSkill } from "@/mocks/skill-twin";

export interface SkillProfileListProps {
  skills: DetailedSkill[];
}

export const SkillProfileList: React.FC<SkillProfileListProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Programming Languages", "Frameworks & Libraries", "Databases", "Cloud & DevOps"];

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <Card
      title="Verified Skill Inventory"
      subtitle="Comprehensive breakdown of skills, proficiency levels, and evidence count"
    >
      {/* Category filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "20px",
          paddingBottom: "14px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              background: selectedCategory === cat ? "var(--ink)" : "var(--paper-dim)",
              color: selectedCategory === cat ? "var(--paper)" : "var(--text)",
              border: "1px solid var(--line)",
              borderRadius: "20px",
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: selectedCategory === cat ? 600 : 500,
              cursor: "pointer",
              transition: "0.15s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredSkills.map((sk) => (
          <div
            key={sk.id}
            style={{
              padding: "16px",
              backgroundColor: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "22px" }}>{sk.icon}</span>
                <div>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--ink)" }}>
                    {sk.name}
                  </span>
                  <div style={{ fontSize: "11.5px", color: "var(--text-mute)" }}>
                    {sk.category} · Assessed {sk.lastAssessed}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Badge variant={sk.proficiency === "Advanced" ? "have" : "default"}>
                  {sk.proficiency}
                </Badge>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700, color: "var(--teal)" }}>
                  {sk.score}%
                </span>
              </div>
            </div>

            <ProgressBar value={sk.score} variant={sk.score >= 80 ? "teal" : sk.score >= 60 ? "brass" : "coral"} height={8} showValue={false} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11.5px", color: "var(--text-mute)", marginTop: "2px" }}>
              <span>Verified Evidence Artifacts: <strong>{sk.evidenceCount}</strong></span>
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--teal)" }}>Verified ✓</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};