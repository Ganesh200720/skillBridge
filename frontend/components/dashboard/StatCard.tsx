// MOCK: Presentation component for dashboard metric cards
import React from "react";
import { Card, Badge } from "@/components/ui";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  trend = "up",
  icon = "⚡",
}) => {
  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <span style={{ fontSize: "20px" }}>{icon}</span>
        {change && (
          <Badge variant={trend === "up" ? "teal" : trend === "down" ? "gap" : "default"}>
            {change}
          </Badge>
        )}
      </div>
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "30px",
            fontWeight: 700,
            color: "var(--ink)",
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-mid)", marginTop: "4px" }}>
          {title}
        </div>
        <div style={{ fontSize: "11.5px", color: "var(--text-mute)", marginTop: "2px" }}>
          {subtitle}
        </div>
      </div>
    </Card>
  );
};