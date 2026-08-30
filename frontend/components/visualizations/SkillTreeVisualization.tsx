// DESIGN CORRECTION: Interactive Skill Tree Visualization (Domain -> Category -> Skills)
"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui";

export interface SkillNodeData {
  id: string;
  name: string;
  category: "Programming" | "Frameworks" | "Databases" | "Systems & Cloud";
  score: number; // 0-100
  targetScore: number;
  status: "Strong" | "Developing" | "Missing" | "Target Met";
  evidenceCount: number;
  relatedRoles: string[];
}

export interface SkillTreeVisualizationProps {
  skills: SkillNodeData[];
  onSelectNode?: (node: SkillNodeData) => void;
}

export const SkillTreeVisualization: React.FC<SkillTreeVisualizationProps> = ({
  skills,
  onSelectNode,
}) => {
  const [selectedNode, setSelectedNode] = useState<SkillNodeData>(skills[0] || null);

  const handleNodeClick = (node: SkillNodeData) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  const categories: Array<SkillNodeData["category"]> = [
    "Programming",
    "Frameworks",
    "Databases",
    "Systems & Cloud",
  ];

  return (
    <div
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1.5px solid var(--card-border)",
        borderRadius: "var(--radius-lg)",
        padding: "26px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--brass)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Competency Architecture
          </span>
          <h3 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "2px 0 0 0" }}>
            Interactive Skill Tree
          </h3>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Badge variant="teal">● Strong (≥80%)</Badge>
          <Badge variant="brass">● Developing (60-79%)</Badge>
          <Badge variant="gap">● Missing / Gap (&lt;60%)</Badge>
        </div>
      </div>

      {/* Root Node */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            backgroundColor: "var(--ink)",
            color: "#fff",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <span>🎯</span> SOFTWARE ENGINEERING CAREER TWIN
        </div>
        <div style={{ width: "2px", height: "20px", backgroundColor: "var(--line-strong)", margin: "0 auto" }} />
      </div>

      {/* Domain Branches */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);

          return (
            <div
              key={cat}
              style={{
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              {/* Category Node Header */}
              <div
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink)",
                  borderBottom: "1px solid var(--line)",
                  paddingBottom: "8px",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{cat.toUpperCase()}</span>
                <span style={{ fontSize: "11px", color: "var(--text-mute)" }}>({catSkills.length})</span>
              </div>

              {/* Child Nodes */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {catSkills.map((sk) => {
                  const isSelected = selectedNode?.id === sk.id;
                  const isStrong = sk.score >= 80;
                  const isDeveloping = sk.score >= 60 && sk.score < 80;
                  const statusColor = isStrong ? "var(--teal)" : isDeveloping ? "var(--brass)" : "var(--coral)";
                  const statusBg = isStrong ? "var(--teal-soft)" : isDeveloping ? "var(--brass-soft)" : "var(--coral-soft)";

                  return (
                    <div
                      key={sk.id}
                      onClick={() => handleNodeClick(sk)}
                      style={{
                        padding: "10px 12px",
                        backgroundColor: isSelected ? "#fff" : statusBg,
                        border: `1.5px solid ${isSelected ? "var(--ink)" : statusColor}`,
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 600, fontSize: "13.5px", color: "var(--ink)" }}>
                          {sk.name}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "13px", color: statusColor }}>
                          {sk.score}%
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-mute)", marginTop: "4px" }}>
                        <span>Target: {sk.targetScore}%</span>
                        <span>{sk.evidenceCount} artifacts</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Inspection Drawer */}
      {selectedNode && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px 20px",
            backgroundColor: "var(--paper-dim)",
            borderRadius: "10px",
            border: "1px solid var(--line-strong)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
              <Badge variant={selectedNode.score >= 80 ? "teal" : selectedNode.score >= 60 ? "brass" : "gap"}>
                {selectedNode.status} ({selectedNode.score}%)
              </Badge>
              <span style={{ fontSize: "12px", color: "var(--text-mute)", fontFamily: "var(--font-mono)" }}>
                Target: {selectedNode.targetScore}%
              </span>
            </div>
            <h4 style={{ fontSize: "16px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
              Skill Insight: {selectedNode.name}
            </h4>
            <div style={{ fontSize: "12.5px", color: "var(--text-secondary)", marginTop: "2px" }}>
              Unlocks career roles: <strong>{selectedNode.relatedRoles.join(", ")}</strong>
            </div>
          </div>

          <Badge variant="teal">{selectedNode.evidenceCount} Verified Evidence Logs</Badge>
        </div>
      )}
    </div>
  );
};
