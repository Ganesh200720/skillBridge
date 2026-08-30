// DESIGN & INTEGRATION: Truthful Category-Based Skill Intelligence Tree
"use client";

import React, { useState } from "react";
import { Badge, Button } from "@/components/ui";
import type { NormalizedSkillNode } from "@/lib/adapters/types";

export interface HierarchicalSkillTreeProps {
  skills: NormalizedSkillNode[];
  onSelectNode?: (node: NormalizedSkillNode) => void;
}

export const HierarchicalSkillTree: React.FC<HierarchicalSkillTreeProps> = ({
  skills,
  onSelectNode,
}) => {
  const [selectedNode, setSelectedNode] = useState<NormalizedSkillNode | null>(skills[0] || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  if (!skills || skills.length === 0) {
    return (
      <div className="empty-state">
        ℹ️ No skill data available to render Skill Twin tree. Complete an assessment test to populate your Skill Twin.
      </div>
    );
  }

  // Extract unique categories
  const allCategories = Array.from(new Set(skills.map((s) => s.category || "General")));

  // Filter skills by search query and category filter
  const filteredSkills = skills.filter((s) => {
    const matchesCategory = selectedCategoryFilter === "All" || s.category === selectedCategoryFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCategories = Array.from(new Set(filteredSkills.map((s) => s.category || "General")));

  const toggleCategoryCollapse = (cat: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleNodeClick = (node: NormalizedSkillNode) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1.5px solid var(--card-border)",
        borderRadius: "var(--radius-lg)",
        padding: "28px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* HEADER & CONTROLS */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--brass)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
            Categorized Skill Intelligence Architecture
          </span>
          <h3 style={{ fontSize: "22px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "3px 0 0 0" }}>
            Skill Twin Intelligence Tree
          </h3>
          <p style={{ fontSize: "12.8px", color: "var(--text-secondary)", margin: "3px 0 0 0" }}>
            Truthful category hierarchy built from verified student assessment benchmarks ({skills.length} Skills)
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <Badge variant="teal">✓ Strong (≥80%)</Badge>
          <Badge variant="brass">● Developing (60-79%)</Badge>
          <Badge variant="gap">⚠️ Missing (&lt;60%)</Badge>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedCategoryFilter("All")}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 600,
              border: "1.5px solid var(--line-strong)",
              background: selectedCategoryFilter === "All" ? "var(--ink)" : "var(--card-bg)",
              color: selectedCategoryFilter === "All" ? "#FFFFFF" : "var(--ink)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            All Categories ({skills.length})
          </button>
          {allCategories.map((cat) => {
            const isSelected = selectedCategoryFilter === cat;
            const count = skills.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                  border: "1.5px solid var(--line-strong)",
                  background: isSelected ? "var(--ink)" : "var(--card-bg)",
                  color: isSelected ? "#FFFFFF" : "var(--ink)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Filter tree by skill name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1.5px solid var(--line-strong)",
            fontSize: "13px",
            fontFamily: "var(--font-body)",
            background: "#FFFFFF",
            minWidth: "220px",
          }}
        />
      </div>

      {/* TIER 1: ROOT SKILL TWIN NODE */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 28px",
            backgroundColor: "var(--ink)",
            color: "#FFFFFF",
            borderRadius: "999px",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            boxShadow: "0 4px 14px rgba(18, 32, 61, 0.2)",
            border: "2px solid var(--brass)",
          }}
        >
          <span>🎯</span> SKILL TWIN COMPETENCY ROOT
        </div>
        <div style={{ width: "2.5px", height: "28px", backgroundColor: "var(--brass)", margin: "0 auto" }} />
      </div>

      {/* TIER 2 & 3: CATEGORY BRANCHES & SKILL NODES */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px" }}>
        {activeCategories.map((cat) => {
          const catSkills = filteredSkills.filter((s) => s.category === cat);
          const isCollapsed = !!collapsedCategories[cat];
          const avgScore = Math.round(catSkills.reduce((acc, s) => acc + s.score, 0) / (catSkills.length || 1));

          return (
            <div
              key={cat}
              style={{
                backgroundColor: "var(--bg-subtle)",
                border: "1.5px solid var(--line-strong)",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 2px 8px rgba(18, 32, 61, 0.04)",
              }}
            >
              {/* Category Branch Header */}
              <div
                onClick={() => toggleCategoryCollapse(cat)}
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink)",
                  borderBottom: "1.5px solid var(--line-strong)",
                  paddingBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{isCollapsed ? "▶" : "▼"}</span>
                  <span style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}>{cat}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Badge variant={avgScore >= 80 ? "teal" : avgScore >= 60 ? "brass" : "gap"}>
                    Avg {avgScore}%
                  </Badge>
                  <span style={{ fontSize: "11px", color: "var(--text-mute)" }}>({catSkills.length})</span>
                </div>
              </div>

              {/* Skill Nodes List */}
              {!isCollapsed && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {catSkills.map((sk) => {
                    const isSelected = selectedNode?.id === sk.id;
                    const isStrong = sk.score >= 80;
                    const isDeveloping = sk.score >= 60 && sk.score < 80;
                    const statusColor = isStrong ? "var(--teal)" : isDeveloping ? "var(--brass)" : "var(--coral)";
                    const statusBg = isSelected
                      ? "#FFFFFF"
                      : isStrong
                      ? "var(--teal-soft)"
                      : isDeveloping
                      ? "var(--brass-soft)"
                      : "var(--coral-soft)";

                    return (
                      <div
                        key={sk.id}
                        onClick={() => handleNodeClick(sk)}
                        style={{
                          padding: "14px 16px",
                          backgroundColor: statusBg,
                          border: `2px solid ${isSelected ? "var(--ink)" : statusColor}`,
                          borderRadius: "12px",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          boxShadow: isSelected ? "0 4px 12px rgba(18,32,61,0.15)" : "none",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <span style={{ fontWeight: 700, fontSize: "14.5px", color: "var(--ink)" }}>
                            {sk.name}
                          </span>
                          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "14px", color: statusColor }}>
                            {sk.score}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ height: "6px", width: "100%", backgroundColor: "rgba(18, 32, 61, 0.1)", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" }}>
                          <div style={{ height: "100%", width: `${sk.score}%`, backgroundColor: statusColor, borderRadius: "3px", transition: "width 0.3s ease" }} />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                          <span>Level: <strong>{sk.level || "Assessed"}</strong></span>
                          <span>{sk.evidenceCount || 1} Evidence Log(s)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* TIER 4: SELECTED NODE INSPECTION DRAWER */}
      {selectedNode && (
        <div
          style={{
            marginTop: "28px",
            padding: "22px 26px",
            backgroundColor: "var(--paper-dim)",
            borderRadius: "14px",
            border: "1.5px solid var(--line-strong)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
            <div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                <Badge variant={selectedNode.score >= 80 ? "teal" : selectedNode.score >= 60 ? "brass" : "gap"}>
                  {selectedNode.status || (selectedNode.score >= 80 ? "Strong" : selectedNode.score >= 60 ? "Developing" : "Missing")} ({selectedNode.score}%)
                </Badge>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                  Category: {selectedNode.category}
                </span>
              </div>
              <h4 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}>
                Selected Skill Node: {selectedNode.name}
              </h4>
            </div>

            <Badge variant="teal">{selectedNode.evidenceCount || 1} Verified Evidence Logs</Badge>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", paddingTop: "12px", borderTop: "1px dashed var(--line-strong)" }}>
            <div style={{ backgroundColor: "#FFFFFF", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: "11px", color: "var(--text-mute)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontWeight: 600 }}>Proficiency Score</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{selectedNode.score}%</div>
            </div>
            <div style={{ backgroundColor: "#FFFFFF", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: "11px", color: "var(--text-mute)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontWeight: 600 }}>Confidence Level</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--teal)", fontFamily: "var(--font-mono)" }}>{selectedNode.confidence ?? 100}%</div>
            </div>
            <div style={{ backgroundColor: "#FFFFFF", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: "11px", color: "var(--text-mute)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontWeight: 600 }}>Assessed Level</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>{selectedNode.level || "Intermediate"}</div>
            </div>
            <div style={{ backgroundColor: "#FFFFFF", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: "11px", color: "var(--text-mute)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontWeight: 600 }}>Score History</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-mid)", fontFamily: "var(--font-mono)" }}>
                {selectedNode.scoreHistory && selectedNode.scoreHistory.length > 0 ? selectedNode.scoreHistory.join("% → ") + "%" : `${selectedNode.score}%`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};