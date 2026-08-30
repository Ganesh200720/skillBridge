import React from "react";

export interface SkillNode {
  id: string;
  name: string;
  score: number;
  category: string;
  level: "Advanced" | "Intermediate" | "Beginner";
  icon: string;
}

export interface SkillNetworkProps {
  skills: SkillNode[];
  onSelectNode?: (skill: SkillNode) => void;
  selectedId?: string;
}

export const SkillNetwork: React.FC<SkillNetworkProps> = ({
  skills,
  onSelectNode,
  selectedId,
}) => {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        padding: "24px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h3 style={{ fontSize: "18px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
            Skill Twin Intelligence Map
          </h3>
          <p style={{ fontSize: "12.5px", color: "var(--text-mute)", margin: "2px 0 0 0" }}>
            Visual competency relationships across technology domains
          </p>
        </div>
        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--teal)", background: "var(--teal-soft)", padding: "3px 8px", borderRadius: "999px" }}>
          Interactive Map
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);

          return (
            <div
              key={cat}
              style={{
                backgroundColor: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "11.5px",
                  fontFamily: "var(--font-mono)",
                  color: "var(--brass-dark)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontWeight: 700,
                  borderBottom: "1px dashed var(--line)",
                  paddingBottom: "6px",
                }}
              >
                {cat}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {catSkills.map((sk) => {
                  const isSelected = selectedId === sk.id;
                  const isHigh = sk.score >= 80;

                  return (
                    <div
                      key={sk.id}
                      onClick={() => onSelectNode && onSelectNode(sk)}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "8px",
                        backgroundColor: isSelected ? "var(--ink)" : "var(--card)",
                        color: isSelected ? "var(--paper)" : "var(--ink)",
                        border: `1.5px solid ${isSelected ? "var(--brass)" : "var(--line)"}`,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: isSelected ? "0 4px 12px rgba(18,32,61,0.15)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "16px" }}>{sk.icon}</span>
                        <span style={{ fontSize: "13.5px", fontWeight: 600 }}>{sk.name}</span>
                      </div>

                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: isSelected ? "var(--brass)" : isHigh ? "var(--teal)" : "var(--coral)",
                        }}
                      >
                        {sk.score}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};