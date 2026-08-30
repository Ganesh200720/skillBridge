// DESIGN CORRECTION: Insight-Driven Graphs (Readiness Trend & Competency Radar)
"use client";

import React from "react";
import { Badge } from "@/components/ui";

export interface ReadinessTrendData {
  weekLabel: string;
  score: number;
}

export interface InsightGraphProps {
  title: string;
  insightSummary: string;
  trendData: ReadinessTrendData[];
}

export const InsightGraph: React.FC<InsightGraphProps> = ({
  title,
  insightSummary,
  trendData,
}) => {
  const maxScore = 100;
  const minScore = 50;

  return (
    <div
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1.5px solid var(--card-border)",
        borderRadius: "var(--radius-lg)",
        padding: "24px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--brass)", textTransform: "uppercase" }}>
            Skill Intelligence Trend
          </span>
          <h3 style={{ fontSize: "18px", fontFamily: "var(--font-display)", color: "var(--ink)", margin: "2px 0 0 0" }}>
            {title}
          </h3>
        </div>
        <Badge variant="teal">+12 pts overall growth</Badge>
      </div>

      {/* Insight Summary Banner */}
      <div style={{ padding: "10px 14px", backgroundColor: "var(--teal-soft)", border: "1px solid var(--teal-border)", borderRadius: "8px", fontSize: "13px", color: "var(--teal)", marginBottom: "20px" }}>
        💡 <strong>Insight:</strong> {insightSummary}
      </div>

      {/* SVG Line Graph */}
      <div style={{ position: "relative", height: "150px", width: "100%" }}>
        <svg width="100%" height="100%" viewBox="0 0 500 120" preserveAspectRatio="none">
          {/* Background Grid Lines */}
          <line x1="0" y1="20" x2="500" y2="20" stroke="var(--line)" strokeDasharray="4 4" />
          <line x1="0" y1="60" x2="500" y2="60" stroke="var(--line)" strokeDasharray="4 4" />
          <line x1="0" y1="100" x2="500" y2="100" stroke="var(--line)" strokeDasharray="4 4" />

          {/* Polyline Path */}
          <polyline
            fill="none"
            stroke="var(--teal)"
            strokeWidth="3.5"
            points={trendData
              .map((d, i) => {
                const x = (i / (trendData.length - 1)) * 480 + 10;
                const y = 110 - ((d.score - minScore) / (maxScore - minScore)) * 90;
                return `${x},${y}`;
              })
              .join(" ")}
          />

          {/* Points */}
          {trendData.map((d, i) => {
            const x = (i / (trendData.length - 1)) * 480 + 10;
            const y = 110 - ((d.score - minScore) / (maxScore - minScore)) * 90;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill="var(--teal)" stroke="#fff" strokeWidth="2" />
                <text x={x} y={y - 10} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--ink)" fontWeight="bold">
                  {d.score}%
                </text>
              </g>
            );
          })}
        </svg>

        {/* X-Axis Labels */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "11px", color: "var(--text-mute)", fontFamily: "var(--font-mono)" }}>
          {trendData.map((d, i) => (
            <span key={i}>{d.weekLabel}</span>
          ))}
        </div>
      </div>
    </div>
  );
};