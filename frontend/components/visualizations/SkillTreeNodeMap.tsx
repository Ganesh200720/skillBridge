// DESIGN V2: Skill Landscape Node Map (Parent Domain -> Child Skills)
import React from "react";
import { Badge } from "@/components/ui";
import type { DetailedSkill } from "@/mocks/skill-twin";

export interface SkillTreeNodeMapProps {
  skills: DetailedSkill[];
  onSelectSkill?: (skill: DetailedSkill) => void;
}

export const SkillTreeNodeMap: React.FC<SkillTreeNodeMapProps> = ({
  skills,
  onSelectSkill,
}) => {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {categories.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);

        return (
          <div
            key={cat}
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "var(--radius-md)",
              padding: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--brass)" }} />
              <h4 style={{ fontSize: "16px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
                {cat}
              </h4>
              <span style={{ fontSize: "12px", color: "var(--text-mute)", fontFamily: "var(--font-mono)" }}>
                ({catSkills.length} competencies)
              </span>
            </div>

            {/* Nodes Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
              {catSkills.map((sk) => (
                <div
                  key={sk.id}
                  onClick={() => onSelectSkill && onSelectSkill(sk)}
                  className="skill-node"
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "20px" }}>{sk.icon}</span>
                      <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>
                        {sk.name}
                      </span>
                    </div>
                    <Badge variant={sk.proficiency === "Advanced" ? "have" : "default"}>
                      {sk.proficiency}
                    </Badge>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                    <span style={{ fontSize: "11.5px", color: "var(--text-mute)" }}>
                      {sk.evidenceCount} Evidence Artifacts
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: 700, color: "var(--teal)" }}>
                      {sk.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};