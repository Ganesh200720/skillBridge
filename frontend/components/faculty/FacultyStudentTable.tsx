// MOCK: Presentation component for Faculty Student Management Table
import React from "react";
import Link from "next/link";
import { Card, Badge, Button } from "@/components/ui";
import type { FacultyStudentSummary } from "@/mocks/faculty";

export interface FacultyStudentTableProps {
  students: FacultyStudentSummary[];
}

export const FacultyStudentTable: React.FC<FacultyStudentTableProps> = ({
  students,
}) => {
  return (
    <Card title="Department Student Roster" subtitle="Real-time Skill Twin readiness tracking for assigned students">
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid var(--line)", color: "var(--text-mute)", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "10px 12px" }}>Student</th>
              <th style={{ padding: "10px 12px" }}>Department</th>
              <th style={{ padding: "10px 12px" }}>Readiness</th>
              <th style={{ padding: "10px 12px" }}>Top Skill</th>
              <th style={{ padding: "10px 12px" }}>Major Gap</th>
              <th style={{ padding: "10px 12px" }}>Status</th>
              <th style={{ padding: "10px 12px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((std) => (
              <tr key={std.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "12px" }}>
                  <div style={{ fontWeight: 600, color: "var(--ink)" }}>{std.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-mute)", fontFamily: "var(--font-mono)" }}>
                    {std.rollNumber} · {std.year}
                  </div>
                </td>
                <td style={{ padding: "12px", color: "var(--text-mute)", fontSize: "12.5px" }}>
                  {std.department}
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--teal)", fontSize: "15px" }}>
                    {std.readinessScore}%
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  <Badge variant="have">{std.topSkill}</Badge>
                </td>
                <td style={{ padding: "12px" }}>
                  <Badge variant="gap">{std.majorGap}</Badge>
                </td>
                <td style={{ padding: "12px" }}>
                  <Badge variant={std.status === "Placement Ready" ? "teal" : std.status === "Developing" ? "brass" : "coral"}>
                    {std.status}
                  </Badge>
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  <Link href={`/teacher/students/${std.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="outline" size="sm">
                      View Profile →
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};