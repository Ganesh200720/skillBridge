// MOCK: Presentation component for Institution Faculty Directory
import React from "react";
import { Card, Badge } from "@/components/ui";
import type { InstitutionFacultyMember } from "@/mocks/institution";

export interface InstitutionFacultyTableProps {
  facultyList: InstitutionFacultyMember[];
}

export const InstitutionFacultyTable: React.FC<InstitutionFacultyTableProps> = ({ facultyList }) => {
  return (
    <Card title="College Faculty Directory" subtitle="Department leaders and student engagement monitoring">
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13.5px" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid var(--line)", color: "var(--text-mute)", fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "10px 12px" }}>Faculty Name</th>
              <th style={{ padding: "10px 12px" }}>Department</th>
              <th style={{ padding: "10px 12px" }}>Students</th>
              <th style={{ padding: "10px 12px" }}>Assessment Activity</th>
              <th style={{ padding: "10px 12px" }}>Engagement</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((fac) => (
              <tr key={fac.id} style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "12px" }}>
                  <div style={{ fontWeight: 600, color: "var(--ink)" }}>{fac.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-mute)" }}>{fac.title}</div>
                </td>
                <td style={{ padding: "12px", color: "var(--text-mute)", fontSize: "12.5px" }}>
                  {fac.department}
                </td>
                <td style={{ padding: "12px", fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--ink-mid)" }}>
                  {fac.studentsManaged}
                </td>
                <td style={{ padding: "12px", fontSize: "12.5px" }}>
                  {fac.assessmentActivity}
                </td>
                <td style={{ padding: "12px" }}>
                  <Badge variant={fac.industryEngagement === "High" ? "teal" : "brass"}>
                    {fac.industryEngagement}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};